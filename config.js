class Config {
    data = null;
    alpaca = null;
    key = null;
    secret = null;
    name = null;
    symbols = null;
    seed = null;
    start_at = null;
    end_at = null;
    constructor(key, secret, name, symbols, seed, start_at = '2024-12-15T00:00:00', end_at = new Date()) {
        this.key = key;
        this.secret = secret;
        this.name = name || 'None';
        this.symbols = symbols || [];
        this.seed = seed || 1000;
        this.start_at = start_at;
        this.end_at = end_at;

        //* ALPACA
        this.alpaca = new AlpacaData(this.key, this.secret, this.start_at, 'W');
    }
    async get_data(symbol = null) {
        return new Promise(async (resolve) => {
            let positions = await this.alpaca.get_positions();
            let orders = await this.alpaca.get_orders();
            let promises = symbol ? [symbol] : this.symbols.map((s, i) => {
            // let promises = symbol ? [symbol] : likes.map((s, i) => {
                return this.alpaca.bars(s, '1D', new Date(this.start_at).toISOString(), new Date(this.end_at).toISOString(), positions, orders);
            });
            this.data = await Promise.all(promises);

            //* console.log(this.all_symbols);
            resolve(this.data);
            console.yellow(`${new Date().toLocaleTimeString().split(' ')[0]} | POSITIONS: $${round2(reduceArray(positions.map((v2) => +(v2.unrealized_pl)))).toLocaleString()}`);
            positions = undefined;
            orders = undefined;
            promises = undefined;
        })
    }
}