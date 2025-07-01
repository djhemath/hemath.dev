---
title: Stop using Next JS for everything
date: '2025-02-22T18:00:00.000Z'
draft: false
type: blog
excerpt: Next.js is great — but it’s not the answer to everything. This post is a gentle rant on hype, tool choices, and why thinking before building still matters.
categories: ["Engineering", "Rant"]
table_of_contents: false
---

> Simplicity is not a step back. It's a sign you know where you're going.

I don't hate Next.js. In fact, I think it's one of the better things that happened to React in the last few years. It made server-side rendering and static site generation feel approachable, and gave developers a solid structure to build on. Especially the front-end developers can now quickly build a server side rendered applications by learning little bit of backend. They don't even need to switch between languages.

But somewhere along the way, things started going off the rails.

Now, almost every new project, even the most basic ones, starts with Next.js. Whether it's a personal website, a simple internal tool, or a one-page experiment, people seem to reach for Next.js like it's the only framework that exists. And it honestly frustrates me.

I remember attending a tech meetup in Chennai. During a casual conversation, someone told me they were building their personal website in Next.js. I was curious, so I asked why. His answer was that he wanted to make a static site. That's fucking all. When I asked why not just use plain HTML and CSS, or something lighter, he confidently said, "Next.js is fast. It uses React. React has the Virtual DOM."

That's when I realized the problem isn't just about tool choice, it's about a mindset. Somehow, people have come to believe that throwing a big framework at a small problem automatically makes things better.

It's like the classic [Law of the hammer](https://en.wikipedia.org/wiki/Law_of_the_instrument) (for simple explanation, read [here](https://medium.com/illumination/the-law-of-the-hammer-146d39fa1352)).

The law basically tells that **if all you have is a hammer you start to treat every problem as a nail**.

A different time, I was talking to someone who was building a web-based tool for internal use at his company. No SEO needs, no public traffic, just a dashboard for their own team. Yet again, it was built using Next.js. When I asked why, he said it was for the SSR support. But when I dug deeper, I asked more questions such as "Do you need to render huge datasets?", "Do you serve different content per user?" — the answer was always a "smiley no". He still said it's faster and more efficient because, again, React has the Virtual DOM.

I've heard this Virtual DOM argument way too often. It's become the go-to explanation for performance, whether or not it's true in context. And that's what bothers me. The lack of context. The lack of thought. The default assumption that Next.js is the answer to every project.

> "When all you have is Next.js, every Hello World looks like a full-stack app."
>
> -- Someone whose name starts with H :-)


Next.js is amazing when you're building something that actually benefits from SSR or SSG. It makes sense for large content sites, SEO-heavy pages, or hybrid apps with public and private views. But for a personal blog? A one-page tool? An internal admin panel? It's like using a cargo ship to cross a pond.

I'm not saying don't use Next.js. I'm saying, just stop and think for a second. Ask yourself what your project really needs. If all you're doing is rendering static content, you don't need a full React runtime and hydration overhead. If your app doesn't need SEO, why complicate your setup with server-side rendering?

We don't need to treat every new framework like a religion. Tools are just tools. Use them when they make sense. That's all I'm asking.

> Engineering is not about picking the fanciest tools — it's about making the right tradeoffs.

Angular doesn't get enough credit these days. But when it comes to backward compatibility and long-term support, it's one of the most dependable tools out there. Building large-scale applications in Angular just feels smooth. Everything you need is already in the box. No constant hunt for third-party libraries, no breaking changes every six months. Just a simple, powerful stack with excellent developer tools.

Sometimes the best stack is the boring one, plain old HTML, a static site generator like Hugo or Astro, or a simple Vite + React setup. They're faster, simpler, and get out of your way.

This very blog and my website is fully static and powered by Hugo.

If you're more into static sites, Hugo is incredibly fast. It can generate thousands of pages in seconds. There's a bit of a learning curve at first, but if you already understand how components work, how to loop through data, and how to conditionally render stuff, picking up Hugo is easy. You write your content in Markdown, structure a few templates, and boom — your site is live.

Now sure, for backend-focused folks or anyone trying to build a quick MVP or use-and-throw tool, Next.js can be a decent fit. It handles routing, API endpoints, and deployments in one neat package. But again, it's not meant for every single project. There's a difference between **can** and **should**.

> Build what you need, not what the internet tells you to.

So if you run into someone who keeps reaching for Next.js no matter what they're building, just share this article. Not to prove them wrong — but to make them pause and think. That's all this is about.
