const combine_data = (symbols, seed_per_symbol = 1000, add_per_month = 0 * 1000) => {

    const result = [];
    const xy = (x, y) => { return { x: x, y: y } };
    const push = (x, y) => { result.push(xy(x, y)); }
    const annotations = [];

    const epochs = symbols.map((b) => b.map((v) => v.e)).flat().filter((v, i, a) => i === a.indexOf(v)).sort((a, b) => a - b);
    let e = Math.min(...epochs);
    const e2 = Math.max(...epochs);
    epochs.forEach((ee) => {
        const m = new Date(ee).getMonth() - 2;
        const seed_base = symbols.length * seed_per_symbol;
        const seed = (seed_base) + (m * add_per_month);
        let y = 0;
        symbols.forEach((b, i) => {
            // b = b.slice(13);
            const entry = b.find((vv) => vv.e === ee);
            const o = b[0].o;
            // y += entry ? ((entry.c) * ((seed / symbols.length) / o)) : 0;    //! do NOT use this - [0] is not the buy price & only chart
            y += entry ? entry.c : 0;                                           //! delta gain is already calculated from [0]

            if ((i === (symbols.length - 1) && entry) && (entry.thm === 930 || entry.thm === 1600)) {
                annotations.push({ x: entry.e, y, marker: { size: 4.5, fillColor: entry.thm === 930 ? colors.orange : colors.black } });
            }
        });

        push(ee, round(y));
    });
    const annotations_x = [];
    let last = 0;
    // let m = getMonthName(new Date(result[0].x));
    let m = getYMD(new Date(result[0].x));
    result.forEach((v, i) => {
        // const cm = getMonthName(new Date(v.x));
        const cm = getYMD(new Date(v.x));

        if (cm !== m /*|| i === combined.data.length - 1*/) {
            const diff = round1((v.y - last));
            last = v.y;
            annotations_x.push({ x: v.x, y: v.y, label: { text: diff, style: { fontSize: '22px' } }, marker: { size: 4.5, fillColor: colors.black } });
            m = cm;
        }
    });
    const temp = result[result.length - 1].y;
    annotations.push({ x: result[result.length - 1].x, y: temp, label: { text: round1((temp - last) / 1000), offsetX: -30, offsetY:  50, style: { fontSize: '22px' } }, marker: { size: 6, fillColor: colors.deeppink } });
    return { data: result, annotations, annotations_x };
};
/**
 * iterate the data and create seperate {x,y} series based on timeframe windows
 * @param {*} combined_data the x,y data that represents the potential (hold for entire window)
 */
