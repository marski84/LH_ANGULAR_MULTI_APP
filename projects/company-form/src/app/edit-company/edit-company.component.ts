import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../models/Company';
import { ICompany } from '../models/ICompany';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent implements OnInit {
  companyData!: Company;
  companyIndex!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const companyIndex = Number(this.activatedRoute.snapshot.params['id']);
    this.companyService.setSelectedCompany = companyIndex;

    console.log(this.companyService.getSelectedCompany);

    this.companyData = this.companyService.getSelectedCompany;
  }

  editData(data: any) {
    // doda id od modelu Company
    this.companyService.editCompanyData(data);
  }
}
