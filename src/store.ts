import create from "zustand"
import { persist } from "zustand/middleware"
import { getRandomWord } from "./word-utils";

interface StoreState {
    answer: string;
    guesses: string[];
    addGuess: (guess: string) => void;
}

//Using zustand as a state manager.
export const useStore = create<StoreState>(
    persist(
        (set) => ({
            answer: getRandomWord(),
            guesses: ['hello', 'world', 'fears'],
            addGuess: (guess: string) => {
                set((state) => ({
                    guesses: [...state.guesses, guess],
                }));
            },
        }
  ),
  {
    name: "wordle", // unique name
  }
));

//useStore.persist.clearStorage();