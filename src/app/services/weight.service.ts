import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {headers: {'x-token': this.token}}
  }

  createWeightRecord(data: any) {
    return this.http.post(`${base_url}/weight`, data, this.headers);
  }

  getWeightRecordsById(id: string) {
    return this.http.get<any>(`${base_url}/weight/${id}`, this.headers);
  }
}
