import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  // helper so we don't repeat onClick bodies
  const handleCardClick = (prompt) => {
    setInput(prompt);
    onSent(prompt);
  };

  const suggestions = [
    {
      text: "Suggest beautiful place to see on an upcoming road trip",
      icon: assets.compass_icon,
    },
    {
      text: "Brifily summarize this concept : urban planning",
      icon: assets.bulb_icon,
    },
    {
      text: "BrainStorm team bonding activities for our work retreat",
      icon: assets.message_icon,
    },
    {
      text: "Improve the readability of the following code",
      icon: assets.code_icon,
    },
  ];

  return (
    <div className="main">
      {/* ──────── Navbar ──────── */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      {/* ──────── Body ──────── */}
      <div className="main-container">
        {!showResult ? (
          <>
            {/* Greeting */}
            <div className="greet">
              <p>
                <span>Hello, Ravishankar</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            {/* Suggestion Cards */}
            <div className="cards">
              {suggestions.map(({ text, icon }) => (
                <div
                  key={text}
                  className="card"
                  onClick={() => handleCardClick(text)}
                >
                  <p>{text}</p>
                  <img src={icon} alt="suggestion-icon" />
                </div>
              ))}
            </div>
          </>
        ) : (
          // ──────── Result View ────────
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* ──────── Bottom Input ──────── */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              {input && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="send"
                />
              )}
            </div>
          </div>

          <p className="bottom-info">
            Responses may vary in accuracy. Please review answers carefully. This
            Gemini clone is developed by
            {" "}
            <a
              href="https://github.com/ravisksingh1999"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Ravishankar
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

/* ───────────────────────────────────────────────────────────────
  📝 Add to Main.css

  .card {
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .card:hover {
    transform: scale(1.02);
  }
──────────────────────────────────────────────────────────────── */