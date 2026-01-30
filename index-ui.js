//@---------------------------------------------------------------------------------------------------------------------------------
//@ -----------------------------------------              UI Event Handlers               -----------------------------------------
//@---------------------------------------------------------------------------------------------------------------------------------

//#----------------------------
//# click config
//#----------------------------
function click_config(name) {
    console.log(name);
    ['positions', 'filtered', 'symbols'].forEach((v) => {
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
//# set use raw
//#----------------------------
function set_use_raw(checked) {
    use_raw = checked ? true : false;
}

//#----------------------------
//# set use filter
//#----------------------------
function set_use_filter(checked) {
    use_filter = checked ? true : false;
}

//#----------------------------
//# key down
//#----------------------------
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('symbol')) {
        console.log(event);
        if (event.altKey) {
            //* DELETE */
            document.getElementById(selected_symbol).classList.remove('w3-border');
            document.getElementById(selected_symbol).classList.remove('w3-border-blue');
            document.getElementById(selected_symbol).style.border = '';

            const elem = document.getElementById('likes');
            let value = elem.value || localStorage.getItem('m3-stocks-likes');
            value = value.replace(`,${selected_symbol}`, '');
            value = value.split(',').filter((v, i, a) => i === a.indexOf(v)).sort().join(',');
            elem.value = value;
            update_settings(false);
        } else if (event.ctrlKey) {
            //* ADD */
            document.getElementById(selected_symbol).classList.add('w3-border');
            document.getElementById(selected_symbol).classList.add('w3-border-blue');

            const elem = document.getElementById('likes');
            let value = elem.value || localStorage.getItem('m3-stocks-likes');
            value += `,${selected_symbol}`;
            value = value.split(',').filter((v, i, a) => i === a.indexOf(v)).sort().join(',');
            elem.value = value;
            update_settings(false);
        }
    }
});

//#----------------------------
//# key down
//#----------------------------
document.addEventListener('keydown', function (event) {
    // Check if the Ctrl key is pressed (event.ctrlKey is true)
    // and if the pressed key is the plus sign (event.key is '+')
    if (/*event.ctrlKey &&*/ event.key === '+') {
        // Prevent the default browser action (usually zooming in)
        event.preventDefault();
        // console.log('Ctrl + + was pressed!');
        click_letter('⏺');

        document.getElementById(selected_symbol).classList.add('w3-border');
        document.getElementById(selected_symbol).classList.add('w3-border-black');

        const elem = document.getElementById('likes');
        let value = localStorage.getItem('m3-stocks-likes');
        value += value === '' ? `${selected_symbol}` : `,${selected_symbol}`;
        value = value.split(',').filter((v, i, a) => i === a.indexOf(v)).sort().join(',');
        elem.value = value;
        localStorage.setItem('m3-stocks-likes', value);
        update_settings(false);
    }
    if (/*event.ctrlKey &&*/ event.key === '-') {
        // Prevent the default browser action (usually zooming in)
        event.preventDefault();

        document.getElementById(selected_symbol).classList.remove('w3-border');
        document.getElementById(selected_symbol).classList.remove('w3-border-blue');
        document.getElementById(selected_symbol).style.border = '';

        const elem = document.getElementById('likes');
        let value = localStorage.getItem('m3-stocks-likes');
        value = value.replace(`${selected_symbol}`, '').replace(`,,`, ',');
        value = value.split(',').filter((v, i, a) => i === a.indexOf(v)).sort().join(',');
        elem.value = value;
        localStorage.setItem('m3-stocks-likes', value);
        update_settings(false);
    }
});

