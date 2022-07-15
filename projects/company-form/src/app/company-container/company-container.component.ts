import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';

@Component({
  selector: 'app-company-container',
  templateUrl: './company-container.component.html',
  styleUrls: ['./company-container.component.scss'],
})
export class CompanyContainerComponent implements OnInit, OnDestroy {
  companyList$: Observable<Company[]> = this.companyService.getCompanyList();

  constructor(private companyService: CompanyService) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
