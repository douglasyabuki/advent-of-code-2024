import { challenges2024 } from "./2024";

export interface Challenge {
  day: number;
  title: string;
  stars: number;
  story: string;
  firstStar: (input: string) => unknown;
  secondStar: (input: string) => unknown;
}

export const challengesList: Record<string, Challenge[]> = {
  2024: [...challenges2024],
};
