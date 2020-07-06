# Tide Calendar

> Goal : create a full stack calendar app using React, Express, and MongoDB

### User Stories

- As a <u>user</u>, I <u>want to add people</u>, so that I can invite people who are not on the list.
- As a <u>user</u>, I <u>want to select a date</u> and see the tides for that day so that I can plan
- As a <u>user</u>, I <u>want to select a time</u> on that day so that I can create an event
- As a <u>user</u>, I <u>want to search for a beach</u> by name

### Database Scheme (MongoDB)

```javascript

let exampleEvent = {
  id: `integer`,
  name: "exampleLast",
  day: "exampleFirst",
  timeStart: "exampleTime",
  timeEnd: "exampleTime",
  beach: "exampleBeach",
  apiLink: "exampleLink",
  people: ["examplePeopleArray"],
};

let examplePerson = {
  id: `integer`,
  lastName: "exampleLast",
  firstName: "exampleFirst",
  email: "exampleEmail",
  phone: "examplePhone",
};

let exampleBeach = {
  id: `integer`,
  title: "exampleTitle",
  api_id: "example_api_id",
};

```

### File Structure

`/front`

```
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── serviceWorker.js
│   └── setupTests.js
└── yarn.lock
```

`/back`

```
.
├── app.js
├── bin
│   └── www
├── package-lock.json
├── package.json
└── routes
    ├── index.js
    └── users.js
```



