import wordBank from './word-bank.json';

export const LETTER_LENGTH = 5; 

//Generates random int to use as index for word bank.
export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

//Enum is data type that allows variables to be set to a constant (Miss, Present, and Match).
//Variables in the computeGuess function below will be set to these values.
export enum LetterState {
    Miss,
    Present,
    Match,
}

//Determines the accuracy of the guess to the answer by using LetterState.
export function computeGuess(guess: string, answer:string): LetterState[] {
     const result: LetterState[] = [];

    if(guess.length !== answer.length) { return result; }   //If the guess string is too short.

    const guessArray = guess.split('');
    const answerArray = answer.split('');

    //Keeps track of the count of letters in the answer in the case of doubles (or triples).
    //This is used to show only one match when theres 1 letter in the guess that appears
    //multiples times in the answer.
    const answerLetterCount: Record<string, number> = {};   

    guessArray.forEach((letter, index) => {
        const currentAnswerLetter = answer[index];

        //If a record exists for the letter, then increment it. If not, then create new one.
        answerLetterCount[currentAnswerLetter] 
        = answerLetterCount[currentAnswerLetter] 
        ? answerLetterCount[currentAnswerLetter] + 1:
        1;

        if(letter === answerArray[index]) {
            result.push(LetterState.Match);
        } else if(answerArray.includes(letter)) {
            result.push(LetterState.Present);
        }else {
            result.push(LetterState.Miss);
        }
    });

    //Checks for edge case mentioned above.
    result.forEach((resultState, resultIndex) => {
        if(resultState !== LetterState.Present) {
            return;
        }
        
        const guessLetter = guessArray[resultIndex];

        answerArray.forEach((answerLetter, answerIndex) => {
            if(guessLetter !== answerLetter) {
                return;
            }

            if(result[answerIndex] === LetterState.Match) {
                result[resultIndex] = LetterState.Miss;
            }

            if(answerLetterCount[guessLetter] <= 0) {
                result[resultIndex] = LetterState.Miss;
            }
        });
        answerLetterCount[guessLetter]--;
    });
    
    return result;
}

//Check that only valid words are used as guesses
export function isValidWord(word: string): boolean {
    return wordBank.includes(word);
}