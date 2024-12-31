---
title: Publish TypeScript based React components to NPM with Storybook setup
date: '2023-07-11T18:00:00.000Z'
draft: false
type: blog
hero_image: https://firebasestorage.googleapis.com/v0/b/dj-hemath-blog.appspot.com/o/blog-images%2Fpublish-typeScript-based-react-components-to-npm-with-storybook-setup.png?alt=media&token=86e17e65-48f8-47a9-b7b5-7c9fbc9c5837
excerpt: Publish a typescript based react component library to NPM along with Storybook setup for development
---

Hey folks!

Ever pondered the magical journey of React libraries making their way to NPM? Do you think whipping up some create-react-app and tinkering with JSX is all it takes to publish? Well, let me burst that bubble with a resounding NO. There's a tad more to it!. We need to roll up our sleeves and put in some extra effort. Armed with the power of the internet and fueled by countless cups of caffeine, I embarked on a daring Proof of Concept (POC) adventure over the weekend. And now, it's my time to spread this newfound wisdom among my fellow developers!

Here's the grand plan: we'll set up a React project with TypeScript and sprinkle in some Storybook for development. Then, we'll configure the bundling process to unleash our creation upon the hallowed grounds of NPM.

But wait, hold on tight! This guide is tailored for absolute beginners. If you're already a seasoned package-publishing pro, you might find it a tad underwhelming. Feel free to skim, skip, and sprinkle your expertise wherever you please.


## Setting up React project

Hold onto your hats. The once-famous create-react-app has officially bitten the dust. Yep, it's no longer in the spotlight. The React team even stamped it with the "deprecated" label and removed it from the latest official docs. Check [this thread](https://twitter.com/dan_abramov/status/1636827365677383700) by Dan Abramov explaining the reason for this decision.

Ouch! But hey, don't fret too much. Since we're focusing on building components rather than full-blown applications, we don't have to stress about create-react-app anymore. Instead, we have a powerful tool called Storybook that lets us create our components in a separate and safe environment.

And when it comes to packaging our final code for sharing, we can rely on handy bundlers like Webpack or Rollup. In this article, we'll take the simple route and use Rollup because it's easy to set up. 

Let’s start by creating a new directory, cd into it and initialize NPM.


```bash
mkdir awesome-component-library && cd awesome-component-library && npm init
```


It’s time to install React dependencies and typescript.


```bash
npm install -D react react-dom
```


When it comes to installing dependencies, we need to be a bit strategic. We don't want to go all out and ship the React runtime to every John, Jane, and Doe project out there. They probably already have it installed, right? So, we'll keep things tidy and install them as devDependencies. But hold your horses, we still need to ensure that the host environment (the project where other developers will use our components) has these dependencies.

No worries, though! We can boss around NPM and make it take care of this for us. How, you ask? Well, we'll whip out our trusty package.json and add a special "peerDependencies" property. This little gem will make sure our components have the necessary React and react-dom buddies to party with.

So quickly go ahead and add this property.


```json
{
    ...
    "peerDependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    }
    ...
}
```


