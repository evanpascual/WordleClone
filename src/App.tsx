import { useState } from "react";
import WordRow from "./WordRow";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center"> Wordle </h1>
      </header>

      <main>
        <WordRow letters="hel" />
        <WordRow letters="hell" />
        <WordRow letters="hello" />
      </main>
    </div>
  );
}
