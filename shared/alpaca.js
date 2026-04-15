"use strict";

// =================================================
// ALPACA DATA BARS
// =================================================
class AlpacaData {

    GET = 'GET';
    POST = 'POST';
    DELETE = 'DELETE';
    buy_sell_root_url = 'https://paper-api.alpaca.markets';
    baseUrl = `https://data.alpaca.markets`;
    ALPACA_KEY = null;
    ALPACA_SECRET = null;
    START_OF_YEAR = null;
    FEED = 'iex'; // iex, sip
    WINDOWS = {
        NONE: ['2025-12-22'],
        WEEKS: [
            '2025-03-28',
            '2025-04-04',
            '2025-04-11',
            '2025-04-18',
            '2025-04-25',
            '2025-05-02',
            '2025-05-09',
            '2025-05-16',
            '2025-05-23',
            '2025-05-30',
            '2025-06-06',
            '2025-06-13',
            '2025-06-20',
            '2025-06-27',
            '2025-07-04',
            '2025-07-11',
            '2025-07-18',
            '2025-07-25',
            '2025-08-01',
            '2025-08-08',
            '2025-08-15',
            '2025-08-22',
            '2025-08-29',
            '2025-09-05',
            '2025-09-12',
            '2025-09-19',
            '2025-09-26',
            '2025-10-03',
            '2025-10-10',
            '2025-10-17',
            '2025-10-24',
            '2025-10-31',
            '2025-11-07',
            '2025-11-14',
            '2025-11-21',
            '2025-11-28',
            '2025-12-05',
            '2025-12-12',
            // '2025-12-18', //* thursday reset for new symbol list
            // '2025-12-19', //* friday reset for new symbol list
            '2025-12-26',
        ],
        MONTHS: [
            '2025-03-28',
            '2025-04-30',
            '2025-05-30',
            '2025-06-30',
            '2025-07-31',
            '2025-08-29',
            '2025-09-30',
            '2025-10-31',
            '2025-11-28',
            '2025-12-31',
            '2025-01-30',
            '2025-02-27',
        ],
        QUARTERS: [
            '2025-03-28',
            '2025-06-30',
            '2025-09-30',
            '2025-12-31',
            '2025-01-30',
            '2025-02-27',
            '2025-03-31',
        ]
    };
    CONFIG = {
        stocks: 'W',
        stop_pct: 0.1,
        // sell_dates: [],
        // get_reset_window: (t) => { return getWeekName(new Date(t)); },
        // get_reset_window: (t) => { return new Date(t).getDay() === 5; },
        // get_reset_window: (t) => { return getYMD(getLastFridayOfMonth(new Date(t).getFullYear(), new Date(t).getMonth())); },
        // get_reset_window: (t) => { return getMonthName(new Date(t)); },
        // get_reset_window: (t) => { return getQuarterName(new Date(t)); },

        // sell_dates: this.WINDOWS.NONE,
        // sell_dates: this.WINDOWS.WEEKS,
        sell_dates: this.WINDOWS.MONTHS,
        // sell_dates: this.WINDOWS.QUARTERS,
    };
    all_symbols = null;
    constructor(key, secret, start_of_year = '2024-12-15T00:00:00-05:00', algo = null) {
        this.ALPACA_KEY = key;
        this.ALPACA_SECRET = secret;
        this.START_OF_YEAR = start_of_year;
        if (algo) {
            this.CONFIG.stocks = algo;
        }
    }
    // /** ADD MISSING DATA */
    addMissingData(data, symbol = '-', end = new Date(Date.now() - (1 * 60 * 1000))) {

        /** create empty array off HMM for the day (0 - 1440) */
        const data2 = [];
        for (let x = 0; x < 1440; x++) {
            const start = new Date(end.split('T')[0] + 'T00:00:00').getTime();
            const d = new Date(start + (x * 60 * 1000));
            const thm = getHMM(d);
            const e = d.getTime();
            data2.push({ thm, e, t: d.toISOString(), tl: d.toLocaleString() });
        }

        /** assign objects for API call to the empty array */
        data.forEach((v, i) => {
            const index = data2.findIndex((v2) => v.thm === v2.thm);
            Object.assign(data2[index], v);
        })

        // /** populate missing entries with the last value */
        const data3 = [];
        let last = data[0];
        data2.forEach((v, i) => {
            if (!v.c) {
                if (i === 0) {
                    /** handle empty at start */
                }
                const v2 = deepClone(v);
                v2.p = last.p;
                v2.c = last.c;
                v2.o = last.o;
                v2.h = last.h;
                v2.l = last.l;
                v2.n = last.n;
                v2.v = last.v;
                v2.vw = last.vw;
                // data2[i] = v2;
                v = v2;
            }
            data3.push(v);
            last = v;
        })
        return data3.filter((v) => v.e <= Date.now());
    }
    // /** ADD META DATA */
    addMetaData(data) {
        data.forEach((v, i) => {
            const d = new Date(v.t);
            v.e = d.getTime();
            v.tl = d.toLocaleString();
            v.thm = (d.getHours() * 100) + d.getMinutes();
            v.dow = d.getDay();
        })
        return data;
    }
    convertToPercent(symbol, data) {
        data.forEach((v, i) => {
            v.c_pct = i < 14 ? 0 : (v.c / data[0].c * 100);
            // if (symbol === 'VIXY') {
            //     v.c = -v.c;
            //     v.o = -v.o;
            // }
        })
        return data;
    }
    addBollingerBands(key = 'bands_c', data, period = 14, multiplier = 0.7, stop_pct = 0.9) {
        applyBands(data, period, multiplier, stop_pct);
        data.forEach((v) => {
            if (!v[key]) {
                v[key] = { sma: 0, lowerBand: 0, upperBand: 0, delta: 0, stop: 0 };
            }
        })
        return data;
    }
    // /** INTRADAY MOMENTUM INDEX */
    addIMI(data, period = 14) {
        const key = 'mom';
        data.forEach((v, i) => {
            if (i > period) {
                const window = data.slice(i - period, i);
                const sumOfGains = reduceArray(window.map((v) => v.c - v.o > 0 ? v.c - v.o : 0));
                const sumOfLosses = reduceArray(window.map((v) => v.c - v.o));
                const imiitradayMomentumIndex = (sumOfGains / (sumOfGains + Math.abs(sumOfLosses))) * 100;
                v[key] = imiitradayMomentumIndex;
            } else {
                v[key] = null;
            }
        })
        return data;
    }
    // /** WEIGHTED ROLLING AVERAGE */
    addWeightedRollingAverage(data, windowSize = 5) {
        const key = 'wra';
        data.forEach((v, i) => {
            if (i > windowSize) {
                // let wra = data[i - windowSize].c;
                // for (let j = 1; j < windowSize; j++) {
                //     wra = (wra + data[i - j].c) / j
                // }
                // v[key] = wra;
                let sum = 0;
                for (let j = 1; j < windowSize; j++) {
                    sum += data[i - j].c;
                }
                v[key] = sum / windowSize;
            } else {
                v[key] = null;
            }
        })
        return data;
    }
    addTrendlines(data) {
        data.forEach((v, i) => {
            if (i > 5) {
                const tl = calculateTrendline(data.slice(i - 5, i).map((v) => v.c));
                v.tl5 = tl.calculateY(6);
            } else {
                v.tl5 = v.c;
            }
        })
        return data;
    }
    refactor(symbol, data) {
        const obj = [];
        data.forEach((v) => {
            obj.push({
                s: symbol,
                tl: v.tl,
                thm: v.thm,
                c_pct: v.c_pct,
                c: v.c,
                o: v.o,
                h: v.h,
                l: v.l,
                t: v.t,
                e: v.e,
                n: v.n,
                v: v.v,
                vw: v.vw,
                mom: v.mom,
                wra: v.wra,
                sma: v.bands_c.sma,
                stop: v.bands_c.stop,
                lb: v.bands_c.lowerBand,
                ub: v.bands_c.upperBand,
                p5: v.tl5,
                dow: v.dow,
            });
        });
        return obj;
    }
    async analyze(symbol, bars, seed = 1000) {
        return new Promise(async (resolve) => {
            // const invest_schedule = [
            //     { t: '2024-01-05', e: 1704499200000, amount: 1000 }
            // ];
            let was_below = true;
            let was_above = true;
            let own_at = -1;
            let trades = [];
            const algos = {
                //#region CALCS
                start_of_day_pct: (s, e) => (e - s) / s * 100,
                start_of_day_1K: (s, e) => (1000 / s) * (e - s),
                default_gain_pct: (i1, i2) => (bars[i2].c - bars[i1].o) / bars[i1].o * 100,
                default_gain_1K: (i1, i2) => (1000 / bars[i1].o) * (bars[i2].c - bars[i1].o),
                //#endregion

                //#region 
                /** 
                 * ----- NEW ALGORITHM -----
                 * buy all at start of day
                 * at 10:30, sell all losers
                 * sell any symbol that loses $50 for rest of the day
                 * liquidate at EOD
                 */
                //#endregion

                //#region STOCKS
                A: { buy: (v, i) => v.o >= v.ub, sell: (v, i) => v.c <= v.ub, },
                B: { buy: (v, i) => v.o >= v.lb, sell: (v, i) => v.c <= v.ub },
                C: { buy: (v, i) => v.sma >= v.lb, sell: (v, i) => false },
                D: { buy: (v, i) => v.o >= v.sma, sell: (v, i) => v.c <= v.lb },
                // D: { buy: (v, i) => v.c >= v.sma, sell: (v, i) => v.o <= v.lb },
                E: { buy: (v, i) => v.o >= v.sma, sell: (v, i) => v.c < v.sma },
                F: { buy: (v, i) => v.o >= v.lb, sell: (v, i) => v.c < v.lb, }, //# GOOD ONE */
                G: { buy: (v, i) => v.c >= v.lb && v.p5 >= v.c, sell: (v, i) => v.c < v.lb },
                H: { buy: (v, i) => v.o >= v.lb, sell: (v, i) => true }, // buy/sell each day if above lower bound

                //# MOMENTUM - NOT VERY GOOD
                M: { buy: (v, i) => v.mom <= 45, sell: (v, i) => v.mom >= 80 },

                W: { buy: (v, i) => true, sell: (v) => v.c < (v.lb * this.CONFIG.stop_pct) },
                W2: { buy: (v, i) => true, sell: (v) => v.c < false },

                X: { buy: (v, i) => v.o >= v.lb, sell: (v) => v.c < v.stop }, //* 
                // X2: { buy: (v, i) => v.o <= v.lb ? true : v.o >= v.lb, sell: (v) => v.c < v.stop }, //@ 248 %
                //# buy each day when under lower band
                X2: { buy: (v, i) => v.o <= v.lb ? true : v.o >= v.lb, sell: (v) => v.o <= v.lb ? v.c <= v.o : v.c < v.stop }, //@ 265 | 154 | 187 %
                // X: { buy: (v, i) => v.c >= v.lb && v.o >= v.lb, sell: (v) => v.c < v.stop }, //! stop loss
                // X: { buy: (v, i) => v.o < v.c && v.o >= v.lb, sell: (v) => v.c < v.stop }, //! stop loss
                Y: { buy: (v, i) => v.o >= v.lb, sell: (v) => false },
                Z: { buy: (v, i) => true, sell: (v) => v.c < v.stop },
                Z2: { buy: (v, i) => true, sell: (v) => true }, //@ 122 %
                //#endregion
            };
            // const isCrypto = false;
            const algo = this.CONFIG.stocks;

            if (bars && bars.length > 0) {
                // const exceeds = (v, i1, i2) => {
                //     if (own_at > 0) {

                //     }
                // };
                /** ADD TRADE @param {*} v - bar object, @param {*} i1 - buy index @param {*} i2 - sell index*/
                const push_trade_2 = (es, ee, o, c, i) => {
                    trades.push({
                        s: symbol,
                        o,
                        c,
                        q: 1000 / o,
                        // gain_pct: algos[algo].gain_pct ? algos[algo].gain_pct(v, i2) : algos.start_of_day_1K(o, c),
                        // gain_1K: algos[algo].gain_1K ? algos[algo].gain_1K(v, i2) : algos.start_of_day_pct(o, c),
                        gain_pct: algos.start_of_day_pct(o, c),
                        gain_1K: algos.start_of_day_1K(o, c),
                        num_days: ee - es,
                        e1: es,
                        e2: ee,
                        t1: getYMD(new Date(es)),
                        t2: getYMD(new Date(ee)),
                        active: i === bars.length - 1 && own_at >= 0 ? true : false,
                    });
                }
                const sell_dates = this.CONFIG.sell_dates || [];
                //* inject sell dates - used if wanted on fridays */
                // let e = new Date('2024-09-16T12:00:00').getTime();
                // const end_at = new Date('2026-01-01T00:00:00').getTime()
                // while (e < end_at) {
                //     sell_dates.push(getYMD(new Date(e)));
                //     e += (7 * 24 * 60 * 60 * 1000);
                // }
                const reset = this.CONFIG.get_reset_window ? true : false;
                const get_window = reset ? this.CONFIG.get_reset_window : (t) => { return null; };
                let last = get_window(bars[0].t);
                bars.forEach((v, i) => {
                    if (v.sma) {
                        //@ BUY / SELL WINDOW
                        const current = get_window(v.t);
                        if (current !== last && own_at >= 0) {
                            if (reset) {
                                //# liquidate at end of close window
                                push_trade_2(bars[own_at].e, v.e, bars[own_at].o, v.o, i);
                                own_at = -1;
                            }
                            last = current;
                        }
                        //@ SELL DATES
                        else if (own_at >= 0 && sell_dates.includes(getYMD(new Date(v.t)))) {
                            // push_trade(v, own_at, i);
                            push_trade_2(bars[own_at].e, v.e, bars[own_at].o, v.o, i);
                            own_at = -1;
                        }
                        //@ * DOLLAR GAIN BREAKS * //
                        // else if (own_at >= 0 && algos.start_of_day_1K(bars[own_at].o, v.o) >= 500) {
                        //     // push_trade(v, own_at, i);
                        //     push_trade_2(bars[own_at].e, v.e, bars[own_at].o, v.o, i);
                        //     own_at = -1;
                        // }
                        //@ * DOLLAR LOSS BREAKS * //
                        // else if (own_at >= 0 && algos.start_of_day_1K(bars[own_at].o, v.o) <= 250) {
                        //     // push_trade(v, own_at, i);
                        //     push_trade_2(bars[own_at].e, v.e, bars[own_at].o, v.o, i);
                        //     own_at = -1;
                        // }
                        //@ * BUY * //
                        if (own_at === -1 && algos[algo].buy(v, i)) {
                            // if (TRADE) {
                            //     buy(symbol, 5000); // TODO
                            // }
                            own_at = i;
                        }
                        //@ * SELL * //
                        if (own_at >= 0 && algos[algo].sell(v, i)) {
                            // if (TRADE) {
                            //     sell(symbol); // TODO
                            // }
                            // push_trade(v, own_at, i);
                            push_trade_2(bars[own_at].e, v.e, bars[own_at].o, v.c, i);
                            own_at = -1;
                        }
                    }
                    //@ * END OF DAY * //
                    if (i === bars.length - 1) {
                        if (own_at > -1) {
                            // push_trade(v, own_at, i);
                            push_trade_2(bars[own_at].e, v.e, bars[own_at].o, v.c, i);
                        }
                    }
                });
            };
            const last = bars[bars.length - 1];
            resolve({
                symbol,
                own: own_at,
                // buy: last.o >= last.lb,
                // sell: last.c <= last.lb,
                buy: false,
                sell: false,
                bars,
                trades
            });
            bars = undefined;
            trades = undefined;
        });
    }
    async summarize(res) {
        return new Promise(async (resolve) => {
            /** SUMMARIES */
            let summary_months = {};
            let summary_weeks = {};
            let summary_quarters = {};
            let total = 0;
            res.trades.forEach((v, i) => {
                const d = new Date(getYMD(new Date(v.t2)) + 'T12:00:00');
                let month = getMonthName(d);
                let week = getWeekName(d);
                let quarter = getQuarterName(d);

                const gain = v.gain_1K;
                total += gain;
                if (!summary_months[month]) {
                    summary_months[month] = gain;
                    // console.log('INIT MONTH', month, gain);
                } else {
                    summary_months[month] += gain;
                }
                if (!summary_weeks[week]) {
                    summary_weeks[week] = gain;
                } else {
                    summary_weeks[week] += gain;
                }
                if (!summary_quarters[quarter]) {
                    summary_quarters[quarter] = gain;
                } else {
                    summary_quarters[quarter] += gain;
                }
            });
            res.summary = {
                total,
                // total: Object.values(summary_months).reduce((p, c) => p + c),
                months: summary_months,
                weeks: summary_weeks,
                quarters: summary_quarters
            };
            resolve(res);
            // summary_months = undefined;
        });
    }
    levels(res) {
        res['level'] = round((res.bars.map((v) => v.wra && v.c >= v.wra ? (v.c / v.wra * 100) : 0).reduce((p, c) => p + c) / res.bars.length * 100) - 12000);
        res['level_10'] = round((res.bars.map((v) => v.wra && v.c >= v.wra ? (v.c / v.wra * 100) : 0).slice(-10).reduce((p, c) => p + c) / res.bars.length * 100));
        return res;
    }
    trendline(res) {
        // const tl = calculateTrendline(res.bars.map((v) => v.c).slice(-5));
        const tl = calculateTrendline(res.bars.map((v) => v.c));
        res.slope = round(tl.slope / res.bars[res.bars.length - 1].c * 100 * 100);
        return res;
    }
    async score(res) {
        return new Promise(async (resolve) => {
            const num_positive = Object.values(res.summary.months).reduce((p, c) => p + (c > 0 ? 1 : 0), 0);
            const num_negative = Object.values(res.summary.months).reduce((p, c) => p + (c <= 0 ? 1 : 0), 0);
            const avg = Object.values(res.summary.months).reduce((p, c) => p + c, 0) / Object.values(res.summary.months).length;
            const gain = Object.values(res.summary.months).reduce((p, c) => p + c, 0);
            const pct = round1(gain / 1000 * 100);
            // let score = Object.values(res.summary.months).reduce((p, c) => p + (c > 0 ? 1 : 0), 0);
            // let score = round(num_positive * pct);
            let score = round((num_positive / (num_positive + num_negative) * 10) * (pct > 0 ? 1 : 0));
            res.score = { score, pct };
            resolve(res);
        });
    }
    async add30Min(res, end) {
        return new Promise(async (resolve) => {
            const d = new Date();
            // const start = `${getYMD(new Date(end).getTime() - ((d.getDate() + 0) * 24 * 60 * 60 * 1000))}` + 'T23:59:59Z';
            const start = `${getYMD(new Date(end).getTime() - ((d.getDay() + 0) * 24 * 60 * 60 * 1000))}` + 'T23:59:59Z';
            end = `${getYMD(new Date(end))}T23:59:59-04:00`
            const data = await this.bars(res.symbol, '5Min', start, end, [], [], false, 100, false);
            res.recent = data;
            resolve(res);
        })
    }
    add_bars_2(res) {
        const close = res.bars[0].c;
        const qty = (1000 / close);
        res.bars_1K = [];
        res.bars.map((v) => {
            res.bars_1K.push({
                e: v.e,
                t: v.t,
                tl: v.tl,
                thm: v.thm,
                c: round2((v.c * qty) - 1000), //? should I be subtracting 1000 ?
                o: round2((v.o * qty) - 1000),
                h: round2((v.h * qty) - 1000),
                l: round2((v.l * qty) - 1000),
                // c: round2((v.c * qty)), //? should I be subtracting 1000 ?
                // o: round2((v.o * qty)),
                // h: round2((v.h * qty)),
                // l: round2((v.l * qty)),
                sma: round2((v.sma * qty) - 1000),
                lb: round2((v.lb * qty) - 1000),
                ub: round2((v.ub * qty) - 1000),
                v: v.v,
                n: v.n,
                vw: v.vw
            });
        });
        return res;
    }
    async add_latest_bar(res) {
        return new Promise(async (resolve) => {
            const latest = await this.latest_bar(res.symbol);
            res.latest_raw = latest;
            resolve(res);
        });
    }
    async positions(symbol, positions, res) {
        return new Promise(async (resolve) => {
            const p = positions.length > 0 ? positions[0] : null;
            res.position = p ? {
                cost_basis: p ? +p.cost_basis : 0,
                avg_entry_price: p ? +p.avg_entry_price : 0,
                market_value: p ? +p.market_value : 0,
                qty: p ? +p.qty : 0,
                gain: p ? +p.unrealized_pl : 0,
                pct: p ? round2(+p.unrealized_plpc * 100) : 0,
                t: p ? p.t : null,
                e: p ? new Date(p.t).getTime() : null,
            } : null;
            resolve(res);
            positions = undefined;
        });
    }
    async orders(symbol, orders, res) {
        return new Promise(async (resolve) => {
            orders.forEach((v) => {
                v.c = v.side === 'buy' ? -(+(v.p) * (+(v.q))) : +(v.p) * (+(v.q));
                v.p = +(v.p);
                v.q = +(v.q);
                v.spend = +(v.spend);
            });
            res.orders = orders;
            resolve(res);
            orders = undefined;
        });
    }
    async get_next_page(symbol, url, delay, res, options) {
        return new Promise(async (resolve) => {
            let next_page_token = res.next_page_token;
            while (next_page_token) {
                await sleep(250)
                const url2 = url + `&page_token=${next_page_token}`;
                let res2 = await fetch(url2, options);
                res2 = await res2.json();
                res.bars[symbol].push(...res2.bars[symbol]);
                next_page_token = res2.next_page_token;
            }
            resolve(res);
        });
    }
    async bars_m3(symbol, timeframe = '1d', start = this.START_OF_YEAR, end = new Date().toISOString(), open_positions, orders_list, reset = true, delay = 100, add30 = true) {
        return new Promise(async (resolve) => {

            await sleep(delay);

            const s = symbol.replace('/', '%2F');
            // const feed = 'iex'; //! DO NOT USE IEX FOR ALPACA - LIMITED DATA

            // const myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");
            // myHeaders.append("m3_token", "193750"); // Example of another header
            let options = { method: 'GET', headers: { m3_token: '193750' } };
            let url = localStorage.getItem('m3-stocks-data-url') + `/${s}/${timeframe}/${start}/${end}`;

            // symbol = symbol.replace('/', '-');
            // url = `http://localhost:3102/yahoo/${symbol.replace('/', '-')}/1d/${start}/${end}`
            open_positions = [];
            orders_list = [];
            if (open_positions.length > 0) {
                open_positions[0].t = orders_list[0].t;
            }
            if (url) {
                try {
                    fetch(url, options)
                        .then(res => res.json())
                        .then((res) => {
                            // console.log(res); 
                            return res;
                        })
                        // .then((res) => this.get_next_page(symbol, url, delay, res, options))
                        .then((res) => { res.symbol = symbol; return res; })
                        .then((res) => {
                            if (!res.bars[symbol]) {
                                console.error(JSON.stringify(res));
                                res.bars = { [symbol]: [{ o: 0, c: 0 }] };
                            }
                            return res;
                        })
                        .then((res) => res.bars[symbol] || [])
                        .then((res) => this.addMetaData(res))
                        // .then((res) => this.convertToPercent(symbol, res))
                        // .then((res) => timeframe === '1Min' ? this.addMissingData(res, s, end) : res)
                        // .then((res) => this.addBollingerBands('bands_c', res, isCrypto ? 50 : 28, isCrypto ? 1.0 : 0.7))
                        .then((res) => this.addIMI(res, 14))
                        .then((res) => this.addBollingerBands('bands_c', res, 14, 0.7, 1.0)) //TODO: get from config
                        .then((res) => this.addTrendlines(res))
                        .then((res) => this.addWeightedRollingAverage(res))
                        .then((res) => this.refactor(symbol, res))
                        .then((res) => this.analyze(symbol, res))
                        .then((res) => this.summarize(res))
                        .then((res) => this.levels(res))
                        .then((res) => this.trendline(res))
                        .then((res) => this.score(res))
                        .then((res) => this.positions(symbol, open_positions, res))
                        .then((res) => this.orders(symbol, orders_list, res))
                        .then((res) => add30 ? this.add30Min(res, end) : res)
                        .then((res) => this.add_bars_2(res))
                        // .then((res) => this.add_latest_bar(res))
                        .then((res) => resolve(res));
                } catch (error) {
                    // This block catches:
                    // 1. Network errors (e.g., "Failed to fetch")
                    // 2. Errors thrown manually in the try block (e.g., HTTP errors)
                    // 3. Errors during JSON parsing (if not checked before)
                    console.error("Fetch error:", error.message);
                    // Update UI, log error to a service, etc.
                }
            } else {
                resolve(null);
            }
        });
    }
    async bars(symbol, timeframe = '1D', start = this.START_OF_YEAR, end = new Date().toISOString(), open_positions, orders_list, reset = true, delay = 100, add30 = true) {
        return new Promise(async (resolve) => {

            await sleep(delay);

            const s = symbol.replace('/', '%2F');
            const feed = 'iex'; //! DO NOT USE IEX FOR ALPACA - LIMITED DATA

            let options = { method: 'GET', headers: { accept: 'application/json' } };
            let url = `${this.baseUrl}/v1beta3/crypto/us/bars?symbols=${s}&timeframe=${timeframe}&start=${start}&end=${end}&feed=${this.FEED}&limit=5000&sort=asc`

            const isCrypto = s.endsWith('USD');
            if (isCrypto === false) {
                options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'APCA-API-KEY-ID': this.ALPACA_KEY || KEY,
                        'APCA-API-SECRET-KEY': this.ALPACA_SECRET || SECRET
                    }
                };

                let isOpen = true; //market_calendar.findIndex((v) => v.date === start.substring(0, 10)) >= 0;
                const d = new Date();
                const hm = +((d.getHours() * 100) + +(d.getMinutes().toString().padStart(2, '0')));
                isOpen = isOpen ? (start.substring(0, 10) === getTodayLocal() ? hm > 930 : isOpen) : isOpen;
                url = isOpen ? `${this.baseUrl}/v2/stocks/bars?symbols=${s}&start=${start}&end=${end}&timeframe=${timeframe}&limit=5000&adjustment=raw&feed=${this.FEED}&sort=asc` : null;
            }

            // symbol = symbol.replace('/', '-');
            // url = `http://localhost:3102/yahoo/${symbol.replace('/', '-')}/1d/${start}/${end}`
            open_positions = open_positions.filter((v) => v.symbol === symbol.replace('/', '')) || [];
            orders_list = orders_list.filter((v) => v.symbol === symbol) || [];
            if (open_positions.length > 0) {
                open_positions[0].t = orders_list[0].t;
            }
            if (url) {
                fetch(url, options)
                    .then(res => res.json())
                    .then((res) => {
                        // console.log(res); 
                        return res;
                    })
                    .then((res) => this.get_next_page(symbol, url, delay, res, options))
                    .then((res) => { res.symbol = symbol; return res; })
                    .then((res) => {
                        if (!res.bars[symbol]) {
                            console.error(JSON.stringify(res));
                            res.bars = { [symbol]: [{ o: 0, c: 0 }] };
                        }
                        return res;
                    })
                    .then((res) => res.bars[symbol] || [])
                    .then((res) => this.addMetaData(res))
                    // .then((res) => this.convertToPercent(symbol, res))
                    // .then((res) => timeframe === '1Min' ? this.addMissingData(res, s, end) : res)
                    // .then((res) => this.addBollingerBands('bands_c', res, isCrypto ? 50 : 28, isCrypto ? 1.0 : 0.7))
                    .then((res) => this.addIMI(res, 14))
                    .then((res) => this.addBollingerBands('bands_c', res, isCrypto ? 28 : 14, 0.7, 1.0)) //TODO: get from config
                    .then((res) => this.addTrendlines(res))
                    .then((res) => this.addWeightedRollingAverage(res))
                    .then((res) => this.refactor(symbol, res))
                    .then((res) => this.analyze(symbol, res))
                    .then((res) => this.summarize(res))
                    .then((res) => this.levels(res))
                    .then((res) => this.trendline(res))
                    .then((res) => this.score(res))
                    .then((res) => this.positions(symbol, open_positions, res))
                    .then((res) => this.orders(symbol, orders_list, res))
                    .then((res) => add30 ? this.add30Min(res, end) : res)
                    .then((res) => this.add_bars_2(res))
                    .then((res) => isCrypto ? res : this.add_latest_bar(res))
                    .then((res) => resolve(res));
            } else {
                resolve(null);
            }
        });
    }
    async bars_simplified(symbols, timeframe = '1D', start = this.START_OF_YEAR, end = new Date().toISOString()) {
        return new Promise(async (resolve) => {
            const promises = symbols.map((s) => this.bars_m3(s, timeframe, start, end, [], [], false, 100, false));
            const results = await Promise.all(promises);
            const obj = [];
            results.forEach((res) => {
                res.open = res.bars[0].o;
                if (res && res.bars && res.bars.length > 0) {
                    // const months = res.bars_1K.filter((v)=>v.t.indexOf('-01') > 0);
                    let prev = -1;
                    const months = [];
                    res.bars_1K.forEach((v, i) => {
                        const m = new Date(v.t).getMonth();
                        if (m !== prev || i === res.bars_1K.length - 1) {
                            v.d = i > 0 ? v.c - months[months.length - 1].c : v.c;
                            // months.push(v);
                            months.push({
                                e: v.e,
                                t: v.t,
                                d: round2(v.d),
                                c: round2(v.c),
                            });
                            prev = m;
                        }
                    });
                    //* DAYS
                    prev = -1;
                    const days = [];
                    res.bars_1K.forEach((v, i) => {
                        const d = new Date(v.t).getDate();
                        if (d !== prev || i === res.bars_1K.length - 1) {
                            v.d = i > 0 ? v.c - days[days.length - 1].c : v.c;
                            days.push({
                                t: v.t,
                                d: round2(v.d),
                                c: round2(v.c),
                                o: round2(v.o),
                                l: round2(v.l),
                                h: round2(v.h),
                                e: v.e,
                            });
                            prev = d;
                        }
                    });

                    const qty = round5(1000 / res.open);
                    if (res.latest_raw) {
                        res.latest = deepClone(res.latest_raw);
                        res.latest.o = round2((res.latest.o * qty) - 1000);
                        res.latest.h = round2((res.latest.h * qty) - 1000);
                        res.latest.l = round2((res.latest.l * qty) - 1000);
                        res.latest.c = round2((res.latest.c * qty) - 1000);
                    } else {
                        res.latest_raw = null;
                        res.latest = null;
                    }
                    obj.push({
                        symbol: res.symbol,
                        threshold_half_pct: (1000 * 0.005) * (res.bars.length - 1),
                        threshold_one_pct: (1000 * 0.01) * (res.bars.length - 1),
                        days,
                        days_total: round2(days.map((v) => v.d).reduce((p, c) => p + c)),
                        days_last: round2(days[days.length - 1].d),
                        days_min: round2(Math.min(...days.map((v) => v.d))),
                        days_max: round2(Math.max(...days.map((v) => v.d))),
                        days_avg: round2(days.map((v) => v.d).reduce((p, c) => p + c) / days.length),
                        months,
                        months_total: round2(months.map((v) => v.d).reduce((p, c) => p + c)),
                        months_last: round2(months[months.length - 1].d),
                        months_min: round2(Math.min(...months.map((v) => v.d))),
                        months_max: round2(Math.max(...months.map((v) => v.d))),
                        months_avg: round2(months.map((v) => v.d).reduce((p, c) => p + c) / months.length),
                        bars_raw: res.bars,
                        bars: res.bars_1K,
                        latest_raw: res.latest_raw,
                        latest: res.latest,
                        open: res.open,
                        qty,
                    });
                }
            });

            const summary_days = {};
            const summary = {};
            obj.forEach((v) => {
                v.months.forEach((m, i) => {
                    const k = m.t.split('T')[0];
                    if (!summary[k]) {
                        summary[k] = 0;
                    }
                    summary[k] += round3(m.d);
                });
                v.days.forEach((d, i) => {
                    const k = d.t.split('T')[0];
                    if (!summary_days[k]) {
                        summary_days[k] = 0;
                    }
                    summary_days[k] += round3(d.d);
                });

            });
            Object.entries(summary).map((v) => summary[v[0]] = round2(v[1]));
            Object.entries(summary_days).map((v) => summary_days[v[0]] = round2(v[1]));

            const t = round2(Object.values(summary).reduce((p, c) => p + c, 0));
            const a = round2(t / Object.values(summary).length);
            const result = {
                total: t,
                average: a,
                days_last: round2(Object.values(summary_days)[Object.values(summary_days).length - 1]),
                days_avg: round2(obj.map((v) => v.days_avg).reduce((p, c) => p + c)),
                days: summary_days,
                months_last: round2(Object.values(summary)[Object.values(summary).length - 1]),
                months_avg: round2(obj.map((v) => v.months_avg).reduce((p, c) => p + c)),
                months: summary,
                symbols: obj,
            };
            // console.log(result);
            // console.log('results');
            // console.log(obj);
            // console.log(summary);
            // console.log('total', round2(t));
            // console.log('average', round2(a));

            resolve(result);
        })
    }
    async bars_raw(symbol, timeframe = '1D', start = this.START_OF_YEAR, end = new Date().toISOString()) {
        return new Promise(async (resolve) => {
            // await sleep(delay);

            const s = symbol.replace('/', '%2F');
            // const feed = 'iex'; //! DO NOT USE IEX FOR ALPACA - LIMITED DATA

            let options = { method: 'GET', headers: { accept: 'application/json' } };
            let url = `${this.baseUrl}/v1beta3/crypto/us/bars?symbols=${s}&timeframe=${timeframe}&start=${start}&end=${end}&feed=${this.FEED}&limit=5000&sort=asc`

            const isCrypto = s.endsWith('USD');
            if (isCrypto === false) {
                options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        'APCA-API-KEY-ID': this.ALPACA_KEY || KEY,
                        'APCA-API-SECRET-KEY': this.ALPACA_SECRET || SECRET
                    }
                };

                let isOpen = true; //market_calendar.findIndex((v) => v.date === start.substring(0, 10)) >= 0;
                const d = new Date();
                const hm = +((d.getHours() * 100) + +(d.getMinutes().toString().padStart(2, '0')));
                isOpen = isOpen ? (start.substring(0, 10) === getTodayLocal() ? hm > 930 : isOpen) : isOpen;
                url = isOpen ? `${this.baseUrl}/v2/stocks/bars?symbols=${s}&start=${start}&end=${end}&timeframe=${timeframe}&limit=5000&adjustment=raw&feed=${this.FEED}&sort=asc` : null;
            }

            if (url) {
                fetch(url, options)
                    .then(res => res.json())
                    .then((res) => {
                        // console.log(res); 
                        return res;
                    })
                    .then((res) => this.get_next_page(symbol, url, 0, res, options))
                    .then((res) => { res.symbol = symbol; return res; })
                    .then((res) => {
                        if (!res.bars[symbol]) {
                            console.error(JSON.stringify(res));
                            res.bars = { [symbol]: [{ o: 0, c: 0 }] };
                        }
                        return res;
                    })
                    .then((res) => { res.bars = res.bars[symbol] || []; return res })
                    // .then((res) => this.addMetaData(res.bars))
                    // .then((res) => timeframe === '1Min' ? this.addMissingData(res, s, end) : res)
                    // .then((res) => this.addIMI(res, 14))
                    // .then((res) => this.addBollingerBands('bands_c', res, isCrypto ? 28 : 14, 0.7, 1.0)) //TODO: get from config
                    // .then((res) => this.addTrendlines(res))
                    // .then((res) => this.addWeightedRollingAverage(res))
                    // .then((res) => this.refactor(symbol, res))
                    // .then((res) => this.analyze(symbol, res))
                    // .then((res) => this.summarize(res))
                    // .then((res) => this.levels(res))
                    // .then((res) => this.trendline(res))
                    // .then((res) => this.score(res))
                    // .then((res) => this.positions(symbol, open_positions, res))
                    // .then((res) => this.orders(symbol, orders_list, res))
                    // .then((res) => add30 ? this.add30Min(res, end) : res)
                    // .then((res) => this.add_bars_2(res))
                    .then((res) => { res.bars.forEach((v) => v.e = new Date(v.t).getTime()); return res; })
                    .then((res) => { res.bars.forEach((v) => v.tl = new Date(v.t).toLocaleString()); return res; })
                    .then((res) => {
                        console.log(res);
                        return res;
                    })
                    .then((res) => resolve(res));
            } else {
                resolve(null);
            }
        });
    }

    //@ ----------------------------
    //*@ CUSTOM ANALYSIS - 10 Min */
    //@ ----------------------------
    async bars_15(symbols, start, end) {
        return new Promise(async (resolve) => {
            const promises = symbols.map((s) => this.bars(s, '5Min', start, end, [], [], false, 100, false));
            const results = await Promise.all(promises);
            const obj = {};
            results.forEach((s) => {
                // const filtered = s.bars_1K.filter((v) => v.thm === 940 || v.thm === 1550);
                const filtered = s.bars_1K.filter((v) => v.thm === 1010 || v.thm === 1550);
                filtered.forEach((b, i) => {
                    // obj.push(i === 0 ? 0 : b.c - filtered[i - 1].c);
                    // b.delta = i === 0 ? 0 : b.c - filtered[i - 1].c; //! DAYS & NIGHTS
                    // b.delta = i === 0 ? 0 : (b.thm === 940 ? b.c - filtered[i - 1].c : 0); //! ONLY NIGHTS

                    if (i > 0) {
                        const delta = b.c - filtered[i - 1].c;
                        b.delta = b.thm === 1010 ? (isNaN(delta) ? 0 : delta) : 0 ; //! 16:00 -> 10:00
                    }
                })
                obj[s.symbol] = { sum: round2(filtered.map((v) => (isNaN(v.delta) ? 0 : v.delta)).reduce((p, c) => p + c)), filtered }
            })

            // Sum the elements at corresponding indices
            const combined = Object.values(obj).map((v) => v.filtered).filter((v) => v !== undefined).reduce((accumulator, currentArray) => {
                return currentArray.map((value, index) => {
                    // Add the current value to the accumulator's value at the same index
                    return (accumulator[index] || 0) + round2(value.delta);
                });
            }, []); // Initial value for the accumulator is an empty array []
            // console.log(combined);

            const entries = Object.entries(obj)[0][1].filtered.map((v) => { return { date: v.tl, gain: 0 } });
            entries.forEach((e) => {
                Object.values(obj).forEach((o) => {
                    const found = o.filtered.find((v) => v.tl === e.date);
                    e.gain += found ? round2(found.delta) : 0;
                })
            })
            console.log('entries | ', entries.filter((v) => v.date.indexOf('10:10') > 0).filter((v)=>isNaN(v.gain) === false).map((v) => v.gain).reduce((p, c) => p + c), entries.filter((v) => v.date.indexOf('10:10') > 0));
            console.log(`entries | ${symbols.length}K | ${entries.map((v) => v.gain).filter((v)=>isNaN(v) === false).reduce((p, c) => p + c).toLocaleString()}`, entries);


            obj['sum'] = round2(Object.values(obj).map((v) => v.sum).reduce((p, c) => p + c));
            obj['last'] = round2(Object.values(obj).map((v) => v.filtered).filter((v) => v !== undefined).map((v) => v[v.length - 2].delta).reduce((p, c) => p + c));
            obj['combined'] = {
                sum: round2(combined.reduce((p, c) => p + c)),
                per_day: round2(combined.reduce((p, c) => p + c)) / combined.filter((v) => v !== 0).length,
                data: combined.filter((v) => v !== 0).map((v) => round2(v))
            };
            console.yellow(obj);
            console.chart(combined.filter((v) => v !== 0).map((v) => round2(v)))
            resolve(obj);
            // resolve({ sum: obj.reduce((p, c) => p + c), obj, filtered });
            // results.forEach((res) => {
            // });
            // resolve(results.filter());
        });
    }

    //@ ----------------------------
    //*@ OVERNIGHT vs DAY */
    //@ ----------------------------
    async bars_comparison(symbols, start, end) {
        return new Promise(async (resolve) => {
            const promises = symbols.map((s) => this.bars(s, '5Min', start, end, [], [], false, 100, false));
            const results = await Promise.all(promises);
            const obj = {};
            results.forEach((s) => {
                // const filtered = s.bars_1K.filter((v) => v.thm === 940 || v.thm === 1550);
                const filtered = s.bars_1K.filter((v) => v.thm === 935 || v.thm === 1555);
                filtered.forEach((b, i) => {
                    // obj.push(i === 0 ? 0 : b.c - filtered[i - 1].c);
                    // b.delta = i === 0 ? 0 : b.c - filtered[i - 1].c; //! DAYS & NIGHTS
                    // b.delta = i === 0 ? 0 : (b.thm === 940 ? b.c - filtered[i - 1].c : 0); //! ONLY NIGHTS

                    if (i > 0) {
                        const delta = b.c - filtered[i - 1].c;
                        b.delta = b.thm === 935 ? (isNaN(delta) ? 0 : delta) : 0 ; //! 16:00 -> 10:00
                    }
                })
                obj[s.symbol] = { sum: round2(filtered.map((v) => (isNaN(v.delta) ? 0 : v.delta)).reduce((p, c) => p + c)), filtered }
            })

            // Sum the elements at corresponding indices
            const combined = Object.values(obj).map((v) => v.filtered).filter((v) => v !== undefined).reduce((accumulator, currentArray) => {
                return currentArray.map((value, index) => {
                    // Add the current value to the accumulator's value at the same index
                    return (accumulator[index] || 0) + round2(value.delta);
                });
            }, []); // Initial value for the accumulator is an empty array []
            // console.log(combined);

            const entries = Object.entries(obj)[0][1].filtered.map((v) => { return { date: v.tl, gain: 0 } });
            entries.forEach((e) => {
                Object.values(obj).forEach((o) => {
                    const found = o.filtered.find((v) => v.tl === e.date);
                    e.gain += found ? round2(found.delta) : 0;
                })
            })
            const t = '9:35';
            console.log('entries | ', entries.filter((v) => v.date.indexOf(t) > 0).filter((v)=>isNaN(v.gain) === false).map((v) => v.gain).reduce((p, c) => p + c), entries.filter((v) => v.date.indexOf(t) > 0));
            console.log(`entries | ${symbols.length}K | ${entries.map((v) => v.gain).filter((v)=>isNaN(v) === false).reduce((p, c) => p + c).toLocaleString()}`, entries);


            obj['sum'] = round2(Object.values(obj).map((v) => v.sum).reduce((p, c) => p + c));
            obj['last'] = round2(Object.values(obj).map((v) => v.filtered).filter((v) => v !== undefined).map((v) => v[v.length - 2].delta).reduce((p, c) => p + c));
            obj['combined'] = {
                sum: round2(combined.reduce((p, c) => p + c)),
                per_day: round2(combined.reduce((p, c) => p + c)) / combined.filter((v) => v !== 0).length,
                data: combined.filter((v) => v !== 0).map((v) => round2(v))
            };
            console.log('obj', obj);
            console.chart(combined.filter((v) => v !== 0).map((v) => round2(v)))
            resolve(obj);
            // resolve({ sum: obj.reduce((p, c) => p + c), obj, filtered });
            // results.forEach((res) => {
            // });
            // resolve(results.filter());
        });
    }

    async latest_bar(symbol) {
        return new Promise(async (resolve) => {
            // await sleep(delay);

            const s = symbol.replace('/', '%2F');

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY || KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET || SECRET
                }
            };
            let url = `${this.baseUrl}/v2/stocks/bars/latest?symbols=${s}&feed=${this.FEED}`

            if (url) {
                fetch(url, options)
                    .then(res => res.json())
                    .then((res) => {
                        // console.log(res); 
                        return res;
                    })
                    // .then((res) => this.get_next_page(symbol, url, 0, res, options))
                    .then((res) => res.bars[symbol])
                    .then((res) => {
                        res.e = new Date(res.t).getTime();
                        res.tl = new Date(res.t).toLocaleString();
                        res.thm = getHMM(res.tl);
                        return res;
                    })
                    .then((res) => resolve(res));
            } else {
                resolve(null);
            }
        });
    }
    clock() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                },
            }
            let url = `${this.buy_sell_root_url}/v2/clock`;
            fetch(url, options)
                .then(res => res.json())
                .then(res => { console.log('CLOCK', res); resolve(res.is_open) })
                .catch((err) => { console.error('error in clock()', err) });
        });
    }
    buy(symbol, spend = 1000) {
        return new Promise((resolve, reject) => {
            const payload = {
                side: 'buy',
                type: 'market',
                // time_in_force: symbol.endsWith('/USD') ? 'gtc' : 'day',
                time_in_force: symbol.endsWith('/USD') ? 'ioc' : 'day',
                symbol: symbol, //.replace('/', ''),
                // qty: qty.toString(), // /** quantity to buy */
                notional: round2(spend).toString() // /** dollar amount to buy */
            };
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                },
                body: JSON.stringify(payload),
            };
            let url = `${this.buy_sell_root_url}/v2/orders`;
            fetch(url, options)
                // fetch(url, options('POST', payload))
                .then(res => res.json())
                .then(res => { console.log('BUY', symbol, res); resolve(res) })
                .catch((err) => { console.error('error in buy()', err) });
        });
    }
    buy_symbols(symbols, spend = 1000) {
        return new Promise(async (resolve, reject) => {
            const obj = {};
            symbols = symbols.split(',');
            for await (const symbol of symbols) {
                const res = await this.buy(symbol, spend);
                obj[symbol] = res;
                console.log(`Bought ${symbol} for $${spend}`, res);
                await sleep(2000);
            }
            // console.log(obj);
            resolve(obj);
        });
    }
    sell_symbols(symbols) {
        return new Promise(async (resolve, reject) => {
            const obj = {}; v;
            symbols = symbols.split(',');
            for await (const symbol of symbols) {
                const res = await sell(symbol);
                obj[symbol] = res;
                console.log(`Sold ${symbol}`, res);
                await sleep(1000);
            }
            // console.log(obj);
            resolve(obj);
        });
    }
    sell(symbol) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                }
            };
            let url = `${this.buy_sell_root_url}/v2/positions/${symbol.replace('/', '')}?percentage=100`;
            fetch(url, options)
                .then(res => res.json())
                .then(res => { console.log('SELL', symbol, res); resolve(res); })
                .catch(err => console.error('error in sell()', err));
        });
    }
    liquidate() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                }
            };
            // https://paper-api.alpaca.markets/v2/positions
            let url = `${this.buy_sell_root_url}/v2/positions`;
            fetch(url, options)
                .then(res => res.json())
                .then(res => { console.log('LIQUIDATE', res); resolve(res); })
                .catch(err => console.error('error in liquidate()', err));
        });
    }
    get_positions() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                }
            };

            fetch(`${this.buy_sell_root_url}/v2/positions`, options)
                .then(res => res.json())
                // .then((res)=>{})
                .then(res => resolve(res))
                .catch(err => console.error('error in positions()', err));
        });
    }
    get_orders(status = 'all') {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                }
            };

            // orders().then((v)=>console.log(v.map((v2)=>{ return {symbol:v2.symbol, side: v2.side, price: v2.side === 'buy' ? -(+(v2.filled_avg_price*v2.filled_qty)) : +(v2.filled_avg_price*v2.filled_qty), stamp: new Date(v2.filled_at).toLocaleString()}}).map((v2)=>v2.price).reduce((p,c)=>p+c)))
            fetch(`${this.buy_sell_root_url}/v2/orders?status=all&limit=500&direction=desc`, options)
                // fetch(`${buy_sell_root_url}/v2/orders?status=${status}&limit=500`, options)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => console.error('error in orders()', err));
        });
    }
    get_account() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                }
            };

            fetch(`${this.buy_sell_root_url}/v2/account`, options)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => console.error('error in orders()', err));
        });
    }
    get_account_activities(size = 100) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                }
            };

            fetch(`${this.buy_sell_root_url}/v2/account/activities?category=non_trade_activity&direction=desc&page_size=${size}`, options)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => console.error(err));
        });
    }
    get_portfolio_history(period = '1W', start = null, end = null, timeframe = '1D', reporting = 'extended_hours', pnl_reset = 'per_day') {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                }
            };

            // let url = `${this.buy_sell_root_url}/v2/account/portfolio/history?period=${period}&timeframe=${timeframe}&intraday_reporting=${reporting}&pnl_reset=${pnl_reset}`
            let url = `${this.buy_sell_root_url}/v2/account/portfolio/history?`;
            url += period ? `period=${period}` : '';
            url += start ? `&start=${start}` : '';
            url += end ? `&end=${end}` : '';
            url += `&timeframe=${timeframe}`;
            url += `&intraday_reporting=${reporting}`;
            url += `&pnl_reset=${pnl_reset}`
            fetch(url, options)
                // fetch('https://paper-api.alpaca.markets/v2/account/portfolio/history?timeframe=1D&intraday_reporting=extended_hours&start=2025-10-01&pnl_reset=per_day', options)
                // fetch(`${this.buy_sell_root_url}/v2/account/portfolio/history?start=2025-08-01&end=2025-12-31&timeframe=1D&intraday_reporting=${reporting}&pnl_reset=${pnl_reset}`, options)
                .then(res => res.json())
                .then(res => {
                    const data = [];
                    res.timestamp.forEach((e, i) => {
                        const d = new Date(e * 1000);
                        data.push({
                            ymd: getYMD(d),
                            thm: getHMM(d),
                            equity: res.equity[i],
                            profit_loss: res.profit_loss[i],
                            tl: d.toLocaleString(),
                            t: d.toISOString(),
                            e: e * 1000,
                            // xy: { x: e * 1000, y: res.equity[i] },
                        })
                    })
                    resolve(data);
                })
                .catch(err => console.error(err));
        });
    }
    get_news(symbol, content = true) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'APCA-API-KEY-ID': this.ALPACA_KEY,
                    'APCA-API-SECRET-KEY': this.ALPACA_SECRET,
                }
            };

            fetch(`https://data.alpaca.markets/v1beta1/news?sort=desc&symbols=${symbol}&include_content=${content}`, options)
                .then(res => res.json())
                .then(res => {
                    resolve(res.news.map((v) => `${v.created_at} | ${v.headline} | ${v.url}`))
                })
                .catch(err => console.error(err));
        })
    }
}