You can even specify a range to these peerDependencies as specified in the [NPM's document](https://docs.npmjs.com/cli/v6/using-npm/semver#advanced-range-syntax) about the semver.


## Setting up TypeScript

It’s straightforward, download necessary packages and create a tsconfig.json


```bash
npm i -D typescript tslib @types/react
```


Create a new file in the project root called **tsconfig.json** and paste the following (feel free to customize as per your needs)


```json
{
    "compilerOptions": {
      "target": "es5",
      "outDir": "lib",
      "lib": ["dom", "dom.iterable", "esnext"],
      "declaration": true,
      "declarationDir": "lib",
      "allowJs": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react"
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist", "example", "rollup.config.js", "lib"]
  }
```



## Setting up Storybook

[Storybook](https://storybook.js.org/) is a development tool that helps us develop and test components in an isolated environment. In its words it’s a frontend workshop and works for almost all frontend technologies.

As we are going to develop reusable components, we can leverage this tool to make our work easy.

To set up storybook run the following command in the project root


```bash
npx storybook@latest init
```


Once storybook dependencies are installed, we can start working on developing our component.

The directory structure should look something like this,

```
.
├── .storybook/
├── node_modules/
├── stories/
├── package.json
└── package-lock.json
```


## Developing component

Alright, let's keep things simple, shall we? We're going to focus on developing just one component. And what is this marvelous creation, you ask? Well, it's none other than a humble button with a few fancy props.

Now, I won't bore you with all the nitty-gritty details about the component itself because, hey, that's not what this article is all about. We're here to conquer the publishing world, not dissect buttons! So, let's save our component exploration for another time and dive right into the exciting stuff.

We are going to use 1 external package called **contrast-color**. Let’s install it,


```bash
npm install contrast-color
```


We need to create a directory named as **src** to house our code. Create directories and files like below

```
.
└── src/
    ├── components/
    │   └── Button/
    │       ├── index.tsx
    │       └── button.css
    └── index.ts
```


```bash
mkdir src && mkdir src/components && mkdir src/components/Button && cd src && touch index.ts && cd components/Button && touch index.tsx && touch button.css
```


Finally, the directory structure should look something like this,

```
.
├── .storybook/
├── node_modules/
├── stories/
├── src/
│   ├── components/
│   │   └── Button/
│   │       ├── index.tsx
│   │       └── button.css
│   └── index.ts
├── package.json
└── package-lock.json
```

Copy paste contents of following files respectively.


```tsx
// src/components/Button/index.tsx

import React from 'react';
import { contrastColor } from 'contrast-color';
import "./button.css";

export type ButtonProps = {
   text?: string,
   color?: string,
   onClick?: () => void,
};

const defaultValues: ButtonProps = {
   text: "Click me!",
   color: "#000000",
   onClick: () => { },
};

export default function Button({
   text,
   color,
   onClick,
}: ButtonProps = defaultValues) {
   const styles: any = {};

   if(color && color !== 'undefined') {
       styles['background-color'] = color;
       styles['border-color'] = color;

       const foregroundColor = contrastColor({bgColor: color});
       styles['color'] = foregroundColor;
   }

   return (
       <button
           style={styles}
           onClick={onClick}
       >
           { text }
       </button>
   );
}
```

```css
/*
   src/components/Button/button.css
*/

button {
   border: 1px solid #000000;
   background-color: #000000;
   color: #FFFFFF;
   border-radius: 5px;
   padding: 5px 15px;
}

button:hover {
   transform: scale(1.1);
}
```

```ts
// src/index.ts

import Button, { ButtonProps } from "./components/Button";

export { Button };
export type { ButtonProps };
```



## Writing stories

Stories are basic units of storybooks. It visualizes how a component looks and works in a single state. We can write as many stories as we want to test out components.

Remove all the existing files in the **stories** directory by running the following command from the project root,


```bash
rm -rf stories/*
```


Let’s add one file named **Button.stories.ts** for our Button component and paste the following code.


```ts
// stories/Button.stories.ts

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../src';
import '../src/components/Button/button.css';

const meta: Meta<typeof Button> = {
   title: 'Button',
   component: Button,
   argTypes: {
       text: { type: 'string', description: 'Text to display in the button', control: 'text' },
       color: { type: 'string', description: 'Hex color code for the button', control: 'color' },
       onClick: { type: 'function', description: 'Callback function called on clicking the button' },
   },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ZeroConfig: Story = {
   args: {  },
};

export const CustomText: Story = {
   args: {
       text: 'Touch me!',
   },
}

export const CustomColor: Story = {
   args: {
       ...CustomText.args,
       color: '#6c0b99',
   },
};

export const CustomOnClick: Story = {
   args: {
       ...CustomText.args,
       onClick: action('Clicked!'),
   },
};
```


Now run the following command to play with the storybook


```bash
npm run storybook
```



## Let’s bundle it!

Alrighty, folks! We've put the finishing touches on our fantastic component, and now it's time to send it off into the wild world of registries like NPM. But wait! Can we just toss it out there without any bundling? Well, technically, we could. But let me tell you, it's not the wisest move. Wanna know why? Well, hop on over to StackOverflow and check out this [answer](https://stackoverflow.com/a/67077006) that spills the beans.

So, here's the plan: we're gonna bundle up our masterpiece and ship it in style. And guess what? We've got the perfect bundler in our arsenal. Rollup! It's like the superhero of bundlers, making our lives easier with its simplicity and minimal configuration requirements. 


## Setting up Rollup

Let’s head straight to the terminal and install a bunch of packages that’ll help us roll-up (bundle) things.


```bash
npm i --save-dev rollup @babel/preset-env @babel/preset-react @babel/preset-typescript @rollup/plugin-babel @rollup/plugin-node-resolve rollup-plugin-typescript2 rollup-plugin-peer-deps-external rollup-plugin-postcss rollup-plugin-terser

```


Whoa, we've got quite the lineup of development tools here! But hey, more tools, less hassle, am I right? Now, while we're installing these bad boys, let me break it down for you and explain what each of these packages brings to the table. Brace yourselves for some tool-tastic knowledge!



1. **rollup** - This is the superstar of the show, the one and only bundler. It takes on multiple plugins like a champ to customize our bundling process. Go, rollup, go!
2. **@babel/preset-env, @babel/preset-react, @babel/preset-typescript** - These babel plugins are like secret agents, working behind the scenes to transpile our fancy ES6 code into good ol' ES5. They don't demand the spotlight, but trust me, a rollup plugin will give 'em their time to shine.
3. **@rollup/plugin-babel** - Ah, the dynamic duo of rollup and babel! This plugin brings them together in perfect harmony, making sure our bundling journey is as smooth as can be. Talk about teamwork!
4. **@rollup/plugin-node-resolve** - This plugin deserves a round of applause. Why, you ask? Well, it helps us include external dependencies that we use in our components. Think of it as the friendly neighbor who lets you borrow a cup of sugar. We even used it to snag the "contrast-color" package in our example. Thanks, plugin!
5. **rollup-plugin-typescript2** - Look at that name, it's a dead giveaway! This plugin is all about taking those TypeScript files and transforming them into good ol' JavaScript files. And hey, it even produces those fancy type definition files (*d.ts). Talk about multi-talented!
6. **rollup-plugin-peer-deps-external** - Now, here's a plugin that knows how to save space. It whispers sweet nothings to rollup, telling it not to include those libraries specified in peerDependencies in the final build. Who needs extra baggage, right?
7. **rollup-plugin-postcss** - This plugin is like the best friend of postcss. They stick together like glue, making sure our styles are properly handled during the bundling process. What a dynamic duo!
8. **rollup-plugin-terser** - Say hello to the bundle shrinker extraordinaire! This plugin swoops in and minifies our bundle, making it lean and mean. Because hey, who doesn't love a smaller bundle size?

And there you have it! Our magnificent team of development tools, ready to tackle the bundling world and make our lives easier.

Now it’s time to configure the rollup. We can do that by creating a file named **rollup.config.mjs**

Let’s start by importing all of our plugins,


```js
// rollup.config.mjs

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
```


We also need to import package.json here so that we can configure bundled file names.


```js
// rollup.config.mjs

// ... Other imports

import packageJson from "./package.json" assert { type: "json" };
```


A rollup configuration file should export an array by default. This array will contain the configuration


```js
// rollup.config.mjs

// ... Imports

export default [
 {
   input: "./src/index.ts",
   external: [
     "contrast-color"
   ],
   output: [
     {
       file: packageJson.main,
       format: "cjs",
     },
     {
       file: packageJson.module,
       format: "es",
       exports: "named",
     },
   ],
   plugins: [
     postcss({
       plugins: [],
       minimize: true,
     }),
     external(),
     resolve(),
     typescript(),
     babel({
       exclude: "node_modules/**",
       presets: ["@babel/preset-react"],
     }),
     terser(),
   ],
 },
];
```


Let me explain about this configuration,

First we specify what is the starting point of our library. Rollup will navigate to all the imports that are made in this file and bundle them together. Unused files will be removed from the bundle during tree-shaking.


```js
export default [
 {
   input: "./src/index.ts",
   ...
 }
];
```


Next we specify what are all the external packages that we are using. So that rollup bundle external packages too with our code.


```js
export default [
 {
   ...

   external: [
     "contrast-color"
   ],

   ...
 }
];
```


Then we specify what our output should look like. We can bundle in certain formats like ESM, CJS, UMD, etc. Here we will be producing both ESM and CJS.

Before we do that we need add couple more properties in the package.json


```json
// package.json

{
 ...

 "main": "dist/index.js",
 "module": "dist/index.es.js",

 ...
}
```


We are instructing Node to search for files specified with these names. The selection depends on the project utilizing the library. If the project follows the ESM approach, Node will choose the file specified in the "module" property. However, if it adheres to CJS, the "main" property will be selected.

Now we can add our output section in the rollup configuration.


```js
// rollup.config.mjs

export default [
 {
   ...

   output: [
     {
       file: packageJson.main,
       format: "cjs",
     },
     {
       file: packageJson.module,
       format: "es",
       exports: "named",
     },
   ],

   ...
];
```


And finally we put our plugins into the action,



```js
// rollup.config.mjs

export default [
 {
   ...

   plugins: [
     postcss({
       plugins: [],
       minimize: true,
     }),
     external(),
     resolve(),
     typescript(),
     babel({
       exclude: "node_modules/**",
       presets: ["@babel/preset-react"],
     }),
     terser(),
   ],

   ...
];
```


Note that order of plugins matters. Changing the order may result in breaking the bundling flow.

Let me explain the bundling process,



1. **postcss** - minimizes all the css and bundles them together
2. **external** - tells rollup that bundled listed external packages together
3. **resolve** - locates node_modules, traverse to all the dependencies with Node Resolution Algorithm and bundles them together with our app code
4. **typescript** - simple, compiles TypeScript to JavaScript
5. **babel** - converts ES6 and above to ES5, so that all the browsers understand the bundle
6. **terser** - minifies the bundle to save some bytes

The output will be an optimized bundle that can be published to any Node repositories like NPM.

Also let’s add a script to bundle our library.


```json
// package.json
 {
    ...

   "scripts": {
     ...
     "build-lib": "rm -rf ./dist && rollup -c"
     ...
    },
 }
```


Now running **npm run build-lib** in the terminal will remove the existing bundle from the dist/ directory and tell rollup to generate a new bundle.


## Let’s publish it!

Alrighty, let's talk about the wondrous world of NPM before we hit that publish button. NPM has a fancy registry, like a treasure trove of all the packages ever published. It's the place where the magic happens! When we install packages or go on dependency adventures, NPM uses this registry to do its thing, sorting everything out for us. Now, We're gonna bundle up our masterpiece into a neat little tarball, like a gift-wrapped bundle of joy. Then, we'll upload it to the NPM registry, along with some metadata about our creation. And voila! The registry takes over and handles the publishing process for us. It's like having a personal assistant for our package dreams.

We've got three main types on this rollercoaster of publishing fun:



1. **Public packages**: These bad boys are open to the world, free for all to publish and use. They're like the life of the party, perfect for all those open source projects that want to share the love. Party on!
2. **Private packages**: Now we're entering the exclusive zone, folks. These packages are like the VIP section of the registry, reserved for organizations or folks with some extra moolah. You gotta pay to play, and users need special access to enjoy the goods. It's all about that exclusive club vibe.
3. **Scoped packages**: Here's where things get a little fancy. Scoped packages can be either public or private, giving you the best of both worlds. They strut their stuff under a cool namespace, following the trendy @username/package-name pattern. It's like they have their own little corner of the registry, with a touch of personal flair.

I gave this package the hilarious name of **@djhemath/react-typescript-storybook-npm-component**. Quite the mouthful, right? Now, here's the scoop: this gem falls under the category of scoped packages. It's like a secret agent with its own fancy code name. But here's the catch: scoped packages are usually private by default, keeping things hush-hush. So, if we want to unleash this beauty to the world, we need to make it explicitly public during the publishing process. 

Before that, we have to modify our package.json

Add the following property that tells NPM where to look for published code.


```json
// package.json

{ 
  ...
  "files": [
    "dist"
  ],
  ...
}
```

### Before publishing...

Testing before releasing is an absolute must! We can't just blindly publish our package to NPM and hope for the best. It's like jumping off a cliff without checking if our parachute works. Yikes!

One thing we can do to test the installation is using the **npm link** command. From the root of our project run the following command,


```bash
npm link
```


Then create a new react test project. Create with CRA or however you want. Go in to the test project and install our newly built component by running the following command


```bash
npm link project-name
```


Replace “project-name” with our actual component library. Here it’s **@djhemath/react-typescript-storybook-npm-component**. And test our component(s) by using them in that project. If everything works good, we can rollout it to NPM.

To publish, an NPM account is required. Signup if you don’t already have an account. Then we need to login to NPM from our terminal first to publish our package. Go into the project root and run the following command.


```bash
npm login
```


It will open up the browser with a login page. Enter your credentials and log in. Once it’s done, you can close that page and come back to the terminal.

Run the following commands to build and publish the package.


```bash
npm run build-lib
npm publish --access public
```


Note the **--access public** flag. It tells NPM to publish our package as a public one. We have to add this flag because the type of this package is scoped. No need to do this if the package is public.

Here’s the complete package.json


```json
// package.json

{
 "name": "@djhemath/react-typescript-storybook-npm-component",
 "version": "1.0.1",
 "description": "A POC on developing and publishing TypeScript React component to NPM",
 "files": [
   "dist"
 ],
 "private": false,
 "main": "dist/index.js",
 "module": "dist/index.es.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "storybook": "storybook dev -p 6006",
   "build-storybook": "storybook build",
   "build-lib": "rm -rf ./dist && rollup -c"
 },
 "author": "DJ Hemath",
 "license": "ISC",
 "devDependencies": {
   "@babel/preset-env": "^7.22.7",
   "@babel/preset-react": "^7.22.5",
   "@babel/preset-typescript": "^7.22.5",
   "@rollup/plugin-babel": "^6.0.3",
   "@rollup/plugin-node-resolve": "^15.1.0",
   "@storybook/addon-essentials": "^7.0.26",
   "@storybook/addon-interactions": "^7.0.26",
   "@storybook/addon-links": "^7.0.26",
   "@storybook/blocks": "^7.0.26",
   "@storybook/react": "^7.0.26",
   "@storybook/react-webpack5": "^7.0.26",
   "@storybook/testing-library": "^0.0.14-next.2",
   "@types/contrast-color": "^1.0.0",
   "@types/react": "^18.2.14",
   "prop-types": "^15.8.1",
   "react": "^18.2.0",
   "react-dom": "^18.2.0",
   "rollup": "^3.26.2",
   "rollup-plugin-peer-deps-external": "^2.2.4",
   "rollup-plugin-postcss": "^4.0.2",
   "rollup-plugin-terser": "^7.0.2",
   "rollup-plugin-typescript2": "^0.35.0",
   "storybook": "^7.0.26",
   "tslib": "^2.6.0",
   "typescript": "^5.1.6"
 },
 "peerDependencies": {
   "react": "^18.2.0",
   "react-dom": "^18.2.0"
 },
 "dependencies": {
   "contrast-color": "^1.0.1"
 }
}
```



## Some Tips



Listen up, folks! I've got some tips to help you shine like a superstar when publishing your NPM React library. Are you ready? Here we go:

1. **Read Me, Love Me**: Your README.md is like the holy grail of documentation. Make it shine by documenting everything about your package in there. And hey, if you're feeling extra fancy, why not create a standalone website just for your package? Link it in your README.md and impress everyone with your dedication!
2. **Show Off with Demos**: React components without demos? That's a big no-no! Get those components strutting their stuff by hosting examples and demos. Whether it's through GH pages or tools like CodeSandbox, give your users a taste of what your package can do. It's like a red carpet event for your components!
3. **Version It Like a Boss**: When it comes to updating versions, be logical and use the npm version command like a pro. Don't let things get messy. Keep it organized and let your versions tell a story.
4. **Automate All the Things**: Why do things manually when you can automate? Set up some sweet automation using tools like Github Actions. It's like having your very own publishing assistant, handling things with ease.
5. **Scoped Names for the Win**: Don't be generic, be unique! Use scoped names whenever possible. That way, you won't be stepping on anyone's toes and you'll have your own special corner in the NPM universe.
6. **Package.json Descriptions that Pop**: Don't underestimate the power of a good description in your package.json. Make it snappy, informative, and enticing. Let your package's personality shine through!
7. **License Like a Boss**: Ah, licenses, the unsung heroes of the open-source world. Learn about them, understand them, and choose wisely. It's like picking the perfect outfit for your package's legal journey.


## Final thoughts

Let's have a little chat about this setup situation. I gotta be honest with you, it's not the smoothest ride out there. There are more manual steps involved than you can count. But fear not, folks! We live in the age of automation, where possibilities are as endless as a gazillion stars in the sky. So, yes, you can definitely automate this setup in a gazillion ways. The sky's the limit!

Now, here's the deal with this article. Its purpose is to give you a basic setup, a foundation to build upon. Think of it as a starter pack, providing an overall knowledge on publishing a glorious React component library. Trust me, I've been there too. It can be a bit daunting to navigate the vast sea of internet resources when it comes to publishing. That's why I took it upon myself to simplify things, to break it down in a way that even your grandma's pet goldfish could understand. So, I hope this article was a breath of fresh air, a guiding light in the darkness of publishing confusion. May it bring you clarity and make your publishing journey a tad less bumpy. Cheers to simpler days and smoother publishing adventures!

Github - [https://github.com/djhemath/react-typescript-storybook-npm-component](https://github.com/djhemath/react-typescript-storybook-npm-component)

NPM - [https://www.npmjs.com/package/@djhemath/react-typescript-storybook-npm-component](https://www.npmjs.com/package/@djhemath/react-typescript-storybook-npm-component)
