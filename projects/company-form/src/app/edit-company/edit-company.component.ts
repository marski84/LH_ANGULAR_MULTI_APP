import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { ICompany } from '../models/ICompany';
import { Company } from '../models/Company';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {



  companyData!: ICompany;
  companyIndex!: number;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {

  }

  ngOnInit(): void {
    console.log(this.router.url);

    const companyIndex = Number(this.router.url.split('/')[2]);
    this.companyData = this.companyService.companyList[companyIndex];

  };

  getEditedData(data: Company) {
    // doda id od modelu Company
    console.log(data);
    this.companyService.editCompanyData(data, this.companyIndex);

    // this.companyService.addEmployeeToEmployeeList(this.companyData, data);
  };
}




