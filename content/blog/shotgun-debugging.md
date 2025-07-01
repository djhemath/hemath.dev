---
title: Shotgun debugging
date: '2025-05-06T18:00:00.000Z'
draft: false
type: blog
excerpt: Sometimes, the fix isn't the real fix, and that's where things get interesting.
categories: ["engineering", "debugging", "dev-mistakes"]
table_of_contents: false
---

> The bug you fix without understanding is the bug that returns when you least expect it.

Some bugs are very sneaky. You stare at the code, add console logs, move things around out of pure frustration. Nothing changes. You copy paste that .babelrc file or something else from the internet. Nothing changes.

Then you start commenting out random lines, rewriting a function or even restarting the app. Nothing changes.

That's **shotgun debugging**.

If you don't know, shotgun is a type of gun that works well only in the close range. The reason is that it fires small fragments called shots in a scattered manner unlike other guns where you can shoot a projectile accurately.

Similarly in programming, we often debug with no clear plan, just quick shots in all directions, hoping something hits.

I've done it. You've probably done it too.

And to be honest, sometimes it does work. Sometimes changing a thing that "shouldn't matter" magically fixes the bug. And you sit there relieved but also wierdly empty because you don't know what went wrong. Or, why that fix worked.

It is like slapping your TV or the remote until the picture comes back. It is satisfying, but not sustainable.

I remember once, while working on a pretty old codebase, written with Handlebars and jQuery, a minor UI bug started showing up. We couldn't replicate it in local, it only occurs in production. Such a bad place to be :(

I was on a call with a colleague. Both of us confused and low-key panicking. We started tweaking styles, moving code around, even changing the layouts. As you guessed, nothing worked. Nothing consistent. Eventually, by changing an if condition which loads stylesheets conditionally, fixed it.

In that hurry, we just pushed it to production. It was gone. We didn't try to understand what caused it.

A few weeks later, it came back.

That's the real problem with **shotgun debugging**. Even when it works, you don't really learn anything. And worse, you might be adding new bugs without knowing it.

The point of debugging is not to make the bug go away. It's the process of identifying what went wrong and really fixing that. It's better to slow down and dissect the system to understand where the problem lies.

But slowing down is hard, especially when someone's waiting on a fix. That's when the urge to just poke things randomly becomes strongest. It feels like progress, but it's really just noise.

Just writing it out or using the famous "[Rubber duck debugging](https://rubberduckdebugging.com/)" clears up a lot.

It's not that every bug needs a scientific method, but having a rough theory before changing anything helps.

That said, I don't thinks shotgun debugging is all bad. Sometimes, when you're working in an unfamiliar technology or codebase, it is often better to shotgun it first. It can give you some hints. But, trust me, it's not where you want to live.

In my opinion, debugging is like detective work. You're not just fixing a crime scene. You're figuring out what happened, when and most importantly why. At this point, you very well know that we can't do that by shotgunning into the room and hoping to find the right clue.

So yeah, keep the shotgun in the trunk if you must. But maybe try asking the code a few questions first.

-----

BTW, that UI bug was caused because one of our internal UI library's stylesheet builds was stale. We adjusted an if condition that determined which version to load based on some logic, and that made it pick up the correct one. But once the stylesheet builds started working again, that condition no longer held true.

If we had really understood that the stylesheet build was the actual problem, we would've never changed that if condition. We would've just closed the issue, mentioning the stale build as the root cause.

But hey, shit happens!