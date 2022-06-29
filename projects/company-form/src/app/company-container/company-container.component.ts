import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICompany } from '../models/ICompany';
import { CompanyService } from '../company.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-company-container',
  templateUrl: './company-container.component.html',
  styleUrls: ['./company-container.component.scss']
})
export class CompanyContainerComponent implements OnInit, OnDestroy {


  companyList$: Observable<ICompany[]>;

  constructor(private companyService: CompanyService) {
    this.companyList$ = this.companyService.getCompanyList();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}
