import React from "react";
import "./WelcomeScreen.css";

function WelcomeScreen({ getAccessToken }) {
  return (
    <div className="WelcomeScreen">
      <h1>Welcome to the Meet App</h1>
      <h4>
        Log in to see upcoming events around the world for
        full-stack developers.
      </h4>
      <p>
        There may be a warning from google that it is not
        safe to continue. Don't let that scare you. This is
        just because google classifies the app as a
        "personal project" which will not be verified. I
        promise it is absolutely safe and none of your data
        will be retrieved.
      </p>
      <p>
        No user information or personal calenders are
        accessed, saved or used within the application. You
        only need to log in because the OAuth login
        is part of the study project.
      </p>
      <div className="button_cont" align="center">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
o.svg"
              alt="Google sign-in"
            />
          </div>
          <button
            onClick={() => {
              getAccessToken();
            }}
            rel="nofollow noopener"
            className="btn-text">
            Sign in with google
          </button>
        </div>
      </div>
      <p>
        The Meet app is a pure study project. It only uses a
        mock calender
        (https://www.googleapis.com/auth/calendar.events.readonly).
      </p>
      <p>
        The author of this app is{" "}
        <a
          className="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://Zhammerl.github.io/portfolio-website/index.html">
          Franziska Hammerl
        </a>
        .
      </p>
      <p>
        The source code of the app can be found in the{" "}
        <a
          className="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Zhammerl/meet-app">
          github repo
        </a>
        .
      </p>

      <a
        className="privacy-policy"
        href="https://zhammerl.github.io/meet-app/privacy.html"
        rel="nofollow noopener">
        Privacy policy
      </a>
    </div>
  );
}

export default WelcomeScreen;
