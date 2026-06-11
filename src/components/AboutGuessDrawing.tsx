"use client";

import { FormEvent, useEffect, useState } from "react";

import { SketchFishDrawing } from "@/components/AboutDecor";

const DESKTOP_QUERY = "(min-width: 1024px)";
const ACCEPTED_GUESSES = new Set(["fish", "a fish", "fishes", "goldfish"]);

function normalizeGuess(value: string) {
  return value.trim().toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ");
}

function isCorrectGuess(value: string) {
  const guess = normalizeGuess(value);
  if (!guess) return false;
  if (ACCEPTED_GUESSES.has(guess)) return true;
  return guess.includes("fish");
}

export function AboutGuessDrawing() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCorrectGuess(guess)) {
      setFeedback("correct");
      return;
    }

    setFeedback("wrong");
  };

  if (!isDesktop) return null;

  return (
    <div className="about-guess-box">
      <p className="about-guess-label">Guess the drawing</p>

      <div className="about-guess-art" aria-hidden="true">
        <SketchFishDrawing className="about-guess-fish" />
      </div>

      <form className="about-guess-form" onSubmit={handleSubmit}>
        <label htmlFor="about-guess-input" className="sr-only">
          Guess the drawing
        </label>
        <input
          id="about-guess-input"
          className="about-guess-input"
          type="text"
          value={guess}
          onChange={(event) => {
            setGuess(event.target.value);
            if (feedback !== "idle") setFeedback("idle");
          }}
          placeholder="What is it?"
          autoComplete="off"
          spellCheck={false}
          maxLength={32}
        />
        <button type="submit" className="about-guess-btn">
          Guess
        </button>
      </form>

      <p
        className={`about-guess-feedback about-guess-feedback--${feedback}`}
        aria-live="polite"
      >
        {feedback === "correct" && "Nice — it's a fish!"}
        {feedback === "wrong" && "Not quite. Try again."}
        {feedback === "idle" && "\u00A0"}
      </p>
    </div>
  );
}
