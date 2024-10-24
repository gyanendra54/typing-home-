// src/components/KirtidevTypingTest.jsx
import React, { useState, useEffect } from 'react';

const sampleTexts = [
  "किरती देव की विशेषताएँ अद्भुत होती हैं। यह एक ऐसा हिंदी फॉन्ट है जो कई उपयोगकर्ताओं को आकर्षित करता है। इसकी खूबसूरत डिजाइन और पठनीयता इसे अद्वितीय बनाती है। जब आप इसे टाइप करते हैं, तो यह आपके लेखन को एक विशेषता देता है। किरती देव का उपयोग करके आप अपनी प्रस्तुतियों को और अधिक प्रभावशाली बना सकते हैं।",

  "यह एक अद्भुत टाइपिंग अनुभव है। जब आप टाइपिंग की गति और सटीकता पर ध्यान केंद्रित करते हैं, तो आप अपनी कुशलता में सुधार कर सकते हैं। एक अच्छी टाइपिंग टेस्ट आपकी प्रगति को मापने का एक शानदार तरीका है। इससे आपको यह समझने में मदद मिलती है कि आपको किन क्षेत्रों में और सुधार की आवश्यकता है। यह चुनौतीपूर्ण और मजेदार होता है।",

  "आपकी कुशलता आपके अभ्यास पर निर्भर करती है। यदि आप नियमित रूप से टाइपिंग का अभ्यास करते हैं, तो आपकी गति और सटीकता दोनों में सुधार होता है। अभ्यास से ही आप किसी भी कौशल में महारत हासिल कर सकते हैं। यह महत्वपूर्ण है कि आप अपने अभ्यास में निरंतरता बनाए रखें। अधिक अभ्यास करने से आप अपने लक्ष्य को आसानी से प्राप्त कर सकते हैं।",

  "यह टाइपिंग परीक्षण आपकी गति को मापेगा। जब आप टाइप करते हैं, तो आपको यह ध्यान रखना चाहिए कि आपकी सटीकता और गति दोनों महत्वपूर्ण हैं। यह परीक्षण आपको एक निश्चित समय में अधिक से अधिक शब्द टाइप करने की चुनौती देता है। आप अपने प्रदर्शन को सुधारने के लिए पुनरावृत्ति कर सकते हैं। इसके परिणामस्वरूप, आपकी टाइपिंग क्षमता में वृद्धि होगी।",

  "किरती देव के साथ टाइपिंग करना आसान है। यह एक संक्षिप्त और स्पष्ट फॉन्ट है जो आपकी आवश्यकताओं को पूरा करता है। जब आप इसे चुनते हैं, तो यह आपके कार्य को सरल बनाता है। फॉन्ट का उचित उपयोग आपकी रचनात्मकता को बढ़ा सकता है। आप अपने संदेश को स्पष्टता और प्रभाव के साथ प्रस्तुत कर सकते हैं। यह कई उपयोगकर्ताओं के लिए एक आदर्श विकल्प है।"
];


const KirtidevTypingTest = ({ setResult }) => {
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
      <h2>Krutidev Typing Test</h2>
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
            <img src="https://onlinetyping.org/images/kruti-dev-keyboard.jpg" alt="Keyboard" />
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

export default KirtidevTypingTest;
