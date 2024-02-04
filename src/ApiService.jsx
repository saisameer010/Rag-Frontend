import axios from 'axios';

const apiUrl = '/user-input'; 

export const postDataToApi = async (openAIKey, githubUsername, githubRepoName) => {
  try {
    const response = await axios.post(apiUrl, {
      openAIKey,
      githubUsername,
      githubRepoName,
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};
