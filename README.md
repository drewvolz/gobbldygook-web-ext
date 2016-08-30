# gobbldygook-web-ext
A web extension for Gobbldygook

## Developing

###### For Firefox
- Install [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)
- Find the path to the `firefox-bin` executable. On OS X, it's inside the application bundle, at `/Contents/MacOS/firefox-bin`. I don't know about Windows.
- run `npm run web-ext -- build --firefox-binary /Applications/FirefoxDeveloperEdition.app/Contents/MacOS/firefox-bin`, where the argument to `--firefox-binary` is the path you found in the previous step
- open the Browser Console – on OS X, it's under Tools > Developer

###### For Chrome
- Open `chrome://extensions/` and check the "developer mode" checkbox
- Choose "load unpacked extension", and navigate to your local clone of this repo
- Push the "background page" link next to "Inspect Views"
- If you switch to the Console tab, you should see the HTML for the most recent semester of courses you've taken

###### For Opera
- Much the same as Chrome, I believe

###### For Edge
- I have no idea

###### For Safari
- Nope.
