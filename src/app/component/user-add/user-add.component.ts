import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  @ViewChild('userForm', {static: false}) newUserForm: NgForm | null = null;
  @ViewChild('formRef', {static: false}) formRef: ElementRef | null = null;

  username: string = '';
  email: string = '';
  company: string = '';
  code: string = '';
  note: string = '';

  constructor(private _usersService: UserService, private router: Router) {
  }

  submitForm() {
    this.formRef?.nativeElement?.classList.add('was-validated');
    if (this.newUserForm?.valid) {

      let maxId: number = 0;
      this._usersService.users.forEach(user => {
        if (user.id != null && user.id > maxId) {
          maxId = user.id;
        }
      });

      const newUser = {
        id: maxId + 1,
        username: this.username,
        email: this.email,
        company: this.company,
        code: this.code,
        note: this.note
      }
      this._usersService.addUser(newUser);
      this.router.navigate(['']).then(r => console.log(r));
    }
  }
}
