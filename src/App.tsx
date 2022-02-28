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

  let rows = [...state.rows]; //Each row is a guess. Copy list from state.

  //While there are still more guesses available, add guesses to rows array.
  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess });
  }
  const numGuessesRemaining = GUESS_LENGTH - rows.length;
  rows = rows.concat(Array(numGuessesRemaining).fill(""));

  //Handle how the game is completed when winning/using all 6 guesses
  const isGameOver = state.rows.length === GUESS_LENGTH;

  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center"> Wordle </h1>
        <div>
          <input
            className="w-1/2 p-2 border-2 border-gray-500"
            type="text"
            value={guess}
            onChange={onChange}
            disabled={isGameOver}
          />
        </div>
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map(({ guess, result }, index) => (
          <WordRow key={index} letters={guess} result={result} />
        ))}
      </main>

      {isGameOver && (
        <div
          className="absolute bg-white left-0 right-0 first-line 
          top-1/3 p-4 border border-gray-500 w-3/4 mx-auto rounded 
          text-center"
          role="modal"
        >
          GAME OVER
          <button
            className="block bg-green-500 p-1 mx-auto rounded-md mt-3 shadow"
            onClick={() => {
              state.newGame();
              setGuess("");
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}
