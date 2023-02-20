import {Component, Input, OnInit} from '@angular/core';
import {Data} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../../core/service/translate-wrapper.service';
import {MessageService} from '../../../service/message.service';
import {BackErrorService} from '../../../service/back-error.service';
import {CountriesService} from '../../../navigation/common/countries/countries.service';
import {map} from 'rxjs/operators';
import {TranslateComponent} from '../../../../core/translate/translate.component';
import Message from '../../../service/model/Message';
import BackError from '../../../service/model/BackError';

@Component({
  selector: 'ambm-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.less', '../admin.component.less']
})
export class AdminMessagesComponent extends TranslateComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('responsive-device') isResponsiveDevice = false;
  messagesWeb: any;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Data[] = [];
  setOfCheckedId = new Set<number>();
  loadingDelete = false;
  loadingRead = false;
  loadingUnread = false;
  expandSet = new Set<number>();
  backError: BackError;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private messageService: MessageService,
              private errorService: BackErrorService,
              private countriesService: CountriesService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
    this.retrieveMessages();

  }

  getColumnsLength(): number {
    return this.isResponsiveDevice ? 4 : 7;
  }


  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  retrieveMessages(): void {
    this.messageService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.data(), ...c.payload.doc.data()})
        )
      )
    ).subscribe(messages => {
      this.sortByDate(messages, false);
      this.sortByRead(messages, true);
      this.messagesWeb = messages;
    });
  }

  sortByRead(messages: Message[], isByNotRead: boolean): void {
    messages.sort((data1, data2) =>
      (data1.isRead === data2.isRead)
        ? 0
        : (data1.isRead === isByNotRead)
        ? 1
        : -1);
  }

  sortByDate(messages: Message[], isByOldDate: boolean): void {
    if (isByOldDate) {
      messages.sort((data1, data2) => this.convertStringToDate(data1.date).getTime() - this.convertStringToDate(data2.date).getTime());
    } else {
      messages.sort((data1, data2) => this.convertStringToDate(data2.date).getTime() - this.convertStringToDate(data1.date).getTime());
    }
  }

  convertStringToDate(dateFormatES: string): Date {
    let date = new Date();
    if (dateFormatES !== undefined) {
      try {
        const dateSplit = dateFormatES.split('/');
        date = new Date(Number(dateSplit[2]), Number(dateSplit[1]) - 1, Number(dateSplit[0]));
      } catch (e) {
        this.createBackError(e);
      }
    }
    return date;
  }

  createBackError(error: any): void {
    this.backError = {
      component: this.constructor.name,
      message: error,
      stack: error,
      date: new Date().toLocaleDateString('es-ES')
    };
    this.errorService.create(this.backError);
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({disabled}) => !disabled).forEach(({id}) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({disabled}) => !disabled);
    this.checked = listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({id}) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  deleteSelected(): void {
    this.loadingDelete = true;
    const requestData = this.messagesWeb.filter(data => this.setOfCheckedId.has(data.id));
    setTimeout(() => {
      Object.values(requestData).forEach(data => {
        // @ts-ignore
        this.messageService.delete(data.id).then(() => {
        });
      });
      this.finishProcessOfSelected();
    }, 100);
  }

  updateReadStateOfSelected(isRead: boolean): void {
    this.loadingRead = isRead;
    this.loadingUnread = !isRead;
    const requestData = this.messagesWeb.filter(message => this.setOfCheckedId.has(message.id));
    setTimeout(() => {
      Object.values(requestData).forEach(message => {
        // @ts-ignore
        message.isRead = isRead;
        // @ts-ignore
        this.messageService.update(message.id, message).then(() => {
        });
      });
      this.finishProcessOfSelected();
    }, 100);
  }

  finishProcessOfSelected(): any {
    this.setOfCheckedId.clear();
    this.refreshCheckedStatus();
    this.loadingRead = false;
    this.loadingUnread = false;
    this.loadingDelete = false;
  }

  getCountryCode(language: string): string {
    return this.countriesService.getCountryCode(language);
  }

}
