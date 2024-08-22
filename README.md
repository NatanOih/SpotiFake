# Natan`s Fake Spotify

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Libraries included: Jotai for state managment, Tailwind for UI, React-Router.

Fully Responsive for Mobile and Desktop And has dark theme option, All data is persisted on refreshes and is stored in the local storage .

Deployed at vercel: https://spoti-fake.vercel.app/ 



## installing

In the project directory, you can run:

### `npm install`

### `npm start`

#### you will need to edit the .env file with your own spotify api keys at https://developer.spotify.com/dashboard

Those will be:

REACT_APP_CLIENT_ID\
REACT_APP_CLIENT_SECRET

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Possible Future imrovements:
* Song Specific Pages
* Make fav page compatable with a normal playlist component
* Make a better layout so i can add Nav and Footer easier 
* Make a sort hook 
* Load more playlists paginations (Spotify api provides "next" and "prev" urls)
* Find a better way to store and use the Token (current is localStorage) , also avoid trying to fetch it if already exists
* Data caching - avoiding unnecessary api calls



