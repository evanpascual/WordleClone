import React from "react";
import { useStore } from "./store";
import { LetterState } from "./word-utils";

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

export default function Keyboard({
  onClick: onClickProp,
}: {
  onClick: (letter: string) => void;
}) {
  const keyboardLetterState = useStore().keyboardLetterState;

  //On button click
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent;
    onClickProp(letter!);
  };

  return (
    <div className="flex flex-col">
      {keyboardKeys.map((keyboardRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex justify-center">
            {keyboardRow.map((key, index) => {
              let styles = "m-1 p-3 rounded font-bold uppercase";
              const letterState = keyStateStyles[keyboardLetterState[key]];

              if (letterState) {
                styles += ` ${letterState}`;
              } else {
                styles += " bg-gray-400";
              }
              return (
                <button key={index} className={styles} onClick={onClick}>
                  {key}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const keyStateStyles = {
  [LetterState.Miss]: " bg-gray-500",
  [LetterState.Match]: " bg-green-500",
  [LetterState.Present]: " bg-yellow-500",
};
