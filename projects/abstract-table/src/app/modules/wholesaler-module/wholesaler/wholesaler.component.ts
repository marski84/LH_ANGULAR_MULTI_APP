import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-wholesaler-module',
  templateUrl: './wholesaler.component.html',
  styleUrls: ['./wholesaler.component.css'],
})
export class WholesalerComponent implements OnInit, AfterContentInit {
  constructor() {}

  @ContentChild('defaultTabButtons') defaultTabButtons!: TemplateRef<any>;

  loginText = 'Login';
  signUpText = 'Sign Up';
  lessons = ['Lesson 1', 'Lessons 2'];

  login() {
    console.log('Login');
  }

  signUp() {
    console.log('Sign Up');
  }

  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };

  ngOnInit() {}

  ngAfterContentInit(): void {
    console.log(this.defaultTabButtons);
  }
}