//#----------------------------
//# click letter
//#----------------------------
let symbols_list = '';
let selected_letter = 'A';
let pause = false;
async function click_letter(letter) {
    if (letter === '▶' || letter === '⏸' || letter === '⏺') {
        let last = null;

        if (letter === '▶') {
            let filtered = stock_symbols_detail.filter((v) => v.symbol.startsWith(selected_letter));
            if (use_filter) {
                filtered = filtered.filter((v) => (Array.isArray(likes) ? likes : likes.split(',')).indexOf(v.symbol) >= 0)
            }
            for await (const s of filtered) {
                while (pause) {
                    await sleep(1000);
                }
                const l = s.symbol.slice(0, 1).toUpperCase();
                if (l !== last) {
                    click_letter(l);
                    last = l;
                    await sleep(1000);
                }
                click_symbol(s.symbol, document.getElementById(s.symbol), true);
                await sleep(2 * 1000);
            }
            console.log(symbols_list);
        }
        if (letter === '⏸') {
            pause = !pause;
        }
        if (letter === '⏺') {
            symbols_list += symbols_list === '' ? selected_symbol : ',' + selected_symbol
            console.log(symbols_list);
        }
    } else {
        selected_letter = letter;

        //* alpaca symbols list */
        let filtered = stock_symbols_detail.filter((v) => v.symbol.startsWith(letter));
        if (use_filter) {
            filtered = filtered.filter((v) => (Array.isArray(likes) ? likes : likes.split(',')).indexOf(v.symbol) >= 0)
        }

        //* nasdaq symbols list */
        // const filtered = nasdaq_symbols().filter((v) => v.symbol.startsWith(letter));
        const template = `<span id="{id}" 
            class="symbol w3-tag w3-round w3-padding w3-white" 
            style="color:{fc} !important;border:{b};cursor:pointer;min-width:85px;margin-bottom:5px;" 
            onclick="click_symbol('{s}', this)">
            <span class="{c} w3-badge w3-dark-grey w3-text-white"> {s}</span>
            {0}
        </span>`
        let html = '';
        // filtered.map((v) => v.symbol).sort().forEach((symbol) => {
        filtered.forEach((symbol) => {
            const s = symbol.symbol;
            const n = symbol.name || '_';
            const fc = s.endsWith('/USD') ? 'blue' : 'black'
            let sector = 'U';
            sector = n.toLowerCase().indexOf('mining') >= 0 ? 'M' : sector;
            sector = n.toLowerCase().indexOf('mine') >= 0 ? 'M' : sector;
            sector = n.toLowerCase().indexOf('precious') >= 0 ? 'M' : sector;
            sector = n.toLowerCase().indexOf('tech') >= 0 ? 'T' : sector;
            // const border = `${likes.indexOf(s) >= 0 ? '2px solid blue' : ((config_stocks.symbols.indexOf(s) > 0 ? '3px solid black' : ''))}`;
            html += template
                .replace('{id}', s)
                .replace('{0}', s)
                .replace('{s}', s)
                .replace('{fc}', fc)
                .replace('{s}', sector)
                .replace('{c}', sector === 'U' ? 'w3-hide' : '')
                .replace('{b}',
                    picks.indexOf(s) >= 0 ? '3px solid blue' : likes.indexOf(s) >= 0 ? '3px solid black' : '') + '\n';
        });
        document.getElementById('symbols-for-letter').innerHTML = html;
    }
}

//#----------------------------
//# click symbol
//#----------------------------
// async function click_symbol(s, elem) {
//     if (elem) {
//         Array.from(document.getElementsByClassName('symbol')).forEach((v) => v.classList.replace('w3-green', 'w3-white'));
//         elem.classList.replace('w3-white', 'w3-green');
//     }

//     const tz = new Date(`2025-04-01T12:00:00`).getTimezoneOffset() / 60;
//     const start = new Date(`2025-04-01T00:00:00-0${tz}:00`);
//     const end = new Date(`${getYMD(new Date())}T23:59:59-0${tz}:00`);


//     let series = [
//         { name: 'Close', _type: 'line', data: [] },
//         { name: 'Open', type: 'line', color: colors.blue, data: [] },
//         { name: 'Lower Bound', type: 'line', color: colors.red, data: [] },
//     ];
//     let entry = config_stocks.data.find((v) => v.symbol === s);
//     if (!entry) {
//         entry = await alpaca.bars(s, '1D', start.toISOString(), end.toISOString(), [], []);
//     }

//     // const bars = entry.bars.slice(num_symbol_days) || []; //* recent days
//     const bars = (num_symbol_days === -15 ? entry.recent.bars : entry.bars/*.slice(num_symbol_days)*/) || []; //* recent 5 minute data
//     const num = 1000 / bars[0].o;
//     series[0].data = bars.map((b) => { return { x: b.e, y: round2(b.c * num) } });
//     if (num_symbol_days !== -15) {
//         series[1].data = bars.map((b) => { return { x: b.e, y: round2(b.o * num) } });
//         series[2].data = bars.map((b) => { return { x: b.e, y: round2((b.lb * num) * (config_stocks.alpaca.CONFIG.stop_pct)) } });

