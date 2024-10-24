// src/components/EnglishTypingTest.jsx
import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';

const EnglishTypingTest = ({ setResult }) => {
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This famous sentence is often used in typing exercises because it contains every letter of the English alphabet. The agile fox, with its sleek fur and sharp senses, effortlessly leaps over the sleeping dog, which lies comfortably on the grass, oblivious to the world around it, highlighting the contrast between activity and rest.",
    "A journey of a thousand miles begins with a single step. This proverb emphasizes the importance of taking the initial action when pursuing any significant goal or undertaking. Often, the thought of a long journey can be daunting, but it is essential to remember that every great achievement starts with that first, sometimes difficult, step towards the desired destination, fostering perseverance and determination.",
    "To be or not to be, that is the question. This famous line from Shakespeare's Hamlet encapsulates the essence of existential contemplation. It reflects the struggle between existence and non-existence, the fear of the unknown, and the desire for meaning in life. Hamlet ponders the value of enduring suffering versus the uncertainty of what comes after life, a dilemma faced by many throughout history.",
    "All that glitters is not gold. This saying warns us that not everything that appears valuable or attractive on the surface truly possesses worth. It serves as a reminder to look beyond appearances and seek deeper truths. Often, superficial beauty can be deceiving, masking underlying flaws or emptiness, encouraging us to value substance over style and to approach life with discernment and wisdom.",
    "Actions speak louder than words. This adage conveys the idea that what people do is far more significant than what they say. While words can be persuasive and charming, it is our actions that reveal our true intentions and beliefs. Therefore, one should strive to align their behavior with their promises, as integrity and authenticity are measured by the choices we make in our daily lives."
  ];

  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [currentSampleText, setCurrentSampleText] = useState(sampleTexts[0]);

  // Randomly pick a new sample text for every new test
  useEffect(() => {
    setCurrentSampleText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  useEffect(() => {
    if (inputText === currentSampleText) {
      const endTime = new Date().getTime();
      setIsTestComplete(true);
      setResult(((currentSampleText.split(' ').length / (timeTaken / 60)).toFixed(2)));
    }
  }, [inputText, currentSampleText, timeTaken, setResult]);

  // Use interval to calculate real-time elapsed while typing
  useEffect(() => {
    let interval = null;
    if (startTime && !isTestComplete) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        setTimeTaken((currentTime - startTime) / 1000); // Update the time in seconds
      }, 100); // Update every 100ms for smoother display
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [startTime, isTestComplete]);

  const handleInputChange = (e) => {
    if (!startTime) {
      setStartTime(new Date().getTime());
    }
    setInputText(e.target.value);
    calculateAccuracy(e.target.value);
  };

  const calculateAccuracy = (typedText) => {
    const totalChars = typedText.length;
    let correctChars = 0;

    // Count correct characters
    for (let i = 0; i < totalChars; i++) {
      if (typedText[i] === currentSampleText[i]) {
        correctChars++;
      }
    }

    // Calculate accuracy
    const accuracyPercentage = (correctChars / totalChars) * 100;
    setAccuracy(accuracyPercentage.toFixed(2));
  };

  const handleRestart = () => {
    setInputText('');
    setIsTestComplete(false);
    setStartTime(null);
    setTimeTaken(0);
    setAccuracy(0);
    setCurrentSampleText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  };

  const renderColoredText = () => {
    return currentSampleText.split('').map((char, index) => {
      let color = '';
      if (inputText[index] === char) {
        color = 'green'; // Correct letter
      } else if (inputText[index] !== undefined) {
        color = 'red'; // Incorrect letter
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-test">
      <h2>English Typing Test</h2>
      <p>{renderColoredText()}</p>
      {!isTestComplete ? (
        <>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Start typing here..."
            rows="4"
            cols="50"
            disabled={isTestComplete}
          />
          <Keyboard /> 
          {/* Render the keyboard */}
          <p>Time: {timeTaken ? `${timeTaken.toFixed(2)} seconds` : 'Start typing to track time!'}</p>
          <p>Accuracy: {accuracy}%</p>
        </>
      ) : (
        <>
          <p>Test complete! Time taken: {timeTaken.toFixed(2)} seconds</p>
          <p>Accuracy: {accuracy}%</p>
          <button onClick={handleRestart}>Restart Test</button>
        </>
      )}
    </div>
  );
};

export default EnglishTypingTest;


