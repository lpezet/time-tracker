# Time Tracker

Toolbox for time tracking.

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]

```bash
echo -e "# 01/07/2021\n- [8:00AM-8:30AM] Shower.\n\n# 01/08/2021\n- [9:00AM-9:45AM] Breakfast\n\n# 01/16/2021\n- [11:00AM-1:15PM] Nap time.\n\n# 01/23/2021\n- [2:00PM-4:00PM] Woodworking." > test.md
@lpezet-time-tracker calc test.md
> Day 01/07/2021: 0 hours 30 minutes
> Day 01/08/2021: 0 hours 45 minutes
> ## Biweekly 01/01: 1 hours 15 minutes
> Day 01/16/2021: 2 hours 15 minutes
> Day 01/23/2021: 2 hours 0 minutes
> ## Biweekly 01/15: 4 hours 15 minutes
```

# Installation

```bash
npm install --global @lpezet/time-tracker
```

# Features

- Calculate time (up to minutes) spent in tasks tracked in markdown file, following strict syntax.

# License

[MIT](LICENSE)

[npm-image]: https://badge.fury.io/js/%40lpezet%2Ftime-tracker.svg
[npm-url]: https://npmjs.com/package/@lpezet/time-tracker
[travis-image]: https://travis-ci.org/lpezet/time-tracker.svg?branch=master
[travis-url]: https://travis-ci.org/lpezet/time-tracker
[coveralls-image]: https://coveralls.io/repos/github/lpezet/time-tracker/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/lpezet/time-tracker?branch=master
[appveyor-image]: https://ci.appveyor.com/api/projects/status/hxkr7yml7qhi9jo8?svg=true
[appveyor-url]: https://ci.appveyor.com/project/lpezet/time-tracker
[vulnerabilities-image]: https://snyk.io/test/github/lpezet/time-tracker/badge.svg
[vulnerabilities-url]: https://snyk.io/test/github/lpezet/time-tracker

# Publishing

To publish next version of `time-tracker`, run the following:

```bash
npm version patch
git push --tags origin master
npm run dist
npm publish dist/ --access public
```
