import { CareerEntry } from './career-entry.model';

export interface Profile {
  name: string;
  role: string;
  statement: string[];
  career: CareerEntry[];
}
