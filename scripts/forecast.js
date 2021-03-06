class Forecast {
    constructor() {
        this.key = '85cNAIaxqMs8QvlDBxARQiaaCoy5SII4';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        return {cityDetails, weather};
    }
    async getCity(city) {
        const queryParams = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + queryParams);
        const data  = await response.json();
        return data[0];
    }
    async getWeather(id) {
        const queryParams = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + queryParams);
        const data = await response.json();
        return data[0];
    }
}
