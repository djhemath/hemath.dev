---
title: Why good engineers think in terms of trade-off, not trends
date: '2025-07-02T18:00:00.000Z'
draft: false
type: blog
excerpt: Good engineers don't chase trends, they weigh trade-offs. The goal isn't to look modern, it's to build things that actually make sense.
categories: ["Engineering"]
table_of_contents: false
---

Back in 2021, I remember being obsessed with GraphQL. Everyone on Twitter was praising it. Conferences were all about it. I thought, "This is the future of APIs".

So, as a naive engineer, I rewrote a small project that was working perfectly fine with REST. Just to be on the "right" side of tech.

What followed was a week of edge cases and overengineered queries. I introduced more complexity than the project ever needed.

Nobody asked for GraphQL. It didn't solve any real problem for that project. I chose it because, it was trending.

That mistake stuck with me. Not because it was costly and wasted a lot my time, but because it showed my how easy it is get to pulled by the hype. I picked a tool based on what's hot, not what's right.

That's not what good engineering is.

That's why I don't like people going to Next JS, Tailwind and ShadCN all the time. I wrote about it as well - [Stop using Next JS for everything](https://hemath.dev/blog/stop-using-nextjs-for-everything/)

Good engineers, the ones I admire, always bring it back to trade-offs.

They don't chase trends. They question them. Might look like an unnecessary arguments, but most of the time, those arguments are worth.

When someone says, "X is better than Y", they instinctively ask, "In what context? For whom? What's the cost?"

Take microservice as an example. If you worked in a project that's gone down the microservices rabbit-hole too early, you know the pain.

All of a sudden, deployments became maze. Debugging requires multiple codebases open. If you zoom out and see, you're team spends more time managing the infra and the integrity of contracts than building stuff.

That doesn't mean microservices are bad. It just means, they come with trade-offs. And whether those trade-offs are worth or not, depends on your project, use case, your stage and the team.

----
Speaking of microservices, I'm forced to mention [Gall's law](http://principles-wiki.net/principles:gall_s_law) here.

"A complex system that works is invariably found to have evolved from a simple system that worked. The inverse proposition also appears to be true: A complex system designed from scratch never works and cannot be patched to work. You have to start over, beginning with a working simple system"

----

There was a time, I had to choose between server-side rendering with a framework that works good and going full static generation with client-side hydration. Client-side hydration was the new hot architecture back then. Everyone was talking about JAMstack, edge functions, zero-JS isalnds, etc.,

I gave a real thought, because I wasn't a junior engineer anymore. It looked impressive, but the project was for a fintech product. SEO mattered most, initial load mattered more and most pages were user-specific and data-heavy.

I chose server-side rendering with cache-layered APIs and stuck with it. Even though it felt "uncool" at the time.

It made deployments a bit messier. I had to tune the response time and CDN headers manually. But the end result was amazing. Fast pages, personalized content and an architecture that actually fit the product.

If I had gone with the static-first trend, I'd have fought it every step of the way. Not because the tech is bad. It just wasn't meant for that shape of the problem.

That's the thing.

> When you start thinking in trade-offs, you stop worshipping the stack and start shaping it

Of course, you should explore new tech. That's part of the fun. Software engineers get to try new technologies without much cost when compared to other engineers. But the goal is not to use because it's new.

It's better to understand when these technologies are actually useful, and most importantly, when they are NOT useful.

Next time, choose wisely.

Every decision in software has a cost. Good engineers don't avoid that. They just learn to spend wisely.

And honestly, for me, that's way cooler than being trendy.
