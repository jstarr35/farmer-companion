import { Component, Input, OnInit } from '@angular/core';
import { IBoss } from '../boss-list/boss.model';

@Component({
  selector: 'app-boss-details',
  templateUrl: './boss-details.component.html',
  styleUrls: ['./boss-details.component.css']
})
export class BossDetailsComponent implements OnInit {

  @Input() boss!: IBoss;
  constructor() { }

  ngOnInit() {
  }

}
