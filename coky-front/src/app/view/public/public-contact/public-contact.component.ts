import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';
import { Contact } from 'src/app/models/contacts.model';
import { User } from 'src/app/models/users.model';
import { debounceTime } from 'rxjs/operators';
import { ContactsService } from 'src/app/services/contact.service';
import { send } from 'process';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-public-contact',
  templateUrl: './public-contact.component.html',
  styleUrls: ['./public-contact.component.scss'],

})
export class PublicContactComponent implements OnInit {

  @Input()
  home = false;

  form: FormGroup


  constructor(private func: FunctionsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contactService: ContactsService,
    private cookieService: CookieService
  ) {
    func.setTitle(activatedRoute.snapshot.data.title)
    this.buildForm();

  }

  async ngOnInit() {
    let hola = await this.contactService.all()
    console.log(hola);
  }

  showMessage(message: string, action: string, type = "danger", time = 2000, func = null) {
    this.func.showMessage(message, action, type, time, func)
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(200)]],
      privacy_policy: [false, [Validators.requiredTrue]],
      send_promo: [false],
      plan: ['premium', [Validators.required]],
      residence: ['apartment', [Validators.required]],
    });

    // this.form.valueChanges.pipe(
    //   debounceTime(500)
    // ).subscribe(value => {
    //   const contact = new Contact();
    //   contact.set(value)
    //   console.log(contact.get())
    // })

  }

  async save(event: Event) {
    event.preventDefault();
    let allowedToSend = false;
    if (this.cookieService.get("sent") == "true") {
      this.showMessage("It is too early to send a new message. "
        + "Give us the chance to answer you.", "Wait 24h", "info", 5000)
    } else {
      allowedToSend = true;
    }

    if (allowedToSend) {
      if (this.form.get("plan").errors) {
        this.showMessage("You must select a plann", "OK", "alert")
      } else if (this.form.get("residence").errors) {
        this.showMessage("You must select a residence", "OK", "alert")
      } else if (this.form.get("full_name")) {
        this.showMessage("You must write a name", "OK", "alert")
      } else if (this.form.get("email").errors) {
        this.showMessage("You must write a valid email", "OK", "alert")
      } else if (this.form.get("phone").errors) {
        this.showMessage("You must write a phone", "OK", "alert")
      } else if (this.form.get("address").errors) {
        this.showMessage("You must write an address", "OK", "alert")
      } else if (this.form.get("message").errors) {
        this.showMessage("You must write a message", "OK", "alert")
      } else if (this.form.get("privacy_policy").errors) {
        this.showMessage("You must accept our data treatment policy", "OK", "alert")
      } else {
        const value = this.form.value;
        const contact = new Contact();
        try {
          contact.set(value)
          console.log(contact.get())
          const result = await this.contactService.create(contact.get());
          if (result.success && result.success == true) {
            this.cookieService.set("sent", "true", 1);
            this.showMessage("Thank you for contacting us. We will be communicating with you soon.", "OK", "success", 5000)
            // console.log(result);
          }
        } catch (error) {
          console.log(error.error)
        }
      }
    }
  }

}
