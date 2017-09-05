# The Project

Twitch is a live streaming video platform largely focused on video gaming with over 45 million gamers using the site every month. This project allows a user to keep track of the activity of channels which frequently live stream. For this project I've decided to narrow the tracked channels which frequently live stream gameplay from one of my favourite games - Defence of the Ancients 2, or DOTA 2.</p>
When the page loads, users will be presented with a list of the tracked channels with their avatar image, their display name and their online status. The user is able to filter channels by Online only, Offline only or All.</p>

# The Logic

Within the function loadData() we fetch our channel data from the twitch.tv API through a getJSON request. To gather our list of channels to display to the user we iterate over a list of followers from one of the most popular DOTA 2 channels, 'Beyond the Summit', and add them to an array. We also add a few other popular channels manually, as well as a couple of channels which don't exist so we can handle a request to an unknown channel later.</p>
Next we iterate over each channel name in the list and make an API request for each channel. With this data we then append a row to the html which displays that channels information if it is offline or not found. Finally we iterate over the list again and return channels which are online.</p>
To create functionality for the filter buttons we create a click event for each one which handles the styling of the buttons, variables which let the program know whether it should display online accounts, offline accounts or both. This functions finally removes the currently loaded channel list from the html and reloads it by calling the loadData function so that the information is refreshed on the page for the user.</p>

Created in June 2017.

Currently not working due to twitch.tv now requiring an API key.
