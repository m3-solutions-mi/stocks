//#-------------------------------------------
//# SETUP & CONFIGUATION
//#-------------------------------------------
const configs = {
    PAPER: {
        KEY: '',
        SECRET: '',
        SYMBOLS: [],
        SEED: 1000,
        START_AT: '2026-01-05',
        ALPACA: '',
    },
    LIVE: {
        // KEY: '',
        // SECRET: '',
        SYMBOLS: [],
        SEED: 1000,
        START_AT: '2026-01-05',
        ALPACA: '',
    },
};

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
        //* 'AMD,APH,APP,AVGO,CIFR,COIN,CRDO,GEV,GOOGL,HOOD,HUT,INDV,IREN,KOPN,LEU,OKLO,OPEN,PLTR,PSIX,QUBT,RING,RKLB,SHOP,SMCI,SNDK,SOFI,TMC,TSEM,TTMI,UUUU'
        // ...('AMD,APH,APP,AVGO,CIFR,COIN,CRDO,GEV,GOOGL,HOOD,HUT,INDV,IREN,KOPN,LEU,OKLO').split(','),
        // ...('OPEN,PLTR,PSIX,QUBT,RING,RKLB,SHOP,SMCI,SNDK,SOFI,TMC,TSEM,TTMI,UUUU').split(','),

        //@ STEADY PICKS | HAND PICKED
        // ...('AEIS,ALNT,AMKR,APYX,ARWR,ATRO,AVDL,AVGO,AVTX,BBIO,BELFB,BIB,BTSG,CECO,CENX,CHRW,CLLS,CMPR,CMPX,CRDO,CRVS,CTRN,DHC,ERAS,ESPR,EXPE,EYPT').split(','),
        // ...('FDMT,FIVE,FROG,FSLR,GCT,GEV,GLUE,GOOGL,GSAT,IDYA,IESC,INDV,INSM,IONS,IRMD,IRON,KALU,KLAC,KNSA,KOD').split(','),
        // ...('LASR,LAUR,LGND,LITE,LMND,LRCX,MAMA,MDB,MGIC,MKSI,MU,MVBF,MYRG,NEM,NESR,ORKA,PHAT,PPTA,PSMT,PTGX,REAL,RING,RLAY,ROIV,RPTX').split(','),
        // ...('SANM,SEPN,SITM,SMTC,SVRA,TBPH,TER,TIGO,TRVI,TSEM,TTMI,TYRA,UPB,VRDN,VSAT,WDC,XMTR,ZBIO,ZUMZ,ZYME').split(','),

        //@ STEADY PICKS - TOP 10
        // ...('KOD,ARWR,SEPN,LITE,LASR,ZBIO,UPB,PHAT,GLUE,WDC').split(','),

        //@ STEADY PICKS - TOP 25 [32]
        // ,FDMT,CRDO
        //@ full sorted list: APYX,ARWR,AVTX,CLLS,CMPX,COPX,ERAS,ESPR,EYPT,GLTR,GLUE,INDV,KOD,LASR,LITE,MU,ORKA,PALL,PHAT,REMX,RLAY,SEPN,SLV,SNDK,TSEM,TTMI,UPB,VSAT,WDC,ZBIO
        // ...('KOD,ARWR,SEPN,LITE,LASR,ZBIO,UPB,PHAT,GLUE,WDC,CLLS,APYX,VSAT,INDV,EYPT,RLAY,ESPR,CMPX,ERAS,ORKA,AVTX,TTMI,TSEM').split(','),
        // ...('GLTR,PALL,SLV,COPX,REMX').split(','),
        // ...('MU,SNDK').split(','),

        //@ LARGE SET / PICKS
        // ...('AAOI,ABVX,AEIS,AENT,AIP,ALNT,AMKR,ANAB,ANNX,ARWR,ATEC,ATRO,AUPH,AVDL,AUPH,AXTI,B,BBIO,BELFB,BIOA,BLTE,BTSG,CECO,CELC,CENX,CG,CMPX,CMTL,COPX,CTMX,DHC,DNTH,DOOO,DSGN,DYN,ENTA,ERAS,ESPR,EYPT,FBIO,FIVE,FLEX,FLNC,FORM,FSLR,FTRE,FULC,GCT,GDX,GH,GLTR,GLUE,GNOM,GOOG,GOOGL,GRAL,GSAT,GTX,HOOD,IDYA,IESC,IHRT,IMNM,INDV,INSM,IONS,JBIO,JOYY,KNSA,KOD,LASR,LGND,LITE,LMND,LQDA,LRCX,LYEL,MKSI,MU,NAUT,NEM,NESR,NXT,ORKA,PALL,PBYI,PHAT,PL,PLTR,POWL,PRAX,PRLD,PTGX,RAPP,RAPT,REAL,REMX,RLAY,ROIV,RVMD,SEPN,SETM,SHLS,SLV,SMTC,SNDK,STRO,SVRA,TBPH,TCMD,TER,TLN,TNGX,TORO,TRVI,TSEM,TTMI,TYRA,UPB,VICR,VRDN,WBD,WDC,WLDN,XMTR,XPEL,ZBIO,ZEUS,ZYME').split(','),

        //@ STEADY PICKS - TOP 30
        // ...('KOD,ARWR,SEPN,LITE,LASR,ZBIO,UPB,PHAT,GLUE,WDC,CLLS,CRDO,APYX,VSAT,INDV,EYPT,RLAY,ESPR,FDMT,CMPX,ERAS,ORKA,AVTX,TTMI,TSEM,GSAT,GCT,LMND,AVDL,REAL').split(','),

        //* TOPS - ALGO
        // ...('SMX,ZYXI,AMBR,ZJK,QNTM,SYM,CSTE,BLFY,INV,ARWR,KALA,CGEM,IBG,LYEL,TLSI,ESPR,HCAT,OLMA,CTXR,JACK,PACB,JYD,SPRY,FOSL,TYRA').split(','),

        //* TOP 15 - LAST 3 WEEKS
        // ...('TMC,TSEM,RKLB,APP,GEV,HUT,TTMI,PSIX,CIFR,KOPN,SNDK,OKLO,QUBT,CRDO,HOOD').split(','),

        //*-----------------------------------------------------------------------------------------------------------------------------------------------------
        //*-----------------------------------------------------------------------------------------------------------------------------------------------------
        //@ CURRENT POSITIONS
        // ...('AEIS,ALNT,APYX,B,CENX,COPX,GDX,GE,GLTR,KALU,KLAC,KOD,KOPN,LASR,MU,PALL,REMX,SLV,SMH,SNDK,TBPH,TER,TSEM,VSAT,WDC').split(','),
        // ...('AEIS,ALB,ALNT,CECO,CENX,COPX,FLNC,GDX,GLTR,GOOGL,KALU,KLAC,KOPN,LASR,METC,MU,NEM,PALL,POWL,PSIX,REMX,RING,SLV,SNDK,TSEM,VICR,WDC').split(','),
        // ...('MTSI,MKSI,MRNA,INTC,METC,AMD,AMKR,DOOO,FIVE,POWL').split(','),
        // ...('AEIS,ALB,ALNT,CECO,CENX,COPX,FLNC,GDX,GH,GLTR,GOOGL,KALU,KLAC,KOPN,LASR,METC,MU,NEM,PALL,POWL,PSIX,REMX,RING,SLV,TSEM,URNJ,WDC').split(','),

        //@ LIKES
        // ...('A,AA,AAOI,ABVX,ACMR,AEIS,AENT,AEVA,AIP,ALAB,ALMS,AM,AMD,AMDL,AMKR,ANAB,ANGH,AP,APLD,APP,AR,ARWR,ASML,ASPS,ASTI,ASTS,ATAI,ATRO,ATXS,AVAV,AVDL,AX,B,BAER,BAI,BBIO,BDSX,BH,BIOA,BLTE,BTSG,C,CAMT,CECO,CELC,CENX,CIFR,CLLS,CM,CMPS,CMPX,CMTL,COPX,COR,CR,CRDO,CRML,CSTL,CTEC,CTMX,CTRN,D,DAPP,DMAC,DOOO,DPRO,DRIO,DRTS,DSGN,E,EDAP,EE,EGAN,ENGN,ENTA,ERAS,ESPR,EU,EVLV,EYE,EYPT,FBIO,FDMT,FIVE,FL,FLGC,FLNC,FMST,FORM,FTRE,FULC,GCT,GDX,GEOS,GEV,GH,GILT,GLUE,GOOG,GOOGL,GPRO,GRAL,GSAT,GSIT,GTX,HIVE,HL,HOOD,HUT,IBG,IDYA,IESC,IHRT,IMAB,IMNM,IMOS,IMTX,INBX,INDI,INDP,INDV,INSM,INTC,IPX,IR,IREN,IVA,JBIO,KALU,KLAC,KOD,KOPN,KTOS,KYMR,L,LASR,LCID,LMND,LQDA,LRCX,LUNR,LVLU,LWLG,LYEL,MAMA,MBX,MDB,MDXH,MEDP,METC,MFH,MGIC,MIRM,MKSI,MLYS,MNMD,MRCY,MTSI,MU,MYRG,NAUT,NBIS,NBTX,NEM,NERV,NESR,NVMI,NVTS,O,OKLO,OLMA,ONDS,OPEN,ORIC,ORKA,OSS,OUST,PAYS,PBYI,PGY,PHAT,PL,PLTR,POET,PONY,POWL,PPTA,PRAX,PRLD,PRME,PSIX,PSNL,QCLS,QTTB,QURE,R,RAPP,RAPT,RCAT,RDNW,REMX,RGNX,RGTI,RIGL,RILY,RING,RIOT,RKLB,RL,RLAY,RLMD,RMBS,ROIV,RPTX,RUN,RYTM,SANA,SANM,SATS,SEDG,SEPN,SERV,SETM,SHLS,SIMO,SITM,SKYT,SLDP,SLNH,SLV,SMTC,SNDK,SOFI,SRTA,SSRM,STOK,STRL,STRO,STX,SYM,SYRE,TBPH,TCMD,TE,TENX,TER,TERN,TLRY,TLS,TMC,TMDX,TNGX,TORO,TOYO,TSEM,TTMI,TXG,TXMD,TYRA,UCTT,UFO,UPB,URNJ,UROY,VELO,VERA,VERU,VICR,VRDN,WLDN,WULF,XMTR,ZBIO,ZNTL,ZYME').split(','),

        //@ STEADY PICKS - TOP 10
        // ...('KOD,ARWR,SEPN,LITE,LASR,ZBIO,UPB,PHAT,GLUE,WDC').split(','),
    ].filter((v, i, a) => i === a.indexOf(v)).sort(),
    1000,
    // '2025-03-15T00:00:00Z', // start
    // '2025-04-01T00:00:00Z', // start
    // '2026-01-05T00:00:00Z', // start
    // '2025-12-07T00:00:00Z' // end
    // '2025-12-14T00:00:00Z' // end
);

