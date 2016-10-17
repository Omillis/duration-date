# duration-date [![Build Status](https://travis-ci.org/saadshahd/duration-date.svg?branch=master)](https://travis-ci.org/saadshahd/duration-date)

> Get milliseconds from duration-date


## Install

```
$ npm install --save @saadshahd/duration-date
```


## Usage

```js
const durationDate = require('@saadshahd/duration-date');

durationDate('1s'); // 1000
durationDate('-1s'); // -1000
durationDate('1m'); // 60000
durationDate('1h'); // 3600000
durationDate('1d'); // 86400000
durationDate('1w'); // 604800000
durationDate('1M'); // 2592000000
durationDate('1Y'); // 31536000000
durationDate('1Y 1m 1h 1d 1s 1w 1M'); // 34822861000
durationDate('1M', {startFrom: {month: 2}}); // 2419200000 === 28 day
durationDate('1M', {startFrom: {month: 'February'}}); // 2419200000 === 28 day
```

## Duration Chars
```
Seconds: s, sec
Minutes: m, min
Hours  : h, hour
Days   : d, day
Weeks  : w, week
Months : M, month
Years  : Y, year
```

## Start from Month Chars
```
January, 1
February, 2
March, 3
April, 4
May, 5
June, 6
July, 7
August, 8
September, 9
October, 10
November, 11
December, 12
```


## Related

- [duration](https://github.com/saadshahd/duration) - Get milliseconds from duration
- [seconds](https://github.com/saadshahd/seconds) - Get milliseconds from seconds
- [minutes](https://github.com/saadshahd/minutes) - Get milliseconds from minutes
- [hours](https://github.com/saadshahd/hours) - Get milliseconds from hours
- [days](https://github.com/saadshahd/days) - Get milliseconds from days
- [weeks](https://github.com/saadshahd/weeks) - Get milliseconds from weeks
- [months](https://github.com/saadshahd/months) - Get milliseconds from months
- [years](https://github.com/saadshahd/years) - Get milliseconds from years


## License

MIT © Saad Shahd
