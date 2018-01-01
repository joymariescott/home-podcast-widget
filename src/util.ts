export function getTimeAsString(seconds: number): string {
    const fullMinutes = Math.floor(seconds / 60);

    const remainingSeconds = addLeadingZeroIfNecessary(
        Math.floor(seconds - fullMinutes * 60)
    );

    const timeString = `${fullMinutes}:${remainingSeconds}`;

    return timeString;

    function addLeadingZeroIfNecessary(number) {
        const numberAsString = number.toString();
        if (numberAsString.length === 1) {
            return `0${numberAsString}`;
        } else {
            return numberAsString;
        }
    }
}

export function sendGAPodcastEvent(action: string, label: string): void {
    if (window.ens_specialEvent) {
        window.ens_specialEvent('Podcasts', action, label);
    }
}