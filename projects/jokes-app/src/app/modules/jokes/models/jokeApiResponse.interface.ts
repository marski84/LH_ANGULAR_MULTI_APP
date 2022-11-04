import { JokeType } from './jokeType.enum';

export interface IjokeApiResponse {
  error: boolean;
  category: string;
  type: JokeType;
  setup?: string;
  delivery?: string;
  joke?: JokeType;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  safe: boolean;
  id: number;
  lang: string;
}