//         const tl = calculateTrendline(series[0].data.map((v) => v.y));
//         series.push({ name: 'Trendline', type: 'line', color: colors.black, data: series[0].data.map((v, i) => { return { x: v.x, y: round2(tl.calculateY(i)) } }) });
//     }

//     treemap_symbol_days.options.chart.type = 'area';
//     treemap_symbol_days.options.xaxis = { type: 'datetime', labels: { datetimeUTC: true, } };
//     treemap_symbol_days.options.tooltip.x.formatter = function (value, timestamp) { return new Date(value).toLocaleString(); };
//     treemap_symbol_days.options.chart.sparkline = { enabled: true };
//     treemap_symbol_days.options.dataLabels.enabled = false;
//     treemap_symbol_days.options.fill = { type: 'solid' };
//     treemap_symbol_days.options.xaxis = { type: 'datetime' };
//     treemap_symbol_days.options.stroke = { width: [3, 4, 4, 4], };
//     treemap_symbol_days.options.annotations = { xaxis: [], points: [] };
//     last_w = getWeekName(new Date(series[0].data[0].x));
//     series[0].data.forEach((v, i) => {
//         const w = getWeekName(new Date(v.x));
//         if (w !== last_w) {
//             treemap_symbol_days.options.annotations.xaxis.push({ x: v.x, borderColor: colors.black, fillColor: colors.black, opacity: 1 });
//             // line_combtreemap_symbol_daysined_last_n.options.annotations.points.push({ x: v.x, y: v.y, marker: { radius: 5, fillColor: '#7fff00' } });
//         }
//         last_w = w;

//         if (bars[i].thm === 930 || bars[i].thm === 1600) {
//             treemap_symbol_days.options.annotations.points.push({ x: v.x, y: v.y, marker: { size: 6, fillColor: colors.orange } });

//             //* order
//             // if (bars[i].thm === 930) {
//             //     treemap_symbol_days.options.annotations.points.push({ x: v.x, y: entry.orders[0].filled_avg_price, marker: { size: 6, fillColor: colors.deeppink } });
//             // }
//         }
//     })
//     treemap_symbol_days.options.annotations.points.push({ x: series[0].data[series[0].data.length - 1].x, y: series[0].data[series[0].data.length - 1].y, marker: { size: 6, fillColor: colors.black } });

//     data = series;
//     update_ui(treemap_symbol_days);

//     const detail = stock_symbols_detail.find((v) => v.symbol === s);
//     const g = round((series[0].data[series[0].data.length - 1].y - series[0].data[0].y));// * (1000 / series[0].data[0].y));
//     let html = '';
//     html += `${get_indicator(g)} ${s}`;
//     html += `${detail && detail.name ? (' | ' + detail.name) : ''}`;
//     html += `&nbsp;&nbsp;|&nbsp;&nbsp;$ ${g}`;
//     document.getElementById('symbol-days-title').innerHTML = html;

//     window.scrollTo(0, document.body.scrollHeight);
// }

//#----------------------------
//# toggle settings
//#----------------------------
function toggle_settings() {
    document.getElementById('key').value = localStorage.getItem('m3-stocks-key') || '';
    document.getElementById('secret').value = localStorage.getItem('m3-stocks-secret') || '';
    document.getElementById('token').value = localStorage.getItem('m3-stocks-token') || '';
    document.getElementById('symbols').value = picks;
    document.getElementById('likes').value = likes;
    document.getElementById('steady_picks').value = steady;
    document.getElementById('settings').classList.toggle('w3-hide');


    click_account(ACCOUNT_NAME)
}

//#----------------------------
//# update settings
//#----------------------------
function load_settings() {

}
// const ACCOUNT_NAME = 'account-name';
function get_setting(name) {
    return localStorage[`m3-stocks-${name}`] || '';
}
function set_setting(name, value) {
    localStorage[`m3-stocks-${name}`] = value;
    // console.log(localStorage[`m3-stocks-${name}`]);
}

