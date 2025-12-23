//#-------------------------------------------
//# SETUP & CONFIGUATION
//#-------------------------------------------
const config_stocks = new Config(
    localStorage.getItem('m3-stocks-key'),
    localStorage.getItem('m3-stocks-secret'),
    'stocks',
    [
        //# TOP LAST WEEK
        // ...('STRO,TLRY,CAPR,SMX,IRBT,WHLR,QCLS,WVE,IBIO,CNCK,TORO,ALMS,AEVA,NDLS,ZSPC,ASTS,CFLT,INDI,VERA,SNBR,KYMR,PRAX,SERV,WRAP,FCEL').split(','),
        // ...('AEVA,ALMS,ARWR,ASTS,BYND,CFLT,CNCK,FCEL,FOSL,IBIO,INDI,KRRO,KYMR,LUNG,NDLS,POET,PRAX,QCLS,SERV,SNBR,TORO,VERA,WRAP,WVE,ZSPC').split(','),
        // ...('AAOI,ABL,ACB,AFCG,AIRJ,ALEC,ATRA,AXTI,CADL,CCOI,EDAP,EHTH,EVCM,KLXE,KPTI,LOBO,MAXN,MIDD,OLMA,PAMT,RKLB,RNAC,RYM,SATS,SMTI').split(','),
        // ...('AMKR,ANGI,APLD,BIOA,CERS,CRMT,ENVB,EYPT,FULC,HIMX,KROS,LUNR,MSBI,MXL,NRIX,NXPI,OCUL,RKLB,SAIA,SATS,SFIX,SITM,SKYT,VERI,ZUMZ').split(','),

        // ...('ASO,CGNT,CNOB,DUOL,DXPE,EGHT,ESLT,FFIV,GBIO,LIND,LLYVA,LPLA,LYTS,MNRO,PGC,PPBT,RDWR,SIMO,SLDP,SNPS,SONO,UMBF,UNTY,ZION,ZVRA').split(','),//! < 50
        // ...('ADBE,AMPL,ASTI,BBGI,CONL,DASH,FIVE,GEMI,HELE,ICHR,JBHT,KLIC,KRYS,LAES,MLTX,MNDY,MRNA,PSIX,PTEN,RUM,RZLT,SMCX,TXN,VELO,VIVS').split(','),//! < 100

        // @ PROD
        // ...('AMD,APH,APP,AVGO,CIFR,COIN,CRDO,GEV,GOOGL,HOOD,HUT,INDV,IREN,KOPN,LEU,OKLO').split(','),
        // ...('OPEN,PLTR,PSIX,QUBT,RING,RKLB,SHOP,SMCI,SNDK,SOFI,TMC,TSEM,TTMI,UUUU').split(','),

        //@ STEADY PICKS
        // ...('AEIS,ALNT,AMKR,APYX,ARWR,ATRO,AVDL,AVGO,AVTX,BBIO,BELFB,BIB,BTSG,CECO,CENX,CHRW,CLLS,CMPR,CMPX,CRDO,CRVS,CTRN,DHC,ERAS,ESPR,EXPE,EYPT').split(','),
        // ...('FDMT,FIVE,FROG,FSLR,GCT,GEV,GLUE,GOOGL,GSAT,IDYA,IESC,INDV,INSM,IONS,IRMD,IRON,KALU,KLAC,KNSA,KOD').split(','),
        // ...('LASR,LAUR,LGND,LITE,LMND,LRCX,MAMA,MDB,MGIC,MKSI,MU,MVBF,MYRG,NEM,NESR,ORKA,PHAT,PPTA,PSMT,PTGX,REAL,RING,RLAY,ROIV,RPTX').split(','),
        // ...('SANM,SEPN,SITM,SMTC,SVRA,TBPH,TER,TIGO,TRVI,TSEM,TTMI,TYRA,UPB,VRDN,VSAT,WDC,XMTR,ZBIO,ZUMZ,ZYME').split(','),

        //@ STEADY PICKS - TOP 10
        // ...('KOD,ARWR,SEPN,LITE,LASR,ZBIO,UPB,PHAT,GLUE,WDC').split(','),

        //@ STEADY PICKS - TOP 25
        ...('KOD,ARWR,SEPN,LITE,LASR,ZBIO,UPB,PHAT,GLUE,WDC,CLLS,CRDO,APYX,VSAT,INDV,EYPT,RLAY,ESPR,FDMT,CMPX,ERAS,ORKA,AVTX,TTMI,TSEM').split(','),


        //@ STEADY PICKS - TOP 30
        // ...('KOD,ARWR,SEPN,LITE,LASR,ZBIO,UPB,PHAT,GLUE,WDC,CLLS,CRDO,APYX,VSAT,INDV,EYPT,RLAY,ESPR,FDMT,CMPX,ERAS,ORKA,AVTX,TTMI,TSEM,GSAT,GCT,LMND,AVDL,REAL').split(','),

        //* TOPS - ALGO
        // ...('SMX,ZYXI,AMBR,ZJK,QNTM,SYM,CSTE,BLFY,INV,ARWR,KALA,CGEM,IBG,LYEL,TLSI,ESPR,HCAT,OLMA,CTXR,JACK,PACB,JYD,SPRY,FOSL,TYRA').split(','),

        //* TOP 15 - LAST 3 WEEKS
        // ...('TMC,TSEM,RKLB,APP,GEV,HUT,TTMI,PSIX,CIFR,KOPN,SNDK,OKLO,QUBT,CRDO,HOOD').split(','),
    ].filter((v, i, a) => i === a.indexOf(v)).sort(),
    1000,
    // '2025-03-15T00:00:00', // start
    '2025-04-01T00:00:00', // start
    // '2025-12-07T00:00:00' // end
    // '2025-12-14T00:00:00' // end
);

