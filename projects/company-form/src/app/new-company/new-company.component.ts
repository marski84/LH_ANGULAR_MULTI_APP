import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company';
import { CompanyService } from '../company.service';
import { ICompany } from '../models/ICompany';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss'],
})
export class NewCompanyComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {}

  handleAddNewCompany(data: ICompany) {
    this.companyService.createNewCompany(data);
  }
}
