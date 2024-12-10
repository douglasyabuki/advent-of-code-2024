import { Icons } from "@/icons/Icons";
import { twMerge } from "tailwind-merge";

interface ChallengeContainerHeader {
  year: string | number;
  day: number;
  title: string;
  stars: number;
}

export const ChallengeContainerHeader = ({
  year,
  day,
  title,
  stars,
}: ChallengeContainerHeader) => {
  const yellowStars = Array(stars).fill("fill-yellow-300 stroke-yellow-400");
  const grayStars = Array(2 - stars).fill("fill-gray-600 stroke-gray-700");
  return (
    <div className="flex h-auto w-auto flex-1 items-center justify-between gap-2">
      <div className="flex items-center justify-start gap-2">
        <h3 className="rounded-full bg-gray-600 px-4 font-bold">{year}</h3>
        <h4 className="font-bold">Day {day}</h4>
        <p>●</p>
        <h3 className="text-sm font-bold uppercase">{title}</h3>
      </div>
      <ul className="flex items-center justify-end gap-2 rounded-full px-2 pb-[2px]">
        {[...yellowStars, ...grayStars].map((star, id) => (
          <li key={id}>
            <Icons.STAR_OUTLINED className={twMerge("size-5", star)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
