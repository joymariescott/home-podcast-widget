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