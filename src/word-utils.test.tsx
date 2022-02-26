import { describe, expect, it } from "vitest";
import { getRandomWord } from "./word-utils";
import { render, screen } from "./test/test-utils.test";

describe("word-utils", () => {
  it("random word", () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});
