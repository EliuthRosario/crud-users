import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';
import { showAlert } from 'src/app/utils/mensajes';

@Component({
  selector: 'app-user-form-edit',
  templateUrl: './user-form-edit.component.html',
  styleUrls: ['./user-form-edit.component.css'],
})
export class UserFormEditComponent implements OnInit {
  idUser: number = 0;
  userFormEdit: FormGroup;
  user?: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userFormEdit = this.formBuilder.group({
      idUsuario: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.idUser = parseInt(params['idUsuario']);
      this.getUser();
    });
  }

  updateUser(): void {
    if (this.userFormEdit.valid) {
      this.userService
        .updateUser(this.idUser, this.userFormEdit.value)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['/']);
          showAlert('Correcto', 'Usuario actualizado correctamente', 'success');
        });
    }
  }

  getUser(): void {
    if (this.idUser !== 0) {
      this.userService.getUserById(this.idUser).subscribe((data) => {
        this.user = data;
        this.userFormEdit.patchValue(data);
      });
    }
  }
}
