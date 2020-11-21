import {Component, Input, OnInit} from '@angular/core';
import {Data} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../../core/service/translate-wrapper.service';
import {MessageService} from '../../../service/message.service';
import {ErrorService} from '../../../service/error.service';
import {CountriesService} from '../../../navigation/common/countries/countries.service';
import {map} from 'rxjs/operators';
import {TranslateComponent} from '../../../../core/translate/translate.component';

@Component({
  selector: 'ambm-contact-message',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.css']
})
export class ContactMessageComponent extends TranslateComponent implements OnInit {
  @Input('hide-columns') hideColumns;
  messagesWeb: any;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Data[] = [];
  setOfCheckedId = new Set<number>();
  loadingDelete = false;
  loadingRead = false;
  loadingUnread = false;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private messageService: MessageService,
              private errorService: ErrorService,
              private countriesService: CountriesService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
    this.retrieveMessages();
  }

  retrieveMessages(): void {
    this.messageService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.messagesWeb = data;
    });
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
    const requestData = this.messagesWeb.filter(data => this.setOfCheckedId.has(data.id));
    setTimeout(() => {
      Object.values(requestData).forEach(data => {
        // @ts-ignore
        data.isRead = isRead;
        // @ts-ignore
        this.messageService.update(data.id, data).then(() => {
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
