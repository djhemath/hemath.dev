---
title: Command-Query separation
date: '2025-06-04T18:00:00.000Z'
draft: false
type: blog
excerpt: Do something or return something, but never both.
categories: ["engineering-lessons", "design-principles", "clean-code"]
table_of_contents: false
---

There is a small rule I follow that's made my code easier to work with. It is called Command Query Separation.

Don't worry, it's not one of those academic things you forget in five minutes. It's actually very simple.

"Functions should either do something (a command) or return something (a query), but not both".

Don't be furious on me for introducing yet another programming principle. It is not invented by me. I was introduced by Bertrand Meyer, who created a programming language named "[Eiffel](https://www.eiffel.org/)". Yeah, that's a real programming language.

Back to Command Query Separation (a.k.a CQS)

Let me walk through what this means and how you can use it without changing your whole life. Pun intented on Linkedin Yappers.

Let's just start with a bad example in one of the projects which I worked in,

```js
function refreshAndGetStats(user, newName) {
    await refreshStatsFromDB()
    addEventToTimeDB()
    await cleanupOldStats()

    return await getCachedStats();
}
```

At first sight, it looks good. It works, sure. You'd call this one function and get fresh stats. Done.

Except, over time, other parts of the system started using it without knowing that it triggered a DB sync, cleaned up old stats, adds an event to time DB.

Since other developers who use this piece without actually bothering to inspect what it does (most of us don't, including me), it started hammering our database. In reality, we just wanted to update the stats only when the user clicks the refresh icon.

But one developer used this function in CRON job that needs this data for doing something else. It triggered unnecessary refreshes which added more costs.

I'd love to attach the screenshot of AWS dashboard on that period, but sadly I cannot.

And I get to work on simplifying this. The rewrite is very simple. I just splitted these into separate methods and updated it wherever the old function called.

```js
function getStats() {
    return await getCachedStats();
}

function refereshStats() {
    await freshStatsFromDB();
    await cleanupOldStats();
}
```

Now the event handler of refresh icon looks like below,

```js
function refreshAndGetStats() {
    await refereshStats();
    addEventToTimeDB()
    return await getCachedStats();
}
```

And the event handler in the CRON job looks like,

```js
function someCRONJob() {
    // some code
    const stats = await getCachedStats();
    // some code
}
```

The intent is obvious. If you want to update the stats, you call `refreshStats()`. If you just want the current numbers, you call `getStats()`

Yes, the click handler of refresh icon still does both command and query, but it's an event handler. Same goes with CRON job. These functions will not be re-used anywhere. They are there to handle button click and cron events.

So the CQS apply only to the re-usable pieces.

No suprises, no accidental refreshes. And our database wasn't crying anymore.

This isn't about being "pure" or perfect. It's not about following rules for the sake of it.

It's about writing code that's predictable. Try it in your next project. Don't overthink it. Just start noticing where you're mixing commands and queries, and if possible separate them.

Your future self might thank you.
