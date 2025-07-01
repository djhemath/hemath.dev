---
title: The art of code reviews
date: '2025-03-12T18:00:00.000Z'
draft: false
type: blog
excerpt: A pull request holds more than logic — it holds hours of thought, doubt, and effort. The way we review it speaks a lot about the kind of team we are.
categories: ["Dev Culture", "Engineering"]
table_of_contents: false
---

> Good code is nice. Good reviews make the team unstoppable.

You ever open a pull request, feeling good about it, only to come back later and see comments like "Can we clean this up?" or "This logic feels off"? Yeah. It can be hurdle, but also, kind of beautiful, when done right.

I've seen both sides. I've shipped code that got merged with a silent nod. I've also written code that got the kind of feedback that made me want to throw my laptop into the sea. And in both cases, I've learned something. Sometimes about the code. Sometimes about people.

Here's the thing, we don't talk enough about the social side of code reviews. Like, you might be commenting on a function, but you're also talking to a person. A tired person. A proud person. A junior who's nervous. A senior who's rushed. A human. And I think we forget that.

I remember once leaving a casual "Why even do this?" comment on a teammate's PR. I didn't mean it in a harsh way. We were close, I was in a hurry, I thought it was funny. It wasn't. They didn't say anything back, but a few days later I found out they rewrote the whole thing just to avoid judgment. That stuck with me.

Now I try to slow down. If I'm reviewing, I imagine the person reading my words with their morning coffee. Will they feel annoyed? Defensive? Encouraged? That tiny mental shift changed how I write comments. "What's the intention behind this line?" hits different than "Why'd you write it like this?"

On the flip side, receiving reviews is a whole other dance.

Sometimes I'll get a nitpick-ed, and I'll want to defend it like my life depends on it. But over time, I've learned not to react instantly. I'll close the tab. Take a walk. Come back. Nine times out of ten, I realize the comment makes sense.

The tenth time? Well, that's when I start a thoughtful thread instead of a debate.

> Not every comment deserves to be actioned, but almost every comment deserves to be considered.

And yeah, sometimes code reviews get political. Or weird. Or just... exhausting. Especially in big teams. People bring baggage. Some folks feel the need to show they're "senior" by leaving a trail of comments. Others avoid conflict altogether and hit Approve even when the code is a flaming pile of spaghetti. Neither is helpful.

I once saw a dev who never got reviewed properly for months. Every PR was rubber-stamped. They thought they were crushing it. Then one day, someone finally did a deep dive, and it was brutal. Not because they were bad, but because no one had helped them get better.

> Silence isn't kindness in reviews. It's sabotage, wrapped in politeness.

There's an art to it. To saying "This could be improved" without making someone feel small. To receiving "This is wrong" without spiraling. To asking "Why?" not to attack, but to understand. It's all part of this weird social contract we've signed as engineers. Half logic, half language.

If I had to sum it up, review like you're mentoring a version of yourself from six months ago. Receive like the person commenting has a point, even if they're not saying it perfectly.

We're not just building software. We're building trust. In each other. In the system. In the idea that it's okay to make mistakes, as long as we help each other catch them.

Code reviews are awkward and fragile and sometimes annoying. But when done with care? They are pure gold.

Next time you're about to hit "Start Review", try opening with something like:
"Hey, just a thought —"

It softens the tone. Signals curiosity, not confrontation. Leaves room for discussion.

You're not there to win. You're there to collaborate. You're not saying "I'm right", you're saying "Let's think about this together." That's way more powerful.

Because let's be honest, no one opens a PR thinking, "Can't wait to get humbled today." But most of us are open to better ideas, if they come with respect.

And if you're on the receiving end? Remember: someone cared enough to review your code. That's love in disguise.

It's not just code. It's communication.
