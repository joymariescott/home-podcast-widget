import Vue from "vue";
import PodcastContainer from './components/PodcastContainer.vue';

const homePodcastWidget = (): void => {
    // We only want the widget to show up until noon central time.
    // So we calculate a cutoff and only run the widget code if the current time is before that.

    const now = new Date();

    const cutoff = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0));

    const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()));

    if (nowUTC > cutoff) return;

    // The EN CMS duplicates the HTML 'zone' where we place the root for
    // the podcast widget. This makes targetting it a pain. So we 
    // destroy whichever div is not visible based on screen size.

    const destroyDuplicateZone5 = (): void => {
        const mobileZone = document.querySelector('div.zone-5a.narrow-only');
        const wideZone = document.querySelector('div.zone-5.wide-only');

        if (window.innerWidth < 768) {
            deleteElement(wideZone);
        } else {
            deleteElement(mobileZone);
        }
        function deleteElement(element: Element) {
            element.parentElement.removeChild(element);
        }
    }

    try {
        destroyDuplicateZone5();
    } catch (e) {

    }

    const homePodcastWidget = new Vue({
        el: "#home-podcast-root",
        template: `
        <podcast-container/>
    `,
        components: {
            PodcastContainer
        }
    });
}


homePodcastWidget();