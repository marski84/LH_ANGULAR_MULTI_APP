import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JokesApiService {
  constructor(private http: HttpClient) {}

  getJokes() {
    return this.http.get('https://v2.jokeapi.dev/joke/Any');
  }
}
