import { Component, OnInit } from '@angular/core';
import { BossService } from './boss.service';
import { mergeAll } from 'rxjs';
import { IBoss } from './boss.model';


@Component({
  selector: 'app-boss-list',
  templateUrl: './boss-list.component.html',
  styleUrls: ['./boss-list.component.scss']

})
export class BossListComponent {
  bosses!: IBoss[];
  bosses$ = this.bossService.submissions$.pipe(mergeAll());
  loading: boolean = true;

  constructor(private bossService: BossService){}

  ngOnInit() {
    this.bossService.submissions$.pipe(mergeAll()).subscribe((b) => {
      this.bosses = b;
      this.loading = false;
    })
  }
}