// let alpaca = new AlpacaData(
//     localStorage.getItem('m3-stocks-key'),
//     localStorage.getItem('m3-stocks-secret'),
//     new Date(config_stocks.start_at).toISOString(),
//     'W2'
// );

// let alpaca = new AlpacaData(
//     '',
//     '',
//     '',
//     ''
// );

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
let treemap_symbol_days_recent = new Treemap('#chart10');
let line_combined_current_mobile = new Treemap('#mobile-chart9');
let line_combined_current = new Treemap('#chart9');
let data = null;
let num_symbol_days = -15;
let use_raw = false;
let use_filter = true;
let picks = (localStorage.getItem('m3-stocks-picks') || '').split(',');
let likes = (localStorage.getItem('m3-stocks-likes') || '').split(',');
let steady = (localStorage.getItem('m3-stocks-steady') || '').split(',');
// config_stocks.symbols = likes; //@ enable to change to symbols from 'likes'


let chart_top_1 = new Treemap('#top-chart-1');
let chart_top_2 = new Treemap('#top-chart-2');
let chart_top_3 = new Treemap('#top-chart-3');
let chart_top_4 = new Treemap('#top-chart-4');
let chart_top_5 = new Treemap('#top-chart-5');
let chart_top_6 = new Treemap('#top-chart-6');
let chart_top_7 = new Treemap('#top-chart-7');


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
// const update_charts = (config = config_stocks) => {

//     // console.log(config_stocks);

//     //#-------------------------------------------
//     //# SYMBOLS CHART & TITLE [LEFT]
//     //#-------------------------------------------
//     data = config.data.map((v) => { return { x: v.symbol, y: round2(v.summary.total) } });
//     data = data.sort((a, b) => a.y < b.y ? 1 : -1);
//     //! console.log(data.slice(0, 30).map((v) => v.x).join(','));
//     update_ui(treemap_symbols);
//     let total = round2(config.data.map((v) => round2(v.summary.total)).reduce((p, c) => p + c));
//     document.getElementById('symbols-total').innerHTML = `${get_indicator(total)} ${round1(total / 1000).toLocaleString()}K`;
//     document.getElementById('symbols-total-pct').innerHTML = `${round1(total / (data.length * 1000) * 100).toLocaleString()}%`;

//     //#-------------------------------------------
//     //# MONTHS CHART & TITLE [LEFT]
//     //#-------------------------------------------
//     const summarize_by = 'months';
//     const months = config.data.map((v) => Object.keys(v.summary[summarize_by])).reduce((p, c) => [...p, ...c]).filter((v, i, a) => i == a.indexOf(v));
//     const total_months = {};
//     months.forEach((m) => {
//         total_months[m] = 0;
//         config.data.forEach((s) => {
//             total_months[m] += s.summary.months[m] || 0;
//         })
//     })
//     // , round(total_months[k])]
//     // data = Object.keys(total_months).map((k) => { return { x: [k.split('_')[2], `${round1(total_months[k] / 1000)} K`], y: round(total_months[k]) } });
//     data = Object.keys(total_months).map((k) => { return { x: k.split('_')[2], y: round(total_months[k]) } });
//     total = round(config.data.map((v) => round2(v.summary.total)).reduce((p, c) => p + c) / data.length);
//     treemap_months.options.chart.type = 'bar';
//     treemap_months.options.chart.sparkline = { enabled: true };
//     treemap_months.options.dataLabels.offsetY = -30;
//     treemap_months.options.dataLabels.style = { fontSize: '18px', colors: ["#304758"] };
//     treemap_months.options.dataLabels.formatter = function (val) { return round1(val / 1000); };
//     treemap_months.options.annotations = { yaxis: [{ y: total, borderColor: colors.black, fillColor: colors.black, opacity: 1 }] };
//     update_ui(treemap_months);
//     document.getElementById('months-average').innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}`;
//     document.getElementById('months-average-pct').innerHTML = `${round1(total / (config.symbols.length * 1000) * 100).toLocaleString()}%`;

//     //#-------------------------------------------
//     //# SYMBOLS COMBINED [LEFT]
//     //#-------------------------------------------
//     let series = { name: 'Close', type: 'line', data: [] };
//     config.data.map((s) => s.bars).forEach((b) => {
//         b.forEach((v, i) => {
//             if (!series.data[i]) {
//                 series.data.push({ x: v.e, y: 0 });
//             }
//             series.data[i].y += round((v.c - b[0].o) * (1000 / b[0].o));
//         })
//     })
//     line_combined.options.chart.type = 'area';
//     line_combined.options.chart.sparkline = { enabled: true };
//     line_combined.options.dataLabels.enabled = false;
//     line_combined.options.fill = { type: 'solid' };
//     line_combined.options.xaxis = { type: 'datetime' };
//     line_combined.options.annotations = { points: [] };
//     let last_w = getMonthName(new Date(series.data[0].x));
//     series.data.forEach((v, i) => {
//         const w = getMonthName(new Date(v.x));
//         if (w !== last_w) {
//             line_combined.options.annotations.points.push({ x: v.x, y: v.y, borderColor: colors.black, fillColor: colors.black, _opacity: 1 });
//         }
//         last_w = w;
//     })
//     data = series.data;
//     update_ui(line_combined);
//     total = round(data[data.length - 1].y);
//     document.getElementById('symbols-combined').innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}`;
//     document.getElementById('symbols-combined-pct').innerHTML = `${round1(total / (config.symbols.length * 1000) * 100).toLocaleString()}%`;

