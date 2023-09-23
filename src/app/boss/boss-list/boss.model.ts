import { IFlair } from "./flair.model";

export interface IBoss {

  submission: ISubmission;
  flair: IFlair;
  type: string;
  stars: number;
  currentHp: number;
  maxHp: number;
  maxDmg: number;
  maxGold: number;
  weaknesses: string[];
  resistances: string[];
}

export interface ISubmission {
  id: string;
  title: string;
  thumbnail: string;
}
