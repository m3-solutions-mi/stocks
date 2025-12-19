
//#----------------------------
//# TEST - TOP 25 EACH WEEK
//#----------------------------
async function run_top_25_each_week() {
    console.log('test start');

    //* filter the symbols list
    let symbols = stock_symbols_detail
        .filter((v) => v.tradable === true)
        .filter((v) => v.fractionable === true)
        .filter((v) => v.status === 'active')
        .filter((v) => v.symbol.indexOf('/') < 0)
        .map((v) => v.symbol)
        .sort()
        ;

    //* variables
    const tz = new Date(`2025-03-01T12:00:00`).getTimezoneOffset() / 60;
    const start = new Date(`2025-03-01T00:00:00-0${tz}:00`);
    const end = new Date(`${getYMD(new Date())}T23:59:59-0${tz}:00`);

    //* get all the symbols data
    const alpaca = new AlpacaData(
        localStorage.getItem('m3-stocks-key'),
        localStorage.getItem('m3-stocks-secret'),
        start.toISOString(),
        'W2'
    );
    const all = [];
    for (let i = 0; i <= symbols.length; i += 100) {
    // for (let i = 0; i <= 90; i += 100) {
        console.log(`Processing symbols from ${i}`);

        let promises = symbols.slice(i, i + 100).map((s, i) => {
            return alpaca.bars(s, '1D', start.toISOString(), end.toISOString(), [], []);
        });
        this.data = await Promise.all(promises);
        all.push(...this.data);

        // const result = await get_scores(symbols.slice(i, i + 100));
        // scores.push(...result);
        await sleep(1000);
    };

    const trades_by_symbol = all.map((s) => { return { [s.symbol]: s.trades.map((v) => { return { s: v.s, t: v.t2, g: round2(v.gain_1K) } }) } });
    console.log(trades_by_symbol);

    const obj = {};
    trades_by_symbol[0][Object.keys(trades_by_symbol[0])[0]]
        .map((v) => obj[v.t] = []);

    Object.keys(obj).forEach((s) => {
        trades_by_symbol.forEach((symbol_trades) => {
            const symbol = Object.keys(symbol_trades)[0];
            // const trade = symbol_trades[symbol].find((v) => v.t === s);
            // obj[s][symbol] = trade ? trade : { s: 'H', t: s, g: 0 };
            obj[s].push({ s: symbol, g: (symbol_trades[symbol].find((v) => v.t === s) || { s: 'H', t: s, g: 0 }).g });
        });
    });
    // sort
    Object.keys(obj).forEach((s) => {
        obj[s] = obj[s].sort((a, b) => a.g < b.g ? 1 : -1)
            .filter((v, i) => v.g < 100)
            .slice(0, 25);
    });
    Object.keys(obj).forEach((s) => {
        obj[s] = obj[s].sort((a, b) => a.s > b.s ? 1 : -1);
    });
    Object.keys(obj).forEach((s) => {
        // obj[s].push({ s, g: round2(obj[s].map((v) => v.g).reduce((p, c) => p + c)) });
        obj[s].push({ s: obj[s].slice(0, 25).map((v) => v.s).join(','), g: round2(obj[s].map((v) => v.g).reduce((p, c) => p + c)) });
    });
    console.log(obj);
    console.log(Object.values(obj).map((v) => v.slice(-1)));

    //* iterate the weeks and using the previous weeks top 10 as the symbols list
    const results = {};
    let i = 0;
    let total_t = 0;
    for await (const [k, v] of Object.entries(obj)) {
        // Object.entries(obj).forEach(([k, v], i) => {
        // console.log(`${i} - ${k}: ${v.map((x)=>x.s).join(',')} | Total: ${round2(v[v.length-1].g)}`);
        let total = 0;
        if (i > 0) {
            console.log(`${k} Top 25 Symbols: ${v.map((x) => x.s).join(',')}`);

            const symbols_for_week = Object.entries(obj)[i - 1][1].map((v) => v.s).slice(0, 25);
            const promises = symbols_for_week.map((s) => { return alpaca.bars(s, '1D', start.toISOString(), `${k}T12:00:00Z`, [], []); })
            const d = await Promise.all(promises);

            total += round2(d.map((v) => { return v.trades[v.trades.length - 1].gain_1K }).reduce((p,c)=>p+c));
            total_t += total;
            console.log(d.map((v) => { return { s: v.symbol, g: round2(total) } }));
        }
        i++;
    };
    console.log('test end', total_t);
}