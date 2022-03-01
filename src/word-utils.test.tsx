import { describe, expect, it } from "vitest";
import { useStore } from "./store";
import {
  computeGuess,
  getRandomWord,
  isValidWord,
  LetterState,
} from "./word-utils";

describe("getRandomWord", () => {
  it("random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});

describe("computeGuess", () => {
  it("works with match and present", () => {
    expect(computeGuess("boost", "basic")).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });

  it("works with all matches", () => {
    expect(computeGuess("boost", "boost")).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

  it("all misses", () => {
    expect(computeGuess("boost", "alarm")).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it("only does one match when two letters are present", () => {
    expect(computeGuess("belle", "belts")).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it("returns an empty array when there is an incomplete guess", () => {
    expect(computeGuess("so", "boost")).toEqual([]);
  });

  test("when 2 letters are present but answer has only 1 of those letters", () => {
    expect(computeGuess("allol", "smelt")).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  test("when 1 letter matches but guess has more of the same letter", () => {
    expect(computeGuess("allol", "colon")).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
    ]);
  });
});

describe("input validation", () => {
  it("is a valid word", () => {
    expect(isValidWord("alarm")).toBeTruthy();
  });

  it("is an invalid word", () => {
    expect(isValidWord("catss")).toBeFalsy();
  });
});