let alpaca = new AlpacaData(
    localStorage.getItem('m3-stocks-key'),
    localStorage.getItem('m3-stocks-secret'),
    new Date(config_stocks.start_at).toISOString(),
    'W2'
);

// const config_symbol = new Config(
//     localStorage.getItem('m3-stocks-key'),
//     localStorage.getItem('m3-stocks-secret'),
//     'stocks',
//     [
//         ...('AMD,APH,APP,AVGO,CIFR,COIN,CRDO,GEV,GOOGL,HOOD,HUT,INDV,IREN,KOPN,LEU,OKLO').split(','),
//     ].filter((v, i, a) => i === a.indexOf(v)).sort(),
//     1000,
//     '2025-03-15T00:00:00',
//     // '2025-12-07T00:00:00'
// );

//#-------------------------------------------
//# APPLICATION VARIABLES
//#-------------------------------------------
let init = false;
let show_positions = true;
let treemap_symbols = new Treemap('#chart');
let treemap_months = new Treemap('#chart2');
let line_combined = new Treemap('#chart3');
let treemap_last_symbols = new Treemap('#chart5');
let treemap_last_symbols_mobile = new Treemap('#mobile-chart5');
let treemap_recent_weeks = new Treemap('#chart6');
let line_combined_last_n = new Treemap('#chart7');
let treemap_symbol_days = new Treemap('#chart8');
let line_combined_current_mobile = new Treemap('#mobile-chart9');
let line_combined_current = new Treemap('#chart9');
let data = null;
let num_symbol_days = -15;
let picks = (localStorage.getItem('m3-stocks-picks') || '').split(',');
let likes = (localStorage.getItem('m3-stocks-likes') || '').split(',');
let steady = (localStorage.getItem('m3-stocks-steady') || '').split(',');
// config_stocks.symbols = likes; //@ enable to change to symbols from 'likes'


//#-------------------------------------------
//# UPDATE CHART [METHOD]
//#-------------------------------------------
const update_ui = (chart) => {
    values = data.map((v) => v.y);
    chart.options.plotOptions.treemap.colorScale.ranges[1].to = Math.max(...values);
    chart.options.plotOptions.treemap.colorScale.ranges[0].from = Math.min(...values);
    chart.render(data);
}

