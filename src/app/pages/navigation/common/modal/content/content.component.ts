import { Component, OnInit } from '@angular/core';
import {MySocialNetworksEnum} from '../../../../../core/enum/my-social-networks.enum';

@Component({
  selector: 'ambm-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  avatar = '/assets/img/profile.png';
  linkedInUrl = MySocialNetworksEnum.LinkedIn

  constructor() { }

  ngOnInit(): void {
  }

}
