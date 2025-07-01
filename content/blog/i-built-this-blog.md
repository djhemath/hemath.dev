---
title: I built this blog
date: '2023-06-25T17:00:00.000Z'
draft: true
type: blog
hero_image: https://firebasestorage.googleapis.com/v0/b/dj-hemath-blog.appspot.com/o/blog-images%2Fi-built-this-blog.jpg?alt=media&token=91c90104-679e-4045-b3b9-28d2f11efd3e
excerpt: Join me on my journey to build a more meaningful, consistent, and cost-effective blog using NextJS 13.
categories: ["uncategorized"]
---

Hey there, folks!

So, here's the scoop: I'm one of those people who just can't resist having a blog to spill the beans on everything I ponder, get up to, and every corner of the world I explore. Once upon a time, I even had a Wordpress blog, courtesy of my [mentor](https://twitter.com/saiy2k). But, alas, the flame of interest dwindled, and the poor blog gathered cyber dust. It was so out-of-sight, out-of-mind that I completely forgot to renew the domain. You guessed it, it got snatched up by someone else.

Jumping forward two years, I was struck by an epiphany: I'm soaking up all these cool tech skills but not applying them to anything truly worthwhile. Nestled away, I have a Notion document brimming with over 30 unfinished project ideas (some even sporting fancy Figma designs, timelines, deployment plans, and all that jazz).

So, I was itching to craft something meaningful, something that would keep me on my toes. Right around this time, NextJS 13 hit the scene. Naturally, I wanted to soak up all the new features, which I did... only to forget them promptly. Then, the lightbulb moment: why not build a blog? And this time, commit to consistency.

Determined to avoid the rabbit hole of crafting ornate design systems and deep-diving into human psychology to craft the world's best blog, I kept things straightforward. The design? A single, unpretentious page, listing all my blog entries.

My mission: leverage the power of NextJS to craft an improved blog. However, reality struck—I couldn't afford the luxury of hosting a blog with all the bells and whistles NextJS offers, like next/image and a database. Why break the bank on a blog solely dedicated to my musings and ramblings? So, a zero-cost blog was the target.

Compounding the issue, this was when Heroku did away with their free tiers. Firebase's hosting emerged as my go-to option, limited as it was to static files, perfect for hosting web front-end apps. Hence, a static blog it was to be! Cue, NextJS with its stellar Static Site Generation (SSG) feature.

The strategy was to deploy NextJS as my weapon of choice for churning out static blog pages. As for the data, I dared not trust my own forgetful nature with backing up a local database. The safest bet, in my view, was to forego a database entirely. For posts, I'd stick to good old markdown files stored safely in my Github repository. To keep tabs on all posts, I'd have a handy JSON file sitting pretty in the same repository.

During the page-building process, NextJS would fetch the list of posts from the JSON file, pull the raw markdown files, parse them, and then render them with the aid of the react-markdown package. To keep my code snippets looking sleek, I used the syntax-highlighter package, which fortunately, was a breeze to integrate with react-markdown.

So here we are, everything's shipshape, and there are zero excuses for my ass to procrastinate. This blog is set to be my career's steady compass, a space where I can publish and regularly update my project ideas. In essence, my personal journal.

As for interactive features like comments and likes, hold your horses—they're on my to-do list. My next side project? Crafting a React-based like and comment system. So, let's see how that pans out. Let the journey continue!

Ofcourse, the words used in this are not truly mine. ChatGPT helped me to craft this.
