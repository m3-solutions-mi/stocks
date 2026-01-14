/**
 * This code calculates the target line.
 * The calculateY function then allows you to get the predicted y-value for any given x-value on the trendline.
 */
function calculateTarget(data, percent = 1, seed = 1000) {
    const target_gain = (seed * (percent / 100));
    const open = data[0];
    return {
        calculateY: function (x) {
            return (target_gain * x);
        }
    };
}
