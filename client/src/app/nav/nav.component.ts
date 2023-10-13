import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorInterceptor } from '../_interceptors/error.interceptor';
import { HttpResponse } from '@microsoft/signalr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  loginForm: FormGroup = new FormGroup({});
  isShowDivIf = true;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // login() {
  //   this.accountService.login(this.model).subscribe({
  //     next: (response) => { this.router.navigateByUrl('/members') }
  //   })
  //   console.clear();
  // }

  login() {
    this.accountService.login(this.model).subscribe(
      response => this.router.navigateByUrl('/members'),
      error => console.log(error.error)
    )
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

}
