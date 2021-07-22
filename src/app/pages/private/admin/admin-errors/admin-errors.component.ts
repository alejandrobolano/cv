import { Component, OnInit } from '@angular/core';
import {Data} from '@angular/router';
import BackError from '../../../service/model/BackError';
import {TranslateComponent} from '../../../../core/translate/translate.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../../core/service/translate-wrapper.service';
import {BackErrorService} from '../../../service/back-error.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ambm-admin-errors',
  templateUrl: './admin-errors.component.html',
  styleUrls: ['./admin-errors.component.less', '../admin.component.less']
})
export class AdminErrorsComponent extends TranslateComponent implements OnInit {
  errorsWeb: any;
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
              private errorService: BackErrorService) {
    super(translate, translateWrapperService);
  }

  ngOnInit(): void {
    this.retrieveErrors();

  }

  getColumnsLength(): number {
    return 3;
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  retrieveErrors(): void {
    this.errorService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(errors => {
      this.sortByDate(errors, false);
      this.sortByRead(errors, true);
      this.errorsWeb = errors;
    });
  }

  sortByRead(errors: BackError[], isByNotRead: boolean): void {
    errors.sort((data1, data2) =>
      (data1.isFixed === data2.isFixed)
        ? 0
        : (data1.isFixed === isByNotRead)
        ? 1
        : -1);
  }

  sortByDate(errors: BackError[], isByOldDate: boolean): void {
    if (isByOldDate){
      errors.sort((data1, data2) => this.convertStringToDate(data1.date).getTime() - this.convertStringToDate(data2.date).getTime());
    } else{
      errors.sort((data1, data2) => this.convertStringToDate(data2.date).getTime() - this.convertStringToDate(data1.date).getTime());
    }
  }

  convertStringToDate(dateFormatES: string): Date {
    let date = new Date();
    if (dateFormatES !== undefined) {
      try {
        const dateSplit = dateFormatES.split('/');
        date = new Date(Number(dateSplit[2]), Number(dateSplit[1]) - 1, Number(dateSplit[0]));
      }catch (e) {
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
    const requestData = this.errorsWeb.filter(data => this.setOfCheckedId.has(data.id));
    setTimeout(() => {
      Object.values(requestData).forEach(data => {
        // @ts-ignore
        this.errorService.delete(data.id).then(() => {
        });
      });
      this.finishProcessOfSelected();
    }, 100);
  }

  updateReadStateOfSelected(isFixed: boolean): void {
    this.loadingRead = isFixed;
    this.loadingUnread = !isFixed;
    const requestData = this.errorsWeb.filter(error => this.setOfCheckedId.has(error.id));
    setTimeout(() => {
      Object.values(requestData).forEach(error => {
        // @ts-ignore
        error.isFixed = isFixed;
        // @ts-ignore
        this.errorService.update(error.id, error).then(() => {
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


}
