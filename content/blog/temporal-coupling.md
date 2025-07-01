---
title: Temporal coupling
date: '2025-05-14T18:00:00.000Z'
draft: false
type: blog
excerpt: When two files always change together, that’s temporal coupling. It’s worth paying attention to.
categories: ["refactoring", "architecture", "code-quality", "refactoring"]
table_of_contents: false
---

> "Everything should me made as simple as possible, but not simpler"
>
> -- Albert Einstein

When we talk about software architecture, we might discuss around the word "coupling" a lot. But I don't think we always pause to feel what it really means.

At its core, coupling is about dependency. One piece of something (say code) depending on other. Sometimes lightly, sometimes tightly. (Yeah, I got that rhyming naturally while writing)

You want some level of coupling. Because, that's how systems talk to each other. But there should be a line.

Too much of coupling, then things get brittle.

There are some known couplings in the field of software engineering - content coupling, data coupling, control coupling and then temporal coupling.

Let's just focus on the **temporal coupling**. Because it's something that always needs a third-eye to validate.

The reason for that third-eye is that it's the quiet one. It's not obvious in the code, no lint errors, nothing. It just sits there, silently tracking everytime two files change together over and over again.

You'll notice if you pay attention. Like, why do you always need to update this config file when you add a new endpoint? Or why does changing a component force you to tweak a test helper that lives two folders away?

**Temporal coupling** is about something which I call "Change timing". It's when two or more things must change at the same time. Not because they logically depend on each other, but because your system has accidentally set it up that way.

Is that a bad thing?

TBH, not always. But definitely sometimes, it's annoying.

In one of the projects which I worked with had this issue. Whenever we need to add new icon to the UI renderer, we have to - add it in a registry of icons, create a CSS rule for that, add the icon name in icon list array and finally update a JSON file that keeps track of assets.

If you look closer, too much things happening in different files which are not directly related to the icon. One registers an icon, another creates a style rule, another keeps the icon names (why?) and another doing the completely unnecessary work version of history, sort of.

I just cleaned it up in my weekends, raised a PR with detailed description about the change. The team said okay and moved it forward. Now if an icon needs to added, we just add it in the registry. No CSS rule, no list of icon names or that JSON file. Just one file, and every single part of the codebase now knows about this new icon.

And that's the temporal coupling sitting here in the codebase.

> "Not dependencies are visible in code. Some live in time"

There are moments where temporal coupling is natural. A React coponent and its CSS file. A migration script and a schema update. You wouldn't want these to drift apart. They are meant to live in sync. That's *intentional coupling*, and it's fine.

But it becomes a problem when it's *unintentional*. When it creeps in because your abstractions were not clean. Or maybe, you stuffed two unrelated things into one module. Then, months later, you can't make a small change without touching three other places. And sadly, no one remembers why.

That's temporal coupling draining your sanity.

Personally, I think the goal isn't to eliminate coupling together. That's impossible. The goal is about to be **intentional** about it. Know *what*'s coupled and importantly *why*.

If two things always change together, maybe they should live together. Or maybe, they shouldn't. But either way, never ignore it.

Every now and then, zoom out. Look out your last N commits and ask, "What files always move together?"

And then, ask "Should they?"

Sometimes, that one question can lead you to a cleaner system. One that's easier to change, easier to trust. And honestly, just easier to breathe in.

> "When one thing depends too much on another, neither can breathe."
>
> -- Read it somewhere. I didn't get it back then. Now I do.
