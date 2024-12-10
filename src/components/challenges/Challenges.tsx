import { ChallengeContainer } from "./challenge-container/ChallengeContainer";
import { challengesList } from "./challenges-lists/challenges-list";

export const Challenges = () => {
  return (
    <div className="flex w-auto flex-1 flex-col items-center justify-start gap-6 self-stretch px-4 py-14 md:px-8 lg:px-48">
      {Object.keys(challengesList)?.length > 0 &&
        Object.keys(challengesList).map((year) => (
          <div
            key={year}
            className="flex w-auto flex-1 flex-col items-center gap-8 self-stretch"
          >
            <h1 className="text-2xl font-bold">Advent of Code - {year}</h1>
            <ul className="flex w-auto flex-1 flex-col self-stretch [&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg">
              {challengesList[year]?.length > 0 &&
                challengesList[year].map((challenge) => (
                  <ChallengeContainer
                    year={year}
                    {...challenge}
                    key={challenge.day}
                  />
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
};
