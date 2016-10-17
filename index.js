'use strict';
const month = require('month');
const extend = require('object-extend');
const isString = require('is-string');
const duration = require('@saadshahd/duration');

const monthsRegex = generateElementRegex('M', 'month');
const yearsRegex = generateElementRegex('Y', 'year');

const defaultDate = new Date(0);
const defaultYear = defaultDate.getYear();
const defaultMonth = defaultDate.getMonth();

function generateElementRegex(elementChar, elementOptionalChars) {
	return new RegExp(`(-?\\d+?)(?:(?:${elementChar}(?:\\W|\\b))|${elementOptionalChars})`);
}

function getMatchValue(match) {
	return match ? Number(match[1]) : 0;
}

function getYearMonthTimeStamp(yearMonth) {
	const date = new Date(0);
	const year = yearMonth.year;
	const month = yearMonth.month;

	date.setYear(year);
	date.setMonth(month);

	return date.getTime();
}

function getYearMonthDurationDiff(startFrom, durationsYear, durationsMonth) {
	let startFromDate;
	let startFromYear;
	let startFromMonth;

	const isStartFromTimeStamp = typeof startFrom === 'number';
	const isStartFromYearMonth = startFrom && (startFrom.year || startFrom.month);

	if (isStartFromTimeStamp) {
		startFromDate = new Date(startFrom);
		startFromYear = startFromDate.getYear();
		startFromMonth = startFromDate.getMonth();
	} else if (isStartFromYearMonth) {
		if (!startFrom.year) {
			startFrom.year = defaultYear;
			console.warn(`Arguments: startFrom.year is missing we will use ${defaultYear}`);
		}

		if (!startFrom.month) {
			startFrom.month = defaultMonth;
			console.warn(`Arguments: startFrom.month is missing we will use ${defaultMonth}`);
		}

		startFromYear = startFrom.year;
		startFromMonth = mapMonthInput(startFrom.month);
	} else {
		throw new Error('Wrong Argument: startFrom is not timestamp nor {year, month}');
	}

	const endAtYear = startFromYear + durationsYear;
	const endAtMonth = startFromMonth + durationsMonth;

	const newStartFrom = {
		year: startFromYear,
		month: startFromMonth
	};

	const endAt = {
		year: endAtYear,
		month: endAtMonth
	};

	return getYearMonthDiff(endAt, newStartFrom);
}

function getYearMonthDiff(yearMonthX, yearMonthY) {
	const timeStampX = getYearMonthTimeStamp(yearMonthX);
	const timeStampY = getYearMonthTimeStamp(yearMonthY);
	const diffTimeStamp = timeStampX - timeStampY;

	return diffTimeStamp;
}

function getMonthNumFromName(monthName) {
	return month(monthName) || 1;
}

function mapMonthInput(monthNumOrName) {
	const isMonthName = isString(monthNumOrName);
	const monthNum = isMonthName ? getMonthNumFromName(monthNumOrName) : monthNumOrName;
	const monthIndex = monthNum - 1;

	return monthIndex;
}

function omitYearMonthFromDurationString(durationString) {
	return durationString.replace(yearsRegex, '').replace(monthsRegex, '');
}

function getDurationWithoutYearMonth(durationString) {
	const durationStringWithoutYearMonth = omitYearMonthFromDurationString(durationString);

	return durationStringWithoutYearMonth ? duration(durationStringWithoutYearMonth) : 0;
}

function parseDurationString(durationString, opts) {
	const defaults = {
		startFrom: Date.now()
	};

	const config = extend(defaults, opts);

	const matchYears = durationString.match(yearsRegex);
	const matchMonths = durationString.match(monthsRegex);

	const durationYears = getMatchValue(matchYears);
	const durationMonths = getMatchValue(matchMonths);

	let durationDate = getDurationWithoutYearMonth(durationString);
	durationDate += getYearMonthDurationDiff(config.startFrom, durationYears, durationMonths);

	return durationDate;
}

module.exports = parseDurationString;
