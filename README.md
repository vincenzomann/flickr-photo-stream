## Flickr Photo Stream

Uses flickr.photos.search api to fetch the most recent "safe" photos and search by title/descript/tags and displays them as cards, it infinite fetches more as you scroll. Clicking on the title or user opens a new tab to that flickr page.

### Installation

For the app to work you must insert your own Flickr API key into the .env file as it is a required parameter for the flickr search api eg. REACT_APP_FLICKR_API_KEY=your_api_key

You can get your Flickr API key [here](https://www.flickr.com/services/api/keys)

Then run the scripts `npm i` and `npm start`
