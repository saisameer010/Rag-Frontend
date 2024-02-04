import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.jpeg';
import '../App.css';
import { postDataToApi } from '../ApiService';

const LandingPage = () => {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState('idle');
  const [openAIKey, setOpenAIKey] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [githubRepoName, setGithubRepoName] = useState('');

  const handleInputChange = (e, setStateFunction) => {
    setStateFunction(e.target.value);
  };

  const handleNavigate = async () => {
    setButtonState('loading');

    try {
      console.log("utton")
      // Call the function to send data to the API
      // await postDataToApi(openAIKey, githubUsername, githubRepoName);

      // After successful API call, set the button state to 'success'
      // setButtonState('success');
      
      // Navigate to the '/chatbot' route after a delay of 5000 milliseconds (5 seconds)
      const requestBody = {
        username: githubUsername,
        openai_key: openAIKey,
        repo_name: githubRepoName
      };
      console.log(requestBody)
  
      // Make the fetch call to the API
      const response = await fetch('https://rag-backend.onrender.com/fetch_commits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('API call failed with status code ' + response.status);
      }
  
      // Optional: Process the response data
      // const responseData = await response.json();
  
      // After successful API call, set the button state to 'success'
      setButtonState('success');
      navigate("/chatbot");
    } catch (error) {
      // Handle any errors here
      console.error(error);

      // If there's an error, set the button state back to 'idle'
      setButtonState('idle');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />

        <div className="flex-container">
          <div className="title">OpenAI API Key:</div>
          <input
            id="openAI-key"
            placeholder="Enter OpenAI API Key"
            className="input"
            value={openAIKey}
            onChange={e => handleInputChange(e, setOpenAIKey)} 
            style={{ fontSize: 16 }}
          />
        </div>

        <div className="flex-container">
          <div className="title">Github Username</div>
          <input
            id="my-link"
            placeholder="Enter Github Username"
            className="input"
            value={githubUsername}
            onChange={e => handleInputChange(e, setGithubUsername)} 
            style={{ fontSize: 16 }}
          />
        </div>

        <div className="flex-container">
          <div className="title">Github Repo Name</div>
          <input
            id="my-repo-name"
            placeholder="Enter Github Repo Name"
            className="input"
            value={githubRepoName}
            onChange={e => handleInputChange(e, setGithubRepoName)} 
            style={{ fontSize: 16 }} 
          />
        </div>

        <div className={`button ${buttonState}`} onClick={buttonState === 'idle' ? handleNavigate : null}>
          <div className="text">
            {buttonState === 'idle' ? 'Proceed' : buttonState === 'loading' ? 'Loading...' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
