import { Icons } from "@/icons/Icons";
import Accordion from "@/ui/accordion/Accordion";
import { TextInput } from "@/ui/text-input/TextInput";
import { useState } from "react";
import { ChallengeContainerHeader } from "./challenge-container-header/ChallengeContainerHeader";
import { ChallengeResponseField } from "./challenge-response-field/ChallengeResponseField";

interface ChallengeContainerProps {
  year: number | string;
  day: number;
  title: string;
  story?: string;
  stars: number;
  firstStarFunction: (input: string) => unknown;
  secondStarFunction: (input: string) => unknown;
}

export const ChallengeContainer = ({
  year,
  day,
  title,
  story,
  stars,
  firstStarFunction,
  secondStarFunction,
}: ChallengeContainerProps) => {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState<{
    first: unknown | null;
    second: unknown | null;
  }>({
    first: null,
    second: null,
  });

  return (
    <Accordion
      HeaderComponent={
        <ChallengeContainerHeader
          year={year}
          day={day}
          title={title}
          stars={stars}
        />
      }
    >
      <div className="flex w-auto flex-1 items-center justify-end gap-2 self-stretch">
        <p className="hidden">{story}</p>
        <a
          className="jutify-center flex size-8 items-center justify-center rounded-full bg-gray-600"
          href={`https://adventofcode.com/${year}/day/${day}`}
          target="_blank"
        >
          <Icons.LINK />
        </a>
        <a
          className="jutify-center flex size-8 items-center justify-center rounded-full bg-gray-600"
          href=""
        >
          <Icons.CODE />
        </a>
      </div>
      <div className="flex w-auto flex-1 items-center justify-start gap-4 self-stretch">
        <TextInput
          label="Paste your input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={(e) => {
            const clipboardData = e.clipboardData.getData("text");
            const first = firstStarFunction(clipboardData);
            const second = secondStarFunction(clipboardData);
            setResponses({ first, second });
          }}
        />
        <ChallengeResponseField part={"One"} response={responses?.first} />
        <ChallengeResponseField part={"Two"} response={responses?.second} />
      </div>
    </Accordion>
  );
};
