// src/components/Keyboard.jsx
import React from 'react';
import './Keyboard.css';

const Keyboard = () => {
  // Define the rows of a standard QWERTY keyboard
  const rows = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
    ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
    ["Space"]
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key, keyIndex) => (
            <div className={`key ${getKeyClass(key)}`} key={keyIndex}>
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Function to assign specific classes to certain keys for styling purposes (like hand placement)
const getKeyClass = (key) => {
  const leftHandKeys = ["Q", "W", "E", "R", "T", "A", "S", "D", "F", "G", "Z", "X", "C", "V", "Shift", "Tab", "`", "1", "2", "3", "4", "5"];
  const rightHandKeys = ["Y", "U", "I", "O", "P", "[", "]", "H", "J", "K", "L", ";", "'", "B", "N", "M", ",", ".", "/", "-", "=", "6", "7", "8", "9", "0"];

  if (leftHandKeys.includes(key)) return "left-hand";
  if (rightHandKeys.includes(key)) return "right-hand";
  if (key === "Space") return "spacebar";
  return "";
};

export default Keyboard;
