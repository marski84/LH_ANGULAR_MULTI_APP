import { Component, OnInit } from '@angular/core';
import { CoinService } from '../coin.service';

@Component({
  selector: 'app-select-coin-type-form',
  templateUrl: './select-coin-type-form.component.html',
  styleUrls: ['./select-coin-type-form.component.scss'],
})
export class SelectCoinTypeFormComponent implements OnInit {
  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.coinService.getCurrencyList().subscribe((value) => console.log(value));

    this.coinService.getCurrencyData().subscribe();
  }
}
