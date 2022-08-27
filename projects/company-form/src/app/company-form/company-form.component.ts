import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
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
import { IselectType } from '../models/IselectType';
import { DataService } from '../services/data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit, OnDestroy {
  @Input() set company(data: Company) {
    this.companyData = data;
    this.initialEmployeeAmount = data.companyEmployees.length; // wywalić jeżeli zbędne
    this._handleFormDataEvent();
    this.companyForm.markAsPristine();
  }
  companyData?: Company;

  @Output() companyDataEmitted: EventEmitter<Company> =
    new EventEmitter<Company>();

  initialEmployeeAmount: number | undefined;
  private onDestory$ = new Subject<void>();

  companyForm = this.fb.group({
    name: ['', [Validators.required]],
    typeOfBusiness: ['', [Validators.required]],
    companyEmployees: this.fb.array([
      this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        employeeAge: ['', Validators.required],
      }),
    ]),
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

  typeOfBusinessSelectOptions: IselectType[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.typeOfBusiness
      .pipe(takeUntil(this.onDestory$))
      .subscribe((response: IselectType[]) => this.typeOfBusinessSelectOptions = response);

    this.companyForm.valueChanges.subscribe();// ustawiać flagę po zmianie + w guardzie sprawdzać
  }

  private _handleFormDataEvent() {
    this.companyEmployees.clear();

    if (this.companyData === undefined) {
      this.addEmployeeForm();
      return;
    }
    this.companyNameCtrl.setValue(this.companyData.name);
    this.companyBusinessTypeFormCtrl.setValue(this.companyData.typeOfBusiness);
    this.companyData.companyEmployees.forEach((employee) => {
      this.addEmployeeForm(employee);
    });
  }

  addEmployeeForm(employee?: Employee) {
    const employeeForm = this.fb.group({
      firstName: [employee?.firstName, Validators.required],
      lastName: [employee?.lastName, Validators.required],
      employeeAge: [employee?.employeeAge, Validators.required],
    });
    this.companyEmployees.push(employeeForm);
  }

  private _deleteEmployeeForm(employeeIndex: number) {
    this.companyEmployees.removeAt(employeeIndex);
  }

  handleEmployeeFormDelete(employyeFormIndex: number) {
    this._deleteEmployeeForm(employyeFormIndex);
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }
    const { name, typeOfBusiness, companyEmployees } = this.companyForm.value;

    const companyToEmit = new Company(name, typeOfBusiness, companyEmployees);

    this.companyData ? (companyToEmit.id = this.companyData.id) : companyToEmit;

    this.companyDataEmitted.emit(companyToEmit);

    this.companyForm.markAsPristine();
  }
  // jezeli invalid
  // nie propaguj danych do parenta
  // ewentualnei notyfikacja itp.

  ngOnDestroy(): void {
    this.onDestory$.next();
    this.onDestory$.complete();
  }
}
