import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { showAlert } from 'src/app/utils/mensajes';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      idUsuario: ['', [Validators.required, Validators.minLength(6)]],
      nombres: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  agregarUsuario(): void {
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value).subscribe((data) => {
        console.log(data);
        showAlert(
          'Usuario Agregado',
          'El usuario se ha agregado correctamente',
          'success'
        );
        this.userForm.reset();
      });
    }
  }
}
