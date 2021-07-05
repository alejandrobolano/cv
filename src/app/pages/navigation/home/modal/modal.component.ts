import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookiesService} from '../../../../core/service/cookies.service';
import {VisibilityEnum} from '../../../../core/enum/visibility.enum';
import {MySocialNetworksEnum} from '../../../../core/enum/my-social-networks.enum';
import {KnowhowService} from '../../../service/knowhow.service';
import Knowhow from '../../../service/model/Knowhow';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ambm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isPossibleToShow = false;
  knowhow = '';
  knowhowDataList: any;

  constructor(private router: Router,
              public cookies: CookiesService,
              private knowhowService: KnowhowService) {
    this.processVisibilityOfCookie();
  }

  processVisibilityOfCookie(): void {
    if (this.cookies.getCookie('modal') === '1') {
      this.isPossibleToShow = true;
      this.setVisibilityOfCookie(false);
    } else if (!this.cookies.getCookie('modal')) {
      this.setVisibilityOfCookie(true);
    }
  }

  ngOnInit(): void {
    this.processVisibilityOfCookie();
    this.getAllData();
  }

  setVisibilityOfCookie(showModal: boolean): void {
    this.cookies.setCookie('modal',
      showModal ? VisibilityEnum.Visible : VisibilityEnum.NotVisible,
      7,
      '/');
  }

  handleLinkToLinkedIn(): void {
    this.isPossibleToShow = false;
    console.log('Link to linkedIn:' + this.knowhow);
    this.processData(false, true);
    window.open(MySocialNetworksEnum.LinkedIn, '_blank');
  }

  handleContinueInThisSite(): void {
    this.isPossibleToShow = false;
    console.log('Continue in this site:' + this.knowhow);
    this.processData(true, false);
  }

  processData(isStayInSiteLink: boolean, isLinkedInLink: boolean): void {
    const data2 = this.get(this.knowhow);
    if (data2 !== undefined) {
      data2.quantity += 1;
      if (isStayInSiteLink) {
        data2.stayInSiteQuantity += 1;
      } else {
        data2.linkedInQuantity += 1;
      }
      this.knowhowService.update(data2.id, data2);
    } else {
      const data: Knowhow = {
        reference: this.knowhow,
        linkedInQuantity: isLinkedInLink ? 1 : 0,
        stayInSiteQuantity: isStayInSiteLink ? 1 : 0,
        quantity: 1
      };
      this.saveData(data);
    }
  }

  saveData(message: Knowhow): any {
    return this.knowhowService.create(message).then()
      .catch(error => {
        window.alert(error.message);
      }
    );
  }

  getAllData(): void {
    this.knowhowService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(messages => {
      this.knowhowDataList = messages;
    });
  }

  get(reference: string): any {
    return this.knowhowDataList.find(knowhow => knowhow.reference === reference);
  }
}
