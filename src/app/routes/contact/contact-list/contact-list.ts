import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STColumn, STModule } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { ContactFormComponent } from '../contact-form/contact-form';
import { Contact } from '../model/contact.model';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    STModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzTooltipModule,
    NzPopconfirmModule,
  ],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.less'],
})
export class ContactListComponent implements OnInit {
  private readonly contactService = inject(ContactService);
  private readonly modal = inject(ModalHelper);
  private readonly cdr = inject(ChangeDetectorRef);

  searchName = '';
  selectedType = '';
  selectedStatus = '';

  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  columns: STColumn[] = [
    {
      title: 'Contact Code',
      index: 'contactCode',
      sort: true,
    },
    {
      title: 'Full Name',
      index: 'fullName',
      sort: true,
    },
    {
      title: 'Mobile',
      index: 'mobile',
    },
    {
      title: 'Email',
      index: 'email',
    },
    {
      title: 'Type',
      index: 'contactType',
    },
    {
      title: 'Status',
      render: 'status',
    },
    {
      title: 'Action',
      width: 120,
      render: 'action',
    },
  ];

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contacts = [...this.contactService.getContacts()];
    this.filteredContacts = [...this.contacts];
  }

  applyFilter(): void {
    this.filteredContacts = this.contacts.filter((contact) => {
      const nameMatch =
        !this.searchName || contact.fullName.toLowerCase().includes(this.searchName.toLowerCase());

      const typeMatch = !this.selectedType || contact.contactType === this.selectedType;

      const statusMatch = !this.selectedStatus || contact.status === this.selectedStatus;

      return nameMatch && typeMatch && statusMatch;
    });
  }

  addContact(): void {
    this.modal.create(ContactFormComponent, {}, { size: 'lg' }).subscribe((result) => {
      if (result) {
        this.loadContacts();
        this.applyFilter();
        this.cdr.detectChanges();
      }
    });
  }

  edit(contact: Contact): void {
    this.modal.create(ContactFormComponent, { contact }, { size: 'lg' }).subscribe((result) => {
      if (result) {
        this.loadContacts();
        this.applyFilter();
        this.cdr.detectChanges();
      }
    });
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.loadContacts();
    this.applyFilter();
    this.cdr.detectChanges();
  }

  refresh(): void {
    this.loadContacts();
    this.applyFilter();
  }
}
