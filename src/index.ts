import Vue from "vue";
import PodcastContainer from './components/PodcastContainer.vue';
import { isWeekend, isPastNoonLocalTime } from './util';

const homePodcastWidget = (): void => {

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