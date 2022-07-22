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
import { ContactService } from '../contact.service';
import { IselectType } from '../models/contactTypeActionHandle.enum.';
import { Contact } from '../models/Contact';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { contactType } from '../models/ContactType.enum';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input() set contactData(data: Contact) {
    this.contact = data;
    this._handleFormEdit(this.contact);
  }
  contact?: Contact;
  contactBgColor?: string;

  @Output()
  contactDataEmitted: EventEmitter<Contact> = new EventEmitter<Contact>();

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    color: ['', Validators.required],
  });

  adressForm: FormGroup = this.fb.group({
    street: ['', Validators.required],
    streetNumber: ['', Validators.required],
    homeNumber: [''],
  });

  emailControl: FormControl = this.fb.control('', [
    Validators.required,
    Validators.email,
  ]);

  phoneControl: FormControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(9),
  ]);

  selectOptions: IselectType[] = this.contactService.typeSelectOptions;
  onDestory$ = new Subject<void>();

  get contactNameCtrl() {
    return this.contactForm.get(['name']) as FormControl;
  }

  get colorPickerCtrl() {
    return this.contactForm.get(['color']) as FormControl;
  }

  get contactTypeCtrl() {
    return this.contactForm.get(['type']) as FormControl;
  }

  get contactTypeAdressCtrl() {
    return this.contactForm.get(['adressAdditionalInfo']) as FormGroup;
  }

  get streetNameCtrl() {
    return this.contactForm.get([
      'adressAdditionalInfo',
      'street',
    ]) as FormControl;
  }

  get streetNumberCtrl() {
    return this.contactForm.get([
      'adressAdditionalInfo',
      'streetNumber',
    ]) as FormControl;
  }

  get homeNumberCtrl() {
    return this.contactForm.get([
      'adressAdditionalInfo',
      'homeNumber',
    ]) as FormControl;
  }

  get contactTypeEmailCtrl() {
    return this.contactForm.get(['emailAdditionalInfo']) as FormControl;
  }

  get contactTypePhoneCtrl() {
    return this.contactForm.get(['phoneAdditionalInfo']) as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.contact) {
      // this.contactForm.controls
      this._handleFormEdit(this.contact);
    }
    this.contactTypeCtrl.valueChanges
      .pipe(takeUntil(this.onDestory$))
      .subscribe((selectedValue: contactType) => {
        console.log(selectedValue);
        this._handleContactTypeChange(selectedValue);
      });
  }

  ngOnDestroy() {
    this.onDestory$.next();
    this.onDestory$.complete();

    console.log('ok');
  }

  getSelectedColor(color: string) {
    this.colorPickerCtrl.setValue(color);
  }

  private _handleFormEdit(contact: Contact) {
    console.log(1);

    const typeOfContact = contact.type as contactType;

    this.contactNameCtrl.setValue(contact.name);
    this.contactBgColor = contact.backgroundColor;
    this._handleContactTypeChange(typeOfContact);
    this.contactTypeCtrl.setValue(typeOfContact);

    switch (typeOfContact) {
      case contactType.phone:
        return this.contactTypePhoneCtrl.setValue(contact.phoneAdditionalInfo);

      case contactType.email:
        return this.contactTypeEmailCtrl.setValue(contact.emailAdditionalInfo);
      case contactType.adress:
        // czemu destruktutyzacja nie działa???
        // const { homeNumber, street, streetNumber } =
        //   this.contact.adressAdditionalInfo;
        this.streetNameCtrl.setValue(contact.adressAdditionalInfo?.street);
        this.streetNumberCtrl.setValue(
          contact.adressAdditionalInfo?.streetNumber
        );
        this.homeNumberCtrl.setValue(contact.adressAdditionalInfo?.homeNumber);
        return;
    }
  }

  private _handleContactTypeChange(option: contactType) {
    this.contactForm.removeControl('adressAdditionalInfo');
    this.contactForm.removeControl('emailAdditionalInfo');
    this.contactForm.removeControl('phoneAdditionalInfo');

    switch (option) {
      case contactType.adress:
        this.contactForm.addControl('adressAdditionalInfo', this.adressForm);
        this.contactTypeAdressCtrl.reset();
        return;
      case contactType.phone:
        this.contactForm.addControl('phoneAdditionalInfo', this.phoneControl);
        this.contactTypePhoneCtrl.reset();
        return;
      case contactType.email:
        this.contactForm.addControl('emailAdditionalInfo', this.emailControl);
        this.contactTypeEmailCtrl.reset();
        return;
      default:
        const exhaustCheck: never = option;
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const {
        name,
        type,
        color,
        emailAdditionalInfo,
        adressAdditionalInfo,
        phoneAdditionalInfo,
      } = this.contactForm.value;

      const contact = new Contact(
        name,
        type,
        color,
        emailAdditionalInfo,
        adressAdditionalInfo,
        phoneAdditionalInfo
      );
      this.contactDataEmitted.emit(contact);
      // this.contactForm.reset();
      this.router.navigate(['../']);
    }
  }
}
