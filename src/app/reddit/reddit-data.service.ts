import { Injectable } from '@angular/core';
import { ISubmission } from '../boss/boss-list/boss.model';
import { map, of, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Submissions } from '../data/submissions';

@Injectable({
  providedIn: 'root',
})
export class RedditDataService {
  private submissionsUrl: string = `https://www.reddit.com/user/KickOpenTheDoorBot/submitted/.json?sort=new&limit=50&_=${new Date().getTime()}`;
  private bossSubmissions: ISubmission[] = [];

  constructor(private http: HttpClient) {}

  public getBossSubmissions(): Observable<ISubmission[]> {
    this.http.get<Submissions>(this.submissionsUrl).pipe(
      map((x) => {
        for (const post of x.data.children.filter(
          (c: { kind: string }) => c.kind === 't3'
        )) {
          if (!post.data.locked || post.data.title.startsWith('[Slime Only]'))
            continue;
          if (
            !this.bossSubmissions.some(
              (b) => b.id === post.data.id
            )
          ) {
            this.bossSubmissions.push({ id: post.data.id, title: post.data.title, thumbnail: post.data.thumbnail});
          }
        }
      })
    )
    return of(this.bossSubmissions);
  };
}
