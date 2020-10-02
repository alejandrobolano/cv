import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICountry} from '../common/countries/data/ICountry';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {IpService} from '../../../core/service/ip.service';
import {CountriesService} from '../common/countries/countries.service';

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
              private ipService: IpService,
              private countriesService: CountriesService) {
    super(translate, translateWrapperService);
    this.onLangChange();
    this.validateFormBuilder();
  }

  ngOnInit(): void {
    this.countries = this.countriesService.getCountries(this.translate.currentLang);
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

  changeCountry(country: ICountry): void {
    this.countrySelected = country;
  }


  private onLangChange(): void {
    this.translate.onLangChange.subscribe((params: LangChangeEvent) => {
      this.countries = this.countriesService.getCountries(params.lang);
      if (this.country) {
        this.country = this.countriesService.searchCountry(this.country.iata);
      }
    });
  }

}