//     // //#------------------------------------------------------
//     // //# CURRENT POSITIONS | BANNER | CHART | TITLE [RIGHT]
//     // //#------------------------------------------------------
//     // data = show_positions
//     //     ? config.data.map((v) => { return { x: v.symbol, y: round(v.position ? v.position.gain : 0) } })
//     //     : config.data.map((v) => { return { x: v.symbol, y: round(v.trades[v.trades.length - 1].gain_1K) } });
//     // data = data.sort((a, b) => a.y < b.y ? 1 : -1);
//     // treemap_last_symbols.options.dataLabels.formatter = function (text, op) {
//     //     return [text, op.value]
//     // };
//     // update_ui(treemap_last_symbols);
//     // treemap_last_symbols_mobile.options.chart.height = 220;
//     // update_ui(treemap_last_symbols_mobile);

//     // //* last total
//     // total = round2(data.map((v) => v.y).reduce((p, c) => p + c));
//     // let elem = document.getElementById('last-total');
//     // elem.innerHTML = `${get_indicator(total)} ${Math.abs(round(total)).toLocaleString()}&nbsp;`;
//     // total < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');

//     // //* last pct
//     // const percent = round2(total / (data.length * 1000) * 100);
//     // elem = document.getElementById('last-pct');
//     // elem.innerHTML = `${percent.toLocaleString()}%`;
//     // total < 0 ? elem.classList.replace('w3-text-green', 'w3-text-red') : elem.classList.replace('w3-text-red', 'w3-text-green');

//     // //* seed money
//     // elem = document.getElementById('last-seed');
//     // elem.innerHTML = `[${round1(data.length).toLocaleString()}K]`;

//     // //@ mobile banner
//     // let color = total >= 0 ? 'green' : 'red';
//     // document.getElementById('mobile-banner').innerHTML = `
//     //     <span class="w3-center w3-padding w3-${color}"
//     //     style="font-size:72px;letter-spacing:8px;">
//     //         <b>${get_indicator(total)}${Math.abs(round(total)).toLocaleString()}</b>
//     //     </span> 
//     //     <span class="w3-xxxlarge w3-text-${color}" style='letter-spacing:4px;'><b>${percent.toLocaleString()}%</b></span>
//     // `;

//     // //* browser tab title
//     // document.title = `M3 Stocks | $${round(total).toLocaleString()}`;

//     //#-------------------------------------------
//     //# LAST N WEEKS CHART & TITLE [RIGHT]
//     //#-------------------------------------------
//     let recent_weeks = config.data.map((v) => v.trades.slice(-3));
//     // let recent_values = reduceArray(config.data.map((v) => v.trades.slice(-3).map((v2) => v2).map((v2) => v2.gain_1K)), 0);
//     let recent_values = config.data.map((v) => v.trades.slice(-3).map((v2) => v2).map((v2) => v2.gain_1K).reduce((p, c) => p + c));
//     data = recent_weeks.map((v, i) => { return { x: config.data[i].symbol, y: round(recent_values[i]) } });
//     data = data.sort((a, b) => a.y < b.y ? 1 : -1);
//     treemap_recent_weeks.options.dataLabels.formatter = function (text, op) {
//         return [text, op.value]
//     };
//     update_ui(treemap_recent_weeks);

//     total = round2(data.map((v) => v.y).reduce((p, c) => p + c));

//     //#-------------------------------------------
//     //# SYMBOLS COMBINED LAST N CHART [RIGHT]
//     //#-------------------------------------------
//     series = { name: 'Close', type: 'line', data: [] };
//     config.data.map((s) => s.bars).forEach((b) => {
//         b.slice(-15).forEach((v, i) => {
//             if (!series.data[i]) {
//                 series.data.push({ x: v.e, y: 0 });
//             }
//             series.data[i].y += round((v.c - b[0].o) * (1000 / b[0].o));
//         })
//     })
//     line_combined_last_n.options.chart.type = 'area';
//     line_combined_last_n.options.chart.sparkline = { enabled: true };
//     line_combined_last_n.options.dataLabels.enabled = false;
//     line_combined_last_n.options.fill = { type: 'solid' };
//     line_combined_last_n.options.xaxis = { type: 'datetime' };
//     line_combined_last_n.options.annotations = { points: [] };
//     last_w = getWeekName(new Date(series.data[0].x));
//     series.data.forEach((v, i) => {
//         const w = getWeekName(new Date(v.x));
//         if (w !== last_w) {
//             // line_combined_last_n.options.annotations.xaxis.push({ x: v.x, borderColor: colors.black, fillColor:colors.black, opacity: 1 });
//             line_combined_last_n.options.annotations.points.push({ x: v.x, y: v.y, marker: { radius: 5, fillColor: '#7fff00' } });
//         }
//         last_w = w;
//     })
//     data = series.data;
//     update_ui(line_combined_last_n);
//     line_combined_current.options = deepClone(line_combined_last_n.options);
//     line_combined_current.options.chart.height = 250;
//     // update_ui(line_combined_current);
//     // console.table(data);

//     //#-------------------------------------------
//     //# Recent Mobile Chart 
//     //#-------------------------------------------
//     // const combine_data = (symbols) => {

//     //     const result = [];
//     //     const xy = (x, y) => { return { x: x, y: y } };
//     //     const push = (x, y) => { result.push(xy(x, y)); }
//     //     const annotations = [];

//     //     const epochs = symbols.map((b) => b.map((v) => v.e)).flat().filter((v, i, a) => i === a.indexOf(v)).sort((a, b) => a - b);
//     //     let e = Math.min(...epochs);
//     //     const e2 = Math.max(...epochs);
//     //     epochs.forEach((ee) => {
//     //         const m = new Date(ee).getMonth() - 2;
//     //         const seed_base = symbols.length * 1000;
//     //         const add_per_month = 0 * 1000;
//     //         const seed = (seed_base) + (m * add_per_month);
//     //         let y = 0;
//     //         symbols.forEach((b, i) => {
//     //             // b = b.slice(13);
//     //             const entry = b.find((vv) => vv.e === ee);
//     //             const o = b[0].o;
//     //             y += entry ? ((entry.c - o) * ((seed / symbols.length) / o)) : 0;

//     //             if ((i === (symbols.length - 1) && entry) && (entry.thm === 930 || entry.thm === 1600)) {
//     //                 annotations.push({ x: entry.e, y, marker: { size: 4.5, fillColor: entry.thm === 930 ? colors.orange : colors.black } });
//     //             }
//     //         });

//     //         push(ee, round(y));
//     //     });
//     //     annotations.push({ x: result[result.length - 1].x, y: result[result.length - 1].y, marker: { size: 6, fillColor: colors.deeppink } });
//     //     return { data: result, annotations };
//     // };

//     //# get combined data
//     // let combined = combine_data([config.data[12].bars]);
//     // let combined = combine_data(config.data.slice(12,13).map((s) => s.bars)); //* KOD
//     let combined = combine_data(config.data.map((s) => s.bars));
//     // let combined = combine_data(config.data.map((s) => s.recent.bars));
//     // let combined = combine_data(config.data.map((s) => s.bars.filter((b) => new Date(b.e).getMonth() === new Date().getMonth())));

//     series = { name: 'Close', type: 'area', data: [] };
//     line_combined_current_mobile.options.chart.type = 'area';
//     line_combined_current_mobile.options.chart.height = 500;
//     line_combined_current_mobile.options.chart.sparkline = { enabled: true };
//     line_combined_current_mobile.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
//     line_combined_current_mobile.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
//     // line_combined_current_mobile.options.tooltip.y.formatter = function (value) { return value.toLocaleString(); };
//     line_combined_current_mobile.options.dataLabels.enabled = false;
//     line_combined_current_mobile.options.fill = { type: 'solid' };
//     line_combined_current_mobile.options.xaxis = { type: 'datetime' };
//     line_combined_current_mobile.options.annotations = { points: combined.annotations };

