import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(`${this.apiUrl}/${endpoint}`)
  }

  post(endpoint: string, data: any) {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data)
  }

  put(endpoint: string, data: any) {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data)
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.apiUrl}/${endpoint}`)
  }
}
