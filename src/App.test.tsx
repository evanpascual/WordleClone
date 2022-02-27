import { describe, expect, it } from "vitest";
import App from "./App";
import { useStore } from "./store";
import { render, screen, userEvent } from "./test/test-utils.test";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  });

  it("shows empty state", () => {
    useStore.setState({ guesses: [] });
    render(<App />);
    expect(screen.queryByText("GAME OVER")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(6);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });

  it("shows one row of guesses", () => {
    useStore.setState({ guesses: ["hello"] });
    render(<App />);
    expect(screen.queryByText("GAME OVER")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(6);
    expect(document.querySelector("main")?.textContent).toEqual("hello");
  });

  it("shows game over state when given correct answer", () => {
    useStore.setState({
      guesses: ["bands", "block", "brags", "brawl", "blank"],
      answer: "blank",
    });
    render(<App />);
    expect(screen.queryByText("GAME OVER"));
  });

  it("shows game over state when given 6 failed attemps", () => {
    useStore.setState({
      guesses: ["bands", "block", "brags", "brawl", "blank", "banks"],
      answer: "broke",
    });
    render(<App />);
    expect(screen.queryByText("GAME OVER"));
  });

  it("start a new game", () => {
    useStore.setState({
      guesses: ["bands", "block", "brags", "brawl", "blank", "banks"],
      answer: "broke",
    });
    render(<App />);
    expect(screen.queryByText("GAME OVER"));

    userEvent.click(screen.getByText("New Game"));
    expect(screen.queryByText("GAME OVER")).toBeNull();
    expect(document.querySelectorAll("main div")).toHaveLength(6);
    expect(document.querySelector("main")?.textContent).toEqual("");
  });
});
