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
    @Inject('formControlNames')
    public formControlNames: Array<keyof IModifiedProductApiResponse>,
    private fb: FormBuilder
  ) {
    return;
  }

  @Input() formData?: IModifiedProductApiResponse;
  @Output() editedFormDataEmitted: EventEmitter<IModifiedProductApiResponse> =
    new EventEmitter();
  @Output() formDataClosedEmitted: EventEmitter<void> = new EventEmitter();

  productForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.handleFormControlsInit(this.formData);

    return;
  }

  private handleFormControlsInit(formData?: IModifiedProductApiResponse) {
    this.formControlNames.forEach((formField) => {
      this.registerFormControl(formField);
      if (formData) {
        const controlValue = formData[formField];
        this.productForm.get(formField)?.setValue(controlValue);
      }

      if (formField === 'id') {
        this.productForm.get('id')?.disable();
      }
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