//#-------------------------------------------
//# UPDATE CHARTS - CHARTS AND TITLES
//#-------------------------------------------
const update_charts = (config = config_stocks) => {

    // console.log(config_stocks);

    //#-------------------------------------------
    //# SYMBOLS CHART & TITLE [LEFT]
    //#-------------------------------------------
    data = config.data.map((v) => { return { x: v.symbol, y: round2(v.summary.total) } });
    data = data.sort((a, b) => a.y < b.y ? 1 : -1);
    //! console.log(data.slice(0, 30).map((v) => v.x).join(','));
    update_ui(treemap_symbols);
    let total = round2(config.data.map((v) => round2(v.summary.total)).reduce((p, c) => p + c));
    document.getElementById('symbols-total').innerHTML = `${get_indicator(total)} ${round1(total / 1000).toLocaleString()}K`;
    document.getElementById('symbols-total-pct').innerHTML = `${round1(total / (data.length * 1000) * 100).toLocaleString()}%`;

    //#-------------------------------------------
    //# MONTHS CHART & TITLE [LEFT]
    //#-------------------------------------------
    const summarize_by = 'months';
    const months = config.data.map((v) => Object.keys(v.summary[summarize_by])).reduce((p, c) => [...p, ...c]).filter((v, i, a) => i == a.indexOf(v));
    const total_months = {};
    months.forEach((m) => {
        total_months[m] = 0;
        config.data.forEach((s) => {
            total_months[m] += s.summary.months[m] || 0;
        })
    })
    // , round(total_months[k])]
    // data = Object.keys(total_months).map((k) => { return { x: [k.split('_')[2], `${round1(total_months[k] / 1000)} K`], y: round(total_months[k]) } });
    data = Object.keys(total_months).map((k) => { return { x: k.split('_')[2], y: round(total_months[k]) } });
    total = round(config.data.map((v) => round2(v.summary.total)).reduce((p, c) => p + c) / data.length);
    treemap_months.options.chart.type = 'bar';
    treemap_months.options.chart.sparkline = { enabled: true };
    treemap_months.options.dataLabels.offsetY = -30;
    treemap_months.options.dataLabels.style = { fontSize: '18px', colors: ["#304758"] };
    treemap_months.options.dataLabels.formatter = function (val) { return round1(val / 1000); };
    treemap_months.options.annotations = { yaxis: [{ y: total, borderColor: colors.black, fillColor: colors.black, opacity: 1 }] };
    update_ui(treemap_months);
    document.getElementById('months-average').innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}`;
    document.getElementById('months-average-pct').innerHTML = `${round1(total / (config.symbols.length * 1000) * 100).toLocaleString()}%`;

    //#-------------------------------------------
    //# SYMBOLS COMBINED [LEFT]
    //#-------------------------------------------
    let series = { name: 'Close', type: 'line', data: [] };
    config.data.map((s) => s.bars).forEach((b) => {
        b.forEach((v, i) => {
            if (!series.data[i]) {
                series.data.push({ x: v.e, y: 0 });
            }
            series.data[i].y += round((v.c - b[0].o) * (1000 / b[0].o));
        })
    })
    line_combined.options.chart.type = 'area';
    line_combined.options.chart.sparkline = { enabled: true };
    line_combined.options.dataLabels.enabled = false;
    line_combined.options.fill = { type: 'solid' };
    line_combined.options.xaxis = { type: 'datetime' };
    line_combined.options.annotations = { points: [] };
    let last_w = getMonthName(new Date(series.data[0].x));
    series.data.forEach((v, i) => {
        const w = getMonthName(new Date(v.x));
        if (w !== last_w) {
            line_combined.options.annotations.points.push({ x: v.x, y: v.y, borderColor: colors.black, fillColor: colors.black, _opacity: 1 });
        }
        last_w = w;
    })
    data = series.data;
    update_ui(line_combined);
    total = round(data[data.length - 1].y);
    document.getElementById('symbols-combined').innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}`;
    document.getElementById('symbols-combined-pct').innerHTML = `${round1(total / (config.symbols.length * 1000) * 100).toLocaleString()}%`;

    //#------------------------------------------------------
    //# CURRENT POSITIONS | BANNER | CHART | TITLE [RIGHT]
    //#------------------------------------------------------
    data = show_positions
        ? config.data.map((v) => { return { x: v.symbol, y: round(v.position ? v.position.gain : 0) } })
        : config.data.map((v) => { return { x: v.symbol, y: round(v.trades[v.trades.length - 1].gain_1K) } });
    data = data.sort((a, b) => a.y < b.y ? 1 : -1);
    treemap_last_symbols.options.dataLabels.formatter = function (text, op) {
        return [text, op.value]
    };
    update_ui(treemap_last_symbols);
    treemap_last_symbols_mobile.options.chart.height = 220;
    update_ui(treemap_last_symbols_mobile);

    //* last total
    total = round2(data.map((v) => v.y).reduce((p, c) => p + c));
    let elem = document.getElementById('last-total');
    elem.innerHTML = `${get_indicator(total)} ${Math.abs(round(total)).toLocaleString()}&nbsp;`;
    total < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');

    //* last pct
    const percent = round1(total / (data.length * 1000) * 100);
    elem = document.getElementById('last-pct');
    elem.innerHTML = `${percent.toLocaleString()}%`;
    total < 0 ? elem.classList.replace('w3-text-green', 'w3-text-red') : elem.classList.replace('w3-text-red', 'w3-text-green');

    //* seed money
    elem = document.getElementById('last-seed');
    elem.innerHTML = `[${round1(data.length).toLocaleString()}K]`;

    //@ mobile banner
    let color = total >= 0 ? 'green' : 'red';
    document.getElementById('mobile-banner').innerHTML = `
        <span class="w3-center w3-padding w3-${color}"
        style="font-size:72px;letter-spacing:8px;">
            <b>${get_indicator(total)}${Math.abs(round(total)).toLocaleString()}</b>
        </span> 
        <span class="w3-xxxlarge w3-text-${color}" style='letter-spacing:4px;'><b>${percent.toLocaleString()}%</b></span>
    `;

    //* browser tab title
    document.title = `M3 Stocks | $${round(total).toLocaleString()}`;

    //#-------------------------------------------
    //# LAST N WEEKS CHART & TITLE [RIGHT]
    //#-------------------------------------------
    let recent_weeks = config.data.map((v) => v.trades.slice(-3));
    // let recent_values = reduceArray(config.data.map((v) => v.trades.slice(-3).map((v2) => v2).map((v2) => v2.gain_1K)), 0);
    let recent_values = config.data.map((v) => v.trades.slice(-3).map((v2) => v2).map((v2) => v2.gain_1K).reduce((p, c) => p + c));
    data = recent_weeks.map((v, i) => { return { x: config.data[i].symbol, y: round(recent_values[i]) } });
    data = data.sort((a, b) => a.y < b.y ? 1 : -1);
    treemap_recent_weeks.options.dataLabels.formatter = function (text, op) {
        return [text, op.value]
    };
    update_ui(treemap_recent_weeks);

    total = round2(data.map((v) => v.y).reduce((p, c) => p + c));

    //#-------------------------------------------
    //# SYMBOLS COMBINED LAST N CHART [RIGHT]
    //#-------------------------------------------
    series = { name: 'Close', type: 'line', data: [] };
    config.data.map((s) => s.bars).forEach((b) => {
        b.slice(-15).forEach((v, i) => {
            if (!series.data[i]) {
                series.data.push({ x: v.e, y: 0 });
            }
            series.data[i].y += round((v.c - b[0].o) * (1000 / b[0].o));
        })
    })
    line_combined_last_n.options.chart.type = 'area';
    line_combined_last_n.options.chart.sparkline = { enabled: true };
    line_combined_last_n.options.dataLabels.enabled = false;
    line_combined_last_n.options.fill = { type: 'solid' };
    line_combined_last_n.options.xaxis = { type: 'datetime' };
    line_combined_last_n.options.annotations = { points: [] };
    last_w = getWeekName(new Date(series.data[0].x));
    series.data.forEach((v, i) => {
        const w = getWeekName(new Date(v.x));
        if (w !== last_w) {
            // line_combined_last_n.options.annotations.xaxis.push({ x: v.x, borderColor: colors.black, fillColor:colors.black, opacity: 1 });
            line_combined_last_n.options.annotations.points.push({ x: v.x, y: v.y, marker: { radius: 5, fillColor: '#7fff00' } });
        }
        last_w = w;
    })
    data = series.data;
    update_ui(line_combined_last_n);
    line_combined_current.options = deepClone(line_combined_last_n.options);
    line_combined_current.options.chart.height = 250;
    // update_ui(line_combined_current);
    // console.table(data);

    //#-------------------------------------------
    //# Recent Mobile Chart 
    //#-------------------------------------------
    const combine_data = (symbols) => {

        const result = [];
        const xy = (x, y) => { return { x: x, y: y } };
        const push = (x, y) => { result.push(xy(x, y)); }
        const annotations = [];

        const epochs = symbols.map((b) => b.map((v) => v.e)).flat().filter((v, i, a) => i === a.indexOf(v)).sort((a, b) => a - b);
        let e = Math.min(...epochs);
        const e2 = Math.max(...epochs);
        epochs.forEach((ee) => {
            const m = new Date(ee).getMonth() - 2;
            const seed_base = 25 * 1000;
            const add_per_month = 0 * 1000;
            // const seed = (25*1000) + (m * 1000);
            const seed = (seed_base) + (m * add_per_month);
            let y = 0;
            symbols.forEach((b, i) => {
                // b = b.slice(13);
                const entry = b.find((vv) => vv.e === ee);
                const o = b[0].o;
                y += entry ? ((entry.c - o) * ((seed / symbols.length) / o)) : 0;

                if ((i === (symbols.length - 1) && entry) && (entry.thm === 930 || entry.thm === 1600)) {
                    annotations.push({ x: entry.e, y, marker: { size: 4.5, fillColor: entry.thm === 930 ? colors.orange : colors.black } });
                }
            });

            push(ee, round(y));
        });
        annotations.push({ x: result[result.length - 1].x, y: result[result.length - 1].y, marker: { size: 6, fillColor: colors.deeppink } });
        return { data: result, annotations };
    };

    //# get combined data
    // let combined = combine_data([config.data[12].bars]);
    // let combined = combine_data(config.data.slice(12,13).map((s) => s.bars)); //* KOD
    let combined = combine_data(config.data.map((s) => s.bars));
    // let combined = combine_data(config.data.map((s) => s.recent.bars));
    // let combined = combine_data(config.data.map((s) => s.bars.filter((b) => new Date(b.e).getMonth() === new Date().getMonth())));

    series = { name: 'Close', type: 'area', data: [] };
    line_combined_current_mobile.options.chart.type = 'area';
    line_combined_current_mobile.options.chart.height = 500;
    line_combined_current_mobile.options.chart.sparkline = { enabled: true };
    line_combined_current_mobile.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
    line_combined_current_mobile.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
    // line_combined_current_mobile.options.tooltip.y.formatter = function (value) { return value.toLocaleString(); };
    line_combined_current_mobile.options.dataLabels.enabled = false;
    line_combined_current_mobile.options.fill = { type: 'solid' };
    line_combined_current_mobile.options.xaxis = { type: 'datetime' };
    line_combined_current_mobile.options.annotations = { points: combined.annotations };

    annotations_x = [];
    let last = 0;
    let m = getMonthName(new Date(combined.data[0].x));
    combined.data.forEach((v, i) => {
        const cm = getMonthName(new Date(v.x));

        if (cm !== m /*|| i === combined.data.length - 1*/) {
            const diff = round1((v.y - last) / 1000);
            last = v.y;
            annotations_x.push({ x: v.x, y: v.y, label: { text: diff, style: { fontSize: '22px' } }, marker: { size: 4.5, fillColor: colors.black } });
            m = cm;
        }
    });
    line_combined_current_mobile.options.annotations.points = [...annotations_x,...line_combined_current_mobile.options.annotations.points];

    data = combined.data;
    update_ui(line_combined_current_mobile);
    line_combined_current.options = deepClone(line_combined_current_mobile.options);
    update_ui(line_combined_current);
    total = round1(data[data.length - 1].y / 1000);
    color = total >= 0 ? 'green' : 'red';
    elem = document.getElementById('this-week');
    elem.style.backgroundColor = colors[color];
    elem.innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}K`;


    const points = line_combined_current_mobile.options.annotations.points;
    const last_window = points[points.length - 1].y - points[points.length - 2].y;
    document.getElementById('last_dollars').innerHTML = `${get_indicator(last_window)} $${round1(last_window).toLocaleString()}`;

    // -------------------------------------------
    // series = { name: 'Close', type: 'area', data: [] };
    // const xy = (x, y) => { return { x: x, y: y } };
    // const push = (x, y) => { series.data.push(xy(x, y)); }
    // const annotations = [];
    // // let e = new Date(config.data[0].recent.bars[0].t).getTime();
    // let e = Math.min(...config.data.map((s) => s.recent.bars[0].e));
    // const e2 = Math.max(...config.data.map((s) => s.recent.bars[s.recent.bars.length - 1].e));
    // let y = 0;
    // while (e <= e2) {
    //     config.data.map((s) => s.recent.bars).forEach((b, i) => {
    //         const entry = b.find((vv) => vv.e === e);
    //         y += entry ? ((entry.c - entry.o) * (1000 / entry.o)) : 0;

    //         if ((i === (config.data.map((s) => s.recent.bars).length - 1) && entry) && (entry.thm === 930 || entry.thm === 1600)) {
    //             annotations.push({ x: entry.e, y, marker: { size: 4.5, fillColor: entry.thm === 930 ? colors.orange : colors.black } });
    //         }
    //     });

    //     push(e, round(y));
    //     e += (5 * 60 * 1000); //* 5 minutes;
    // }

    // line_combined_current_mobile.options.chart.type = 'area';
    // line_combined_current_mobile.options.chart.sparkline = { enabled: true };
    // line_combined_current_mobile.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
    // line_combined_current_mobile.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
    // line_combined_current_mobile.options.dataLabels.enabled = false;
    // line_combined_current_mobile.options.fill = { type: 'solid' };
    // line_combined_current_mobile.options.xaxis = { type: 'datetime' };
    // line_combined_current_mobile.options.annotations = { points: annotations };
    // annotations.push({ x: series.data[series.data.length - 1].x, y: series.data[series.data.length - 1].y, marker: { size: 6, fillColor: colors.deeppink } });
    // data = series.data;
    // update_ui(line_combined_current_mobile);
    // line_combined_current.options = deepClone(line_combined_current_mobile.options);
    // update_ui(line_combined_current);
    // total = round(data[data.length - 1].y);
    // color = total >= 0 ? 'green' : 'red';
    // elem = document.getElementById('this-week');
    // elem.style.backgroundColor = colors[color];
    // elem.innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}K`;
    // -------------------------------------------



    //#-------------------------------------------
    //# Symbols List 
    //#-------------------------------------------
    const template = `<span class="w3-tag w3-round w3-padding w3-{c}" style="cursor:pointer;min-width:85px;margin-bottom:5px;" onclick="{f}('{s}')">{0}<br/>{1}</span>`
    let html = '';
    config.symbols.forEach((s) => {
        const entry = config.data.find((v) => v.symbol === s)
        const g = entry.position ? entry.position.gain : entry.trades[entry.trades.length - 1].gain_1K;
        const color = g >= 0 ? 'green' : 'red';

        const own = config_stocks.data.find((v) => v.symbol === s).own;
        const indicator = own < 0 ? get_indicator(own, own >= 0, colors.aqua) : '';
        html += template.replace('{c}', color).replace('{0}', `${indicator}${s}`).replace('{1}', round(g)).replace('{s}', s).replace('{f}', 'click_symbol') + '\n';
    })
    document.getElementById('symbol-boxes-stocks').innerHTML = html;
    // document.getElementById('symbol-names-input').style.display = 'none';
    document.getElementById('symbol-names').value = config.symbols.join(',');

    //#-------------------------------------------
    //# All Symbols by Letter
    //#-------------------------------------------
    html = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter) => {
        html += template.replace('{c}', 'white').replace('{0}', letter).replace('{1}', '').replace('{s}', letter).replace('{f}', 'click_letter') + '\n';
    });
    document.getElementById('letters').innerHTML = html;
}

