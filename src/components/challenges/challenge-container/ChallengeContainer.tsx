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
  firstStar: (input: string) => unknown;
  secondStar: (input: string) => unknown;
}

export const ChallengeContainer = ({
  year,
  day,
  title,
  story,
  stars,
  firstStar,
  secondStar,
}: ChallengeContainerProps) => {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState<{
    first: unknown | null;
    second: unknown | null;
  }>({
    first: null,
    second: null,
  });

  const hrefs = {
    advent: {
      href: `https://adventofcode.com/${year}/day/${day}`,
      Icon: <Icons.LINK />,
    },
    code: {
      href: `https://github.com/douglasyabuki/advent-of-code-2024/tree/master/src/components/challenges/challenges-lists/${year}/day${day >= 10 ? day : "0" + day}.ts`,
      Icon: <Icons.CODE />,
    },
  };

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
        {Object.entries(hrefs).map(([key, { href, Icon }]) => (
          <a
            className="jutify-center flex size-8 items-center justify-center rounded-full bg-gray-600"
            href={href}
            target="_blank"
            key={key}
          >
            {Icon}
          </a>
        ))}
      </div>
      <div className="flex w-auto flex-1 flex-col items-center justify-start gap-4 self-stretch sm:flex-row">
        <TextInput
          label="Paste your input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPaste={(e) => {
            const clipboardData = e.clipboardData.getData("text");
            const first = firstStar(clipboardData);
            const second = secondStar(clipboardData);
            setResponses({ first, second });
          }}
        />
        <div className="flex gap-4 justify-start flex-1 self-stretch">
          <ChallengeResponseField part={"One"} response={responses?.first} />
          <ChallengeResponseField part={"Two"} response={responses?.second} />
        </div>
      </div>
    </Accordion>
  );
};
