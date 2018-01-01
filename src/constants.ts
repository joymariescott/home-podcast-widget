export const httpPodcastFeedUrls: string[] = [
    'http://expressbriefing.expressnews.libsynpro.com/rss',
    'http://endepth.expressnews.libsynpro.com/rss'
]

export const httpsPodcastFeedUrls: string[] = [
    'https://expressbriefing.libsyn.com/rss',
    'https://endepth.libsyn.com/rss'
];

export const fallbackPodcastData: object[] = [
    {
        title: 'Express Briefing',
        chatter: `A daily briefing of San Antonio's biggest stories, from the San Antonio Express-News`,
        image: 'http://static.libsyn.com/p/assets/c/1/2/0/c120bca16f3d64c7/5a3336356db27.jpeg',
        file: 'http://traffic.libsyn.com/expressbriefing/EB122917.mp3?dest-id=624653'
    },
    {
        title: 'EN Depth',
        chatter: `A weekly podcast from the San Antonio Express-News`,
        image: 'http://static.libsyn.com/p/assets/c/3/2/0/c32056278af76888/endepthlarge.jpg.png',
        file: 'http://traffic.libsyn.com/endepth/END122917MikeSutter.mp3?dest-id=624659'
    }
]