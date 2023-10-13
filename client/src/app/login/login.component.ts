import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() cancelLogin = new EventEmitter();
  loginForm: FormGroup = new FormGroup({});
  model: any = {};
  validationErrors: string[] = []

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
    console.log(this.loginForm)
  }
  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
    })
  }

  cancel() {
    this.cancelLogin.emit(false);
  }
}
