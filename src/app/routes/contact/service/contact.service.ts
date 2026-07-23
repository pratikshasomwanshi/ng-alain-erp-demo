import { Injectable } from '@angular/core';

import { Contact } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly STORAGE_KEY = 'contacts';

  private readonly defaultContacts: Contact[] = [
    {
      id: 1,
      contactCode: 'CNT001',
      fullName: 'Rahul Sharma',
      mobile: '9876543210',
      email: 'rahul@test.com',
      contactType: 'Customer',
      status: 'Active',
      createdDate: new Date().toISOString(),
    },
    {
      id: 2,
      contactCode: 'CNT002',
      fullName: 'Priya Patil',
      mobile: '9988776655',
      email: 'priya@test.com',
      contactType: 'Supplier',
      status: 'Active',
      createdDate: new Date().toISOString(),
    },
  ];

  constructor() {
    this.initializeData();
  }

  /**
   * Initialize Local Storage with default data
   */
  private initializeData(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.defaultContacts));
    }
  }

  /**
   * Get All Contacts
   */
  getContacts(): Contact[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Save Contacts
   */
  private saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
  }

  /**
   * Generate Next ID
   */
  private getNextId(): number {
    const contacts = this.getContacts();

    if (contacts.length === 0) {
      return 1;
    }

    return Math.max(...contacts.map((contact) => contact.id)) + 1;
  }

  /**
   * Generate Contact Code
   */
  private generateContactCode(): string {
    const contacts = this.getContacts();
    const next = contacts.length + 1;

    return `CNT${next.toString().padStart(3, '0')}`;
  }

  /**
   * Add Contact
   */
  addContact(contact: Omit<Contact, 'id' | 'contactCode' | 'createdDate'>): void {
    const contacts = this.getContacts();

    const newContact: Contact = {
      ...contact,
      id: this.getNextId(),
      contactCode: this.generateContactCode(),
      createdDate: new Date().toISOString(),
    };

    contacts.push(newContact);

    this.saveContacts(contacts);
  }

  /**
   * Update Contact
   */
  updateContact(updatedContact: Contact): void {
    const contacts = this.getContacts();

    const index = contacts.findIndex((contact) => contact.id === updatedContact.id);

    if (index !== -1) {
      contacts[index] = updatedContact;
      this.saveContacts(contacts);
    }
  }

  /**
   * Delete Contact
   */
  deleteContact(id: number): void {
    const contacts = this.getContacts().filter((contact) => contact.id !== id);

    this.saveContacts(contacts);
  }

  /**
   * Get Contact By ID
   */
  getContactById(id: number): Contact | undefined {
    return this.getContacts().find((contact) => contact.id === id);
  }

  /**
   * Clear All Contacts
   */
  clearContacts(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.initializeData();
  }
}
