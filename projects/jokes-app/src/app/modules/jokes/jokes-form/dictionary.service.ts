import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ISelectValue } from '../models/selectValue.interface';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private categories: ISelectValue[] = [
    { value: 'any', viewValue: 'Any kind' },
    { value: 'programming', viewValue: 'Programming' },
    { value: 'misc', viewValue: 'Miscelanious' },
    { value: 'dark', viewValue: 'Dark' },
    { value: 'pun', viewValue: 'Punchline' },
    { value: 'spooky', viewValue: 'Spooky' },
    { value: 'christmas', viewValue: 'Christmas' },
  ];

  private jokeTypes: ISelectValue[] = [
    { value: 'single', viewValue: 'Single' },
    { value: 'twopart', viewValue: 'Twopart' },
  ];

  private blacklistCategories: ISelectValue[] = [
    { value: 'nsfw', viewValue: 'Work' },
    { value: 'religious', viewValue: 'Religion' },
    { value: 'political', viewValue: 'Politics' },
    { value: 'racist', viewValue: 'Race' },
    { value: 'sexist', viewValue: 'Sex' },
    { value: 'explicit', viewValue: 'Explicit' },
  ];

  getCategories() {
    return of(this.categories);
  }

  getJokeTypes() {
    return of(this.jokeTypes);
  }

  getBlackListCategories() {
    return of(this.blacklistCategories);
  }

  constructor() {}
}
