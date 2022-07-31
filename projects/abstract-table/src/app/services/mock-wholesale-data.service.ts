import { WholeSalerInterface } from './../models/WholeSalerInterface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockWholesaleDataService {
  bigOne: WholeSalerInterface = {
    name: 'Biggest',
    score: 78,
    contactPhone: 111666999,
  };

  mediumOne: WholeSalerInterface = {
    name: 'Cheap but average',
    score: 65,
    contactPhone: 987120765,
  };

  smallOne: WholeSalerInterface = {
    name: 'Maybe small but great quality',
    score: 98,
    contactPhone: 248037160,
  };

  wholeSalerList = [this.bigOne, this.mediumOne, this.smallOne];

  constructor() {}
}
