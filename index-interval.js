//#-------------------------------------------
//# UPDATE EACH MINUTE
//#-------------------------------------------
let refresh = true;
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
    if (!init || (d.getSeconds() === 1 && refresh)) {
        init = true;
        if (d.getDay() === 0 || d.getDay() === 6) {
            // refresh = false;
            // console.log('%cREFRESH DISABLED', 'color:yellow;')
        }
        update();
        // update_data(config_stocks);
        // config_stocks.get_data().then((c) => {
        //     update_charts();
        // });
        // config_symbol.get_data().then((c) => {
        //     update_charts(config_symbol);
        // });
    };
}, 1000);
