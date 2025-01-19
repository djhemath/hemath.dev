---
title: Introduction to WebAssembly
date: '2025-01-20T09:10:00.000Z'
draft: false
type: blog
excerpt: Learn what WebAssembly (WASM) is and how it brings near-native performance to web apps. This post covers its basics, use cases, and how it complements JavaScript. Discover why WASM is transforming modern web development.
keywords:
- WebAssembly introduction
- WASM guide
- WebAssembly vs JavaScript
- WebAssembly use cases
- WebAssembly tutorial
- WebAssembly simplified
og_image: https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fog-introduction-to-webassembly.png?alt=media&token=8fb9122b-99e1-44c1-b5c8-179444b458fc
---

Hey makkals,

This post is a part of a multi-part series on WebAssembly. Check out other parts of the series [here](/blog/webassembly/webassembly-a-beginners-guide)

WebAssembly, or WASM for short, is a low-level assembly-like language. It lets us run applications built with different programming languages in the browser. It's a truly cross-platform way to build applications. It is low-level so that it runs at near-native speed enabling us to do a lot more on the web that weren't possible with just JavaScript.

If you've ever wished your web apps could run faster or handle tasks that seem too heavy for JavaScript, WebAssembly is here to help. In this post, we'll break down what WebAssembly is, why it was created, and how you can start using it.


## What is WebAssembly actually?
WebAssembly is a low-level compilation target. It is designed to run in web browsers. It's not something that lets you directly run other languages. Instead, it specifies an assembly language-like structure which other languages can **compile-to**, thus the term "compilation target".

Let's understand this by a simple example,

```C
int a = 1;
int b = 2;
int c = a + b;
```

The above C code produces the following Assembly instructions (or machine code),

```asm
mov eax, 1    ; Load 1 into register EAX
mov ebx, 2    ; Load 2 into register EBX
add eax, ebx  ; Add EAX and EBX, result in EAX
```

This in-turn produces following binary,

```txt
00000000000000000000000000000011
```

> NOTE: The above output varies on the CPU architecture. It's just a simple example that helps you understand the idea.

![](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fc-compilation-binary.png?alt=media&token=1c3ce3b5-f965-4685-a8fc-1eacc759cd18)

We can see that the C code is transformed into Assembly code and further into binary. The binary is something that can be executed directly by the computer.


Now, let's alter this process a little bit. Instead of the C compiler producing standard Assembly code, let's say it produces something like this,

```asm
$a int
$b int
$c int

set $a 1
set $b 2
set $c = add $a $b
```

> NOTE: This is a made up syntax to let you understand the idea easily. It's not a standard syntax for anything in the world of WASM. We will see the actual syntax of WASM in this post later.

![](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fc-compilation-wasm.png?alt=media&token=d2c7201f-b887-44bc-8d7f-e9dd1df2620f)

Assume that all browsers (Chrome, Firefox, Safari, etc.) understand and execute the above syntax. Then this opens up a wide-variety of opportunities for us on the web.

Because like the C language, we can write compilers for other potential languages like C++, Rust, Go, etc., that produce the above output for the respective code. It means that we can basically run programs written in any language in any browser no matter what type of OS is, or what browser it is, we should be able to run anything in the browser. And this is so cool!

Since all the browsers are built by separate teams in separate tech stack, we need a specification that defines how WASM should be treated. That specification is called WebAssembly and it is defined by W3C. And already all major browsers support WebAssembly natively. It means, today, we can run applications written in many programming languages inside a web browser.


## WebAssembly representation
WebAssembly can be represented in 2 formats,

- **WAT** - WebAssembly Text, it's a textual format designed to help us debug and understand the code
- **WASM** - WebAssembly module is a binary format that browser uses to execute the instructions

Both are one-to-one representations of each other. It means that we can convert WAT to WASM and WASM to WAT. So compiling from a language to either WASM or WAT is possible, and we can obtain one from another.

Now, let's understand the very basic syntax with our above example,

1. The following piece of code declares three **32-bit integer** variables - `a`, `b` and `c`
```asm
(local $a i32)
(local $b i32)
(local $c i32)
```

2. Let's assign some values to these variables,
```asm
i32.const 1
set_local $a 

i32.const 2
set_local $b
```

3. Let's add `a` and `b`, and store it in `c`,
```asm
get_local $a
get_local $b

i32.add

set_local $c
```

If you don't understand the syntax intuitively, it's okay. WebAssembly is designed to run in a stack-machine. We will see more about stack machines in future posts. But for now, understand that a stack machine puts and pops instructions based on the instruction type.

