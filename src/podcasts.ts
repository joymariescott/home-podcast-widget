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

    const spursHTTP = 'http://spursinsider.expressnews.libsynpro.com/rss';
    const spursHTTPs = 'https://spursinsider.libsyn.com/rss';

    const tasteCastHTTP = 'http://tastecast.expressnews.libsynpro.com/rss';
    const tasteCastHTTPS = 'https://tastecast.libsyn.com/rss';

    const bbqHTTP = 'http://52weeksofbbq.expressnews.libsynpro.com/rss';
    const bbqHTTPS = 'https://52weeksofbbq.libsyn.com/rss';

    const now = new Date();

    const dayOfWeek = now.getDay();

    // If it's the first Friday of the month, lead with BBQ

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
                http: [enDepthHTTP, expressBriefingHTTP, tasteCastHTTP, spursHTTP, theDocketHTTP, bbqHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, tasteCastHTTPS, spursHTTPs, theDocketHTTPS, bbqHTTPS]
            }
        // Monday
        case 1:
            return {
                http: [theDocketHTTP, expressBriefingHTTP, enDepthHTTP, tasteCastHTTP, spursHTTP, bbqHTTP],
                https: [theDocketHTTPS, expressBriefingHTTPS, enDepthHTTPS, tasteCastHTTPS, spursHTTPs, bbqHTTPS]
            }
        // Tuesday
        case 2:
            return {
                http: [spursHTTP, expressBriefingHTTP, theDocketHTTP, enDepthHTTP, tasteCastHTTP, bbqHTTP],
                https: [spursHTTPs, expressBriefingHTTPS, theDocketHTTPS, enDepthHTTPS, tasteCastHTTPS, bbqHTTPS]
            }
        // Wednesday
        case 3: {
            return {
                http: [tasteCastHTTP, expressBriefingHTTP, spursHTTP, theDocketHTTP, enDepthHTTP, bbqHTTP],
                https: [tasteCastHTTPS, expressBriefingHTTPS, spursHTTPs, theDocketHTTPS, enDepthHTTPS, bbqHTTPS]
            }
        }
        // Thursday
        case 4: {
            return {
                http: [expressBriefingHTTP, tasteCastHTTP, spursHTTP, theDocketHTTP, enDepthHTTP, bbqHTTP],
                https: [expressBriefingHTTPS, tasteCastHTTPS, spursHTTPs, theDocketHTTPS, enDepthHTTPS, bbqHTTPS]
            }
        }
        // Friday
        case 5:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, tasteCastHTTP, spursHTTP, theDocketHTTP, bbqHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, tasteCastHTTPS, spursHTTPs, theDocketHTTPS, bbqHTTPS]
            }
        // Saturday
        case 6:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, tasteCastHTTP, spursHTTP, theDocketHTTP, bbqHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, tasteCastHTTPS, spursHTTPs, theDocketHTTPS, bbqHTTPS]
            }
        default:
            return {
                http: [expressBriefingHTTP, enDepthHTTP, theDocketHTTP, spursHTTP, tasteCastHTTP, bbqHTTP],
                https: [expressBriefingHTTPS, enDepthHTTPS, theDocketHTTPS, spursHTTPs, tasteCastHTTPS, bbqHTTPS]
            }
    }
}