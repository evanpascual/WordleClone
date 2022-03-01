import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import WordRow from "./WordRow";
import { LETTER_LENGTH } from "./word-utils";

export const GUESS_LENGTH = 6;

export default function App() {
  const state = useStore();
  const [guess, setGuess] = useGuess();

  let rows = [...state.rows]; //Each row is a guess. Copy list from state.

  //While there are still more guesses available, add guesses to rows array.
  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess });
  }
  const numGuessesRemaining = GUESS_LENGTH - rows.length;
  rows = rows.concat(Array(numGuessesRemaining).fill(""));

  //Handle how the game is completed when winning/using all 6 guesses
  const isGameOver = state.gameState !== "playing";

  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center"> Wordle </h1>
      </header>

      <main className="grid grid-rows-6 gap-4" aria-label="main-content">
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

//Allow keyboard input without an input field
function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const addGuess = useStore().addGuess;
  const [guess, setGuess] = useState("");
  const previousGuess = usePrevious(guess);

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    console.log(letter);
    setGuess((currentGuess) => {
      const newGuess =
        letter.length === 1 ? currentGuess + letter : currentGuess;

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === LETTER_LENGTH) {
            return "";
          }
      }

      if (currentGuess.length === LETTER_LENGTH) {
        return currentGuess;
      }
      return newGuess;
    });
  };

  //Keyboard listener.
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      addGuess(previousGuess);
    }
  }, [guess]);

  return [guess, setGuess];
}

//From https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref: any = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
