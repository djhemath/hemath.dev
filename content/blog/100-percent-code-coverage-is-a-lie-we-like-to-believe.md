---
title: 100% code coverage is a lie we like to believe
date: '2025-06-18T18:00:00.000Z'
draft: false
type: blog
excerpt: 100% code coverage looks good in dashboards. But just because every line ran doesn't mean every edge case was truly tested.
categories: ["engineering-lessons", "code-quality", "testing"]
table_of_contents: false
---

When I was a junior, I learned to write unit tests. In every project, whenever I got sometime, I wrote unit tests. So far so, in one of the organizations I worked in, people called me as "that unit test guy". Wasn't sure how to take this.

One fine day, I wrote a re-usable function. As a good engineer, I wrote unit tests for that function.

Remember, it was the time when, I only knew how to write unit tests technically. I didn't know how to logically write it.

The function ended up being merged, because nobody in that team reviewed unit tests. Sometimes even the whole code escapes the code review. For my personal satisfaction, I wrote unit tests until it covers the 100% of that function.

It's good right??

Next day, I got a bug report.

It wasn't a huge issue though. It was something obvious in hindsight, A weird edge case I hadn't thought about. I asked myself that the code is 100% covered, but why this edge case missed?

That's when it hit me. Everyone online tutorials I watched taught me "how to code unit tests", not "how to actually write unit tests".

So, code coverage is not about edge cases. It just measures how many lines, branches of code are being executed while running the unit tests. Not whether all the edge cases are covered or not.

This is such a simple thing to understand. But hey, I was a complete junior in that time. Let's not roast the past Hemath.

Then I started thinking in-terms of edge cases. Using the unit test just to automate the list of edge cases. I added a rule to myself that even in 100% covered code, there could be a bug hiding inside because of certain input or logic that we never thought about.

From that point of time, I never trusted that sweet 100% mark fully. Sure, it helps. But it's not really 100% covered in terms of edge-cases.

A simple example,

```js
function divide(a, b) {
  if (b === 0) {
    return 'Cannot divide by zero';
  }
  return a / b;
}
```

And unit tests,
```js
test('divides two numbers', () => {
  expect(divide(10, 2)).toBe(5);
});

test('division by zero returns error', () => {
  expect(divide(10, 0)).toBe('Cannot divide by zero');
});
```

If you take the coverage report, it will be 100%. Because these two tests ran all the lines and branches of code.

But what if this happens,
```js
divide("10", 2); // returns 5 — okay, in JavaScript
divide("ten", 2) // returns NaN
```

And this is something, the code coverage cannot give you. Because, it is simply not possible for a logical program to think about all the edge cases in a function. These days we can have AI to do this, but simply the unit test tools and their reports cannot cover these edge cases.

That's the kind of stuff that makes you rethink what "tested" really means.

Over time, I've realized that it's better to have a few sharp, thoughtful tests than hundreds of superficial ones that just inflate a metric.

Because bugs don't care about your green badge. They just wait for you to blink.