import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CompanyService } from '../company.service';
import { Company } from '../models/Company';
import { ICompany } from '../models/ICompany';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent implements OnInit, OnDestroy {
  companyData!: Company;
  companyIndex!: Subscription;
  onDestory$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnDestroy(): void {
    this.onDestory$.next();
    this.onDestory$.complete();
  }

  ngOnInit(): void {
    // edit/1 -> edit/2
    // this.activatedRoute.params.subscribe(); => bezpieczny w razie zmiany routingu
    this.activatedRoute.params
      .pipe(takeUntil(this.onDestory$))
      .subscribe((params: Params) => {
        console.log(this.companyData);
        this.companyService.selectedCompany = Number(params['id']);
        return (this.companyData = this.companyService.selectedCompanyValue);
      });
  }

  editData(data: ICompany) {
    // doda id od modelu Company
    this.companyService.editCompanyData(data);
  }
}
