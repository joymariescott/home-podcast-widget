import { getFirstDayInMonth, spliceInPodcast } from './util';

interface PodcastListObject {
    http: string[];
    https: string[];
}

const generatePodcastListBase = (): PodcastListObject => {

    // URLs - both HTTP and HTTPS - for every EN podcast RSS feed.

    const spursHTTP = 'http://spursinsider.expressnews.libsynpro.com/rss';
    const spursHTTPS = 'https://spursinsider.libsyn.com/rss';

    const expressBriefingHTTP = 'http://expressbriefing.expressnews.libsynpro.com/rss';
    const expressBriefingHTTPS = 'https://expressbriefing.libsyn.com/rss';

    const enDepthHTTP = 'http://endepth.expressnews.libsynpro.com/rss';
    const enDepthHTTPS = 'https://endepth.libsyn.com/rss';

    const theDocketHTTP = 'http://thedocket.expressnews.libsynpro.com/rss';
    const theDocketHTTPS = 'https://thedocket.libsyn.com/rss';

    const tasteCastHTTP = 'http://tastecast.expressnews.libsynpro.com/rss';
    const tasteCastHTTPS = 'https://tastecast.libsyn.com/rss';

    const militaryCityHTTP = 'http://militarycity.expressnews.libsynpro.com/rss'
    const militaryCityHTTPS = 'https://militarycity.libsyn.com/rss'

    const puroPoliticsHTTP = 'http://puropolitics.expressnews.libsynpro.com/rss'
    const puroPoliticsHTTPS = 'https://puropolitics.libsyn.com/rss'

    const now = new Date();

    const dayOfWeek = now.getDay();

    switch (dayOfWeek) {
        // Sunday
        case 0:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, militaryCityHTTP, tasteCastHTTP, puroPoliticsHTTP, spursHTTP, theDocketHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, militaryCityHTTPS, tasteCastHTTPS, puroPoliticsHTTPS, spursHTTPS, theDocketHTTPS]
            }
        // Monday
        case 1:
            return {
                http: [theDocketHTTP, expressBriefingHTTP, enDepthHTTP, tasteCastHTTP, puroPoliticsHTTP, spursHTTP, militaryCityHTTP],
                https: [theDocketHTTPS, expressBriefingHTTPS, enDepthHTTPS, tasteCastHTTPS, puroPoliticsHTTPS, spursHTTPS, militaryCityHTTPS]
            }
        // Tuesday
        case 2:
            return {
                http: [puroPoliticsHTTP, theDocketHTTP, expressBriefingHTTP, enDepthHTTP, tasteCastHTTP, spursHTTP, militaryCityHTTP],
                https: [puroPoliticsHTTPS, theDocketHTTPS, expressBriefingHTTPS, enDepthHTTPS, tasteCastHTTPS, spursHTTPS, militaryCityHTTPS]
            }
        // Wednesday
        case 3: {
            return {
                http: [tasteCastHTTP, puroPoliticsHTTP, expressBriefingHTTP, theDocketHTTP, enDepthHTTP, spursHTTP, militaryCityHTTP],
                https: [tasteCastHTTPS, puroPoliticsHTTPS, expressBriefingHTTPS, theDocketHTTPS, enDepthHTTPS, spursHTTPS, militaryCityHTTPS]
            }
        }
        // Thursday
        case 4: {
            return {
                http: [expressBriefingHTTP, militaryCityHTTP, tasteCastHTTP, puroPoliticsHTTP, theDocketHTTP, enDepthHTTP, spursHTTP],
                https: [expressBriefingHTTPS, militaryCityHTTPS, tasteCastHTTPS, puroPoliticsHTTPS, theDocketHTTPS, enDepthHTTPS, spursHTTPS]
            }
        }
        // Friday
        case 5:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, militaryCityHTTP, tasteCastHTTP, puroPoliticsHTTP, theDocketHTTP, spursHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, militaryCityHTTPS, tasteCastHTTPS, puroPoliticsHTTPS, theDocketHTTPS, spursHTTPS]
            }
        // Saturday
        case 6:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, militaryCityHTTP, tasteCastHTTP, puroPoliticsHTTP, spursHTTP, theDocketHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, militaryCityHTTPS, tasteCastHTTPS, puroPoliticsHTTPS, spursHTTPS, theDocketHTTPS]
            }
        default:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, militaryCityHTTP, tasteCastHTTP, puroPoliticsHTTP, spursHTTP, theDocketHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, militaryCityHTTPS, tasteCastHTTPS, puroPoliticsHTTPS, spursHTTPS, theDocketHTTPS]
            }
    }
}

// if it is the first friday of the month, lead with the BBQ podcast
// for the 6 days following the first Friday, step BBQ back one position in list
// in all other cases, put BBQ podcast at the end
const addBBQPodcast = (baseList: PodcastListObject): PodcastListObject => {
    const now = new Date();
    const firstFriday = getFirstDayInMonth(now, 5).getDate();
    const distanceFromFF = now.getDate() - firstFriday;

    const bbqHTTP = 'http://52weeksofbbq.expressnews.libsynpro.com/rss';
    const bbqHTTPS = 'https://52weeksofbbq.libsyn.com/rss';

    if (distanceFromFF > -1 && distanceFromFF < 7) {
        return {
            http: spliceInPodcast(baseList.http, bbqHTTP, distanceFromFF),
            https: spliceInPodcast(baseList.https, bbqHTTPS, distanceFromFF),
        }
    } else {
        return {
            http: baseList.http.concat([bbqHTTP]),
            https: baseList.https.concat([bbqHTTPS]),
        }
    }
}

export const generatePodcastList = (): PodcastListObject => {
    return addBBQPodcast(generatePodcastListBase());
}