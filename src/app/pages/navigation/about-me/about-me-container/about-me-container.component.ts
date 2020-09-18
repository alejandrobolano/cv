import {Component, Input, OnInit} from '@angular/core';
import {TranslateComponent} from '../../../../core/translate/translate.component';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../../core/service/translate-wrapper.service';
import {EnumCurriculum} from '../data/EnumCurriculum';
import {ICurriculum, IExperience} from '../data/ICurriculum';

@Component({
  selector: 'ambm-about-me',
  templateUrl: './about-me-container.component.html',
  styleUrls: ['./about-me-container.component.css']
})
export class AboutMeContainerComponent extends TranslateComponent implements OnInit {
  avatar = '/assets/img/dummy-user.png';
  size = 'large';
  tabs = [EnumCurriculum.Experience, EnumCurriculum.Education];
  experience: IExperience[];
  education: ICurriculum[];

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
    this.onLangChange();
  }


  ngOnInit(): void {
  }

  getValue(type: EnumCurriculum): string {
    if (type === EnumCurriculum.Experience) {
      return 'curriculum.experience';
    } else if (type === EnumCurriculum.Education) {
      return 'curriculum.education';
    } else {
      return '';
    }
  }

  getList(type: EnumCurriculum): ICurriculum[] {
    if (type === EnumCurriculum.Experience) {
      return this.experience;
    } else if (type === EnumCurriculum.Education) {
      return this.education;
    } else {
      return [];
    }
  }


  private onLangChange(): void {
    this.translate.onLangChange.subscribe((params: LangChangeEvent) => {

      this.fillEducationArray();
      this.fillCurriculumArray('experience', []);

    });
  }

  private fillEducationArray(): void {
    this.translate.get('education').subscribe(
      values => {
        this.education = Object.keys(values).map(key => values[key]);
      }
    );
  }

  private fillCurriculumArray(keyLanguage: string, array: ICurriculum[]): void {
    this.translate.get(keyLanguage).subscribe(
      values => {
        this.experience = Object.keys(values).map(key => values[key]);
      }
    );
  }
}
