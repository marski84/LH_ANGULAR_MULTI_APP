import { CompanyFormComponent } from './../company-form/company-form.component';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, Subscription, takeUntil } from 'rxjs';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/Company';
import { IDeactivableComponent } from '../models/IDeactivableComponent';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent
  implements OnInit, OnDestroy, IDeactivableComponent
{
  companyData!: Company;
  companyIndex!: Subscription;
  private onDestory$ = new Subject<void>();

  @ViewChild(CompanyFormComponent, { static: true })
  editCompanyForm!: CompanyFormComponent;
  employeesAmount!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.onDestory$),
        map((params) => params['id']),
        map((id) => this.companyService.getCompanyById(id))
      )
      .subscribe((company) => (this.companyData = company));
  }

  editData(data: Company) {
    this.companyService.editCompanyData(data);
  }

  isDataSaved(): boolean {
    console.log(this.editCompanyForm.isFormModified);

    return !this.editCompanyForm.isFormModified;
  }

  ngOnDestroy(): void {
    this.onDestory$.next();
    this.onDestory$.complete();
  }
}
