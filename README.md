<h1 align="center">
  :1234: jCalc - My First Calculator
</h1>

<p align="center">
  <a href="#trophy-lessons-learned">Lessons Learned</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies--resources">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-setting-up-the-environment">Environment Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-features-implementations">Features</a>
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?labelColor=000000&color=EB673F&label=created%20at&message=Jan%202019" alt="Creation Date" />

  <img src="https://img.shields.io/github/last-commit/juliolmuller/jcalc?label=updated%20at&labelColor=000000&color=EB673F" alt="Update Date" />

  <img src="https://img.shields.io/github/v/tag/juliolmuller/jcalc?label=latest%20version&labelColor=000000&color=EB673F" alt="Latest Version" />

  <img src="https://img.shields.io/static/v1?labelColor=000000&color=EB673F&label=PRs&message=welcome" alt="Pull Requests Welcome" />

  <img src="https://img.shields.io/github/license/juliolmuller/jcalc?labelColor=000000&color=EB673F" alt="Project License" />
</p>

![Application snapshot](./src/assets/images/app-overview.jpg)

Frontend web application developed knowledge on JavaScript on how to interact with the DOM and with events based on ES6 class syntax (and no frameworks). This project was proposed and developed in [Hcode's Udemy course](https://www.udemy.com/course/javascript-curso-completo/), an awesome one - :smiley: highly recommended!

[Check out the application running!](https://jcalc.vercel.app/)

## :trophy: Lessons Learned

- JavaScript `class` syntax;
- Maintaining an application based on an object instance;
- JavaScript audio API;
- Configure Webpack 5;

## :rocket: Technologies & Resources

**Frontend:**
- Vanilla JavaScript;
- Babel, ESlint and Webpack

**Development:**
- Visual Studio Code
- Node.js routines

## :hammer: Setting up the Environment

Make sure to have **Node.js 10+** installed in your machine and its **npm** available in the command line, then use the following routines:

```bash
$ npm install     # Download dependencies
$ npm run serve   # Run development server
$ npm run build   # Build files for production
```

## :zap: Features Implementations

- [x] Traditional calculations with `+`, `-`, `*`, `/` and also `%`;
- [x] Continuous calculations by pressing `=` repeatedly;
- [x] Support to 1 or 2 inputs only in the operation;
- [x] Adjustment of the number to 10-digits maximum on the display;
- [x] Errors throwing on division by zero and number over 10 integer digits;
- [x] Sounds on typing (with icon for enabling/disabling);
- [x] Copy (`Ctrl+C`) & Paste (`Ctrl+V`) support;
- [x] Keyboard input compatibility:
  - `0` trhu `9` to enter numbers
  - `+`, `-`, `*`, `/` and `%` to add operators
  - `.` or `,` to enter decimal separator
  - `Enter` to get the result (`=` sign)
  - `Backspace` to CE (clear current entry)
  - `Escape` to AC (clear all operation)
- [x] BUild bundle with Webpack;
