---
title: Before you cut the fence, ask why it is there - Chesterton's Fence
date: '2025-08-17T01:00:00.000Z'
draft: false
type: blog
excerpt: Not every strange piece of code is useless. Sometimes it's a fence, built long ago to keep a problem you can't see from breaking through.
categories: ["Engineering", "Philosophy"]
table_of_contents: false
hero_image: https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fchestertons-fence.jpeg?alt=media&token=af974945-85a2-4e03-984a-bf633a570a0e
hero_image_caption: Source - https://candost.blog/chestertons-fence
---

There is an old idea from G.K. Chesterton that I keep coming back to.

He said, if you find a fence in the middle of the road and don't know why it's there, the worst thing you can do is tear it down before you understand its purpose. Only once you've figured out why someone put it there can you decide whether it still needs to stay.

It might sound obvious, but in practice, it is NOT. Escpecially in software engineering.

I've lost a count of the number of times I've looked at a piece of code and thought, "This looks pointless". It could be an extra condition or even a config file that's three times longer that it "needs" to be.

The temptation was always strong. Go ahead, clean it up, make it neat and prove that you're smarter that whoever wrote it.

Not gonna complain, but sometimes that's the right move. But sometimes, it's a trap.

I once worked on a project where I deleted a bunch of code. Because I learnt that "Every line of code is a liability". To me, they looked like dead weight. I was proud of simplifying things.

You know where this going. A week later, a customer did something that triggered an edge case that the old code had quietly handled. The system broke. My manager asked me to revert the change. I challenged him that this refactor wasn't the issue. All the edge cases are properly handled and tested and this must be a new edge case we never seen.

He asked me again, patiently, "Revert the changes and deploy them. If the same issue occured even after reverting, then we will fix. Otherwise, let it be"

I was part furious and part confused. I did revert and deploy. It just worked. Magically.

I was now part happy and part sad.

That's when I realized that even if some condition, abstraction or whatever looks not required, we should not delete it unless we can discuss with the person who actually wrote it. I later had a discussion with the original author, apparently, he forgot to add this condition in the documentation later. I was following the documentation and saw this is unnecessary and just deleted it.

Even though the original issue is poor documenting practice, my action is something that caused the issue.

So, recently, when I was rewriting an [whole component from scratch](https://hemath.dev/blog/answer-once/), I initially read the documentation first, and instead of jumping on to rewriting it, I gone through the old codebase. I just skimmed over it before the actual implementation. Though I didn't find anything different from documentation and the old code, it was still worth reading it to clear the doubt. 

The thing is, we don't always get to see original reasons. People move on. Teams change. Documentation gets lost. What's left is this cryptic trial of decisions in the codebase.

I'm not saying never refactor or that every strange fence deserves to stay. That would be just as bad.

But there is a difference between cleaning up with curiosity and cleaning up with arrogance.

Curiosity means asking, "what problem was this solving?", "is that problem still real?", "can I solve it better?"

Arrogance is assuming the past was stupid just becuase it's messy.

Chesterton's fence isn't about preserving the past. It's about respecting the fact that the past had reasons. And until you know those reasons, you're just guessing.

So, next time you're tempted to refactor something, pause for a brief moment. Maybe it's just a bad code. Or, maybe it's a fence.