//     annotations_x = [];
//     let last = 0;
//     let m = getMonthName(new Date(combined.data[0].x));
//     combined.data.forEach((v, i) => {
//         const cm = getMonthName(new Date(v.x));

//         if (cm !== m /*|| i === combined.data.length - 1*/) {
//             const diff = round1((v.y - last) / 1000);
//             last = v.y;
//             annotations_x.push({ x: v.x, y: v.y, label: { text: diff, style: { fontSize: '22px' } }, marker: { size: 4.5, fillColor: colors.black } });
//             m = cm;
//         }
//     });
//     line_combined_current_mobile.options.annotations.points = [...annotations_x, ...line_combined_current_mobile.options.annotations.points];

//     data = combined.data;//.slice(-90);
//     update_ui(line_combined_current_mobile);
//     line_combined_current.options = deepClone(line_combined_current_mobile.options);
//     update_ui(line_combined_current);
//     total = round1(data[data.length - 1].y / 1000);
//     color = total >= 0 ? 'green' : 'red';
//     elem = document.getElementById('this-week');
//     elem.style.backgroundColor = colors[color];
//     elem.innerHTML = `${get_indicator(total)} ${round1(total).toLocaleString()}K`;


//     const points = line_combined_current_mobile.options.annotations.points;
//     const last_window = points[points.length - 1].y - points[points.length - 2].y;
//     // const last_day = data[data.length - 1].y - data[data.length - 2].y;
//     const last_day = config_stocks.data.map((s, i) => s.bars_2.slice(-1)[0].c).reduce((p, c) => p + c) - config_stocks.data.map((s, i) => s.bars_2.slice(-2)[0].c).reduce((p, c) => p + c);
//     document.getElementById('last_dollars').innerHTML = `${get_indicator(last_window)}$${round1(last_window).toLocaleString()} |  ${get_indicator(last_day)}$${round1(last_day).toLocaleString()}`;

//     // -------------------------------------------
//     // series = { name: 'Close', type: 'area', data: [] };
//     // const xy = (x, y) => { return { x: x, y: y } };
//     // const push = (x, y) => { series.data.push(xy(x, y)); }
//     // const annotations = [];
//     // // let e = new Date(config.data[0].recent.bars[0].t).getTime();
//     // let e = Math.min(...config.data.map((s) => s.recent.bars[0].e));
//     // const e2 = Math.max(...config.data.map((s) => s.recent.bars[s.recent.bars.length - 1].e));
//     // let y = 0;
//     // while (e <= e2) {
//     //     config.data.map((s) => s.recent.bars).forEach((b, i) => {
//     //         const entry = b.find((vv) => vv.e === e);
//     //         y += entry ? ((entry.c - entry.o) * (1000 / entry.o)) : 0;

//     //         if ((i === (config.data.map((s) => s.recent.bars).length - 1) && entry) && (entry.thm === 930 || entry.thm === 1600)) {
//     //             annotations.push({ x: entry.e, y, marker: { size: 4.5, fillColor: entry.thm === 930 ? colors.orange : colors.black } });
//     //         }
//     //     });

//     //     push(e, round(y));
//     //     e += (5 * 60 * 1000); //* 5 minutes;
//     // }

//     // line_combined_current_mobile.options.chart.type = 'area';
//     // line_combined_current_mobile.options.chart.sparkline = { enabled: true };
//     // line_combined_current_mobile.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
//     // line_combined_current_mobile.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
//     // line_combined_current_mobile.options.dataLabels.enabled = false;
//     // line_combined_current_mobile.options.fill = { type: 'solid' };
//     // line_combined_current_mobile.options.xaxis = { type: 'datetime' };
//     // line_combined_current_mobile.options.annotations = { points: annotations };
//     // annotations.push({ x: series.data[series.data.length - 1].x, y: series.data[series.data.length - 1].y, marker: { size: 6, fillColor: colors.deeppink } });
//     // data = series.data;
//     // update_ui(line_combined_current_mobile);
//     // line_combined_current.options = deepClone(line_combined_current_mobile.options);
//     // update_ui(line_combined_current);
//     // total = round(data[data.length - 1].y);
//     // color = total >= 0 ? 'green' : 'red';
//     // elem = document.getElementById('this-week');
//     // elem.style.backgroundColor = colors[color];
//     // elem.innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}K`;
//     // -------------------------------------------



//     //#-------------------------------------------
//     //# Symbols List 
//     //#-------------------------------------------
//     // const template = `<span class="w3-tag w3-round w3-padding w3-{c}" style="cursor:pointer;min-width:85px;margin-bottom:5px;" onclick="{f}('{s}')">{0}<br/>{1}</span>`
//     // let html = '';
//     // config.symbols.forEach((s) => {
//     //     const entry = config.data.find((v) => v.symbol === s)
//     //     const g = entry.position ? entry.position.gain : entry.trades[entry.trades.length - 1].gain_1K;
//     //     const color = g >= 0 ? 'green' : 'red';

//     //     const own = config_stocks.data.find((v) => v.symbol === s).own;
//     //     const indicator = own < 0 ? get_indicator(own, own >= 0, colors.aqua) : '';
//     //     html += template.replace('{c}', color).replace('{0}', `${indicator}${s}`).replace('{1}', round(g)).replace('{s}', s).replace('{f}', 'click_symbol') + '\n';
//     // })
//     // document.getElementById('symbol-boxes-stocks').innerHTML = html;
//     // // document.getElementById('symbol-names-input').style.display = 'none';
//     // document.getElementById('symbol-names').value = config.symbols.join(',');

//     //#-------------------------------------------
//     //# All Symbols by Letter
//     //#-------------------------------------------
//     // html = '';
//     // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter) => {
//     //     html += template.replace('{c}', 'white').replace('{0}', letter).replace('{1}', '').replace('{s}', letter).replace('{f}', 'click_letter') + '\n';
//     // });
//     // document.getElementById('letters').innerHTML = html;
// }

//@-----------------------------------------------------------------------------------------------------------------
//@ CLASS VERSION of NEW METHOD
//@-----------------------------------------------------------------------------------------------------------------
// const FIELD_PROCESSED_DATA = 'PROCESSED_DATA';
// const FIELD_POSITIONS = 'POSITIONS';
// const FIELD_ORDERS = 'ORDERS';
// const FIELD_KEY = 'KEY';
// const FIELD_SECRET = 'SECRET';
// const FIELD_TOKEN = 'TOKEN';
// const FIELD_SYMBOLS = 'SYMBOLS';
// class Stocks {
//     NAME = null;
//     PROCESSED_DATA = null;
//     POSITIONS = null;
//     ORDERS = null;
//     TOKEN = null;
//     SYMBOLS = null;
//     ALPACA = null;
//     // START_AT = '2025-04-01';
//     START_AT = '2026-01-05';

//     constructor(name, token, symbols = []) {
//         this.NAME = name;
//         this.TOKEN = token;
//         this.SYMBOLS = symbols;

//         //* ALPACA */
//         this.ALPACA = new AlpacaData(localStorage.getItem('m3-trader-v5-key'), localStorage.getItem('m3-trader-v5-secret'), this.START_AT, 'W');
//     }
//     set_field(name, value) {
//         this[name] = value;
//     }
//     get_field(name) {
//         return this[name];
//     }
//     // async get_symbols(start_at = this.START_AT) {
//     //     return new Promise(async (resolve) => {
//     //         this.PROCESSED_DATA = await this.ALPACA.bars_simplified(this.SYMBOLS, this.START_AT);
//     //         // console.log('SYMBOLS', this.PROCESSED_DATA);
//     //         resolve(this.PROCESSED_DATA);
//     //     });
//     // }
// }
// const temp = new Stocks(
//     'MINERALS',                              // NAME
//     '123',                                   // TOKEN
//     'GLTR,PALL,SLV,COPX,REMX'.split(',')     // SYMBOLS
// );
// console.log('STOCKS CONFIG', temp);
// temp.get_symbols();