//#-------------------------------------------
//# UPDATE EACH MINUTE
//#-------------------------------------------
update_data = (config) => {
    config.get_data().then((c) => {
        console.log(c);
        update_charts();
    });
}
setInterval(async () => {
    const d = new Date()
    document.getElementById('mobile-clock').innerHTML = d.toLocaleTimeString();
    document.getElementById('clock').innerHTML = d.toLocaleTimeString();//.split(' ')[0];
    document.getElementById('date').innerHTML = getYMD(d);
    if (!init || d.getSeconds() === 1) {
        init = true;
        update_data(config_stocks);
        // config_stocks.get_data().then((c) => {
        //     update_charts();
        // });
        // config_symbol.get_data().then((c) => {
        //     update_charts(config_symbol);
        // });
    };
}, 1000);
toggleSymbolDayChart();

//@---------------------------------------------------------------------------------------------------------------------------------
//@ -----------------------------------------              UI Event Handlers               -----------------------------------------
//@---------------------------------------------------------------------------------------------------------------------------------

//#----------------------------
//# click config
//#----------------------------
function click_config(name) {
    console.log(name);
    ['stocks', 'trend', 'symbols'].forEach((v) => {
        document.getElementById(`symbol-boxes-${v}`).style.display = 'none'
    });
    document.getElementById(`symbol-boxes-${name}`).style.display = 'block'
}

