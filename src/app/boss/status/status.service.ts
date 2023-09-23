import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs';
import { IBoss } from 'src/app/boss/boss-list/boss.model';
import { IStatuses } from './statuses';

@Injectable({
  providedIn: 'root'
})
export class StatusService {


getUrl(id:string) {
  switch(id) {
    case '157k0d4':
      return 'api/_157k0d4';
      break;
    case '157dlx0': return 'api/_157dlx0';
      break;
    case '157qny8': return 'api/_157qny8';
      break;
    case '157qwje': return 'api/_157qwje';
      break;
    default:
      return '';
  }
}
constructor(private http: HttpClient) { }

getBossStatuses(bossId: string) {

  const dataUrls = {'157k0d4': 'api/_157k0d4','157dlx0': 'api/_157dlx0','157qny8': 'api/_157qny8','157qwje': 'api/_157qwje'}

  return this.http
 .get<string>(this.getUrl(bossId))
 .pipe(
   map((json) => {

     const statuses = this.parseAllComments(json);
     const ws: string[] = [];
     const rs: string[] = [];
     for (let i = 0; i < statuses.weaknesses.length; i++) {
       ws.push(statuses.weaknesses[i]);
     }
     for (let i = 0; i < statuses.resistances.length; i++) {
       rs.push(statuses.resistances[i]);
     }
     return {weaknesses: ws, resistances: rs} ;
   })
 )
}

parseAllComments(json: string) {
  const weaknesses: string[] = [];
  const resists: string[] = [];
  const re = /[A-Za-z]+\b(?!$)/g;

  const wMatches = JSON.stringify(json).matchAll(/[+]\d+[.]\d+\s(\w+)\s\bWeakness\b/g);
  for (const wMatch of wMatches) {
    const [fullMatch, weakness] = wMatch;
    if (!weaknesses.includes(weakness)) weaknesses.push(weakness);
  }

  const rMatches = JSON.stringify(json).matchAll(/[-]\d+[.]\d+\s(\w+)\s\bResistance\b/g);
  for (const rMatch of rMatches) {
    const [fullMatch, resistance] = rMatch;
    if (
      !['Melee', 'Ranged', 'Magic', 'Mage'].includes(resistance) &&
      !resists.includes(resistance)
    )
      resists.push(resistance);
  }

  return { weaknesses: weaknesses, resistances: resists };
}
}
