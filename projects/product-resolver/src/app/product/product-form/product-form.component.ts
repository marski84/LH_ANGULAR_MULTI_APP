import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IModifiedProductApiResponse } from '../../models/modifiedApiReponse.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  constructor(
    @Inject('formControlNames') private formControlNames: string[],
    private fb: FormBuilder
  ) {
    return;
  }

  formFields: string[] = [];
  @Input() formData?: IModifiedProductApiResponse;
  @Output() editedFormDataEmitted: EventEmitter<IModifiedProductApiResponse> =
    new EventEmitter();
  @Output() formDataClosedEmitted: EventEmitter<void> = new EventEmitter();

  productForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    console.log(this.formControlNames);
    console.log(this.formData);

    this.formFields = this.formControlNames;

    this.handleFormControlsInit(this.formData);

    return;
  }

  private handleFormControlsInit(formData?: IModifiedProductApiResponse) {
    console.log('metoda');
    console.log(formData);

    this.formFields.forEach((formField: string) => {
      if (formData) {
        const controlValue =
          formData[formField as keyof IModifiedProductApiResponse];
        this.registerFormControl(formField, controlValue as string);
      }

      if (formField === 'id') {
        this.registerFormControl(formField);
        this.productForm.get('id')?.disable();
      }
      this.registerFormControl(formField);
    });
  }

  private registerFormControl(controlName: string, ctrlValue?: string): void {
    const ctrl = this.fb.control(ctrlValue, Validators.required);

    this.productForm.addControl(controlName, ctrl);
  }

  close() {
    this.formDataClosedEmitted.emit();
  }

  acceptChanges() {
    this.editedFormDataEmitted.emit(this.productForm.getRawValue());
  }
}
