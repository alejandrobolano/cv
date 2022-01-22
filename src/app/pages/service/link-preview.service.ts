import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ILinkPreview} from './contracts/ilink-preview';
import {HttpClient} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

// @ts-ignore
export class LinkPreviewService {
  preview: ILinkPreview;
  private regExHyperlink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  link = new FormControl('', [Validators.required, Validators.pattern(this.regExHyperlink)]);

  constructor(private http: HttpClient) {
  }

  getLinkPreview(link: string): Observable<any> {
    const api = 'https://api.linkpreview.net/?key=440bdd2442425a6a723ef2b0d651064b&q=' + link;
    return this.http.get(api);
  }


  /* Html code */

  /*
  * <nz-card [nzHoverable]="true">
  <div nz-row>
    <div nz-col nzFlex="100px">
      <div [hidden]="!preview.image">
        <img class="image" [src]="preview.image">
      </div>
    </div>
    <div nz-col nzFlex="auto">
      <div class="preview-text">
        <div [hidden]="!preview.url" class="url">
          <span>{{preview.url}}</span>
        </div>
        <div [hidden]="!preview.title" class="title">
          <span>{{preview.title}}</span>
        </div>
        <div [hidden]="!preview.description" class="description">
          <span>{{preview.description}}</span>
        </div>
      </div>
    </div>
  </div>
</nz-card>
* */


  /* Ts code */

  /*
  *
  preview: ILinkPreview;
  * onPreview(): void {
    this.linkPreview.getLinkPreview('http://cubabluediving.com')
      .subscribe(preview => {
        this.preview = preview;

        if (!this.preview.title) {
          this.preview.title = this.preview.url;
        }

      }, error => {
        this.preview.url = this.link.value;
        this.preview.title = this.preview.url;
      });
  }
  * */
}
