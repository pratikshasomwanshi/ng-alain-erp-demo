import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { DelonFormModule, SFComponent, SFSchema } from '@delon/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

import { Contact } from '../model/contact.model';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, DelonFormModule, NzButtonModule, NzModalModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.less'],
})
export class ContactFormComponent implements AfterViewInit {
  @Input() contact?: Contact;
  @ViewChild('sf', { static: false })
  sf!: SFComponent;

  schema: SFSchema = {
    properties: {
      fullName: {
        type: 'string',
        title: 'Full Name',
      },
      mobile: {
        type: 'string',
        title: 'Mobile',
      },
      email: {
        type: 'string',
        title: 'Email',
      },
      contactType: {
        type: 'string',
        title: 'Contact Type',
        enum: [
          { label: 'Customer', value: 'Customer' },
          { label: 'Supplier', value: 'Supplier' },
          { label: 'Employee', value: 'Employee' },
        ],
      },
      status: {
        type: 'string',
        title: 'Status',
        default: 'Active',
        enum: [
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' },
        ],
      },
    },
    required: ['fullName', 'mobile', 'contactType', 'status'],
  };

  constructor(
    private modalRef: NzModalRef,
    private contactService: ContactService,
    private message: NzMessageService,
  ) {}

  cancel(): void {
    this.modalRef.destroy();
  }

  save(): void {
    if (!this.sf.valid) {
      this.message.warning('Please fill all required fields');
      return;
    }

    const value = this.sf.value as Omit<Contact, 'id' | 'contactCode' | 'createdDate'>;

    if (this.contact) {
      this.contactService.updateContact({
        ...this.contact,
        ...value,
      });

      this.message.success('Contact updated successfully');
    } else {
      this.contactService.addContact(value);

      this.message.success('Contact added successfully');
    }

    this.modalRef.close(true);
  }

  ngAfterViewInit(): void {
    if (!this.contact) return;

    setTimeout(() => {
      this.sf.rootProperty?.getProperty('/fullName')?.setValue(this.contact!.fullName, false);
      this.sf.rootProperty?.getProperty('/mobile')?.setValue(this.contact!.mobile, false);
      this.sf.rootProperty?.getProperty('/email')?.setValue(this.contact!.email, false);
      this.sf.rootProperty?.getProperty('/contactType')?.setValue(this.contact!.contactType, false);
      this.sf.rootProperty?.getProperty('/status')?.setValue(this.contact!.status, false);
    });
  }
}
