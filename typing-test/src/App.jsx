import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EnglishTypingTest from './components/EnglishTypingTest';
import HindiTypingTest from './components/HindiTypingTest';
import KirtidevTypingTest from './components/KirtidevTypingTest'; // Import KirtidevTypingTest
import MangalTypingTest from './components/MangalTypingTest'; // Import MangalTypingTest
import Result from './components/Result';
import Header from './components/Header';
import './styles.css';

function App() {
  const [result, setResult] = useState(null);
  const [key, setKey] = useState(0); // Track key for forcing re-render
  const [selectedFont, setSelectedFont] = useState(''); // State to track selected font
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the new path
    setKey(prevKey => prevKey + 1); // Force re-render by changing the key
  };

  const handleFontChange = (font) => {
    setSelectedFont(font); // Set the selected font
    handleNavigation('/' + font.toLowerCase()); // Navigate to the appropriate typing test page
  };

  return (
    <div className="app" style={{ fontFamily: selectedFont }}> {/* Apply selected font */}
      <Header /> {/* Add the Header component */}
      <nav>
        <button onClick={() => handleNavigation('/')}>English Typing</button>
        <button onClick={() => handleNavigation('/hindi')}>Hindi Typing</button>
        <button onClick={() => handleFontChange('Kirtidev')}>Krutidev Typing</button>
        <button onClick={() => handleFontChange('Mangal')}>Mangal Typing</button>
      </nav>
      {/* Add a key to force re-render when it changes */}
      <Routes key={key}>
        <Route path="/" element={<EnglishTypingTest setResult={setResult} />} />
        <Route path="/hindi" element={<HindiTypingTest setResult={setResult} />} />
        <Route path="/kirtidev" element={<KirtidevTypingTest setResult={setResult} />} /> {/* Route for Kirtidev */}
        <Route path="/mangal" element={<MangalTypingTest setResult={setResult} />} /> {/* Route for Mangal */}
      </Routes>
      <Result result={result} />
    </div>
  );
}

export default App;

