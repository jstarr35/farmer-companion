import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { IBoss } from './boss.model';
import { Reddit, Root } from '../../data/reddit';
import { Submissions } from '../../data/submissions';

@Injectable({
  providedIn: 'root',
})
export class BossService {
  activeBosses: IBoss[] = [];
  statusedBosses: IBoss[] = [];
  private redditData: string = '';
  //private subredditUrl: string = `https://www.reddit.com/user/KickOpenTheDoorBot/submitted/.json?sort=new&limit=50&_=${new Date().getTime()}`;
  private subredditUrl: string = 'api/submissions';

  constructor(private http: HttpClient) {
    this.activeBosses = [];
  }

  submissions$ = this.http.get<Submissions>(this.subredditUrl).pipe(

    map((x) => this.getBossesFromData(x))
  );

  getBossesFromData(redditData: Submissions) {
    for (const post of redditData.data.children.filter(
      (c: { kind: string }) => c.kind === 't3'
    )) {
      if (post.data.locked || post.data.title.startsWith('[Slime Only] '))
        continue;
      const flair = post.data.link_flair_text;

      const flairData = this.parseFlair(flair);

      const maxDmg = Math.ceil(
        0.08 *
          flairData.maxHp ** 0.15 *
          flairData.currentHp ** 0.5 *
          flairData.stars.length ** 1.7
      );

      const maxGold = Math.floor(
        (0.086 * flairData.maxHp**0.547 * (flairData.maxHp - flairData.currentHp)**0.263 + 10) * flairData.stars.length**0.167
      );

      if (flairData.currentHp > 0) {
        const tempSubmission = {
          id: post.data.id,
          title: post.data.title,
          thumbnail: post.data.thumbnail
        };
        const tempBoss = {
          submission: tempSubmission,
          flair: {
            text: post.data.link_flair_text,
            textColor: post.data.link_flair_text_color,
            backgroundColor: post.data.link_flair_background_color,
          },
          type: flairData.type,
          stars: flairData.stars.length,
          currentHp: flairData.currentHp,
          maxHp: flairData.maxHp,
          maxDmg: maxDmg,
          maxGold: maxGold,
          weaknesses: [],
          resistances: [],
        };
        if (!this.activeBosses.some((b) => b.submission.id === tempBoss.submission.id)) {
          this.activeBosses.push(tempBoss);
        }
      }
    }
    return of(this.activeBosses);
  }

  parseFlair(flair: string) {
    if (flair.includes('/u/')) {
      return {
        type: '',
        stars: '',
        currentHp: 0,
        maxHp: 0,
      };
    }
    return {
      type: flair.replace(/([^ ]+).*/, '$1'),
      stars: flair.includes('Boss')
        ? flair.replace(/(.*?) .*/, '$1')
        : flair.replace(/.*? (.*?) .*/, '$1'),
      currentHp: Number(flair.replace(/.*? \[.*? (\d+).*/, '$1')),
      maxHp: Number(flair.replace(/.*?\/(\d+).*/, '$1')),
    };
  }


}
