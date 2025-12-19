
//#-------------------------------------------
//# Treemap Class 
//#-------------------------------------------
class Treemap {
    chart_instance = null;
    chart_id = null;
    data = null;
    options = {
        series: [{ name: '', data: [] }],
        legend: {
            show: false
        },
        chart: {
            height: 300,
            type: 'treemap',
            animations: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        // annotations: {
        //     yaxis: [{
        //         y: 140,
        //         borderColor: '#00E396',
        //         label: {
        //             borderColor: '#00E396',
        //             style: {
        //                 color: '#fff',
        //                 background: '#00E396',
        //                 fontSize: '22px',
        //             },
        //             text: 'Support',
        //         }
        //     }]
        // },
        plotOptions: {
            treemap: {
                enableShades: true,
                shadeIntensity: 0.3,
                reverseNegativeShade: true,
                colorScale: {
                    ranges: [
                        {
                            from: -3000,
                            to: 0,
                            color: colors.red
                        },
                        {
                            from: 0.001,
                            to: 1000,
                            color: colors.green
                        },
                        // {
                        //     from: 1000.001,
                        //     to: 5000,
                        //     color: '#48ff00'
                        // }
                    ]
                }
            },
            bar: {
                colors: {
                    ranges: [
                        // {
                        //     from: -100,
                        //     to: -46,
                        //     color: '#F15B46'
                        // },
                        {
                            from: -10000,
                            to: 0,
                            color: '#cb0000ff'
                        }]
                },
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
                columnWidth: '80%',
            },
            _line: {
                colors: {
                    threshold: 0,
                    colorAboveThreshold: colors.green, //'#0088ee',
                    colorBelowThreshold: '#ff0000',
                },
            },
        },
        tooltip: {
            style: {
                fontSize: '24px',
            },
            x: {
                show: true,
                format: 'dd MMM | HH:mm',
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            offsetY: -5,
        },
        colors: [
            '#4CAF50',
        ],
        _plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false
            }
        },
        _title: {
            text: 'Basic Treemap'
        }
    };
    constructor(id) {
        this.chart_id = id;
    }
    render(data) {
        if (data[0].name) {
            this.options.series = data;
        } else {
            this.options.series[0].data = data;
        }
        if (this.chart_instance) {
            this.chart_instance.destroy();
        }
        this.chart_instance = new ApexCharts(document.querySelector(this.chart_id), this.options);
        this.chart_instance.render();
        // console.log(this.chart_id, this.options);
    }
}