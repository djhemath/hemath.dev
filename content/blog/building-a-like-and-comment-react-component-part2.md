---
title: Building a like and comment react component - Part 2
date: '2023-07-15T16:00:00.000Z'
draft: false
type: blog
hero_image: https://firebasestorage.googleapis.com/v0/b/dj-hemath-blog.appspot.com/o/blog-images%2Fbuilding-a-like-and-comment-react-component-part2.webp?alt=media&token=9c5da924-3d88-46ed-a88c-ef1dac0716cb
excerpt: As planned, I completed the POC on publishing a React component to NPM along with Storybook setup. Sharing my experience on doing this POC.
---

Hi folks!

As per the plan, I spent some time on the weekend and did a POC on publishing the react component to NPM. It wasn't easy. A ton of tutorials with different tools, I was quickly confused. I successfully set up a TypeScript based React component environment along with Storybook and managed to publish the component to NPM. Gonna share my experience on doing this POC and how I managed to get it done. If you just want to learn how to do it check out my tutorial post attached at the bottom of this post :)


## Choosing the bundler

I was initially planning to use Webpack, but it is not for beginner bundlers. I realized that very much later. So I went with Rollup. Magically it was very easy and somewhat similar to gulp in my experience. It has a whole list of awesome plugins that pretty much does everything that most people need to do.


## Setting up development environment

If I'm going with Rollup, I'll lose the easy workflow that create-react-app gives. Also I don't want to use that because it's been deprecated and we don't need it anymore. And I'm building a library, so using CRA is not an ideal setup.

But if I set up the whole environment with Rollup, it'd take a while mainly to understand. Even if I do the setup, I have to use my component in a separate page just to see how it looks and works. And this is not an ideal setup for component development.

So I went with a tool called Storybook. I worked with this tool in the past and it's now way cooler and easier than before. The concept of [Component Story Format](https://storybook.js.org/blog/storybook-csf3-is-here/) (CSF3) is even good and it brings cross platform/environment standards. Using Storybook is pretty much enough to bring us the whole development environment for building and testing the components.


## Setting up bundling

Bundling is not mandatory to publish components into NPM. But bundling gives us a lot of abilities and improvements. We can able to convert our lovely ES6 and above code to fully compatible CJS, UMD, etc., So that we aren't not losing developers other than ESM.  We can minify the code to reduce the bundle size. We can transpile TS to JS during the bundling instead of doing it manually ahead. And there's a lot we can do with a good bundling setup.

With Rollup I managed to compile CSS, include external NPM packages in the build, transpiled TS to JS, compiled ES6 to ES5, minified the final build. All these can be done with a single rollup command. It also gives type definition files that helps TS developers a lot.


## Testing

Initially I thought about a very simple strategy. I'll create a new react project, use the bundled component in it and verify the output. But it seemed tedious because if anything goes wrong, I've to make changes in the library, build, copy and paste the build into the test project and verify. There should be a simple solution right?

Yes, there is. We can link any NPM package to another NPM package/project using the **npm link** command. It'll act almost the same as doing the **npm install**. That was a way cleaner approach and required very minimum effort. More about this in my tutorial post.


## Configuring for the publish

I just had to add a few more properties that I never saw in a **package.json** to publish to NPM. The publishing part is fairly simple. We have to log in to NPM from the command line, then hit the **npm publish** command. It'll do all the work for us.


## Finally…

I felt productive that weekend as I managed to do something better. It wasn't that easy to go through all the tutorials available on the internet that use different tools, architectures and ideologies. But I learned a lot during this POC. Finally with the help of documents, I managed to do what I needed to do. Now it's time to design the UI and component structure that I'm gonna develop.

As I found this a bit tough to do, I don't want everyone to struggle. So I wrote a simple blog post teaching how to do this step by step with additional information.

Check that out - [https://blog.hemath.dev/publish-typeScript-based-react-components-to-npm-with-storybook-setup](https://blog.hemath.dev/publish-typeScript-based-react-components-to-npm-with-storybook-setup)

See y'all after I'm done with my design and stuff!
