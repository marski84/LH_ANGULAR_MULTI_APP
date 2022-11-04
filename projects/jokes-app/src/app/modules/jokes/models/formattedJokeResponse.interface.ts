import { JokeType } from './jokeType.enum';
export interface IformattedJokeResponse {
  jokeCategory: string;
  type: JokeType;
  joke?: string;
  twoPartJokeQuostion?: string;
  twoPartJokeAnswer?: string;
}
