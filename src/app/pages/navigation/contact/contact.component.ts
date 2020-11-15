import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICountry} from '../common/countries/data/ICountry';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {IpService} from '../../../core/service/ip.service';
import {CountriesService} from '../common/countries/countries.service';
import {MessageService} from '../../service/message.service';
import Message from '../../model/message';

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
  message: Message;
  isSuccessfulFlagMessage = false;
  isErrorFlagMessage = false;
  newValueId: any;
  errorMessage: any;

  constructor(private formBuilder: FormBuilder,
              public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private ipService: IpService,
              private countriesService: CountriesService,
              private messageService: MessageService) {
    super(translate, translateWrapperService);
    this.onLangChange();
    this.validateFormBuilder();
  }

  ngOnInit(): void {
    this.countries = this.countriesService.getCountries(this.translate.currentLang);
    this.getIp();
  }

  private validateFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      country: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }


  submitForm(value: {
    name: string;
    email: string;
    country: string;
    countryName: string;
    subject: string;
    message: string;
    language: string;
    ip: string
  }): void {
    value.countryName = this.countrySelected.name;
    value.country = this.countrySelected.iata;
    value.language = this.translate.currentLang;
    value.ip = this.ip;

    this.message = {
      name: value.name,
      email: value.email,
      country: value.country,
      countryName: value.countryName,
      subject: value.subject,
      message: value.message,
      language: value.language,
      ip: value.ip
    };
    this.saveMessage(this.message);
  }


  getIp(): void {
    this.ipService.getIpServiceAddress().subscribe((result: any) => {
      this.ip = result.ip;
    });
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

  saveMessage(message: Message): any {
    return this.messageService.create(message).then(docRef => {
      console.log('Created new item successfully!');
      this.changeSuccessfulFlagValue(true);
      this.newValueId = docRef.id;
      this.validateForm.reset();
    }).catch(error => {
        console.error('Error adding document: ', error);
        this.errorMessage = error;
        this.changeErrorFlagValue(true);
      }
    );
  }

  changeSuccessfulFlagValue(newValue): void {
    this.isSuccessfulFlagMessage = newValue;
  }

  changeErrorFlagValue(newValue): void {
    this.isErrorFlagMessage = newValue;
  }

}
