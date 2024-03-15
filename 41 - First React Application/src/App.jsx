import { useState, useMemo } from "react";
import Clicker from "./Clicker.jsx";
import People from "./People.jsx";

export default function App({ clickersCount, children }) {
  const [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const colours = useMemo(() => {
    const colours = [];
    for (let i = 0; i < clickersCount; i++) {
      colours.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
    }
    return colours;
  }, [clickersCount]);

  return (
    <>
      {children}

      <div>Total count: {count}</div>
      <button onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show"} Clicker
      </button>
      {hasClicker && (
        <>
          {[...Array(clickersCount)].map((_, index) => (
            <Clicker
              increment={increment}
              keyName={`count${index}`}
              colour={colours[index]}
              key={index}
            />
          ))}
        </>
      )}
      <People />
    </>
  );
}
