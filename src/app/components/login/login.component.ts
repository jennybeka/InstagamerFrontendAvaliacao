import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})


export class LoginComponent implements OnInit {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {

    // redirecionar para o home se estiver logado
    if (this.auth.login) {
      this.router.navigate(['/instagamer/home/0']);
      this.loggedIn.next(true);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    //URL de retorno dos parâmetros de rota ou usar como padrão '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/instagamer/home';

  }

  // pegar mais facilmente os dados do form
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alertas
    this.alertService.clear();

    // pare aqui se o formulário for inválido
    if (this.loginForm.invalid) {
      return;
    }


    this.loading = true;
    let user = this.auth.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          sessionStorage.setItem('token', data.token);
          this.router.navigate(['/instagamer/profile/0']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          console.log('Username or password is incorrect')
        });
  }



}