//@-----------------------------------------------------------------------------------------------------------------
//@ UPDATE - NEW METHOD
//@-----------------------------------------------------------------------------------------------------------------
let PROCESSED_DATA = null;
let POSITIONS = null;
let ORDERS = null;
let PORTFOLIO_HISTORY = null;
let PORTFOLIO_DAY_HISTORY = null;
let ACCOUNT = null;

//* UPDATE DATA */
async function update(instance) {
    const s = Date.now();

    //*@ TRASNSFER OLD ENTRIES */
    if (!localStorage.getItem(`m3-stocks-account-name`)) {
        console.yellow('TRANSFERRING LOCAL STORAGE ENTRIES');
        localStorage.setItem(`m3-stocks-account-name`, 'paper');
        localStorage.setItem(`m3-stocks-paper-alpaca-key`, localStorage.getItem(`m3-stocks-key`));
        localStorage.setItem(`m3-stocks-paper-alpaca-secret`, localStorage.getItem(`m3-stocks-secret`));
        localStorage.setItem(`m3-stocks-paper-symbols`, `AEIS,ALB,ALNT,CECO,CENX,COPX,FLNC,GDX,GH,GLTR,GOOGL,KALU,KLAC,KOPN,LASR,METC,MU,NEM,PALL,POWL,PSIX,REMX,RING,SLV,TSEM,URNJ,WDC`);
        localStorage.setItem(`m3-stocks-paper-start-at`, `2026-01-05`);
        localStorage.setItem(`m3-stocks-paper-seed`, 1000);

        //* CLEANUP */
        localStorage.removeItem('m3-stocks-key');
        localStorage.removeItem('m3-stocks-secret');
    }

    //*@ GET PROCESSED DATA */
    // let start_date = '2026-01-05';
    // start_date = '2026-01-05';
    const name = localStorage.getItem(`m3-stocks-account-name`) || 'paper';
    let start_date = localStorage.getItem(`m3-stocks-${name}-start-at`) ?? '2025-01-05';
    const symbols = localStorage.getItem(`m3-stocks-${name}-symbols`).split(',');
    const key = localStorage.getItem(`m3-stocks-${name}-alpaca-key`);
    const secret = localStorage.getItem(`m3-stocks-${name}-alpaca-secret`);
    const seed = +(localStorage.getItem(`m3-stocks-${name}-seed`) ?? 1000);
    config_stocks.alpaca.ALPACA_KEY = key;
    config_stocks.alpaca.ALPACA_SECRET = secret;
    config_stocks.alpaca.SEED = seed;

    config_stocks.alpaca.bars_simplified(symbols, start_date).then((result) => {
        // instance.get_symbols().then((result) => {
        PROCESSED_DATA = result;
        console.log(`DATA | ${instance?.NAME || 'CONFIG'}`, PROCESSED_DATA)
        // console.log(Date.now() - s);

        //* BREAKDOWN */
        const render_breakdown = () => {
            data = PROCESSED_DATA.symbols.map((v) => { return { x: v.symbol, y: round2(v.months_total) } });
            // data = data.sort((a, b) => a.y < b.y ? 1 : -1);
            chart_top_1.options.chart.height = 415;
            // chart_top_1.options.chart.type = 'bar';
            update_ui(chart_top_1);
            let total = round2(PROCESSED_DATA.symbols.map((v) => round2(v.months_total)).reduce((p, c) => p + c));
            const elem = document.getElementById('top-symbols-total');
            total < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');
            elem.innerHTML = `${get_indicator(total)} ${round1(total / 1000).toLocaleString()}K`;
            // document.getElementById('top-symbols-total-pct').innerHTML = `${round1(total / (data.length * 1000) * 100).toLocaleString()}%`;
        }

        //* MONTHS */
        // const render_months = () => {
        //     // data = Object.entries(PROCESSED_DATA.months).map((v) => { return { x: v[0].slice(5), y: round2(v[1]) } });
        //     // // data = data.sort((a, b) => a.y < b.y ? 1 : -1);
        //     // // chart_top_2.options.chart.height = 400;
        //     // // chart_top_2.options.dataLabels.enabled = false;
        //     // chart_top_2.options.chart.type = 'bar';
        //     // chart_top_2.options.dataLabels.offsetY = -32;
        //     // chart_top_2.options.dataLabels.style = { fontSize: '20px', colors: [colors.black] };
        //     // chart_top_2.options.dataLabels.formatter = (val, opts) => {
        //     //     return round1(val / 1000)
        //     // };
        //     // chart_top_2.options.annotations.yaxis = [
        //     //     { y: PROCESSED_DATA.months_avg, label: { _text: PROCESSED_DATA.months_avg / 1000 }, fillColor: colors.black, borderColor: colors.black },
        //     //     { y: 0, label: { _text: '0' }, fillColor: colors.black, borderColor: colors.black }
        //     // ];
        //     // update_ui(chart_top_2);
        //     // total = round2(PROCESSED_DATA.symbols.map((v) => round2(v.months_avg)).reduce((p, c) => p + c));
        //     // const elem = document.getElementById('top-months-total');
        //     // total < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');
        //     // elem.innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}`;
        //     // // document.getElementById('top-months-total-pct').innerHTML = `${round1(total / (PROCESSED_DATA.symbols.length * 1000) * 100).toLocaleString()}%`;
        // }

        //*@ COMBINED / CUMULATIVE */
        const render_combined = () => {
            //* ADD POINT ANNOTATIONS */
            const add_points = (field = 'month_') => {
                let t = 0;
                summary[field].xy.forEach((v) => {
                    t += v.y;
                    chart_top_3.options.annotations.points.push({ x: v.x, y: t, marker: { size: 4.5, fillColor: colors.blue } });
                });
            }

            //* GENERATE CHART */
            let combined = combine_data(PROCESSED_DATA.symbols.map((s) => s.bars/*.slice(-65)*/));
            const summary = summarize_combined_data(PROCESSED_DATA.symbols);
            series = { name: 'Close', type: 'area', data: [] };
            chart_top_3.options.chart.type = 'area';
            chart_top_3.options.chart.height = 400;
            chart_top_3.options.chart.sparkline = { enabled: true };
            chart_top_3.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
            chart_top_3.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleDateString(); };
            chart_top_3.options.dataLabels.enabled = false;
            chart_top_3.options.fill = { type: 'solid' };
            chart_top_3.options.yaxis = { type: 'datetime', min: Math.min(...combined.data.map((v) => v.y)) };
            // combined.annotations[0].label['offsetX'] = -50;
            // combined.annotations[0].label['offsetY'] = 50;
            // combined.annotations[0].marker.fillColor = colors.deeppink;
            chart_top_3.options.annotations = { points: [...combined.annotations_x, ...combined.annotations] };
            // add_points('week_');
            // add_points('month_');
            // add_points('quarter_');
            data = combined.data;
            chart_top_3.options.yaxis.max = data[data.length - 1].y + 1000;
            // data = data.slice(-30);
            update_ui(chart_top_3);
            total = round2(PROCESSED_DATA.symbols.map((v) => round2(v.days_total)).reduce((p, c) => p + c));
            const elem = document.getElementById('top-combined-total');
            total < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');
            elem.innerHTML = `${get_indicator(total)} ${round(total).toLocaleString()}`;
            document.getElementById('top-combined-total-pct').innerHTML = `${round1(total / (PROCESSED_DATA.symbols.length * 1000) * 100).toLocaleString()}%`;
        }

        //* RENDER METHODS */
        render_breakdown();
        // render_months();
        render_combined();
    });

    //*@ ACCOUNT */
    config_stocks.alpaca.get_account().then((result) => {
        ACCOUNT = result;
        // console.group('ACCOUNT');
        const equity = round2(+(ACCOUNT.equity)).toLocaleString();
        const day_gain = round2(+(ACCOUNT.equity) - +(ACCOUNT.last_equity)).toLocaleString();
        const day_pct = round2(((+(ACCOUNT.equity) / +(ACCOUNT.last_equity)) * 100) - 100).toLocaleString();
        console.yellow(`$${equity} | $${day_gain} | ${day_pct}% -------------------------------------------------------------`);
        // console.yellow(day_gain);
        // console.yellow(day_pct);
        console.log('ACCOUNT', ACCOUNT);
        // console.groupEnd();

        //* DAY TOTAL */
        total = day_gain;
        let elem = document.getElementById('day-total');
        elem.innerHTML = `${get_indicator(total)} ${Math.abs(round(total)).toLocaleString()}&nbsp;`;
        const color = round(total) > 0 ? 'green' : (round(total) < 0 ? 'red' : 'grey');
        elem.classList.remove('w3-green');
        elem.classList.remove('w3-grey');
        elem.classList.remove('w3-red');
        elem.classList.add('w3-green', `w3-${color}`);
        // total < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');

        //* DAY PERCENT */
        const percent = day_pct;
        elem = document.getElementById('day-pct');
        elem.innerHTML = `${percent.toLocaleString()}%`;
        elem.classList.remove('w3-text-green');
        elem.classList.remove('w3-text-grey');
        elem.classList.remove('w3-text-red');
        elem.classList.replace('w3-text-green', `w3-text-${color}`);
        // total < 0 ? elem.classList.replace('w3-text-green', '/w3-text-red') : elem.classList.replace('w3-text-red', 'w3-text-green');
    });

    //*@ POSITIONS */
    config_stocks.alpaca.get_positions().then((result) => {
        POSITIONS = result;
        console.log('POSITIONS', POSITIONS);

        //* CHART /*
        data = POSITIONS.map((v) => { return { x: v.symbol, y: round(v.unrealized_pl) } });
        // data = data.sort((a, b) => a.y < b.y ? 1 : -1);
        chart_top_4.options.chart.height = 415;
        chart_top_4.options.dataLabels.formatter = function (text, op) {
            return [text, op.value]
        };
        chart_top_4.options.chart.events.dataPointSelection = (event, chartContext, opts) => {
            // console.log('data point selected', event, chartContext, opts);
            console.log('data point selected | ', opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].x);
        }
        update_ui(chart_top_4);

        //* LAST TOTAL */
        total = round2(POSITIONS.map((v) => +(v.unrealized_pl)).reduce((p, c) => p + c));
        let elem = document.getElementById('last-total');
        elem.innerHTML = `${get_indicator(total)} ${Math.abs(round(total)).toLocaleString()}&nbsp;`;
        total < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');

        //* LAST PERCENT */
        const percent = round2(total / (POSITIONS.length * 1000) * 100);
        elem = document.getElementById('last-pct');
        elem.innerHTML = `${percent.toLocaleString()}%`;
        total < 0 ? elem.classList.replace('w3-text-green', 'w3-text-red') : elem.classList.replace('w3-text-red', 'w3-text-green');

        //* SEED MONEY */
        elem = document.getElementById('last-seed');
        elem.innerHTML = `[${round1(POSITIONS.length).toLocaleString()}K]`;


        //* SYMBOLS BOXES & TABLE */
        const template = `<span id="{id}" 
            class="w3-tag w3-round w3-padding w3-{c}" 
            style="cursor:pointer;min-width:144px;margin-bottom:5px;color:{fc}!important;" 
            onclick="{f}('{s}')">
                {0}<br/>{1}<!-- | <b>{2}</b>-->
            </span>`
        const template_row = `
            <tr onclick="click_symbol('{s}')">
                <td style="color:{c}"><b>{symbol}</b></td>
                <td class="w3-hide-small">{name}</td>
                <!--<td>{date}</td>-->
                <td style="color:{c2}">{day}</td>
                <td style="color:{c}">{gain}</td>
            </tr>`
        let html = '';
        let html_table = '';
        POSITIONS.forEach((s) => {
            const g = +(s.unrealized_pl);
            const day = +(s.unrealized_intraday_pl);
            const color = g > 0 ? 'green' : (round(g) < 0 ? 'red' : 'grey');
            const color_day = day > 0 ? 'green' : (round(day) < 0 ? 'red' : 'grey');
            const font_color = day >= 0 ? 'black' : 'white';
            // const date = ORDERS.find((v)=>v.symbol === s.symbol).filled_at.split('T')[0];

            // const own = config_stocks.data.find((v) => v.symbol === s).own;
            // const indicator = own < 0 ? get_indicator(own, own >= 0, colors.aqua) : '';
            const indicator = get_indicator(day);
            // const indicator = get_indicator(g);
            html += template
                .replace('{c}', color_day)
                .replace('{0}', `${indicator} ${s.symbol}`)
                .replace('{1}', round(day))
                // .replace('{2}', round(day))
                .replace('{s}', s.symbol)
                .replace('{f}', 'click_symbol')
                .replace('{fc}', font_color)
                .replace('{fc}', font_color)
                // .replace('{date}', date)
                + '\n';

            html_table += template_row
                .replace('{s}', s.symbol)
                .replace('{symbol}', `${indicator} ${s.symbol}`)
                .replace('{c}', color)
                .replace('{c}', color)
                .replace('{name}', stock_symbols_detail.find((v) => v.symbol === s.symbol).name)
                .replace('{gain}', `${round2(g)}`)
                .replace('{day}', `${round2(day)}`)
                .replace('{c2}', color_day)
        });
        document.getElementById('symbol-boxes-positions').innerHTML = html;
        document.getElementById('symbol-names').value = config_stocks.symbols.join(',');
        document.getElementById('symbol-table-body').innerHTML = html_table;

        //* ALL SYMBOLS BY LETTER */
        html = '';

        // ,⏺,🔎︎
        'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,▶,⏸'.split(',').forEach((letter) => {
            html += template.replace('{id}', letter).replace('{c}', 'white').replace('{0}', letter).replace('{1}', '').replace('{s}', letter).replace('{f}', 'click_letter') + '\n';
        });
        // html += `<i class="fa fa-filter w3-right w3-margin-right w3-xlarge w3-text-blue" aria-hidden="true"></i>`;
        document.getElementById('letters').innerHTML = html;
    });

    //*@ ORDERS */
    config_stocks.alpaca.get_orders().then((result) => {
        ORDERS = result;
        console.log('ORDERS', ORDERS.slice(0, 25));
    });

    //*@ PORTFOLIO HISTORY */
    // start_date = getYMD(new Date(Date.now() - (((new Date().getDay() + 7) * 24 * 60 * 60 * 1000))))
    // start_date = '2026-01-05';
    config_stocks.alpaca.get_portfolio_history(null, start_date).then((result) => {
        PORTFOLIO_HISTORY = result;
        console.log('PORTFOLIO_HISTORY', PORTFOLIO_HISTORY);

        //* GENERATE CHART */
        series = { name: 'Close', type: 'area', data: [] };
        chart_top_5.options.chart.type = 'area';
        chart_top_5.options.chart.height = 400;
        chart_top_5.options.chart.sparkline = { enabled: true };
        chart_top_5.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
        chart_top_5.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
        chart_top_5.options.dataLabels.enabled = false;
        chart_top_5.options.fill = { type: 'solid' };

        chart_top_5.options.annotations = { xaxis: [], yaxis: [], points: [], };
        let last = 0;
        chart_top_5.options.annotations.points = PORTFOLIO_HISTORY.filter((v) => v.thm === 2000).map((v, i) => {
            const value = round((v.equity - last));
            last = v.equity;
            return add_annotation_point(v.e, v.equity, 4.5, colors.black, value);
            // return add_annotation_point(v.e, v.equity, 4.5, colors.black, round1(v.equity / 1000));
        })
        chart_top_5.options.annotations.points[chart_top_5.options.annotations.points.length - 1].label['offsetX'] = -25;
        chart_top_5.options.annotations.points[chart_top_5.options.annotations.points.length - 1].label['offsetY'] = 50;
        chart_top_5.options.annotations.points[chart_top_5.options.annotations.points.length - 1].marker.fillColor = colors.deeppink;

        // last = PORTFOLIO_HISTORY[PORTFOLIO_HISTORY.length - 1];
        // chart_top_5.options.annotations.points.push(add_annotation_point(last.e, last.equity, 6.5, colors.deeppink));
        // chart_top_5.options.annotations.xaxis.push(add_annotation_x(new Date('2026-01-02T16:00:00').getTime()));
        // chart_top_5.options.annotations.xaxis.push(add_annotation_x(new Date('2026-01-05T16:00:00').getTime()));

        data = PORTFOLIO_HISTORY.map((v) => { return { x: v.e, y: v.equity } });//.slice(-15);
        data.push({ x: Date.now(), y: +(ACCOUNT.equity) });
        chart_top_5.options.yaxis = { max: data[data.length - 1].y + 1000 };
        update_ui(chart_top_5);

        total = round(data[data.length - 1].y);
        const gain = round(round2(round(data[data.length - 1].y - data[0].y)));
        //* PORTFOLIO BALANCE */
        let elem = document.getElementById('top-portfolio-total');
        total < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');
        elem.innerHTML = `${get_indicator(gain)} ${gain.toLocaleString()}`;
        // document.getElementById('top-portfolio-total-pct').innerHTML = `${round1(total / (PROCESSED_DATA.symbols.length * 1000) * 100).toLocaleString()}%`;

        //* MONTH GAIN */
        elem = document.getElementById('gain-month');
        elem.innerHTML = `$${total.toLocaleString()}`;
    });

    //*@ PORTFOLIO 'DAY' HISTORY */
    // start_date = getYMD(new Date(Date.now() - (((new Date().getDay() + 7) * 24 * 60 * 60 * 1000))))
    // start_date = '2026-01-05';
    //@ get_portfolio_history(period = '1W', start = null, end = null, timeframe = '1D', reporting = 'extended_hours', pnl_reset = 'per_day') {
    config_stocks.alpaca.get_portfolio_history('1D', null, null, '1Min', 'continuous').then((result) => {
        PORTFOLIO_DAY_HISTORY = result;
        console.log('PORTFOLIO_DAY_HISTORY', PORTFOLIO_DAY_HISTORY);

        //* GENERATE CHART */
        series = { name: 'Close', type: 'area', data: [] };
        chart_top_7.options.chart.type = 'area';
        chart_top_7.options.chart.height = 400;
        chart_top_7.options.chart.sparkline = { enabled: true };
        chart_top_7.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
        chart_top_7.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
        chart_top_7.options.dataLabels.enabled = false;
        chart_top_7.options.fill = { type: 'solid' };

        chart_top_7.options.annotations = { xaxis: [], yaxis: [], points: [], };
        let last = 0;
        // chart_top_7.options.annotations.points = PORTFOLIO_DAY_HISTORY.filter((v) => v.thm === 2000).map((v, i) => {
        //     const value = round((v.equity - last));
        //     last = v.equity;
        //     return add_annotation_point(v.e, v.equity, 4.5, colors.black, value);
        //     // return add_annotation_point(v.e, v.equity, 4.5, colors.black, round1(v.equity / 1000));
        // })

        // last = PORTFOLIO_DAY_HISTORY[PORTFOLIO_DAY_HISTORY.length - 1];
        // chart_top_7.options.annotations.yaxis.push(add_annotation_y(last.equity));
        
        PORTFOLIO_DAY_HISTORY.forEach((v) => {
            const label = {
                400: '4 am',
                930: '9:30',
                1100: '11 am',
                1600: '4 pm',
                2000: '8 pm',
            }
            if ([/*0,*/ 400, 930, 1100, 1600, 2000].indexOf(v.thm) >= 0) {
                chart_top_7.options.annotations.xaxis.push(add_annotation_x(v.e, label[v.thm] || v.thm, v.thm === 0 ? colors.deeppink : colors.black));
            }
        })
        // const first = PORTFOLIO_DAY_HISTORY[0];
        // chart_top_7.options.annotations.points.push(add_annotation_point(last.e, last.equity - first.equity, 4.5, colors.deeppink, '123'))
        // chart_top_5.options.annotations.xaxis.push(add_annotation_x(new Date('2026-01-05T16:00:00').getTime()));

        data = PORTFOLIO_DAY_HISTORY.map((v) => { return { x: v.e, y: v.equity } });//.slice(-15);
        // chart_top_7.options.yaxis = { max: data[data.length - 1].y + 250 };
        
        //! only needed if timeframe !== '1Min'
        // data.push({ x: Date.now(), y: +(ACCOUNT.equity) });

        last = data[data.length - 1];
        const yesterday = chart_top_5.options.annotations.points[chart_top_5.options.annotations.points.length-1];
        chart_top_7.options.annotations.yaxis.push(add_annotation_y(last.y));

        // chart_top_7.options.yaxis = { max: data[data.length - 1].y + 1000 };
        update_ui(chart_top_7);

        total = round(data[data.length - 1].y);
        const gain = round(round2(round(data[data.length - 1].y - yesterday.y)));
        //* PORTFOLIO BALANCE */
        let elem = document.getElementById('top-portfolio-day-total');
        gain < 0 ? elem.classList.replace('w3-green', 'w3-red') : elem.classList.replace('w3-red', 'w3-green');
        elem.innerHTML = `${get_indicator(gain)} ${Math.abs(gain).toLocaleString()}`;
        // document.getElementById('top-portfolio-total-pct').innerHTML = `${round1(total / (PROCESSED_DATA.symbols.length * 1000) * 100).toLocaleString()}%`;

        //* MONTH GAIN */
        elem = document.getElementById('gain-today');
        gain < 0 ? elem.classList.replace('w3-text-green', 'w3-text-red') : elem.classList.replace('w3-text-red', 'w3-text-green');
        elem.innerHTML = `${(Math.abs(round2(total / yesterday.y * 100) - 100)).toLocaleString()}%`;
        // elem.innerHTML = `$${(data[data.length-1].y - data[0].y).toLocaleString()}`;
    });
}

