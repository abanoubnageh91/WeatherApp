'use strict';
app.controller('WeatherCtrl', ['$scope', 'WeatherService',
    ($scope, WeatherService) => {

        $scope.getWeathers = () => {
            var apiUrl = 'api/weather.json';
            WeatherService.getWeatherData(apiUrl).then(response => {

                    let channel = response.data.query.results.channel;
                    $scope.tempMark = '°';
                    $scope.distance = channel.units.distance;
                    $scope.pressure = channel.units.pressure;
                    $scope.speed = channel.units.speed;
                    $scope.temperature = channel.units.temperature;

                    $scope.wind = channel.wind;
                    $scope.atmosphere = channel.atmosphere;
                    $scope.astronomy = channel.astronomy;

                    let item = channel.item;
                    $scope.item = item;
                    $scope.condition = item.condition;
                    $scope.weathers = item.forecast;
                    $scope.labels = new Array();
                    $scope.weathers.forEach((element, i) => {
                        if (i < 7)
                            $scope.labels.push(element.date);
                    });
                    $scope.series = ['High Temp', 'Low Temp'];

                    $scope.data = [
                        [],
                        []
                    ];
                    $scope.weathers.forEach((element, i) => {
                        if (i < 7) {
                            $scope.data[0].push(element.high);
                            $scope.data[1].push(element.low);
                        }
                        // $scope.data.push({ day: element.day, high: element.high, low: element.low, text: element.text });

                    });

                    $scope.options = {
                        tooltips: {
                            position: 'nearest',
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    label += `${tooltipItem.yLabel} ${$scope.tempMark}${$scope.temperature}`;
                                    return label;
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Conditions for New York, NY, US at the next 7 Days'
                        },
                        legend: {
                            display: true
                        },
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Temperature'
                                },
                                ticks: {
                                    beginAtZero: true,
                                    callback: function(value, index, values) {
                                        return `${value} ${$scope.tempMark}${$scope.temperature}`;
                                    }
                                }
                            }],
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Day'
                                }
                            }]
                        }
                    };
                },
                function(error) {
                    console.log("Error: " + error);
                });

        }
        $scope.getWeathers();

    }
]);