import { describe, expect, it } from "vitest";
import App from "./App";
import { useStore } from "./store";
import { render, screen, userEvent, within } from "./test/test-utils.test";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(<App />);

    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  });

  it("shows empty state", () => {
    useStore.getState().newGame([]);
    render(<App />);

    expect(screen.queryByText("GAME OVER")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(6);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });

  it("shows one guess", () => {
    useStore.getState().newGame(["hello"]);
    render(<App />);

    expect(screen.queryByText("GAME OVER")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(6);
    expect(document.querySelector("main")?.textContent).toEqual("hello");
  });

  it("shows lost game", () => {
    useStore
      .getState()
      .newGame(["bands", "block", "brags", "brawl", "blank", "broke"]);
    render(<App />);

    expect(screen.queryByText("GAME OVER"));
  });

  it("shows won game", () => {
    const initialState = ["bands", "block", "brags", "brawl", "blank"];
    useStore.getState().newGame(initialState);
    const answer = useStore.getState().answer;
    useStore.getState().addGuess(answer);
    render(<App />);

    expect(screen.queryByText("GAME OVER")).toBeInTheDocument();
  });

  it("can start a new game", () => {
    useStore
      .getState()
      .newGame(["bands", "block", "brags", "brawl", "blank", "banks"]);
    render(<App />);

    expect(screen.queryByText("GAME OVER"));
  });
});
