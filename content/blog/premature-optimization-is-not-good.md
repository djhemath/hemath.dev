---
title: Premature optimization is not good
date: '2025-04-29T18:00:00.000Z'
draft: false
type: blog
excerpt: Premature optimization feels productive, but it's often just polished guesswork. Every line of code is a liability don't write more than the problem demands.
categories: ["Engineering"]
table_of_contents: false
---

Alright, we all done it. At least once in our career. We tried to make something faster, cleaner, or more flexible, way before it needed to be. It feels like engineering. But if you zoom out, a lot of it ends up being wasted time.

Not because the work was bad, but because it wasn't necessary.

And, that is exactly what **Premature Optimization** is.

We write code for something, some special use cases which we might never end up reaching to. It is good to think about every use case, but if we don't need certain cases immediately, we just don't want to write code for that.

Some might argue that thinking through the problem, coming up with better data structures and contracts is a good practice. Yes it is. But that's not what premature optimization is. It is called "Architecture". The line between these is blurry sometimes.

Architecting is about setting up data structure, data flow, contracts and maybe separation of concerns. It's the foundation.
Premature optimization is often about tweaking surface-level performance, abstractions or even caching things that aren't slow.

> Architecting is **thinking** ahead. Premature optimization is **guessing** ahead.

A good rule of thumb is not to optimize before [profiling](https://en.wikipedia.org/wiki/Profiling_(computer_programming)). If you haven't measured what's slow, you're just assuming. And assumptions in code are expensive. Especially when they make the code hard to read, change or test.

One time, I was building a system for sending emails. If I remember correctly, we used Mailchimp to send emails. I thought that we'd probably switch providers someday. So, I built this neat 3-layer architecture just for sending emails.

One layer defined abstract interfaces. Pure contract, no logic. I learned Adapter pattern that time, lol. The next layer handled data conversions, so no one had to care about how Mailchimp or other email services liked to receive input. The final layer had app-specific logic. Even added some empty adapters, because you know, "future proofing".

So sending an email looked like this,

```js
sendMarketingEmail(content, data) 
-> sendEmail(content, data, type='marketing') 
-> sendEmail(content, data, mailchimpAdapter) 
-> REST API call that actually sends the email
```

I was proud of it. Honestly, it was a beautifully crafted engineering piece.

Three-months passed and I received a bug saying that an important property is missing. O'Boy, it took me hours to jump in, re-read the code, understand the flow and finally pin-point where the error is originating from. It's not even in the data conversion layer, it was in the API call, a different story :)

Over two years on that project, we never even talked about changing email providers. Not once. I spent a whole week designing and building something that never paid off.

It wasn't wrong. It just wasn't needed.

That's what premature optimization looks like. It's not always about speeding up a loop. It can also be abstracting too early.

> Don't try to build a perfect little castle for a feature that only needs a tent.

Even if you're not aware, "**Every line of code is a liability**". Every class, every function, every clever abstraction. It all has a cost. A cost of maintaining them. More we add, more we own. The more we need to test, debug, explain and maintain.

This also depends on your level of experience. When you're new, you build what works. When you've seen a few fires, you start thinking ahead. That's fine. But you also start to recognize when you're building for a future that probably won't happen.

The idea is that **if you don't have real data telling you something's a bottleneck, don't treat it like one**.

You can always refactor and optimize when it matters. But if you do it too early, you're just trading clarity for cleverness.

Clarity in the long run, wins.

So yeah, write code that works. Write code that you and your team can understand six months later.

Don't try to be clever explicitly. Keep it simple. Make it boring.

There's a plenty of time to be clever when it's actually needed.

You got something to extend this discussion, feel free to write me - [hem@hemath.dev](mailto:hem@hemath.dev)