So when we do, `get_local $a` and `get_local $b`, we are pushing both of them into the stack. And the instruction `i32.add` tells the browser to,
- add the top 2 numbers in the stack 
- pop them out
- keep the result of addition in the stack (in our example, it's the number 3)

And the `set_local $c` tells it to store whatever the value is in top of the stack to the variable `$c`.

This is the textual representation (WAT) representation of the code. When transpiled into WASM, it looks like this:

```txt
0x20 0x00    ;; get_local $a
0x20 0x01    ;; get_local $b
0x6A             ;; i32.add
0x21 0x02    ;; set_local $c
```

Don't worry if these representations seem complex. WebAssembly is designed as a compilation target, not a language you need to write directly.

This is a compilation-target, not a programming language per se. Almost all the time we will write code in programming languages like C, C++, Rust, etc., and compile it into this representation.

## Will WebAssembly replace JavaScript?
**Short answer: No**, at least not anytime soon. WASM is designed to work along with JavaScript, not to replace it. JavaScript and WebAssembly complement each other.

JavaScript was originally created for basic web operations like DOM manipulation and form validation. In the past decades, we wanted more from JavaScript and made it do certain things that it isn't designed for. The result is poor performance on complex applications. Since JavaScript is interpreted it is relatively slow compared to other compiled languages. However, modern web browsers have a JIT compiler which improves performance of JavaScript applications.

I might probably write a blog post about the JIT compiler soon. But before that you can follow one of my favorite blog posts on the topic - https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers

Even with JIT compilers, JavaScript can only do so much. That's where WebAssembly comes into the picture.

Let's say we want to process video files. Video files are generally large, and doing some operations with it like optimizing, editing, different codecs, etc., are very data intensive operations. Since JavaScript is interpreted and JIT compiled at its best, it cannot deliver native performance.

But with WebAssembly, we can achieve **near-native** performance since the code is pre-compiled and close to machine code, the execution will be pretty fast. So WebAssembly is just a new gym-rat friend for JavaScript. WebAssembly can do the heavy-lifting CPU intensive tasks very well while JavaScript can do the tasks (DOM manipulations, handling events) it was supposed to do.

## Use cases of WebAssembly
WebAssembly's near-native performance makes it ideal for computationally intensive applications.

Some of the use cases are,
1. Image processing
2. Video processing
3. Games - even 3d games
4. Music applications
5. Encryption and other cryptographic solutions
6. Visualization tools
7. Simulators and emulators
8. And existing applications like AutoCAD, etc.,

There are some applications that are already using WebAssembly are,
1. Figma - https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/
2. Amazon Prime - https://www.amazon.science/blog/how-prime-video-updates-its-app-for-more-than-8-000-device-types
3. Google Earth - https://madewithwebassembly.com/showcase/google-earth/
4. Autodesk - https://forums.autodesk.com/t5/engineering-hub-blog/autodesk-open-sources-web-based-usd-viewing-implementation/ba-p/11071751
5. and many more..

You could and most probably will build WebAssembly applications in the near future.

## WebAssembly - beyond the browser
WebAssembly was initially designed as a binary instruction format for executing native code efficiently within web browsers. However, its potential extends far beyond the browser.

Yes, you read it right. There is another project that was built with WASM as the basis known as WASI (WebAssembly System Interface). It is a group of standards API specifications for softwares that compile to the WASM standard.

We can build cross-platform applications and produce a single binary. Previously if we wanted to build a cross-platform application we had to build binaries for all the platforms and architectures (x86, arm, etc.,) that we needed to support. Or, we have a choice to use Java's virtual machine. By using Java, we are constrained within the Java ecosystem.

But WASI enables us to write code in any language, build a single binary file and just ship it! WASI runtimes are built for other platforms and architectures, so that we don't have to produce binaries for every platform and architecture combination.

It's so great that even Docker's founder posted a tweet saying that if WASI was invented in 2008, there is no need for Docker to be created in the first place.

Take a look at the tweet - https://x.com/solomonstre/status/1111004913222324225

We will look more about WASI in the upcoming posts.

## Before WebAssembly
Before WebAssembly was invented there were multiple projects that focused on running other programming languages on the web. Some of them were successful to a point, while others failed. WebAssembly was designed to address the limitations of these projects while providing a standardized solution.

Some of those old projects are,
1. **Microsoft's ActiveX** - allowed embedding native code in Internet explorer, but there were some major security vulnerabilities
2. **Java Applet's** - Let the Java bytecode run in the browser, but it is required to install Java plugin in browsers. It also possessed some degree of security issues.
3. **Adobe's Flash** - It was a big hit and many people used it. It also came in the form of a plugin. It was a proprietary technology controlled by Adobe which had lack of standards and led to its decline
4. **Google's Native client (NaCl)** - Above 3 faced performance issues, while NaCl allowed near-native performances and supported multiple architectures. But it was limited to Chrome browsers and failed to gain wide adoption.
5. **Firefox's asm.js** - Firefox's effort to bring near-native performance to the web. It can be said that it's a direct successor of today's WASM. asm.js is also specified as a compilation target and compiled to a low-level, statically typed JavaScript. It enabled JIT compilers to execute fast as it was statically typed. But it was still slower than native code and produced large code sizes.
6. **Google's Dart** - Dart could be compiled to JavaScript or run natively in the Dart VM. But it never gained support in other browsers.
7. And some more like Silverlight, etc.,

All of these failed at some point mainly because of the lack of standards and poor performances in some cases. WebAssembly was designed to solve these problems by being **standard**, **portable**, **secure**, **performant** and **extensible**.

The fact that it was adopted as a W3C standard made all major browsers to support it natively. Previously independent companies came up with solutions and tried to integrate with their own browsers and hoped other browsers would implement. But almost all of them failed. By adopting WebAssembly as a W3C standard made it clear that all major browsers will support it.


## Conclusion and next steps
That's it for this post. This post aimed to provide a high-level understanding of what WASM is and its capabilities. In the upcoming posts, we will dive deep into more topics and build some projects in WebAssembly.


Read the next post in this series - [Build your first Webassembly project](/blog/webassembly/build-your-first-webassembly-project)