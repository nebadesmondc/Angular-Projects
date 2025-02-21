import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/';
  private apiKey = '7eaa4cdf304c9cbd692648cee79f2224';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<Weather> {
    const options = new HttpParams()
     .set('q', city)
     .set('appid', this.apiKey)
     .set('units','metric');

    return this.http.get<Weather>(this.apiUrl + 'weather', { params: options });
  }

}
