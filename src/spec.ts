import * as mocha from 'mocha';
import * as chai from 'chai';
import * as util from './util';

const { assert } = chai;

describe('isWeekend', () => {
    it('returns true if the date passed is on Friday, Saturday or Sunday', () => {
        const friday = new Date('1/19/2018');
        const saturday = new Date('1/20/2018');
        const sunday = new Date('1/21/2018');

        [friday, saturday, sunday].forEach((date) => {
            assert.isTrue(util.isWeekend(date));
        });
    });
    it('returns false if the date passed is on Monday - Thursday', () => {
        const monday = new Date('1/22/2018');
        const tuesday = new Date('1/23/2018');
        const wednesday = new Date('1/24/2018');
        const thursday = new Date('1/25/2018');

        [monday, tuesday, wednesday, thursday].forEach((date) => {
            assert.isFalse(util.isWeekend(date));
        });
    });
});
describe('getFirstDayInMonth', () => {
    it('returns a date', () => {
        const date = util.getFirstDayInMonth(new Date(), 1);
        assert.typeOf(date, "Date");
    });
    it('the date is the first date of the given day in the provided month', () => {
        // The first Tuesday of March 2018 was the 6th
        const shouldBeSix = util.getFirstDayInMonth(new Date('3/1/2018'), 2);
        assert.strictEqual(shouldBeSix.getDate(), 6);

        // The first Thursday of April 2019 is the 4th
        const shouldBeFour = util.getFirstDayInMonth(new Date('4/15/2019'), 4);
        assert.strictEqual(shouldBeFour.getDate(), 4);

        // The first Monday of September 2020 is the 7th
        const shouldBeSeven = util.getFirstDayInMonth(new Date('9/22/2020'), 1);
        assert.strictEqual(shouldBeSeven.getDate(), 7);
    });
});
describe('spliceInPodcast', () => {
    it('splices string into fourth position', () => {
        const strArr = util.spliceInPodcast(['hello', 'world', 'i', 'nots', 'robot', 'promiz'], 'def', 3);
        assert.strictEqual(strArr[3], 'def');
    });
});