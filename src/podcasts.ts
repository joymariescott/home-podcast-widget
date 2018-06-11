import { getFirstDayInMonth } from './util';

interface PodcastListObject {
    http: string[];
    https: string[];
}

export const generatePodcastList = (): PodcastListObject => {

    // URLs - both HTTP and HTTPS - for every EN podcast RSS feed.

    const expressBriefingHTTP = 'http://expressbriefing.expressnews.libsynpro.com/rss';
    const expressBriefingHTTPS = 'https://expressbriefing.libsyn.com/rss';

    const enDepthHTTP = 'http://endepth.expressnews.libsynpro.com/rss';
    const enDepthHTTPS = 'https://endepth.libsyn.com/rss';

    const theDocketHTTP = 'http://thedocket.expressnews.libsynpro.com/rss';
    const theDocketHTTPS = 'https://thedocket.libsyn.com/rss';

    const tasteCastHTTP = 'http://tastecast.expressnews.libsynpro.com/rss';
    const tasteCastHTTPS = 'https://tastecast.libsyn.com/rss';

    const bbqHTTP = 'http://52weeksofbbq.expressnews.libsynpro.com/rss';
    const bbqHTTPS = 'https://52weeksofbbq.libsyn.com/rss';

    const militaryCityHTTP = 'http://militarycity.expressnews.libsynpro.com/rss'
    const militaryCityHTTPS = 'https://militarycity.libsyn.com/rss'

    const puroPoliticsHTTP = 'http://puropolitics.expressnews.libsynpro.com/rss'
    const puroPoliticsHTTPS = 'https://puropolitics.libsyn.com/rss'

    const now = new Date();

    const dayOfWeek = now.getDay();

    // If it's the first Friday of the month, lead with BBQ. There is no case for this.

    // if (getFirstDayInMonth(now, 5).getDate() === now.getDate()) {
    //     return {
    //         http: [bbqHTTP, expressBriefingHTTP, enDepthHTTP, tasteCastHTTP, spursHTTP, theDocketHTTP],
    //         https: [bbqHTTPS, expressBriefingHTTPS, enDepthHTTPS, tasteCastHTTPS, spursHTTPs, theDocketHTTPS]
    //     }
    // }
    switch (dayOfWeek) {
        // Sunday
        case 0:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, tasteCastHTTP, theDocketHTTP, bbqHTTP, militaryCityHTTP, puroPoliticsHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, tasteCastHTTPS, theDocketHTTPS, bbqHTTPS, militaryCityHTTPS, puroPoliticsHTTPS]
            }
        // Monday
        case 1:
            return {
                http: [theDocketHTTP, expressBriefingHTTP, enDepthHTTP, tasteCastHTTP, bbqHTTP, militaryCityHTTP, puroPoliticsHTTP],
                https: [theDocketHTTPS, expressBriefingHTTPS, enDepthHTTPS, tasteCastHTTPS, bbqHTTPS, militaryCityHTTPS, puroPoliticsHTTPS]
            }
        // Tuesday
        case 2:
            return {
                http: [militaryCityHTTP, expressBriefingHTTP, theDocketHTTP, enDepthHTTP, tasteCastHTTP, bbqHTTP, puroPoliticsHTTP],
                https: [militaryCityHTTPS, expressBriefingHTTPS, theDocketHTTPS, enDepthHTTPS, tasteCastHTTPS, bbqHTTPS, puroPoliticsHTTPS]
            }
        // Wednesday
        case 3: {
            return {
                http: [tasteCastHTTP, expressBriefingHTTP, theDocketHTTP, enDepthHTTP, bbqHTTP, militaryCityHTTP, puroPoliticsHTTP],
                https: [tasteCastHTTPS, expressBriefingHTTPS, theDocketHTTPS, enDepthHTTPS, bbqHTTPS, militaryCityHTTPS, puroPoliticsHTTPS]
            }
        }
        // Thursday
        case 4: {
            return {
                http: [puroPoliticsHTTP, expressBriefingHTTP, tasteCastHTTP, theDocketHTTP, enDepthHTTP, bbqHTTP, militaryCityHTTP],
                https: [puroPoliticsHTTPS, expressBriefingHTTPS, tasteCastHTTPS, theDocketHTTPS, enDepthHTTPS, bbqHTTPS, militaryCityHTTPS]
            }
        }
        // Friday
        case 5:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, tasteCastHTTP, theDocketHTTP, bbqHTTP, militaryCityHTTP, puroPoliticsHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, tasteCastHTTPS, theDocketHTTPS, bbqHTTPS, militaryCityHTTPS, puroPoliticsHTTPS]
            }
        // Saturday
        case 6:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, tasteCastHTTP, theDocketHTTP, bbqHTTP, militaryCityHTTP, puroPoliticsHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, tasteCastHTTPS, theDocketHTTPS, bbqHTTPS, militaryCityHTTPS]
            }
        default:
            return {
                http: [expressBriefingHTTP, enDepthHTTP, theDocketHTTP, tasteCastHTTP, bbqHTTP, militaryCityHTTP, puroPoliticsHTTP],
                https: [expressBriefingHTTPS, enDepthHTTPS, theDocketHTTPS, tasteCastHTTPS, bbqHTTPS, militaryCityHTTPS, puroPoliticsHTTPS]
            }
    }
}