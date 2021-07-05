import {Component, OnInit} from '@angular/core';
import {TranslateComponent} from '../../../../core/translate/translate.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../../core/service/translate-wrapper.service';
import {CurriculumEnum} from '../data/curriculum.enum';
import {ICurriculum, IExperience} from '../data/ICurriculum';
import {WindowResizeService} from '../../../../core/service/window-resize.service';
import {NzSizeLDSType} from 'ng-zorro-antd/core/types/size';

@Component({
  selector: 'ambm-about-me',
  templateUrl: './about-me-container.component.html',
  styleUrls: ['./about-me-container.component.css']
})
export class AboutMeContainerComponent extends TranslateComponent implements OnInit {
  avatar = '/assets/img/profile.png';
  size: NzSizeLDSType = 'large';
  tabs = [CurriculumEnum.EXPERIENCE, CurriculumEnum.EDUCATION];
  experience: IExperience[];
  education: ICurriculum[];


  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService,
              private windowResize: WindowResizeService) {
    super(translate, translateWrapperService);
    this.onLangChange();
  }


  ngOnInit(): void {
    this.fillCurriculumArray();
  }

  get isMobile(): boolean {
    return this.windowResize.IsMobile;
  }


  getValue(type: CurriculumEnum): string {
    if (type === CurriculumEnum.EXPERIENCE) {
      return 'curriculum.experience';
    } else if (type === CurriculumEnum.EDUCATION) {
      return 'curriculum.education';
    } else {
      return '';
    }
  }

  getList(type: CurriculumEnum): ICurriculum[] {
    if (type === CurriculumEnum.EXPERIENCE) {
      return this.experience;
    } else if (type === CurriculumEnum.EDUCATION) {
      return this.education;
    } else {
      return [];
    }
  }

  private onLangChange(): void {
    this.translate.onLangChange.subscribe(() => {
      this.fillCurriculumArray();
    });
  }

  private fillCurriculumArray(): void {
    this.education = this.fillArray(CurriculumEnum.EDUCATION);
    this.experience = this.fillArray(CurriculumEnum.EXPERIENCE);
  }


  private fillArray(type: CurriculumEnum): any[] {
    let arrayResolved = [];
    this.translate.get(type.toString()).subscribe(
      values => {
        arrayResolved = Object.keys(values).map(key => values[key]);
      }
    );
    return arrayResolved;
  }
}
