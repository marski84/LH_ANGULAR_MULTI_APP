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
import { IselectType } from '../models/IselectType';
import { Contact } from '../models/Contact';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { contactType } from '../models/ContactType.enum';

// TODO:controlki dzieci tego formularza przepisać tak aby ni e przekazywaćparent form tylko interesujące ich formControl
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

  formControl!: FormControl;

  @Output()
  contactDataEmitted: EventEmitter<Contact> = new EventEmitter<Contact>();

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    color: ['', Validators.required],
  });

  // adressForm: FormGroup = this.fb.group({
  //   street: ['', Validators.required],
  //   streetNumber: ['', Validators.required],
  //   homeNumber: [''],
  // });

  // emailControl: FormControl = this.fb.control('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  // phoneControl: FormControl = this.fb.control('', [
  //   Validators.required,
  //   Validators.minLength(9),
  // ]);

  selectOptions: IselectType[] = this.contactService.typeSelectOptions;
  private onDestory$ = new Subject<void>();

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
    return this.contactTypeAdressCtrl.get(['street']) as FormControl;
  }

  get streetNumberCtrl() {
    return this.contactTypeAdressCtrl.get(['streetNumber']) as FormControl;
  }

  get homeNumberCtrl() {
    return this.contactTypeAdressCtrl.get(['homeNumber']) as FormControl;
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
    this.contactTypeCtrl.valueChanges
      .pipe(takeUntil(this.onDestory$))
      .subscribe((selectedValue: contactType) => {
        console.log(selectedValue);
        this._handleContactTypeChange(selectedValue);
      });
  }

  getSelectedColor(color: string) {
    this.colorPickerCtrl.setValue(color);
  }

  private _handleFormEdit(contact: Contact) {
    const typeOfContact = contact.type;

    console.log('_handleFormEdit');

    this.contactNameCtrl.setValue(contact.name);
    this.contactBgColor = contact.backgroundColor;
    this._handleContactTypeChange(typeOfContact);
    this.contactTypeCtrl.setValue(typeOfContact);
    this.colorPickerCtrl.setValue(contact.backgroundColor);
    console.log(this.colorPickerCtrl.value);

    switch (typeOfContact) {
      case contactType.phone:
        return this.contactTypePhoneCtrl.setValue(contact.phoneAdditionalInfo);

      case contactType.email:
        return this.contactTypeEmailCtrl.setValue(contact.emailAdditionalInfo);

      case contactType.adress:
        // czemu destruktutyzacja nie działa???
        // const { homeNumber, street, streetNumber } =
        //   this.contact.adressAdditionalInfo;

        this.streetNameCtrl?.setValue(contact.adressAdditionalInfo?.street);
        this.streetNumberCtrl?.setValue(
          contact.adressAdditionalInfo?.streetNumber
        );
        this.homeNumberCtrl?.setValue(contact.adressAdditionalInfo?.homeNumber);
        return;
      default:
        const exhaustCheck: never = typeOfContact;
    }
  }

  // dodac dynamicznie wrzucane kontrolki i usunąc reset- ok

  private _handleContactTypeChange(option: contactType) {
    this.contactForm.removeControl('adressAdditionalInfo');
    this.contactForm.removeControl('emailAdditionalInfo');
    this.contactForm.removeControl('phoneAdditionalInfo');

    switch (option) {
      case contactType.adress:
        const adressForm: FormGroup = this.fb.group({
          street: ['', Validators.required],
          streetNumber: ['', Validators.required],
          homeNumber: [''],
        });
        this.contactForm.addControl('adressAdditionalInfo', adressForm);

        return;
      case contactType.phone:
        const phoneControl: FormControl = this.fb.control('', [
          Validators.required,
          Validators.minLength(9),
        ]);

        this.contactForm.addControl('phoneAdditionalInfo', phoneControl);
        return;
      case contactType.email:
        const emailControl: FormControl = this.fb.control('', [
          Validators.required,
          Validators.email,
        ]);

        this.contactForm.addControl('emailAdditionalInfo', emailControl);
        return;
      default:
        const exhaustCheck: never = option;
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

    const tempContact = new Contact(
      name,
      type,
      color,
      emailAdditionalInfo,
      adressAdditionalInfo,
      phoneAdditionalInfo
    );

    if (this.contact) {
      tempContact.id = this.contact.id;
    }

    console.log(tempContact);

    this.contactDataEmitted.emit(tempContact);
    console.log(tempContact);

    this.router.navigate(['./']);
    // TODO: nawigacje do parenta
  }

  ngOnDestroy() {
    this.onDestory$.next();
    this.onDestory$.complete();
  }
}
