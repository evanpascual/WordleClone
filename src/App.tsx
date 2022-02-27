import React, { useState } from "react";
import { useStore } from "./store";
import WordRow from "./WordRow";
import { LETTER_LENGTH } from "./word-utils";

const GUESS_LENGTH = 6;

export default function App() {
  const state = useStore();
  const [guess, setGuess] = useState("");

  //onChange handler.
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;

    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess);
      setGuess("");
      return;
    }
    setGuess(newGuess);
  };

  let rows = [...state.guesses]; //Each row is a guess. Copy list from state.

  //While there are still more guesses available, add guesses to rows array.
  if (rows.length < GUESS_LENGTH) {
    rows.push(guess);
  }
  const numGuessesRemaining = GUESS_LENGTH - rows.length;
  rows = rows.concat(Array(numGuessesRemaining).fill(""));

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center"> Wordle </h1>
        <div>
          <input
            className="w-1/2 p-2 border-2 border-gray-500"
            type="text"
            value={guess}
            onChange={onChange}
          />
        </div>
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map((row, index) => (
          <WordRow key={index} letters={row} />
        ))}
        ;
      </main>
    </div>
  );
}
