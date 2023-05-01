const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_KEY = process.env.OPENAI_API_KEY
const API_URL = 'https://api.openai.com/v1';

// Function to get a token for the OpenAI Playground API for Text
async function getTextToken() {
  try {
    const response = await axios.post(`${API_URL}/tokens`, {
      "grant_type": "client_credentials",
      "client_id": API_KEY,
      "client_secret": ""
    });
    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
}
/* we're sending a POST request to the /tokens endpoint with the grant_type field set to "client_credentials".
 The client_id field should be set to your OpenAI API key, and the client_secret field should be left empty 
 (i.e., set to "") because there is no secret associated with client credentials flow.
Once the request is successful, we extract the access_token from the response data and return it.*/

// Function to get a token for the OpenAI Playground API for Image (DALL-E)
async function getDalleToken() {
  try {
    const form = new FormData();
    form.append('model', 'image-beta-001');
    form.append('prompt', 'generate an image of a tower');
    form.append('num_images', 10);

    const response = await axios.post(`${API_URL}/images/generations`, form, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    return response.data.data[0].token;
  } catch (error) {
    console.error(error);
  }
}

// Call getTextToken to get a token for the OpenAI Playground API for Text
const textToken = await getTextToken();
console.log(`Text token: ${textToken}`);

// Call getDalleToken to get a token for the OpenAI Playground API for Image (DALL-E)
const dalleToken = await getDalleToken();
console.log(`DALL-E token: ${dalleToken}`);
