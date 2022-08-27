import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  AfterViewInit,
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
import { startWith, Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { contactType } from '../models/ContactType.enum';

// TODO:controlki dzieci tego formularza przepisać tak aby ni e przekazywaćparent form tylko interesujące ich formControl
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, AfterViewInit, OnDestroy {
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

  selectOptions: IselectType[] = this.contactService.typeSelectOptions;
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
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  // To nie jest get tylko set :)
  getSelectedColor(color: string) {
    this.colorPickerCtrl.setValue(color);
  }

  //createForm(contact) - tworzy nowy formularz jeżeli masz contact tona init daje values dla form'a
  private clearForm() {
    this.contactForm.removeControl('adressAdditionalInfo');
    this.contactForm.removeControl('emailAdditionalInfo');
    this.contactForm.removeControl('phoneAdditionalInfo');
  }

  private createForm(contact: Contact) {
    this.newFormGenerated$.next();
    this.clearForm();
    const typeOfContact = contact.type;

    this.contactNameCtrl.setValue(contact.name);
    this.contactBgColor = contact.backgroundColor;
    this.colorPickerCtrl.setValue(contact.backgroundColor);
    this.typeCtrl.setValue(contact.type);

    this.typeCtrl.valueChanges
      .pipe(
        takeUntil(this.onDestory$),
        takeUntil(this.newFormGenerated$),
        startWith(contact.type),
        tap((selectedValue: contactType) =>
          this._handleContactTypeChange(selectedValue)
        )
      )
      .subscribe();
  }

  private _handleContactTypeChange(option: contactType, value?: any) {
    this.clearForm();

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
        return;
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      console.log(this.contactForm.value);

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
    // this.router.navigate(['./']);
    // TODO: nawigacje do parenta
  }

  ngOnDestroy() {
    console.log('destroyed');

    this.onDestory$.next();
    this.onDestory$.complete();
  }
}
