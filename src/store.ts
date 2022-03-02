import { keyboard } from "@testing-library/user-event/dist/keyboard";
import create from "zustand"
import { persist } from "zustand/middleware"
import { GUESS_LENGTH } from "./App";
import { computeGuess, getRandomWord, LetterState } from "./word-utils";

interface GuessRow {
    guess: string;
    result?: LetterState[];
}

interface StoreState {
    answer: string;
    rows: GuessRow[];
    gameState: 'playing' | 'won' | 'lost';
    keyboardLetterState: {[letter: string]: LetterState};
    addGuess: (guess: string) => void;
    newGame: (initalGuess?: string[]) => void;
}

//Using zustand as a state manager.
export const useStore = create<StoreState>(
    persist(
        (set, get) => {
            function addGuess(guess: string) {
                //Compute if the new guess was a winning guess.
                const result = computeGuess(guess, get().answer);
                const didWin = result.every(i => i === LetterState.Match);
                const rows = [...get().rows, {guess, result: computeGuess(guess, get().answer)}];
                const keyboardLetterState = get().keyboardLetterState;

                //Interate over every letter in keyboard to update its state
                result.forEach((r, index) => {
                    const resultGuessLetter = guess[index];
                    const currentLetterState = keyboardLetterState[resultGuessLetter];
                    switch(currentLetterState) {
                        case LetterState.Match:
                            break;
                        case LetterState.Present:
                            if(r === LetterState.Miss) {
                                break;
                            }
                        default:
                            keyboardLetterState[resultGuessLetter] = r;
                            break;
                    }
                }); 

                //How the state updates when a guess is added.
                set(() => ({
                    rows,
                    keyboardLetterState,
                    gameState: didWin ? 'won': rows.length === GUESS_LENGTH ? 'lost': 'playing',
                }));
            }
            return ({
                //Default variables when a new zustand store is created.
                answer: getRandomWord(),
                rows: [],
                gameState: 'playing',
                keyboardLetterState: {},
                addGuess,
    
                //Result variables once a new game is started.
                //Takes in optional initialRows for testing purposes.
                newGame: (initialRows = []) => {
                    set({
                        answer: getRandomWord(),
                        rows: [],
                        keyboardLetterState: {},
                        gameState: 'playing',
                    });
                    initialRows.every(addGuess)
                }
            })
        },
  {
    name: "wordle",
  }
));

//useStore.persist.clearStorage();