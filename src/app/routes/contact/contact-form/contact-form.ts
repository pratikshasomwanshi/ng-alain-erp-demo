import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { Contact } from '../model/contact.model';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.less'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact?: Contact;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly modalRef = inject(NzModalRef);
  private readonly contactService = inject(ContactService);
  private readonly message = inject(NzMessageService);

  contactForm = this.fb.group({
    fullName: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', Validators.email],
    contactType: this.fb.control<Contact['contactType']>('Customer', {
      validators: Validators.required,
    }),
    status: this.fb.control<Contact['status']>('Active', {
      validators: Validators.required,
    }),
  });

  ngOnInit(): void {
    if (this.contact) {
      this.contactForm.patchValue({
        fullName: this.contact.fullName,
        mobile: this.contact.mobile,
        email: this.contact.email,
        contactType: this.contact.contactType,
        status: this.contact.status,
      });
    }
  }

  save(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const value = this.contactForm.getRawValue();

    if (this.contact) {
      const updatedContact: Contact = {
        ...this.contact,
        fullName: value.fullName,
        mobile: value.mobile,
        email: value.email,
        contactType: value.contactType,
        status: value.status,
      };

      this.contactService.updateContact(updatedContact);
      this.message.success('Contact updated successfully');
    } else {
      this.contactService.addContact({
        fullName: value.fullName,
        mobile: value.mobile,
        email: value.email,
        contactType: value.contactType,
        status: value.status,
      });

      this.message.success('Contact added successfully');
    }

    this.modalRef.close(true);
  }

  cancel(): void {
    this.modalRef.destroy();
  }
}
