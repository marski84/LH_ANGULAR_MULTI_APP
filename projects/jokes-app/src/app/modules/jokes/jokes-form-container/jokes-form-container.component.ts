import { Component, OnInit } from '@angular/core';
import { JokesApiService } from './jokes-api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-jokes-form-container',
  templateUrl: './jokes-form-container.component.html',
  styleUrls: ['./jokes-form-container.component.scss'],
})
export class JokesFormContainerComponent implements OnInit {
  constructor(private jokesApiService: JokesApiService) {}

  ngOnInit() {}

  getJokes() {
    this.jokesApiService
      .getJokes()
      .pipe(tap((resp) => console.log(resp)))
      .subscribe();
  }
}