//#----------------------------
//# set number of days
//#----------------------------
function set_num_days(checked) {
    num_symbol_days = checked ? -15 : 15;
    // console.log(num_symbol_days);
}

//#----------------------------
//# click letter
//#----------------------------
function click_letter(letter) {
    // console.log(letter);
    const filtered = stock_symbols_detail.filter((v) => v.symbol.startsWith(letter));
    const template = `<span class="symbol w3-tag w3-round w3-padding w3-white" style="border:{b};cursor:pointer;min-width:85px;margin-bottom:5px;" onclick="click_symbol('{s}', this)">{0}</span>`
    let html = '';
    // const likes = ['AEIS','KLAC','MCHP','MXIM','ON','QCOM','SWKS','TXN','VERA','VRDN','ESPR','HUBG','LITE','SRDX','GLUE','IRON','IAC'];
    filtered.map((v) => v.symbol).sort().forEach((s) => {
        // .replace('{1}', s.name)
        html += template
            .replace('{0}', s)
            .replace('{s}', s)
            .replace('{b}',
                likes.indexOf(s) >= 0 ? '4px solid green' : (config_stocks.symbols.indexOf(s) > 0 ? '3px solid black' : '')) + '\n';
    });
    document.getElementById('symbols-for-letter').innerHTML = html;
    // ['stocks', 'trend', 'symbols'].forEach((v) => {
    //     document.getElementById(`symbol-boxes-${v}`).style.display = 'none'
    // });
    // document.getElementById(`symbol-boxes-${name}`).style.display = 'block'
}


