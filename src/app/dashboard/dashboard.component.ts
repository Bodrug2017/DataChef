import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  banners: string[] = [];
  remainingBanners: string[] = [];
  currentBanner: string;
  
  //@Input() usedBanners: string[] = [];
  //@Output() usedBannersChanged = new EventEmitter<string[]>();

  @Input() usedBanners: string = '';
  @Output() usedBannersChanged = new EventEmitter<string>();

  imgBanner: string = '';
  campaign_id: number;

  constructor(
  			private campaignService : CampaignService,
  			private route: ActivatedRoute,
        private messageService : MessageService) { }

  private log(message : string) {
    this.messageService.add(`DashboardComponent: ${message}`);
  }

  ngOnInit(): void {
  	this.getBanners();
  }

  getBanners(): void {
  	this.campaign_id = +this.route.snapshot.paramMap.get('id')
  	this.campaignService.getBanners(this.campaign_id)
  		.subscribe(banners => this.banners = banners);

    this.campaignService.getBanners(this.campaign_id)
      .subscribe(banners => this.remainingBanners = banners);

    this.campaignService.getBanners(this.campaign_id)
      .subscribe(banners => this.currentBanner = banners[Math.floor(Math.random() * banners.length)]);

    this.campaignService.getBanners(this.campaign_id)
      .subscribe(banners => this.imgBanner = 'assets/imgs/image_'+ this.currentBanner +'.png');
  }

  onClick(): void {
    this.usedBanners = this.usedBanners + ' ' + this.currentBanner;
    this.usedBannersChanged.emit(this.usedBanners);
    this.log(`usedBanners: ${this.usedBanners}`);

    this.remainingBanners.splice(this.remainingBanners.indexOf(this.currentBanner),1);
    this.log(`remainingBanners: ${this.remainingBanners}`);

    this.currentBanner = this.remainingBanners[Math.floor(Math.random() * this.remainingBanners.length)];
    this.log(`current banner: ${this.currentBanner}`);

    this.imgBanner = 'assets/imgs/image_'+ this.currentBanner +'.png';
  }
}
