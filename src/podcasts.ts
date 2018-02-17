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

    const now = new Date();

    const dayOfWeek = now.getDay();

    switch (dayOfWeek) {
        // Sunday
        case 0:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, spursHTTP, theDocketHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, spursHTTPs, theDocketHTTPS]
            }
        // Monday
        case 1:
            return {
                http: [theDocketHTTP, expressBriefingHTTP, enDepthHTTP, spursHTTP],
                https: [theDocketHTTPS, expressBriefingHTTPS, enDepthHTTPS, spursHTTPs]
            }
        // Tuesday
        case 2:
            return {
                http: [spursHTTP, expressBriefingHTTP, theDocketHTTP, enDepthHTTP],
                https: [spursHTTPs, expressBriefingHTTPS, theDocketHTTPS, enDepthHTTPS]
            }
        // Friday
        case 5:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, spursHTTP, theDocketHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, spursHTTPs, theDocketHTTPS]
            }
        // Saturday
        case 6:
            return {
                http: [enDepthHTTP, expressBriefingHTTP, spursHTTP, theDocketHTTP],
                https: [enDepthHTTPS, expressBriefingHTTPS, spursHTTPs, theDocketHTTPS]
            }
        default:
            return {
                http: [expressBriefingHTTP, enDepthHTTP, theDocketHTTP, spursHTTP],
                https: [expressBriefingHTTPS, enDepthHTTPS, theDocketHTTPS, spursHTTPs]
            }
    }
}