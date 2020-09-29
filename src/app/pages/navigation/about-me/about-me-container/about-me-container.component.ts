import {Component, Input, OnInit} from '@angular/core';
import {TranslateComponent} from '../../../../core/translate/translate.component';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../../core/service/translate-wrapper.service';
import {CurriculumEnum} from '../data/CurriculumEnum';
import {ICurriculum, IExperience} from '../data/ICurriculum';

@Component({
  selector: 'ambm-about-me',
  templateUrl: './about-me-container.component.html',
  styleUrls: ['./about-me-container.component.css']
})
export class AboutMeContainerComponent extends TranslateComponent implements OnInit {
  avatar = '/assets/img/profile.png';
  size = 'large';
  tabs = [CurriculumEnum.EXPERIENCE, CurriculumEnum.EDUCATION];
  experience: IExperience[];
  education: ICurriculum[];

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
    this.onLangChange();
  }


  ngOnInit(): void {
    this.fillCurriculumArray();
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
    this.translate.onLangChange.subscribe((params: LangChangeEvent) => {
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