//#----------------------------
//# click symbol
//#----------------------------
async function click_symbol(s, elem) {
    // console.log(s, elem);
    if (elem) {
        Array.from(document.getElementsByClassName('symbol')).forEach((v) => v.classList.replace('w3-green', 'w3-white'));
        elem.classList.replace('w3-white', 'w3-green');
    }

    const tz = new Date(`2025-04-01T12:00:00`).getTimezoneOffset() / 60;
    const start = new Date(`2025-04-01T00:00:00-0${tz}:00`);
    const end = new Date(`${getYMD(new Date())}T23:59:59-0${tz}:00`);


    let series = [
        // { name: 'Close', _type: 'line', data: [] },
        { name: 'Close', _type: 'line', data: [] },
        { name: 'Open', type: 'line', color: colors.blue, data: [] },
        { name: 'Lower Bound', type: 'line', color: colors.red, data: [] },
    ];
    let entry = config_stocks.data.find((v) => v.symbol === s);
    if (!entry) {
        entry = await alpaca.bars(s, '1D', start.toISOString(), end.toISOString(), [], []);
    }
    // const bars = entry.bars.slice(num_symbol_days) || []; //* recent days
    const bars = (num_symbol_days === -15 ? entry.recent.bars : entry.bars/*.slice(num_symbol_days)*/) || []; //* recent 5 minute data
    series[0].data = bars.map((b) => { return { x: b.e, y: round2(b.c) } });
    if (num_symbol_days !== -15) {
        series[1].data = bars.map((b) => { return { x: b.e, y: round2(b.o) } });
        series[2].data = bars.map((b) => { return { x: b.e, y: round2(b.lb * (config_stocks.alpaca.CONFIG.stop_pct)) } });

        const tl = calculateTrendline(series[0].data.map((v) => v.y));
        series.push({ name: 'Trendline', type: 'line', color: colors.black, data: series[0].data.map((v, i) => { return { x: v.x, y: round2(tl.calculateY(i)) } }) });
    }

    // // const bars_full = entry.bars || [];
    // // const bars_recent = entry.recent.bars || [];
    // // const bars = num_symbol_days === -15 ? entry.recent.bars : entry.bars.slice(num_symbol_days - 15) || [];
    // const bars = (num_symbol_days === -15 ? entry.recent.bars : entry.bars.slice(num_symbol_days)) || [];
    // series[0].data = bars.map((b) => { return { x: b.e, y: round2(b.c) } });
    // series[1].data = bars.map((b) => { return { x: b.e, y: round2(b.o) } });
    // series[2].data = bars.map((b) => { return { x: b.e, y: round2(b.lb/* (config_stocks.alpaca.CONFIG.stop_pct)*/) } });
    // const tl = calculateTrendline(series[0].data.map((v) => v.y));
    // series.push({ name: 'Trendline', type: 'line', color: colors.black, data: series[0].data.map((v, i) => { return { x: v.x, y: round2(tl.calculateY(i)) } }) });
    // series.forEach((ser) => {
    //     ser.data = ser.data.slice(13);
    // });
    // series[2].data.forEach((v, i) => {
    //     const found = entry.bars.find((v2) => v2.e === v.x);
    //     if (found) {
    //         v.y = found.lb;
    //     }
    // });
    // // if (num_symbol_days === -15) {
    // //     series[2].data = series[2].data.slice(series[2].data.length - 15);
    // // } else {
    // //     // series[2].data = series[2].data.slice(-(series[0].data.length - 15));
    // // }


    treemap_symbol_days.options.chart.type = 'area';
    treemap_symbol_days.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
    treemap_symbol_days.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
    treemap_symbol_days.options.chart.sparkline = { enabled: true };
    treemap_symbol_days.options.dataLabels.enabled = false;
    treemap_symbol_days.options.fill = { type: 'solid' };
    treemap_symbol_days.options.xaxis = { type: 'datetime' };
    treemap_symbol_days.options.stroke = { width: [3, 4, 4, 4], };
    treemap_symbol_days.options.annotations = { xaxis: [], points: [] };
    last_w = getWeekName(new Date(series[0].data[0].x));
    series[0].data.forEach((v, i) => {
        const w = getWeekName(new Date(v.x));
        if (w !== last_w) {
            treemap_symbol_days.options.annotations.xaxis.push({ x: v.x, borderColor: colors.black, fillColor: colors.black, opacity: 1 });
            // line_combtreemap_symbol_daysined_last_n.options.annotations.points.push({ x: v.x, y: v.y, marker: { radius: 5, fillColor: '#7fff00' } });
        }
        last_w = w;

        if (bars[i].thm === 930 || bars[i].thm === 1600) {
            treemap_symbol_days.options.annotations.points.push({ x: v.x, y: v.y, marker: { size: 6, fillColor: colors.orange } });

            //* order
            // if (bars[i].thm === 930) {
            //     treemap_symbol_days.options.annotations.points.push({ x: v.x, y: entry.orders[0].filled_avg_price, marker: { size: 6, fillColor: colors.deeppink } });
            // }
        }
    })
    treemap_symbol_days.options.annotations.points.push({ x: series[0].data[series[0].data.length - 1].x, y: series[0].data[series[0].data.length - 1].y, marker: { size: 6, fillColor: colors.black } });

    // treemap_symbol_days.options.series[0].data = day_data;
    data = series;
    update_ui(treemap_symbol_days);

    const detail = stock_symbols_detail.find((v) => v.symbol === s);
    const g = round((series[0].data[series[0].data.length - 1].y - series[0].data[0].y) * (1000 / series[0].data[0].y));
    let html = '';
    html += `${get_indicator(g)} ${s}`;
    html += `${detail && detail.name ? (' | ' + detail.name) : ''}`;
    html += `&nbsp;&nbsp;|&nbsp;&nbsp;$ ${g}`;
    document.getElementById('symbol-days-title').innerHTML = html;

    window.scrollTo(0, document.body.scrollHeight);
}

