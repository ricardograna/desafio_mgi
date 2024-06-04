import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  login(data: Login) {
    return this.post('auth/login', data)
  }

  register(data: Register) {
    return this.post('auth/register', data)
  }
}
