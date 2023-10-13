import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  loginMode = false;
  formMode = false;
  users: any;

  constructor() { }

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
    this.formMode = this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    this.formMode = this.registerMode;
  }

  loginToggle() {
    this.loginMode = !this.loginMode;
    this.formMode = !this.formMode;
  }

  cancelLoginMode(event: boolean) {
    this.loginMode = event;
    this.formMode = this.loginMode;
  }

}
