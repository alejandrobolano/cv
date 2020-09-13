import {Component, Input, OnInit} from '@angular/core';
import {TranslateComponent} from '../../../core/translate/translate.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateWrapperService} from '../../../core/service/translate-wrapper.service';
import {EnumCurriculum} from './data/EnumCurriculum';
import {Education} from './data/EducationCurriculum';
import {ICurriculum, IExperience} from './data/ICurriculum';
import {Experience} from './data/ExperienceCurriculum';

@Component({
  selector: 'ambm-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent extends TranslateComponent implements OnInit {
  avatar = '/assets/img/dummy-user.png';
  size = 'large';
  tabs = [EnumCurriculum.Experience, EnumCurriculum.Education];
  experience: IExperience[] = Experience;
  education: ICurriculum[] = Education;

  constructor(public translate: TranslateService,
              public translateWrapperService: TranslateWrapperService) {
    super(translate, translateWrapperService);
  }


  ngOnInit(): void {
  }

  getValue(type: EnumCurriculum): string{
    if (type === EnumCurriculum.Experience){
      return 'curriculum.experience';
    }
    else if (type === EnumCurriculum.Education){
      return 'curriculum.education';
    } else {
      return '';
    }
  }
  getList(type: EnumCurriculum): ICurriculum[]{
    if (type === EnumCurriculum.Experience){
      return this.experience;
    }
    else if (type === EnumCurriculum.Education){
      return this.education;
    } else {
      return [];
    }
  }



}
