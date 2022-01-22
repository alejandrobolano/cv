import {Injectable} from '@angular/core';
import {LanguageEnum} from '../../../../core/enum/language.enum';
import {COUNTRIES_EN} from './data/Countries_EN';
import {COUNTRIES_ES} from './data/Countries_ES';
import {ICountry} from './data/ICountry';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {
  countries: ICountry[];

  constructor() {
  }

  getCountries(language: string): ICountry[] {
    if (language === LanguageEnum.ENGLISH) {
      this.countries = COUNTRIES_EN;
    } else {
      this.countries = COUNTRIES_ES;
    }
    return this.countries;
  }

  searchCountry(id: string): ICountry {
    return this.countries.filter(country => {
      return country.iata.toLowerCase().includes(id);
    })[0];
  }

  getCountryCode(language: string): string {
    switch (language) {
      case LanguageEnum.ENGLISH:
        return 'gb';
      case LanguageEnum.CATALAN:
        return 'es-ca';
      default:
        return 'es';
    }
  }
}
