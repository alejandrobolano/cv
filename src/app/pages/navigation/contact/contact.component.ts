import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COUNTRIES_EN} from '../common/countries/data/Countries_EN';
import {ICountry} from '../common/countries/data/ICountry';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from '../../../core/enum/LanguageEnum';
import {COUNTRIES_ES} from '../common/countries/data/Countries_ES';
import {IpService} from '../../../core/service/ip.service';
import {ISite} from '../../private/sites/data/ISite';

@Component({
  selector: 'ambm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends TranslateComponent implements OnInit {
  validateForm: FormGroup;
  countries: ICountry[];
  country: ICountry;
  ip: string;
  countrySelected: ICountry;

  constructor(private formBuilder: FormBuilder,
              public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private ipService: IpService) {
    super(translate, translateWrapperService);
    this.onLangChange();
    this.validateFormBuilder();
  }

  ngOnInit(): void {
    this.getCountries(this.translate.currentLang);
  }

  private validateFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      country: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }


  submitForm(value: {
    userName: string;
    email: string;
    country: string;
    countryName: string;
    subject: string;
    confirm: string;
    comment: string;
    language: string;
    ip: string
  }): void {
    value.countryName = this.countrySelected.name;
    value.country = this.countrySelected.iata;
    value.language = this.translate.currentLang;
    value.ip = this.getIp();

    alert(JSON.stringify(value));
  }

  getIp(): string {
    let ip = '';
    this.ipService.getIPAddress().subscribe((result: any) => {
      ip = result.ip;
    });
    return ip;
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  searchCountry(id: string): ICountry {
    return this.countries.filter(country => {
      return country.iata.toLowerCase().includes(id);
    })[0];
  }

  changeCountry(country: ICountry): void {
    this.countrySelected = country;
  }


  private onLangChange(): void {
    this.translate.onLangChange.subscribe((params: LangChangeEvent) => {
      this.getCountries(params.lang);
      if (this.country) {
        this.country = this.searchCountry(this.country.iata);
      }
    });
  }

  getCountries(language: string): void {
    if (language === LanguageEnum.ENGLISH) {
      this.countries = COUNTRIES_EN;
    } else {
      this.countries = COUNTRIES_ES;
    }
  }

}