//#----------------------------
//# toggle settings
//#----------------------------
function toggle_settings() {
    document.getElementById('key').value = localStorage.getItem('m3-stocks-key') || '';
    document.getElementById('secret').value = localStorage.getItem('m3-stocks-secret') || '';
    document.getElementById('token').value = localStorage.getItem('m3-stocks-token') || '';
    document.getElementById('picks').value = picks;
    document.getElementById('likes').value = likes;
    document.getElementById('steady_picks').value = steady;
    document.getElementById('settings').classList.toggle('w3-hide');
}

//#----------------------------
//# click symbol
//#----------------------------
function update_settings() {
    localStorage.setItem('m3-stocks-key', document.getElementById('key').value);
    localStorage.setItem('m3-stocks-secret', document.getElementById('secret').value);
    localStorage.setItem('m3-stocks-token', document.getElementById('token').value);
    localStorage.setItem('m3-stocks-picks', document.getElementById('picks').value);
    picks = document.getElementById('picks').value;
    localStorage.setItem('m3-stocks-likes', document.getElementById('likes').value);
    likes = document.getElementById('likes').value;
    localStorage.setItem('m3-stocks-steady', document.getElementById('steady_picks').value);
    steady = document.getElementById('steady_picks').value;
    document.getElementById('settings').classList.toggle('w3-hide');
    console.yellow('settings updated');
}

//#----------------------------
//# toggle positions
//#----------------------------
function togglePositions(elem) {
    show_positions = elem.children[0].classList.contains('fa-toggle-on');
    if (show_positions) {
        document.getElementById('toggle-title').innerHTML = 'Suggested Trades';
    } else {
        document.getElementById('toggle-title').innerHTML = 'Current Positions';
    }
    elem.children[0].classList.toggle('fa-toggle-on');
    elem.children[0].classList.toggle('fa-toggle-off');

    //* update charts and titles
    show_positions = !show_positions;
    update_charts();
}

//#----------------------------
//# toggle symbol day chart
//#----------------------------
function toggleSymbolDayChart() {
    const elem = document.getElementById('symbol-day-chart');
    elem.classList.toggle('w3-hide');
}

//#----------------------------
//# buy all
//#----------------------------
function buy_all() {
    const seed = 1000;
    config_stocks.alpaca.buy_symbols(config_stocks.symbols.join(','), seed).then((res) => {
        console.log(res);
    });
}

//#----------------------------
//# liquidate - sell all symbols
//#----------------------------
function liquidate() {
    config_stocks.alpaca.liquidate().then((res) => {
        console.log(res);
    });
}
