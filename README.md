Sample curls for both the OpenAI Playground API for Text and the OpenAI Playground API for Image:-  

curl --request POST \
  --url https://api.openai.com/v1/tokens \
  --header 'Content-Type: application/json' \
  --data '{
    "grant_type": "client_credentials",
    "client_id": "your-api-key-here",
    "client_secret": ""
  }'

curl --request POST \
  --url https://api.openai.com/v1/images/generations \
  --header 'Content-Type: multipart/form-data' \
  --header 'Authorization: Bearer your-api-key-here' \
  --form 'model=image-beta-001' \
  --form 'prompt=generate an image of a tower' \
  --form 'num_images=10'
