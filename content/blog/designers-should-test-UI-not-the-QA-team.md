---
title: Designers should test UI, not the QA team - Change my mind
date: '2024-03-13T07:10:05.000Z'
draft: false
type: blog
hero_image: https://firebasestorage.googleapis.com/v0/b/dj-hemath-blog.appspot.com/o/blog-images%2Fdesigners-should-test-UI-not-the-QA-team.png?alt=media&token=610f1953-0018-4905-a27d-33e396a286c1
excerpt: Designers who designed that good looking page or navbar should first see it in action. Test it. Well, visually test it. Once designers are happy, then it can be moved to the QA team for further tests.
categories: ["UI/UX"]
---

Yep, this has been buzzing me for some weeks. I've been working with QA teams in multiple projects and heard stories from my developer/manager friends as well.

Obviously, the QA team should test the UI, but not at first. Designers who designed that good looking page or navbar should first see it in action. Test it. Well, visually test it. Once designers are happy, then it can be moved to the QA team for further tests.

## Why?

Well, these days many developers I see, don't even know basic UI principles. One of my friends is a great engineer. He builds awesome stuff, his application can handle multiple websocket connections distributed to worker threads and mak'em communicate properly. He can create a network of connections just inside the browser. He taught me how to properly use **saveLayer** in Flutter to boost the performance. But I checked his portfolio site. Dark green background with yellow text!

Yesss! That's true. Some of you can argue that developers don't need to have UI skills. Or developers are good at building, not at creativity. The truth is, no. Creativity is not required to adhere to some basic rules. You can be a cyclist, you don't need to use indicators while turning like other advanced vehicles do, but you should know to stop at red lights.

Basic stuff like contrast, spacing (and white spaces), basic typography, visual hierarchy, instant feedback (like spinners, validation messages). These are very basic stuff. In my opinion, every developer must know these. Whether you're a great poet or not, you should know to leave a blank line between every paragraph, or make titles uppercase/bold.

Obviously, students coming out from college don't need to know this stuff, but a developer with at least 1 year under their belt should know this.

BTW, I'm mentioning front-end developers.

## How?

To be honest, I never took any course on UX/UX stuff. But some people praised me for my UI skills as a developer. I wondered how that's even possible. I never took any course or watched a UI playlist.

As I was thinking this and questioning myself during a train trip, a pattern emerged. Most of you may know that I'm from a solid startup culture. I've been in 3 startups before jumping to corporate.

All these startups had like 4 or 5 people maximum including CxOs. But there was a designer in all these startups and I worked closely with designers. In fact, the CEO of the last startup that I worked with is a designer basically.


All these years, designers give me designs or samples of designs. After I built those designs, the first person to look at it was, well you guessed, a DESIGNER.

At first glance, they will take screenshots, highlight areas with problems and ask me to change. I usually ask why to do that. And with a great energy and interest, they explain the reason, the philosophy, the art, behind why they put that little fillet or why they choose #222222 instead of #000000.

You get it? Free learning. I almost completed a beginner course on UI principles just by working with designers. Especially designers with a good heart and great interest in sharing their knowledge.

## What?

But in most corporates, I see that,

1.  Designers create design docs and mockups
2.  Hand it over to the team
3.  Developers build those designs
4.  QA compares the actual output with the design doc, and find odd looking areas
5.  Report it back to developers
6.  Developers make changes and goes to step 4

This cycle goes until both the design doc and the UI built by developers matches.

But when it goes to production, designers tend to realise that they should've used a dropdown instead of radio buttons. What now? Repeat above steps.

Do you see, nobody except designers know the reason behind every element in the screen.

If we let designers look at the finished product first, they will see their design being built in real life. They can see if there are flaws in the design, right away. Before making it to QA, both developers and designers can fix those stuff.

Now developers can learn basic UI principles - IF they put a bunch of WHYs in front of designers

## Then how can a QA team learn basic UI?

Simple, they have to question the same designer. Why we do this, why not that, what is the benefit, what it solves, etc.,

So instead of just comparing developers output with designers output, QA team should test the design docs first. When a designer completes a design, instead of handing it over to developer, it'll good if handed it over to the QA team.

QA team, can further view the design, find any visual flaws in their perspective. Once both designers and QA team are in the same page, developers can do their work confidently.

This way QA team also can learn by questioning designers.

## Final thoughts

Yep, most corporates have an inbuilt course that covers basic UI principles. Some make it optional, where others make it mandatory. But who is teaching this course? 8/10 times - not a designer. Trust me, I've heard from many people that project managers, system engineers and other people who are NOT fundamentally designers are imparting these UI principles.

Yeah, it's not bad for others to teach UI principles. But they should know these principles by-heart. When a WHY question comes, they should have multiple answers, use cases and different perspectives to answer that question.

Who is best at that? Obviously, designers.

A computer science professor knows how to multiply two matrices, or even to solve multiple linear algebraic equations with matrices. But they might not know what a "Fourier transform" is. Most of the time, only a maths professor can answer it in a clear way.

So bringing designers into the process of analysing the quality will improve the UI as well as fundamental knowledge.

And yeah, this mental model is purely built with my experience. There could be a whole another perspective.

*Please correct me if I'm wrong*,

*Hemath Kumar*
