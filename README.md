# Tide Calendar

> Goal : create a full stack calendar app using React, Express, and MongoDB

### User Stories

- As a <u>new user</u>, I <u>want to add people</u>, so that I can invite people who are not on the list
- As a <u>user</u>, I <u>want to select a date</u> and see the tides for that day so that I can plan
- As a <u>user</u>, I <u>want to select a time</u> on that day so that I can create an event
- As a <u>user</u>, I <u>want to search for a beach</u> by name
- As a <u>user</u>, I <u>want to create an event</u> for a chosen beach at a chosen time on a chosen day

### Database Scheme (MongoDB)

```javascript

// Example Event in Mongo
// db.event.find().pretty()
{
        "_id" : ObjectId("5f077ae43564016f24d95b74"),
        "title" : "Party at Sandy Hook",
        "date" : "\"2020-07-05T10:00:00.000Z\"",
        "people" : [
                "John Doe",
                "Matthew Rogerick"
        ],
        "beach" : "[417] Sandy Hook"
}
// Example Person in Mongo
// db.person.find().pretty()
{
        "_id" : ObjectId("5f0779604409ff6990b2bf98"),
        "first_name" : "Matthew",
        "last_name" : "Rogerick",
        "email" : "fake@gmail.com"
}
// Example Beach in Mongo
// db.calendar.find({api_id:"417"}).pretty()
{
        "_id" : ObjectId("5f04d7723a631d5b9284a199"),
        "api_id" : "417",
        "title" : "Sandy Hook"
}

```

### File Structure

- `/front` : React Frontend
- `/back`  : Express Backend

> In order to replicate, your Mongo instance must have all of the data from **outlinks.json**
> inserted into your db. Use db.calendar.insertMany(<outlinks.json array here>)