const summarize_combined_data = (symbols) => {

    //* make a clone */
    symbols = deepClone(symbols);

    //* add meta fields */
    const symbols_raw = {};
    symbols.forEach((s) => {
        symbols_raw[s.symbol] = [];
        s.bars_raw.forEach((b) => {
            const d = new Date(b.e);
            symbols_raw[s.symbol].push({
                s: s.symbol,
                c: b.c,
                o: b.o,
                dow: d.getDate(),
                day: getYMD(d),
                week: getWeekName(d),
                month: getMonthName(d),
                quarter: getQuarterName(d),
                year: d.getFullYear(),
                e: b.e,
                // tl: b.tl,
            })
        })
    })
    //! console.log(symbols_raw);

    //* summarize */
    const seed = 1000;
    const obj = {};
    Object.values(symbols_raw).forEach((bars) => { // Array
        // dow,week,month,quarter
        [...'day,week,month,quarter,year'.split(',')].forEach((field) => {

            let last = null;
            let last_value = bars[0].c;
            let qty = (seed / bars[0].c);
            bars.forEach((v, i) => {

                if (!obj[field]) {
                    obj[field] = {};
                }

                //* update the totals for the window */
                let key = i === bars.length - 1 ? v[field] + '_2' : v[field];
                if (!obj[field][key]) {
                    obj[field][key] = 0;
                }

                if (last !== v[field] || i === bars.length - 1) {
                    obj[field][key] += (v.c - last_value) * qty;
                    last_value = v.c;
                    qty = (seed / v.c);
                }
                last = key; // updates the last field name
            });
        });
    });
    //*  */
    Object.keys(obj).forEach((k) => {
        // console.log('--------------------------------------------------------------------------');
        // console.log(`%c${k.toUpperCase()} SUM: $${round2(Object.values(obj[k]).reduce((p, c) => p + c)).toLocaleString()}`, 'color:yellow;')

        const t_sum = round2(Object.values(obj[k]).reduce((p, c) => p + c));
        const t_avg = round2(t_sum / (Object.values(obj[k]).length - 1));

        const count = Object.keys(symbols_raw).length;
        const t_sum_50 = round2(Object.values(obj[k]).reduce((p, c) => p + c) / count * 50);
        const t_avg_50 = round2(t_sum / (Object.values(obj[k]).length - 1) / count * 50);

        const t_sum_75 = round2(Object.values(obj[k]).reduce((p, c) => p + c) / count * 75);
        const t_avg_75 = round2(t_sum / (Object.values(obj[k]).length - 1) / count * 75);

        // console.group(`%c${k.toUpperCase()} SPLIT SUM | $${t_sum.toLocaleString()} | $${t_sum_50.toLocaleString()} @ 50K | $${t_sum_75.toLocaleString()} @ 75K`, 'color:yellow;');
        // console.log(`%c${k.toUpperCase()} SPLIT AVG | $${t_avg.toLocaleString()} | $${t_avg_50.toLocaleString()} @ 50K | $${t_avg_75.toLocaleString()} @ 75K`, 'color:orange;');
        // console.groupEnd();
        obj[k + '_'] = { t_sum, t_avg };
        // obj[k + '_avg'] = t_avg;
    });

    //* CORRECT LABELS */
    let corrected = {};
    const correct_labels = (o) => {
        corrected = {};
        Object.keys(o).forEach((k) => { o[k] !== 0 ? corrected[get_map_label(k)] = o[k] : null; });
        return corrected;
    };
    obj['month'] = correct_labels(obj.month);
    obj['quarter'] = correct_labels(obj.quarter);

    //* getYMD(new Date(new Date('2025_05_May'.replace('_','-').substring(0,7)+'-01T00:00:00').getTime() - (24*60*60*1000)))
    const m = (d) => { return new Date(d.getTime() - (24 * 60 * 60 * 1000)) };
    obj['day_']['xy'] = Object.entries(obj.day).map((v, i) => { return { x: new Date(v[0] + '-01T00:00:00').getTime(), y: round2(v[1]) } });
    // obj['week_']['xy'] = Object.entries(obj.week).map((v, i) => { return { x: new Date(v[0].replace('_', '-') + '-01T00:00:00').getTime(), y: round2(v[1]) } });
    obj['month_']['xy'] = Object.entries(obj.month).map((v, i) => { return { x: new Date(v[0].replace('_', '-').substring(0, 7) + '-01T00:00:00').getTime(), y: round2(v[1]) } });
    obj['quarter_']['xy'] = Object.entries(obj.quarter).map((v, i) => { return { x: new Date(v[0].replace('_', '-').substring(0, 7) + '-01T00:00:00').getTime(), y: round2(v[1]) } });
    //! console.log(obj);
    // console.log(combined_data);
    return obj;
}

/**
 * iterate the data and create seperate {x,y} series based on timeframe windows
 * @param {*} combined_data the x,y data that represents the potential (hold for entire window)
 */
// const _summarize_combined_data = (combined_data) => {

//     //* make a clone */
//     combined_data = deepClone(combined_data);

//     //* add meta fields */
//     combined_data.forEach((v) => {
//         const d = new Date(v.x);
//         // v.tl = d.toLocaleString();
//         v.dow = d.getDate();
//         v.day = getYMD(d);
//         v.week = getWeekName(d);
//         v.month = getMonthName(d);
//         v.quarter = getQuarterName(d);
//     })

//     //* summarize */
//     const obj = {};
//     let last = null;
//     let last_value = 0;
//     // dow,week,month,quarter
//     [...'week,month,quarter'.split(',')].forEach((field) => {
//         obj[field] = {};
//         last = null;
//         last_value = combined_data[0].y;
//         combined_data.forEach((v, i) => {
//             if (last !== v[field] || i === combined_data.length - 1) {
//                 obj[field][i === combined_data.length - 1 ? v[field] + '_2' : v[field]] = v.y - last_value;
//                 last_value = v.y;
//             }
//             last = v[field];
//         });
//     })
//     console.log(obj);
//     console.log(combined_data);
// }