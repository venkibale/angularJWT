import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { DashboardComponent  } from '../dashboard/dashboard.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
 
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private appcomp: AppComponent) {

    
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
   
   

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log({username:this.f.username.value,password:this.f.password.value});
    this.authService.login({username:this.f.username.value,password:this.f.password.value}).subscribe(
      data => {
        //console.log(data.access_token)
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.appcomp.isLoggedIn = true;
        //this.roles = this.tokenStorage.getUser().roles;
        
        console.log(window.sessionStorage.getItem('auth-token'));
        this.nextPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.nextPage()
      }
    );   
  }


  nextPage(){
    if (!this.isLoginFailed){

   // window.location.reload();
    this.router.navigate(['dashboard']);
    }
    else{
      this.router.navigate(['login'])

    } 
  }

}


