import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map, Subject, Subscription, takeUntil } from 'rxjs';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/Company';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent implements OnInit, OnDestroy {
  companyData!: Company;
  companyIndex!: Subscription;
  private onDestory$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.onDestory$),
        map((params) => {
          const index = params['id'];
          return index;
        }),
        map((index) => this.companyService.getCompanyByIndex(index))
      )
      .subscribe((company) => (this.companyData = company));
  }

  editData(data: Company, id?: string) {
    this.companyService.editCompanyData(data);
    console.log(data, id);
  }

  ngOnDestroy(): void {
    this.onDestory$.next();
    this.onDestory$.complete();
  }
}
