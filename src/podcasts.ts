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
}