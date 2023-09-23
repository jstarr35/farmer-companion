import { InMemoryDbService } from 'angular-in-memory-web-api';


import { Submissions } from './data/submissions';
import { BossData } from './data/boss.data';

export class AppData implements InMemoryDbService {

  createDb(): { submissions: Submissions, _157qny8: string, _157dlx0: string, _157k0d4: string, _157qwje: string } {
    const submissions = BossData.submissions;
    const _157qny8 = BossData._157qny8;
    const _157dlx0 = BossData._157dlx0;
    const _157k0d4 = BossData._157k0d4;
    const _157qwje = BossData._157qwje;
    return { submissions, _157dlx0, _157qny8,_157qwje,_157k0d4 };
  }
}
