function setOption(series,title,color) {
    return {
        series: series,
        chart: {
            group: 'sparks',
            height: 150,
            width: 400,
            type: 'line',
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [2, 2,2]
        },
        colors: color,
        title: {
            text: title,
         
            floating: true,
            align: 'center',
            style: {
                color: '#444',
                fontSize: "20px",
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                datetimeUTC: false,
                datetimeFormatter: {
                    year: 'yyyy',
                    month: "MM yy",
                    day: 'MM/dd',
                    hour: 'HH:mm',
                },
            }
        },
        yaxis: [
            {
                seriesName: 'BOD',
                
                axisTicks: {
                    show: true,
                },

                labels: {
                    style: {
                        colors: '#000',
                    },
                    formatter: (value) => { return value.toFixed(2); }
                },
                title: {
                    text: "mg/L",
                    style: {
                        color: '#000',
                    }
                },
            },
            {
                seriesName: '計算水中氧氣',
                show: false,
                opposite: true,
                axisTicks: {
                    show: true,
                },

                labels: {
                    style: {
                        colors: '#000',
                    }
                },
                title: {
                    text: "DO",
                    style: {
                        color: '#000',
                    }
                },
            },
            {
                seriesName: '觀測水中氧氣',
                show: false,
                opposite: true,
                axisTicks: {
                    show: true,
                },

                labels: {
                    style: {
                        colors: '#000',
                    }
                },
                title: {
                    text: "觀測DO",
                    style: {
                        color: '#000',
                    }
                },
            }
        ],
        tooltip: {
            x: {
                show: true,
                format: 'yyyy/MM/dd HH:mm'

            },
            fixed: {
                enabled: false,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'center',
            offsetX: 40
        }
    };

}

function setTimeSeriers(times, values) {
    let data = [];
    for (let i = 0; i < times.length; i++) {
        let number = 0;
        if (typeof (values[i]) == 'number') {
            number = values[i];
        } 

        data.push({
            //x: new Date(times[i]).getTime(),
            x: times[i],
            y: number
        })
    }
    return data;
};