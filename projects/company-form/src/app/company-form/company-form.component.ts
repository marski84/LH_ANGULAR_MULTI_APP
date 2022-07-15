import {
  Component,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Employee } from '../models/Employee';
import { Company } from '../models/Company';
import { ICompany } from '../models/ICompany';
import { DataService } from '../data.service';
import { IselectType } from '../models/IselectType';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit, OnChanges {
  @Input() companyData?: Company;
  @Output() companyDataEmitted: EventEmitter<ICompany> =
    new EventEmitter<ICompany>();

  companyForm = this.fb.group({
    name: ['', [Validators.required]],
    typeOfBusiness: ['', [Validators.required]],
    companyEmployees: this.fb.array([]),
  });

  get companyNameCtrl() {
    return this.companyForm.get(['name']) as FormControl;
  }

  get companyBusinessTypeFormCtrl() {
    return this.companyForm.get(['typeOfBusiness']) as FormControl;
  }

  get companyEmployeesControls() {
    return (this.companyForm.controls['companyEmployees'] as FormArray)
      .controls as FormGroup[];
  }

  get companyEmployees() {
    return this.companyForm.controls['companyEmployees'] as FormArray;
  }

  trackByFn(index: number, item: FormGroup) {
    return index;
  }

  formGroupAtIndex(index: number) {
    return this.companyEmployees.at(index) as FormGroup;
  }

  companyEmployeesNameCtrl(empIndex: number) {
    return this.companyEmployees.at(empIndex) as FormGroup;
  }

  typeOfBusinessSelectOptions: IselectType[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this._handleFormDataEvent();
  }

  ngOnInit(): void {
    console.log(this.companyData);

    this.dataService.typeOfBusiness.subscribe((response: IselectType[]) => {
      this.typeOfBusinessSelectOptions = response;
    });

    this._handleFormDataEvent();
    if (!this.companyData) {
      this.addEmployeeForm();
    }
  }

  private _handleFormDataEvent() {
    this.companyEmployees.clear();

    if (this.companyData) {
      this.companyNameCtrl.setValue(this.companyData.name);
      this.companyBusinessTypeFormCtrl.setValue(
        this.companyData.typeOfBusiness
      );
      this.companyData.employees.forEach((employee) => {
        this.addEmployeeForm(employee);
        return;
      });
    }
  }

  addEmployeeForm(employee?: Employee) {
    const employeeForm = this.fb.group({
      firstName: [employee?.firstName, Validators.required],
      lastName: [employee?.lastName, Validators.required],
      employeeAge: [employee?.employeeAge, Validators.required],
    });

    this.companyEmployees.insert(this.companyEmployees.length, employeeForm);
  }

  private _deleteEmployeeForm(employeeIndex: number) {
    this.companyEmployees.removeAt(employeeIndex);
  }

  handleEmployeeFormDelete(employyeFormIndex: number) {
    this._deleteEmployeeForm(employyeFormIndex);
  }

  onSubmit(): void {
    const tempCompany: ICompany = this.companyForm.value;

    if (this.companyForm.valid) {
      this.companyDataEmitted.emit(tempCompany);
      this.companyForm.reset();
      return;
    }
    // jezeli invalid
    // nie propaguj danych do parenta
    // ewentualnei notyfikacja itp.
    // return this.companyDataEmitted.emit(tempCompany);
  }
}
