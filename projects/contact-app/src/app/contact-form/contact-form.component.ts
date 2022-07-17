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
import { contactType, IselectType } from '../models/IselectType';
import { Contact } from '../models/Contact';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input()
  contact?: Contact;

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

  emailForm: FormGroup = this.fb.group({
    emailAdress: ['', [Validators.required, Validators.email]],
  });

  phoneForm: FormGroup = this.fb.group({
    phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
  });

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

  get contactTypeEmailCtrl() {
    return this.contactForm.get(['emailAdditionalInfo']) as FormGroup;
  }

  get contactTypePhoneCtrl() {
    return this.contactForm.get(['phoneAdditionalInfo']) as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    console.log(this.contact);

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
  }

  getSelectedColor(color: string) {
    this.colorPickerCtrl.setValue(color);
  }

  private _handleContactTypeChange(option: contactType) {
    console.log(option);

    this.contactForm.removeControl('adressAdditionalInfo');
    this.contactForm.removeControl('emailAdditionalInfo');
    this.contactForm.removeControl('phoneAdditionalInfo');

    switch (option) {
      case contactType.adress:
        return this.contactForm.addControl(
          'adressAdditionalInfo',
          this.adressForm
        );
      case contactType.phone:
        return this.contactForm.addControl(
          'phoneAdditionalInfo',
          this.phoneForm
        );
      case contactType.email:
        return this.contactForm.addControl(
          'emailAdditionalInfo',
          this.emailForm
        );
      default:
        const exhaustCheck: never = option;
    }
  }

  onSubmit() {
    console.log(this.contactForm.value);

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
      this.contactForm.reset();
    }
  }
}
