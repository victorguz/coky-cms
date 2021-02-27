import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';
import { Contact } from 'src/app/models/contacts.model';
import { User } from 'src/app/models/users.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-public-contact',
  templateUrl: './public-contact.component.html',
  styleUrls: ['./public-contact.component.scss']
})
export class PublicContactComponent {

  @Input()
  home = false;

  form: FormGroup

  constructor(private func: FunctionsService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    func.setTitle(activatedRoute.snapshot.data.title)
    this.buildForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "bottom",
      panelClass: "whiteSnackbar"
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.email]],
      address: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(200)]],
      privacy_policy: ['', [Validators.required]],
      send_promo: [''],
      plan: ['premium', [Validators.required]],
      residence: ['apartment', [Validators.required]],
    });

    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      const contact = new Contact();
      contact.set(value)
      console.log(contact.get())
    })

  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      console.log(value);
    } else {
      this.openSnackBar("Digita todos los campos", "OK")
    }
  }

}
