import { contactType } from './../models/ContactType.enum';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/Contact';
import { startWith, Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';

// TODO:controlki dzieci tego formularza przepisać tak aby ni e przekazywaćparent form tylko interesujące ich formControl
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input() set contactData(data: Contact) {
    this.contact = data;
    this.createForm(data);
  }
  contact?: Contact;
  contactBgColor?: string;

  formControl!: FormControl;

  @Output()
  contactDataEmitted: EventEmitter<Contact> = new EventEmitter<Contact>();

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    color: [''],
  });

  selectOptions: contactType[] = this.contactService.typeSelectOptions;
  // selectOptions: typeof contactType = contactType;
  private onDestory$ = new Subject<void>();
  private newFormGenerated$ = new Subject<void>();

  get contactNameCtrl() {
    return this.contactForm.get(['name']) as FormControl;
  }

  get colorPickerCtrl() {
    return this.contactForm.get(['color']) as FormControl;
  }

  get typeCtrl() {
    return this.contactForm.get(['type']) as FormControl;
  }

  get adressCtrl() {
    return this.contactForm.get(['adressAdditionalInfo']) as FormGroup;
  }

  get streetNameCtrl() {
    return this.adressCtrl.get(['street']) as FormControl;
  }

  get streetNumberCtrl() {
    return this.adressCtrl.get(['streetNumber']) as FormControl;
  }

  get homeNumberCtrl() {
    return this.adressCtrl.get(['homeNumber']) as FormControl;
  }

  get emailCtrl() {
    return this.contactForm.get(['emailAdditionalInfo']) as FormControl;
  }

  get phoneCtrl() {
    return this.contactForm.get(['phoneAdditionalInfo']) as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    if (!this.contact) {
      this.createForm();
    }
  }

  setSelectedColor(color: string) {
    this.colorPickerCtrl.setValue(color);
  }

  //createForm(contact) - tworzy nowy formularz jeżeli masz contact tona init daje values dla form'a
  private clearForm() {
    this.contactForm.removeControl('adressAdditionalInfo');
    this.contactForm.removeControl('emailAdditionalInfo');
    this.contactForm.removeControl('phoneAdditionalInfo');
  }

  private createForm(contact?: Contact) {
    this.newFormGenerated$.next();
    this.clearForm();

    this.contactNameCtrl.setValue(contact?.name);
    this.contactBgColor = contact?.backgroundColor;
    this.colorPickerCtrl.setValue(contact?.backgroundColor);
    this.typeCtrl.setValue(contact?.type);

    this.typeCtrl.valueChanges
      .pipe(
        takeUntil(this.onDestory$),
        takeUntil(this.newFormGenerated$),
        startWith(contact?.type),
        tap((selectedValue: contactType) => {
          if (this.contact) {
            return this._handleContactTypeChange(selectedValue, this.contact);
          }
          return this._handleContactTypeChange(selectedValue);
        })
      )
      .subscribe();
  }

  private _handleContactTypeChange(option: contactType, formData?: Contact) {
    this.clearForm();
    console.log(option);

    switch (option) {
      case contactType.adress:
        console.log(option);

        const adressForm: FormGroup = this.fb.group({
          street: [formData?.adressAdditionalInfo?.street, Validators.required],
          streetNumber: [
            formData?.adressAdditionalInfo?.streetNumber,
            Validators.required,
          ],
          homeNumber: [formData?.adressAdditionalInfo?.homeNumber],
        });
        this.contactForm.addControl('adressAdditionalInfo', adressForm);

        return;
      case contactType.phone:
        console.log(contactType.phone === option);

        const phoneControl: FormControl = this.fb.control(
          formData?.phoneAdditionalInfo,
          [Validators.required, Validators.minLength(9)]
        );

        this.contactForm.addControl('phoneAdditionalInfo', phoneControl);
        return;
      case contactType.email:
        const emailControl: FormControl = this.fb.control(
          formData?.emailAdditionalInfo,
          [Validators.required, Validators.email]
        );

        this.contactForm.addControl('emailAdditionalInfo', emailControl);
        return;
      default:
        const exhaustCheck: never = option;
        return;
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    const {
      name,
      type,
      color,
      emailAdditionalInfo,
      adressAdditionalInfo,
      phoneAdditionalInfo,
    } = this.contactForm.value;
    console.log(this.contactForm.value);

    const tempContact = new Contact(
      name,
      type,
      color,
      emailAdditionalInfo,
      adressAdditionalInfo,
      phoneAdditionalInfo
    );

    console.log(tempContact);

    if (this.contact) {
      tempContact.id = this.contact.id;
    }

    this.contactDataEmitted.emit(tempContact);
  }

  ngOnDestroy() {
    console.log('destroyed');

    this.onDestory$.next();
    this.onDestory$.complete();
  }
}
