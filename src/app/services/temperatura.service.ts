import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
const appId = '23eedeac2229c13483559138df69e6f0';
@Injectable({
  providedIn: 'root',
})
export class TemperaturaService {
  constructor(private http: HttpClient) {}

  getEstadoTiempo(ciudad: string, codigo: string) {
    const url = `${urlBase}?q=${ciudad},${codigo}&appid=${appId}`;
    return this.http.get(url);
  }
}