//#----------------------------
//# update settings
//#----------------------------
function update_settings(all = true) {
    if (all) {
        localStorage.setItem(`m3-stocks-${ACCOUNT_NAME}-alpaca-key`, document.getElementById('key').value);
        localStorage.setItem(`m3-stocks-${ACCOUNT_NAME}-alpaca-secret`, document.getElementById('secret').value);
        // localStorage.setItem('m3-stocks-token', document.getElementById('token').value);
    }
    let v = document.getElementById('symbols').value || localStorage.getItem(`m3-stocks-${ACCOUNT_NAME}-symbols`);
    localStorage.setItem(`m3-stocks-${ACCOUNT_NAME}-symbols`, v);
    picks = v;

    v = document.getElementById('start_date').value || localStorage.getItem(`m3-stocks-${ACCOUNT_NAME}-start-at`);
    localStorage.setItem(`m3-stocks-${ACCOUNT_NAME}-start-at`, v);
    // picks = v;

    v = document.getElementById('seed').value || localStorage.getItem(`m3-stocks-${ACCOUNT_NAME}-seed`);
    localStorage.setItem(`m3-stocks-${ACCOUNT_NAME}-seed`, v);
    // picks = v;

    // v = document.getElementById('likes').value || localStorage.getItem('m3-stocks-likes');
    // localStorage.setItem('m3-stocks-likes', v);
    // likes = v;

    // v = document.getElementById('steady_picks').value || localStorage.getItem('m3-stocks-steady');
    // localStorage.setItem('m3-stocks-steady', v);
    // steady = v;

    // steady = document.getElementById('steady_picks').value;
    console.yellow('settings updated');
    // document.getElementById('settings').classList.toggle('w3-hide');
}

//#----------------------------
//# click account
//#----------------------------
let ACCOUNT_NAME = localStorage.getItem(`m3-stocks-account-name`) || 'paper';
function click_account(value) {
    localStorage.setItem(`m3-stocks-account-name`, value);
    ACCOUNT_NAME = value;
    document.getElementById('key').value = localStorage.getItem(`m3-stocks-${ACCOUNT_NAME}-alpaca-key`) || '';
    document.getElementById('secret').value = localStorage.getItem(`m3-stocks-${ACCOUNT_NAME}-alpaca-secret`) || '';
    document.getElementById('seed').value = localStorage.getItem(`m3-stocks-${ACCOUNT_NAME}-seed`) || '1000';
    document.getElementById('start_date').value = localStorage.getItem(`m3-stocks-${ACCOUNT_NAME}-start-at`) || '2026-01-01';
    document.getElementById('symbols').value = localStorage.getItem(`m3-stocks-${ACCOUNT_NAME}-symbols`) || '';
    // document.getElementById('token').value = localStorage.getItem(`m3-stocks-token-${value}`) || 'NONE';
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
//# buy symbol
//#----------------------------
function buy_symbol() {
    const confirmed = confirm('are you sure you want to BUY symbol?');
    if (confirmed) {
        const seed = 1000; //1000;
        config_stocks.alpaca.buy(selected_symbol, seed).then((res) => {
            console.log(res);
        });
    }
}

//#----------------------------
//# buy all
//#----------------------------
function buy_all() {
    const confirmed = confirm('are you sure you want to BUY ALL all symbols?');
    if (confirmed) {
        const seed = 1000; //1000;
        config_stocks.alpaca.buy_symbols(config_stocks.symbols.join(','), seed).then((res) => {
            console.log(res);
        });
    }
}

//#----------------------------
//# liquidate - sell all symbols
//#----------------------------
function liquidate() {
    const confirmed = confirm('are you sure you want to LIQUIDATE all positions?');
    if (confirmed) {
        config_stocks.alpaca.liquidate().then((res) => {
            console.log(res);
        });
    }
}
//#----------------------------
//# sell symbol
//#----------------------------
function sell_symbol() {
    const confirmed = confirm('are you sure you want to SELL position?');
    if (confirmed) {
        config_stocks.alpaca.sell(selected_symbol).then((res) => {
            console.log(res);
        });
    }
}

//#----------------------------
//# INIT
//#----------------------------
toggleSymbolDayChart();