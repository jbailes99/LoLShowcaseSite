# LoLShowcaseSite - How to use

LoLShowcaseSite is a League of Legends website template for anyone to use and can be change very easily. You just have to put in your summoner name, tagline, and target champion to track - and you have your own website about your main champion. This is 
## Instructions

This should be easy

### `Create .env in frontend folder and backend folder`

Create a .env file in the frontend and establish type in "REACT_APP_BACKEND_SERVER_URI=", we will set this equal to the port we establish in the backend folder, by default it is set to 5000 already. For example, it will look like this " REACT_APP_BACKEND_SERVER_URI=http://localhost:5000 ". You can change this later to direct to a backend hosting service to get your website live. 

Now, in the backend folder, create another .env file and here we will set "API_KEY=" to the api key you can get for free on Riot API. https://developer.riotgames.com/apis 

### `npm install`

cd into frontend folder and type npm install
cd into backend folder and type npm install

### `The only things you have to do to personalize this site to you.`

1. /frontend/src/pages/Home 
   - Here, rename line 34 to set to your goal rank. By default it is set to Challenger rank.
  
2. /frontend/src/components/MatchDataContext
   - Here, rename lines 27-29 to match your summoner name, tag line, region (na, euw1), and the champion you want to track. 
3. /backend/server.js
   - Here, do nothing if you are in NA. if you are another region, you must change lines 14-16 to match your region. set v5region to europe, and v4 region to euw1.  

### `npm start`

1. Cd into backend and type npm start
2. Create a new process and cd into frontend and type npm start
3. Both frontend and backend must be running
4. Done

### `run it locally or get a domain, host the frontend and backend, and show it off!`
enjoy