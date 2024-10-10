import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weather: any;
  weatherIcon: string = '';
  city: string = 'Manado';  // Kota default adalah Manado
  hourlyForecast: any[] = [];

  constructor() {
    this.getWeather();
  }

  async getWeather() {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=e6350aed678e8f0aacb4efb459d2aa05`
      );
      this.weather = weatherResponse.data;
      this.weatherIcon = `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=e6350aed678e8f0aacb4efb459d2aa05`
      );
      this.hourlyForecast = this.getNextFiveHoursForecast(forecastResponse.data.list);
    } catch (error) {
      console.error('Gagal mengambil data cuaca', error);
      alert('Gagal mengambil data cuaca. Silakan coba lagi.');
    }
  }

  // Ambil data perkiraan cuaca untuk 5 jam ke depan
  getNextFiveHoursForecast(forecastList: any[]): any[] {
    return forecastList.slice(0, 5).map((forecast) => {
      const time = new Date(forecast.dt * 1000).getHours(); // Konversi waktu UNIX ke jam
      return {
        time: `${time}:00`,
        temp: forecast.main.temp,
      };
    });
  }
}
