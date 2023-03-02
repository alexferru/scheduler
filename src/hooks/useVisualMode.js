import { useState } from "react";

// Custom hook that manages the visual mode of a component.
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transition between modes.
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      // Replace the current mode in the history with the new mode.
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      // Add the new mode to the end of the history
      setHistory((prev) => [...prev, newMode]);
    }
  }

  // goes back to the previous mode in the history.
  function back() {
    if (history.length > 1) {
      // Remove the current mode from the history and set the previous mode as the new mode.
      setHistory((prev) => prev.slice(0, prev.length - 1));
      setMode(history[history.length - 2]);
    }
  }

  // Returns the current mode and functions to transition and go back in the history.
  return { mode, transition, back };
}
