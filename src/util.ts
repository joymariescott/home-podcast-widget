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

export const isWeekend = (date: Date): boolean => {
    return date.getDay() === 5 || date.getDay() === 6 || date.getDay() === 0;
}

export const isPastNoonLocalTime = (date: Date): boolean => {
    const cutoff = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    return date > cutoff;
}

// export const isPastNoonCST = (date: Date): boolean => {
//     const cutoff = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));

//     const dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));

//     return dateUTC > cutoff;
// }