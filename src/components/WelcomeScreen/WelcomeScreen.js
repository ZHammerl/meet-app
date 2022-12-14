import React from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ getAccessToken }) {
  return (
    <div className="WelcomeScreen">
      <h1>Welcome to the Meet App</h1>
      <h4>
        Log in to see upcoming events around the world for
        full-stack developers
      </h4>
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
      <a className='privacy-policy'
        href="https://zhammerl.github.io/meet-app/privacy.html"
        rel="nofollow noopener">
        Privacy policy
      </a>
    </div>
  );
}

export default WelcomeScreen;
