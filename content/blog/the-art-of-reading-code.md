---
title: The art of reading code
date: '2025-06-26T18:00:00.000Z'
draft: false
type: blog
excerpt: Most of us obsess over writing code, but forget that reading it is where the real work happens.
categories: ["Engineering", "Dev Culture"]
table_of_contents: false
---

Most people talk about writing code. Writing the clean and performant code. Writing code like poetry. But no one tells you how to *read* code. That's what I'm gonna tell you now.

If you think a bit, it will be obvious that we spend most of our time reading the code. It's not only about the code written by others, also the old ones which we wrote years back.

There's this myth that good devs just get it when they look at a codebase. It's partially true. The more code you read, the more patterns you'll recognize. It's like Chess, the more matches you play, the more positions and patterns you can see and remember. Top chess players play a lot of moves, especially the initial 5 to 10 moves out of instinct because they played those variations a lot.

Similarly, as software engineers, we, read more code we will be able understand most of the codebases quickly. But that doesn't work when looking into a codebase which is completely different.

I've opened plenty of repos where I felt like a tourist in a foreign city with no map and all the signs were written in hieroglyphics. I click into one file, then another and another. After 15 mintues, I still have no idea what the app actually does.

I remember this one time, early in my career, I had to fix a bug in a legacy Angular app. I thought it'll take like an hour to find the right service and fix it. But it took me 2 full days. Not because the bug was complex, but the code is. There were services calling other services, variables named after planets (it's true, I'm not kidding), and at some point, I saw comment saying "Don't change this, it'll break".

I used to think that it was a "me problem". But over time, I realized that understanding code is a separate task like writing one. It'll take almost 50% - 75% of the time it took to write a component just to understand it. Say a component takes an hour to write, don't be surprised if it takes you 30 to 45 minutes just to figure it out.

Reading code is slow. And it **should be**. But no one says that loud.

Understanding someone else's code is less about intelligence and more about patience. You're not just reading the code. You're reading decisions, blind spots and assumptions. You're basically trying to reconstruct what someone was thinking when they wrote it.

And that takes time. We are not ChatGPT or Claude to understand the code immediately.

Whenever I stuck reading through an unfamiliar repo, I'll pull up the README file. If it was garbage (which it usually is), I'd focus on finding the starting point of the code. I call that "**Pulse**". That's the part where everything connects. That's where you can feel the app's heartbeat.

Some developers skim and try to speed run. But I like to sit with it. It is not always efficient, especially when you have to do something quicker. But when you spend times reading codebases and getting that patterns stored in your memory, it'll be faster to process and work in an unfamiliar codebases.

I'll let the code tell me what it's doing. Not what I expect it to be doing. You'd be suprised how often those two things are completely different. Yes, read it again.

I'd argue to stop being afraid of reading "ugly" code. There's a weird shame around it, like we're supposed to only look at clean and majestic codebases. In real-world, such things are not always possible. Half-baked and messy codebases are out there a lot.

Honestly, reading messy codebases teach almost (and sometimes more) than perfect codedbases. In the messy ones, you will see the patches. And you know, how to build one in future without such patch works.

So next time you open a codebase, don't rush. Take your time. Ask questions. Leave notes. You're not decoding syntax, you're just learning how someone thought while writing. And that's beautiful.

Always, follow the pulse.
