# SAEN Home Podcast Widget #

This widget allows users to listen to podcast episodes straight from [the Express-News home page](http://expressnews.com). Provided a Libsyn RSS feed for each podcast, the widget will always serve the most recent episode. Podcast plays are sent to Google Analytics using Hearst's special event tracking function.

## How it works ##

Here's what happens when a page holding the widget loads:

- We run a little cleanup code to deal with a quirk in the Hearst CMS.
- Attach a [Vue](https://vuejs.org/) instance to an empty `<div>` that contains the skeleton of the widget
- The widget loops through a predefined list of [Libsyn](https://www.libsyn.com/) RSS feeds - one for each podcast - and uses a [custom feed parsing package](https://github.com/sa-express-news/libsyn-parser) to pull each podcast's title, description, logo and most recent episode.
- The widget adds podcast information + audio files to the HTML and lets users toggle between podcasts and play them.

## Tweaking the widget ##

Want to change the look of the widget? No problem! You can customize CSS styling, widget behavior or the podcasts included by cloning this repository and creating your own version.

Clone the repository into a directory on your machine:

`git clone https://github.com/sa-express-news/home-podcast-widget.git home-podcast-widget`

And install its dependencies [via NPM](https://www.npmjs.com/):

```
cd home-podcast-widget
npm install
```

Run the [webpack](https://webpack.js.org/) build script while you develop:

`npm run build -- --watch`

Then open `index.html` in a browser. You should see a (very large) podcast widget waiting for your changes!

### Changing the widget podcasts ###

Adding or subtracting podcasts to the widget is simple. Open up `src/podcasts.ts` and look for this section:

```typescript

// URLs - both HTTP and HTTPS - for every EN podcast RSS feed.

    const expressBriefingHTTP = 'http://expressbriefing.expressnews.libsynpro.com/rss';
    const expressBriefingHTTPS = 'https://expressbriefing.libsyn.com/rss';

    const enDepthHTTP = 'http://endepth.expressnews.libsynpro.com/rss';
    const enDepthHTTPS = 'https://endepth.libsyn.com/rss';

    const theDocketHTTP = 'http://thedocket.expressnews.libsynpro.com/rss';
    const theDocketHTTPS = 'https://thedocket.libsyn.com/rss';
```

This is where we keep track of the HTTP and HTTPS versions of every Express-News podcast Libsyn RSS feeds. You can grab the HTTP link from the Libsyn back end for a given show - or you can copy one of the other links and change the title; they're all formatted the same. Same with HTTPS.

Further down in that same file, you'll see something like this:

```typescript
const now = new Date();

    const dayOfWeek = now.getDay();

    switch (dayOfWeek) {
        // Monday
        case 1:
            return {
                http: [theDocketHTTP, expressBriefingHTTP, enDepthHTTP],
                https: [theDocketHTTPS, expressBriefingHTTPS, enDepthHTTPS]
            }
        // Friday
        case 5:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, theDocketHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, theDocketHTTPS]
            }
        default:
            return {
                http: [expressBriefingHTTP, enDepthHTTP, theDocketHTTP],
                https: [expressBriefingHTTPS, enDepthHTTPS, theDocketHTTPS]
            }
    }
```

This is where we set up a sort of schedule for our podcasts, based on the current day of the week. Here's what the above snippet translates to:

- On Monday, the widget should lead with The Docket, then Express Briefing, then EN-Depth.
- On Friday, the widget should lead with EN-Depth, then Express Briefing, then the Docket.
- On every other day, the widget will lead with Express Briefing, then EN-Depth, then The Docket.

Changing the order for a given day is as simple as rearranging the variables in the `http` and `https` arrays. Adding a rule for another day? Just add another `case` statement and return a similar object. (And remember, Sunday is 0 in JS and Satruday is 6).

(As of this widget's creation - January 2018 - Hearst has not fully switched its sites to the HTTPS protocol. To avoid cross-protocol issues, we include separate arrays for HTTP and HTTPS feeds.)

### Changing widget presentation/behavior ###

The widget is composed of Vue components - collections of self-contained HTML, CSS and JavaScript. The hierarchy is as follows:

- Top-level Vue instance
    - PodcastContainer component
        - Podcast components - one for each feed item
            - ProgressBar component (to show what percentage of a given podcast has been played)

Modifying components is fairly simple. Let's say we want to change the HTML element of a podcast's title from an `<h2>` to an `<h1>` and make it all caps. Open up `src/components/Podcast.vue` and you'll find the HTML template contained in a `<template>` tag at the top.

```html
<div class="podcast" :class="{ active }">
        <img class="podcastImage" :src="image">
        <h2 class="podhed">{{ title }}</h2>
        <p class="podtext">{{ chatter }}</p>
        <!-- ... -->
```

Just change that `h2` to an `h1`. Now, to edit the component's style, scroll down to the `<style>` tag at the bottom to access the CSS.

```css

/* Adding stuff here just like regular CSS */

.podcast h1{
    text-transform: uppercase;
}

.podcast {
  display: none;
}
/* ... */
```

Modifying behavior is trickier and requires a knowledge of the Vue framework. [Their docs are great](https://vuejs.org/v2/guide/) and if you ever run into problems, reach out to Kia Farhang at `mfarhang@express-news.net`.

## Building and deploying the widget ##

Getting the widget live on your site is just a matter of throwing a couple files and freeforms into the WCM. First, run the build script:

`npm run build`

This will create files `home-podcast-widget.js` and the [sourcemap](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) `home-podcast-widget.js.map` in a `dist/` directory.

If you want to add the podcast widget to your Hearst site *anywhere other than the top-right corner of the home page*, you can do the following:

 - Upload the widget JS and sourcemap to your file hosting platform of choice. (The WCM is free but doesn't support the sourcemap - though the code will run fine without it)
 - Create a WCM freeform that contains
    - an empty `<div>` with the ID of `home-podcast-root`.
    - A `<script>` tag linking to the JS file.
 - Place that freeform wherever you want your widget located, republish the page and you should see the widget!

 If you want to add the widget to the top-right section of the home page, like [on the Express-News site](http://expressnews.com), it takes an extra step.

 - Upload the widget JS just like you would above.
 - Create a WCM freeform that contains *just* the empty `<div>` with the ID of `home-podcast-root`.
 - Create a *second* freeform containing the `<script>` tag linking to the JS file.
 - Add the HTML freeform to the top-right "zone" of the home page.
 - Add the JS freeform into *one of the downpage zones* so it will load *after* the HTML one.

 This is an unfortunate consequence of the WCM's design. Home pages for premium sites create two versions of the top-right zone (!!!!) instead of using CSS to display their contents differently. The widget includes code to destroy the unecessary zone based on screen size, but loading the JS with the HTML will cause the entire widget code to load twice and break.

 This is also why you won't be able to resize the page and see the widget if it's placed in this top-right zone. Don't worry, just refresh the page and it'll be there. (And of course the average user isn't resizing their device, so it's a worthwhile tradeoff).

 ## Troubleshooting/Bug reports ##

__I updated my code in the WCM but nothing is changing on the page!__

 Yeah, the WCM is *reaaaaalllly* slow about updating its file cache. If you need something changed in less than a day (give or take), I recommend hosting the updated JS on Amazon S3 or another similar service until the cache updates.

 <hr/>

 Questions? Concerns? [File an issue](https://github.com/sa-express-news/home-podcast-widget/issues) or reach out to Kia Farhang at `mfarhang@express-news.net` directly.