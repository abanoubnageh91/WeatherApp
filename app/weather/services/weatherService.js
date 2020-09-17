app.service('WeatherService', function($http) {

    this.getWeatherData = function(apiUrl) {
        return $http.get(apiUrl);
    }
});