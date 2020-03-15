import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MustMatch } from '../../_helpers/must-match.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UsersService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    // if (this.auth.login) {
    //   this.router.navigate(['/instagamer/home']);
    // }

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'cpassword')
    });
  }
  // pegar mais facilmente os dados do form
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    //reset alertas
    this.alertService.clear();

    // parar se form é invalido TODO**
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.f.name.value,
      this.f.username.value,
      this.f.email.value,
      this.f.password.value
    )
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/instagamer/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
