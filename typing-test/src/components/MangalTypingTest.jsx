// src/components/MangalTypingTest.jsx
import React, { useState, useEffect } from 'react';

const sampleTexts = [
  "मंगल की विशेषताएँ अद्भुत होती हैं। यह एक ऐसा ग्रह है जो हमारे सौर मंडल में महत्वपूर्ण स्थान रखता है। इसकी सतह पर अद्वितीय भूगर्भीय संरचनाएँ हैं। मंगल की लालिमा इसे विशिष्ट बनाती है और खगोलविदों का ध्यान आकर्षित करती है। यह जीवन की खोज के लिए भी महत्वपूर्ण है।",

  "यह एक अद्भुत टाइपिंग अनुभव है। जब आप तेजी से टाइप करते हैं, तो आपकी स्किल्स में सुधार होता है। नियमित अभ्यास से आपकी गति और सटीकता दोनों में वृद्धि होती है। आप नए कीबोर्ड लेआउट को सीख सकते हैं। यह सभी के लिए एक उपयोगी कौशल है।",

  "आपकी कुशलता आपके अभ्यास पर निर्भर करती है। जो लोग नियमित रूप से टाइपिंग का अभ्यास करते हैं, वे तेजी से और सही तरीके से टाइप करते हैं। टाइपिंग एक महत्वपूर्ण कौशल है, जो शैक्षणिक और व्यावसायिक दोनों क्षेत्रों में उपयोगी होता है। निरंतर प्रयास से आप बेहतर बन सकते हैं।",

  "यह टाइपिंग परीक्षण आपकी गति को मापेगा। परीक्षण के दौरान, आपको एक निर्धारित समय में अधिक से अधिक शब्द टाइप करने होंगे। सहीता और गति दोनों पर ध्यान केंद्रित करना होगा। यह आपकी टाइपिंग क्षमता का सही आकलन करेगा। अभ्यास से आप अपने परिणामों को सुधार सकते हैं।",

  "मंगल के साथ टाइपिंग करना आसान है। यह एक संक्षिप्त और स्पष्ट भाषा में लिखा गया है। जब आप सही ढंग से टाइप करते हैं, तो यह आपको आत्मविश्वास देता है। मंगल की भाषा का अभ्यास करने से आपकी टाइपिंग कौशल में सुधार होगा। यह मजेदार और रोमांचक हो सकता है।"
];


const MangalTypingTest = ({ setResult }) => {
  const [inputText, setInputText] = useState('');
  const [currentSampleText, setCurrentSampleText] = useState(sampleTexts[0]);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    setCurrentSampleText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  useEffect(() => {
    if (inputText === currentSampleText) {
      const endTime = new Date().getTime();
      setIsTestComplete(true);
      const timeDiffInMinutes = (endTime - startTime) / 60000;
      const wordsPerMinute = (currentSampleText.split(' ').length / timeDiffInMinutes).toFixed(2);
      setResult(wordsPerMinute);
    }
  }, [inputText, currentSampleText, startTime, setResult]);

  useEffect(() => {
    let interval = null;
    if (startTime && !isTestComplete) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        setTimeTaken((currentTime - startTime) / 1000); // Update the time in seconds
      }, 100);
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

    for (let i = 0; i < totalChars; i++) {
      if (typedText[i] === currentSampleText[i]) {
        correctChars++;
      }
    }

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

  return (
    <div className="typing-test">
      <h2>Mangal Typing Test</h2>
      <p>{currentSampleText}</p>
      {!isTestComplete ? (
        <>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="यहां टाइप करना शुरू करें..."
            rows="4"
            cols="50"
          />
          <div className="keyboard-image">
            {/* Add keyboard image */}
            <img src="https://indiatyping.com/images/Devanagari_inscript_keyboard_layout.webp" alt="Keyboard" />
          </div>
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

export default MangalTypingTest;