//@-----------------------------------------------------------------------------------------------------------------
//@ CLICK SYMBOL
//@-----------------------------------------------------------------------------------------------------------------
let selected_symbol = null;
async function click_symbol(s, elem, check_score = false) {
    selected_symbol = s;
    if (elem) {
        Array.from(document.getElementsByClassName('symbol')).forEach((v) => v.classList.replace('w3-green', 'w3-white'));
        elem.classList.replace('w3-white', 'w3-green');
    }
    document.getElementById('symbol-buy').classList.remove('w3-hide');
    document.getElementById('symbol-sell').classList.remove('w3-hide');

    const tz = new Date(`2025-04-01T12:00:00`).getTimezoneOffset() / 60;
    const start = new Date(`2025-04-01T00:00:00-0${tz}:00`);
    const end = new Date(`${getYMD(new Date())}T23:59:59-0${tz}:00`);


    let series = [
        { name: 'Close', _type: 'line', data: [] },
        { name: 'Open', type: 'line', color: colors.blue, data: [] },
        // { name: 'Lower Bound', type: 'line', color: colors.red, data: [] },
    ];
    // let entry = PROCESSED_DATA.symbols.find((v) => v.symbol === s);
    // if (!entry) {
    const temp = await config_stocks.alpaca.bars_simplified([s], start.toISOString());
    let entry = temp.symbols[0];
    // }

    // const bars = entry.bars.slice(num_symbol_days) || []; //* recent days
    const bars_source = use_raw ? entry.bars_raw : entry.bars;
    if (entry.latest_raw && entry.latest) {
        bars_source.push(use_raw ? entry.latest_raw : entry.latest);
    }
    const bars = (num_symbol_days === -15 ? bars_source/*.slice(-40)*/ : bars_source); //* recent 5 minute data
    const num = 1000 / entry.bars_raw[0].o;
    series[0].data = bars.map((b) => { return { x: b.e, y: round2(b.c) } });
    // series[0].data.push({x: entry.latest.e, y: entry.latest.c });
    // if (num_symbol_days !== -15) {
    series[1].data = bars.map((b) => { return { x: b.e, y: round2(b.o) } });
    // series[2].data = bars.map((b) => { return { x: b.e, y: round2((b.lb * num) * (config_stocks.alpaca.CONFIG.stop_pct)) } });

    let tl = calculateTrendline(series[0].data.map((v) => v.y));
    series.push({ name: 'Trendline', type: 'line', color: colors.orange, data: series[0].data.map((v, i) => { return { x: v.x, y: round2(tl.calculateY(i)) } }) });


    // tl = calculateTarget(series[0].data.map((v) => v.y), 0.25, 1000);
    // series.push({ name: 'Target 0.5%', type: 'line', color: colors.purple, data: series[0].data.map((v, i) => { return { x: v.x, y: round2(tl.calculateY(i)) } }) });

    if (use_raw === false) {
        tl = calculateTarget(series[0].data.map((v) => v.y), 0.5, 1000);
        series.push({ name: 'Target 0.5%', type: 'line', color: colors.deeppink, data: series[0].data.map((v, i) => { return { x: v.x, y: round2(tl.calculateY(i)) } }) });


        tl = calculateTarget(series[0].data.map((v) => v.y), 1, 1000);
        series.push({ name: 'Target 1%', type: 'line', color: colors.purple, data: series[0].data.map((v, i) => { return { x: v.x, y: round2(tl.calculateY(i)) } }) });
    }

    treemap_symbol_days.options.chart.type = 'area';
    treemap_symbol_days.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
    treemap_symbol_days.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
    treemap_symbol_days.options.chart.sparkline = { enabled: true };
    treemap_symbol_days.options.dataLabels.enabled = false;
    treemap_symbol_days.options.fill = { type: 'solid' };
    treemap_symbol_days.options.xaxis = { type: 'datetime' };
    treemap_symbol_days.options.stroke = { width: [3, 3, 4, 4, 4], };
    treemap_symbol_days.options.annotations = { xaxis: [], yaxis: [], points: [] };
    last_n = getMonthName(new Date(series[0].data[0].x));
    series[0].data.forEach((v, i) => {
        const n = getMonthName(new Date(v.x));
        if (n !== last_n || i === series[0].data.length - 1 || i === (series[0].data.length - (new Date().getDay() - 2))) {
            treemap_symbol_days.options.annotations.xaxis.push({ x: v.x, borderColor: colors.black, fillColor: colors.black, opacity: 1 });
            // line_combtreemap_symbol_daysined_last_n.options.annotations.points.push({ x: v.x, y: v.y, marker: { radius: 5, fillColor: '#7fff00' } });
        }
        last_n = n;

        if (bars[i].thm === 930 || bars[i].thm === 1600) {
            treemap_symbol_days.options.annotations.points.push({ x: v.x, y: v.y, marker: { size: 6, fillColor: colors.orange } });

            //* order
            // if (bars[i].thm === 930) {
            //     treemap_symbol_days.options.annotations.points.push({ x: v.x, y: entry.orders[0].filled_avg_price, marker: { size: 6, fillColor: colors.deeppink } });
            // }
        }
    })
    const max = Math.max(...series[0].data.map((v) => v.y));
    treemap_symbol_days.options.annotations.points.push({ x: series[0].data[series[0].data.length - 1].x, y: series[0].data[series[0].data.length - 1].y, marker: { size: 6, fillColor: colors.black } });
    treemap_symbol_days.options.annotations.yaxis.push({ y: max, borderColor: colors.black, fillColor: colors.black, _opacity: 0 });

    //* ADD BUY DATE LINE TO CHART */
    const order = ORDERS
        // .filter((v) => v.side === 'buy')
        .filter((v) => v.symbol === s)
        ;
    if (order[0] && order[0].side === 'buy') {
        const filled_at = new Date(order[0].filled_at);
        const g = +(POSITIONS.find((v) => v.symbol === s).unrealized_pl);
        treemap_symbol_days.options.annotations.xaxis.push({
            x: filled_at.getTime(),
            x2: Date.now(),
            borderColor: colors.black,
            fillColor: colors.gray,
            opacity: 0.15,
            label: {
                text: `${g >= 0 ? '▲' : '▼'} ${round(g)} `,
                borderColor: g >= 0 ? colors.green : colors.red,
                borderWidth: 2,
                orientation: 'horizontal',
                offsetX: -30,
                offsetY: 20,
                style: {
                    fontSize: '22px',
                    // background: g >= 0 ? colors.green : colors.red,
                },
            },
        });
        console.log(filled_at);
    }

    //* RENNDER CHART */
    data = series;
    update_ui(treemap_symbol_days);
    // data = data.map((d) => d.data.slice(-15));
    treemap_symbol_days_recent.options = deepClone(treemap_symbol_days.options);
    data = deepClone(data);
    data.forEach((d) => {
        d.data = d.data.slice(-25);
    })
    update_ui(treemap_symbol_days_recent);

    //* CHART TITLE */
    const detail = stock_symbols_detail.find((v) => v.symbol === s);
    const g = round((series[0].data[series[0].data.length - 1].y - series[0].data[0].y));// * (1000 / series[0].data[0].y));
    const last = series[0].data[series[0].data.length - 1].y;
    const trend_delta = series[2].data[series[2].data.length - 1].y - series[2].data[0].y;
    let color = g >= 0 ? 'w3-green' : 'w3-red';
    let html = '';
    html += `${get_indicator(g)} ${s}`;
    html += `${detail && detail.name ? (' | ' + detail.name) : ''}`;
    html += `&nbsp;&nbsp;|&nbsp;&nbsp;<span class="_w3-right ${color} w3-padding">$${g.toLocaleString()}</span>`;
    // html += `&nbsp;&nbsp;|&nbsp;&nbsp;$ ${round(max - last).toLocaleString()}`;
    html += `&nbsp;&nbsp;|&nbsp;&nbsp;$ ${round(trend_delta).toLocaleString()}`;
    document.getElementById('symbol-days-title').innerHTML = html;

    // window.scrollTo(0, document.body.scrollHeight);

    //* ADD IF SCORE IS HIGH
    if (trend_delta > 1000 && check_score) {
        click_letter('⏺');
    }
}
function m3_129() {
    config_stocks.alpaca.bars_simplified(
        'AAOI,ABVX,AEIS,AENT,AIP,ALNT,AMKR,ANAB,ANNX,ARWR,ATEC,ATRO,AUPH,AVDL,AUPH,AXTI,B,BBIO,BELFB,BIOA,BLTE,BTSG,CECO,CELC,CENX,CG,CMPX,CMTL,COPX,CTMX,DHC,DNTH,DOOO,DSGN,DYN,ENTA,ERAS,ESPR,EYPT,FBIO,FIVE,FLEX,FLNC,FORM,FSLR,FTRE,FULC,GCT,GDX,GH,GLTR,GLUE,GNOM,GOOG,GOOGL,GRAL,GSAT,GTX,HOOD,IDYA,IESC,IHRT,IMNM,INDV,INSM,IONS,JBIO,JOYY,KNSA,KOD,LASR,LGND,LITE,LMND,LQDA,LRCX,LYEL,MKSI,MU,NAUT,NEM,NESR,NXT,ORKA,PALL,PBYI,PHAT,PL,PLTR,POWL,PRAX,PRLD,PTGX,RAPP,RAPT,REAL,REMX,RLAY,ROIV,RVMD,SEPN,SETM,SHLS,SLV,SMTC,SNDK,STRO,SVRA,TBPH,TCMD,TER,TLN,TNGX,TORO,TRVI,TSEM,TTMI,TYRA,UPB,VICR,VRDN,WBD,WDC,WLDN,XMTR,XPEL,ZBIO,ZEUS,ZYME'.split(','),
        '2025-04-01'
    )
        .then((v) => {
            console.log(v);
            console.log(`%c$${round(v.total / 129 * 50).toLocaleString()}`, 'color:yellow;')
        });
}
