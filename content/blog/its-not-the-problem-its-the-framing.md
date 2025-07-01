---
title: It's not the Problem, it's the Framing
date: '2025-06-10T18:00:00.000Z'
draft: false
type: blog
excerpt: The smartest solution isn't always the most complex one, it's the one that quietly works without demanding your time.
categories: tips
table_of_contents: false
categories: ["engineering", "product-thinking", "prioritization"]
---

> Real engineering wisdom is knowing when to stop building.

A while ago, I was asked to build a feature for exporting reports. It was a prettry straightforward ask.

"As an user, I should be able to download my activity history as PDF".

This story was defined by the product-owner. She asked for the estimations, everyone jumped in and quoted 4, 5 story-points. I was absent in that refinement call. Missed it.

The next day, one of the junior developers directly came forward to pick the task and work. As usual, I went through all the stories and started reading descriptions of them. And this one stopped me for a bit.

Because the priority of this story is very high. It was required under a week. But to build a PDF exporting solution, we have to take care of formatting, edge cases, file size, font size, rendering on different sizes, etc.,

And you'll always have those users whose PDF opens blank in some weird old version of Acrobat Reader. That thing stinks.

I don't honestly know how in the world my team quoted 5 story points for this thinking they can build, test and deploy it soon.

I stopped it because something didn't feel right.

I asked the PM, "Hey out of curiosity, how often do users actually use this?"

She said, "Honestly, probably just once or twice a year. They want this feature to work with HR compliance."

I said, "Okay, so why does it have to be PDF?"

She paused for a brief 10 seconds and said "Oh. I don't know. I just thought that's what people expect for reports".

Fair. But building PDF exporter takes time to make it good even with the existing libraries.

But I have another thing in my mind. It was the good old CSV. It's simpler, works pretty much everywhere. It covers the same data. And for once-a-year use case, it's more than enough.

So I said "A PDF exporter will take at least a couple of weeks to build and test. Do we have that time?"

She said, "No, we are near that period in the year that everyone wants the report".

So I asked, "What if we just export a CSV file with all the same info? And if users ever actually need a PDF, we can revisit?"

She said, "Yeah that's fine. CSV works too".

Had a quick meeting with that junior developer explaining the requirement modification. He already worked on exporting CSV, so he re-estimated the development time as 1 story-point.

After a couple of days, we built the exporter, tested it well (there is not many edge cases when compared to PDF) quickly and deployed in the fourth-day.

We launched it. Many people used it. No one complained.


Now here is the important part that stuck with me,
If I had just built whatever in the ticket, no one would've blamed me. It would've worked. It would've taken longer. It would've been harder to maintain. And it wouldn't have made the user experience any better.

But asking *why*, even just once, completely changed the path. And this isn't about cutting the corneres or being lazy. It's about solving the right problem.

There is a difference between meeting the requirement and delivering the outcome.

That's what I keep coming back to. A lot of junior developers are great at solving problems. But they are mostly solving the problem as written.

To become a senior, they have to solve the problem that actually matters. The problem that actually moves the needle.

The more experience you get, the more you realize how much time is wasted from just taking the first draft of the requirement. A lot of engineering is usually burned out not in solving hard problems, but in solving the wrong ones in the most complex way possible.

It feels safer to just work on what is described in the ticket instead of challenging it. But the longer you're in this game, the more you learn that the best code is often the one didn't have to write it all.

Because, remember, *every line of code is a liability*. We have to maintain it in the longer run.

Whenever I see ticket, I don't jump in right away. I stop. I slow down. I ask questions, may be dumb questions. Sometimes annoying ones.

Because 80% of the time, the solution isn't where you thought it was. It's somewhere else, hiding in plain-sight, waiting for someone to tilt their head and ask "Wait a sec.. do we even need this?"

Always try to **reframe** the problem in different perspectives and get deep into **why** we need to solve this.

And that's my friends, is the real fun part of the job.
