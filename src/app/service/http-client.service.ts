import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { Phone } from '../model/Phone';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

  getUsers()
  {
    return this.httpClient.get<User[]>('http://localhost:8082/api/get');
  }


  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8082/api/add', newUser);   
  }

  deleteUser(id: number) {
    return this.httpClient.delete<User>('http://localhost:8082/api/user/' + id);
  }

  getPhones() {
    return this.httpClient.get<Phone[]>('http://localhost:8082/api/getphones');
  }

  addPhone(newPhone: Phone) {
    return this.httpClient.post<Phone>('http://localhost:8082/api/addphones', newPhone);
  }

  deletePhone(id:number) {
    return this.httpClient.delete<Phone>('http://localhost:8082/api/phones/' + id);
  }

  updatePhone(updatedPhone: Phone) {
    return this.httpClient.put<Phone>('http://localhost:8082/api/update' ,updatedPhone);
  }
}
