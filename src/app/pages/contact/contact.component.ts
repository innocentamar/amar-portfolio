import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contactForm: FormGroup;
  isSending = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  onSubmit(): void {

  if (this.contactForm.valid) {
    this.isSending = true;
    const formData = this.contactForm.value;

    this.contactService.sendMessage(formData).subscribe({

      next: (res: any) => {

        if (res?.message === "Message received successfully") {

          this.toastr.success("Message sent successfully!", "");
          this.contactForm.reset();

        } else {

          this.toastr.warning("Unexpected response from server", "");

        }
        this.isSending = false;

      },

      error: (err) => {
      this.isSending = false;
      console.log('Full Error Object:', err); // Debug to see what actually arrives

      if (err.status === 429) {
        this.toastr.warning("Too many requests. Please try again later.", "");
      } 
      else if (err.status === 400 && err.error?.errors) {
        const errors = err.error.errors;
        const firstKey = Object.keys(errors)[0];
        const firstError = errors[firstKey][0];
        this.toastr.warning(firstError, "");
      } 
      else {
        this.toastr.error("Server error occurred", "");
      }
    }

    });

  } 
  else {

    this.contactForm.markAllAsTouched();

  }
}
 


}