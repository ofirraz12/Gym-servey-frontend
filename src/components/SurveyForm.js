import React, { useState } from "react";
import axios from "axios";
import "./SurveyForm.css"; // קובץ העיצוב

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    trainingDuration: "",
    trainingPlan: "",
    beginnerHelp: false,
    aiHelp: false,
    teenSocial: "",
    trainingChallenge: "",
    researchInterest: false,
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://192.168.68.61:5000/api/survey/submit", formData);
      alert("הסקר נשלח בהצלחה!");
      setFormData({
        age: "",
        trainingDuration: "",
        trainingPlan: "",
        beginnerHelp: false,
        aiHelp: false,
        teenSocial: "",
        trainingChallenge: "",
        researchInterest: false,
        email: "",
      });
    } catch (error) {
      console.error(error);
      alert("שליחת הסקר נכשלה. נסה שוב.");
    }
  };

  return (
    <div className="survey-form-container">
      <h2>סקר מתאמנים</h2>
      <form onSubmit={handleSubmit}>
        <label>1. בן/בת כמה את/ה?</label>
        <input type="text" name="age" value={formData.age} onChange={handleChange} required />

        <label>2. כמה זמן את/ה מתאמן/ת?</label>
        <input type="text" name="trainingDuration" value={formData.trainingDuration} onChange={handleChange} required />

        <label>3. האם את/ה מתאמן/ת עם תוכנית אימונים או עם מאמן אישי?</label>
        <input type="text" name="trainingPlan" value={formData.trainingPlan} onChange={handleChange} required />

        <label>4. אם היית מתחיל/ה שוב, האם היית רוצה להשתמש באפליקציה שמספקת הדרכה לתחילת הדרך, כמו: טכניקות, תוכניות אימון, ואיך להעלות משקל בהדרגה?</label>
        <input type="checkbox" name="beginnerHelp" checked={formData.beginnerHelp} onChange={handleChange} />

        <label>5. האם היית משתמש/ת באפליקציה שמופעלת על ידי בינה מלאכותית ומציעה עזרה אישית באימונים?</label>
        <input type="checkbox" name="aiHelp" checked={formData.aiHelp} onChange={handleChange} />

        <label>6. איך היית מרגיש/ה לגבי פלטפורמה חברתית לאימונים, שבה אפשר לפרסם תכנים, ליצור קבוצות, לשאול שאלות וכדומה?</label>
        <input type="text" name="teenSocial" value={formData.teenSocial} onChange={handleChange} />

        <label>7. מהו החלק הכי מאתגר בשמירה על עקביות באימונים שלך?</label>
        <textarea name="trainingChallenge" value={formData.trainingChallenge} onChange={handleChange} />

        <label>8. האם היית מתעניין/ת בחלק באפליקציה שמרכז את כל המחקרים האחרונים וסיכומים על גישות שונות לאימונים?</label>
        <input type="checkbox" name="researchInterest" checked={formData.researchInterest} onChange={handleChange} />

        <label>9. אימייל בשביל קבלת ההנחה:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <button type="submit">שלח</button>
      </form>
    </div>
  );
};

export default SurveyForm;
