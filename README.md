# Natan`s Fake Spotify

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Libraries included: Jotai for state managment, Tailwind for UI, React-Router.

Fully Responsive for Mobile and Desktop And has dark theme option, All data is persisted on refreshes and is stored in the local storage .

Deployed at vercel: https://spoti-fake.vercel.app/ 



## installing

In the project directory, you can run:

### `npm install`

### `npm start`

#### you will need to edit the .env file with your own Jamendo client id from https://devportal.jamendo.com

That will be:

REACT_APP_JAMENDO_CLIENT_ID

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

> Originally built against the Spotify Web API, this project migrated to the [Jamendo API](https://developer.jamendo.com) in 2026 after Spotify deprecated Client Credentials access to featured playlists and playlist data for apps without Extended Quota Mode (which now requires a registered business with 250k+ MAU). "Playlists" in the UI now map to Jamendo albums.


## Possible Future imrovements:
* Song Specific Pages
* Make fav page compatable with a normal playlist component
* Make a better layout so i can add Nav and Footer easier 
* Make a sort hook 
* Load more playlists paginations (Spotify api provides "next" and "prev" urls)
* Find a better way to store and use the Token (current is localStorage) , also avoid trying to fetch it if already exists
* Data caching - avoiding unnecessary api calls



