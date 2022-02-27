import { useStore } from "./store";
import { computeGuess, LetterState, LETTER_LENGTH } from "./word-utils";

interface WordRowProps {
  letters: string;
}

//Style each row of guesses.
export default function WordRow({ letters: lettersProp = "" }: WordRowProps) {
  const answer = useStore((state) => state.answer);
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  const guessStates = computeGuess(lettersProp, answer);

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={guessStates[index]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

//Style each character box.
function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles = state == null ? "" : characterStateStyles[state];

  return (
    <span
      className={`inline-block border-2 p-4 border-gray-500
      uppercase text-2xl font-bold text-center ${stateStyles}
    before:inline-block before:content-['_']`}
    >
      {value}
    </span>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-500 border-gray-500",
  [LetterState.Match]: "bg-green-500 border-green-500",
  [LetterState.Present]: "bg-yellow-500 border-yellow-500",
};
