---
title: Answer once
date: '2025-08-03T01:00:00.000Z'
draft: false
type: blog
excerpt: If you don't write it down, you'll explain it again and again. Save yourself the pain by answering once.
categories: ["Dev Culture", "Communication", "Engineering", "Productivity"]
table_of_contents: false
---

Hey lads,

If you're fixing bugs, rewriting something, or building a feature without documenting what you did, you're doing your future self and your team a **huge disservice**.

Yeah that's a bold statment.

I'm not talking about writing a dry wiki page nobody reads. I'm talking about clear, human-written explanations of what the thing does, why it exists and weird edge cases you ran into along the way.

Because, if you don't write it down, you'll will explain it again. And again. And again. Until you get sick of hearing yourself talk.

Or worse, someone else will burn hours digging through your code, trying to reverse-engineer the same thought process you had months ago.

I've seen two extremes.
1. Someone leaves behind a black box of code with zero context. And the next developer spends multiple days just trying to figure out how not to break it. Unit tests help here to make sure things didn't break. But they don't help much to get the context.
2. Someone documents every details such as decisions, edge cases, the "why" behind it all. So the next dev can add a feature or even rewrite the whole thing in hours without missing a beat.

Guess which one saves time. The first saves "your time" obvisouly. But you'll eventually pay that saved time explaining things 6 months later.

Good documentation is leverage. You spend an extra hour writing it, and that hour pays off every single time someone touches that code in the future. You save meetings, Slack threads and those "quick calls" that turn into half-hour detours.

----

Last month, I had to rewrite a richtext renderer component. It's not simple touch up. It's a full rewrite from scratch. It changed how contents are parsed and rendered in the DOM. The reason is to improve accessibility. While building the component initially, developers didn't thought much of accessibility. But I had to do it because of a critical compliance.

But the cool part is that it only took me 12 hours to rewrite it from scratch. The only reason I was able to pull that off was because the original developer had documented their version so damn well. Every edge case, feature, weird quirks and even every single reason behind certain decisions. Clearly. No fluff.

I didn't have to grep through the codebase. I just read their notes, understood the intent and built an one-to-one replacement without second-guessing what I might be missing.


In another situation, I was trying to access a feature. But it requires a specific user type to work. There is no good documentation for the feature or how to access it. I asked my lead. He redirected me to another team. I asked that person, he redirected to his colleage. He redirected me further to QA team since they hold a lot of test user accounts. QA team redirected me to their lead to ask for permission. I had to fill out a form. Finally, I got the user account.

It took me full 3 days just to get the user account. All I had to do is just fill out a form, wait for a couple of hours. I'll get the user account credentials to my email.

I was very furious. Wrote a documentation about this flow. Pasted the reference in related user stories. Slapped the link of this documentation in various Slack channels.

Roughly after 6 or 7 weeks, someone had to work on this feature. He saw the old user stories, found my link and got the account seamlessly. He didn't ask anyone about the access. Did it all by himself.

----

Writing documentation is not an **"extra work"**. It multiplies your impact.

And no, you don't need to write like a professional technical writer. Just write it like you're explaining it to someone who wasn't in the loop when you built it. By writing in this tone, you essentially cover the new team members who might join later.

Just use plain language. Say why you made that architectural choice. If you hit a painful bug and found the fix, defintely write that down. Because someone else will hit it too.

It's easy to treat documentation like something you'll do it later. But you won't. Even if you did, it might not be as effective as writing it down as you work. Because your context is fresh and you still remember the weird edge cases you handled, etc.,

The best way to save yourself from repeating same explanation forever is simple. Write it down.

Answer once.