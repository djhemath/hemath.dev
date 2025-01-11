---
title: Introduction to WebAssembly
date: '2025-01-14T09:00:00.000Z'
draft: true
type: blog
excerpt: EXCERPT NEED TO BE WRITTEN
---

WebAssembly, or WASM for short, is a low-level assembly-like language. It lets us run applications built with different programming languages in browser. It's a truly cross-platform way to build applications. It is low-level so that it runs at near-native speed enabling us do a lot more in web that were'nt possible with just JavaScript.

If you’ve ever wished your web apps could run faster or handle tasks that seem too heavy for JavaScript, then WebAssembly is here to help. In this post, we’ll break down what WebAssembly is, why it was created, and how you can start using it.


## What actually WebAssembly is?
WebAssembly is a low-level compilation target. It is designed to run in web browsers. It's not something that let's you directly run other languages. Instead, it specifies a assembly language like structure which other languages can compile to, thus the term "compilation target".

Lets understand this by a simple example,

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

> NOTE: The above outputs varies on the CPU architecture. It's just a simple example that helps you understand the idea.

![](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fc-compilation-binary.png?alt=media&token=99753eb0-168b-49c3-806a-ba36e0f355c5)

We can see that the C code is transformed into Assmebly code and further into binary. The binary is something that can be executed direcly by the computer.


Now, let's alter this process a little bit. Instead of the C compiler producing standard Assembly code, lets say it produces something like this,

```asm
$a int
$b int
$c int

set $a 1
set $b 2
set $c = add $a $b
```

> NOTE: This is a made up syntax to let you understand the idea easily. It's not a standard syntax for anything in the world of WASM. We will see the actual syntax of WASM in this post later.

![](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fc-compilation-wasm.png?alt=media&token=eb1078fd-3071-4601-aed7-4a30a2aa5a60)

Assume that every browsers (Chrome, Firefox, Safari, etc.,) understand the above syntax and execute them. Then this opens up a wide-variety of oppurtunities for us in the web.

Because like C language, we can write compilers for other potential languages like C++, Rust, Go, etc., that produce above output for the respective code. It means that we can basically run programs written in any languages in any browsers no matter what type of OS is, or the what browser it is, we should be able to run anything in the browser. And this is so cool!

Since all the browsers are built by separate teams in separate tech stack, we need a specification that defines how WASM should be treated. That specification is called WebAssembly and it is defined by W3C. And already all major browsers support WebAssembly natively. It means, today, we can run applications written in many programming languages inside a web browser.


## WebAssembly representation
WebAssembly can be representated in 2 formats,

- **WAT** - WebAssembly Text, its a textual format designed to help us debug and understand the code
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

If you don't understand the syntax intuitively, its okay. WebAssembly is designed to run in a stack-machine. We will see more about stack machine in future posts. But for now, understand that stack machine puts and pops instructions based on the instruction type.

So when we do, `get_local $a` and `get_local $b`, we are pushing both of them into the stack. And the instruction `i32.add` tells the browser to,
- add the top 2 numbers in the stack 
- pop them out
- keep the result of addition in the stack (in our example, it's the number 3)

And the `set_local $c` tells to store whatever the value is in top of the stack to the variable `$c`.

> NOTE: There is actually even more stuff happen behind the scenes. We will see about them later in this series.

This is the textual representation (WAT) representation of the code. If this is transpiled into WASM, it'll look like following,

```txt
0x20 0x00    ;; get_local $a
0x20 0x01    ;; get_local $b
0x6A             ;; i32.add
0x21 0x02    ;; set_local $c
```

It's totally okay if you don't understand these representations. I, myself, don't know the full syntax of WebAssembly.

This is a compilation-target not, a programming language per se. Almost all the time we will write code in programming languages like C, C++, Rust, etc., and compile it into this representation.

## Will WebAssembly replace JavaScript?
**Short answer: No**, at least not anytime soon. WASM is designed to work along with JavaScript, not to replace it. JavaScript and WebAssembly complement each other.

JavaScript is created to do basic operations in web such as DOM manipulation and form validations. In the past decades, we wanted more from JavaScript and made it do certain things that it is designed for. The result is poor performance on complex applications. Since JavaScript is interpreted it is relatively slow compared to other compiled languages. However, modern web browsers have a JIT compiler which improves performance of JavaScript applications.

I might probably write a blog post JIT compiler soon. But before that you can follow one of my favorite blog post on the topic - https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers

Even with JIT compilers, the JavaScript can only do so much. That's where WebAssembly comes into the picture.

Lets say we want to process video files. Video files are generally large, and doing some operations with it like optimizing, editing, different codecs, etc., are very data intensive operations. Since JavaScript is interpreted and JIT compiled at its best, it cannot deliver native performance.

But with WebAssembly, we can achieve **near-native** performace since the code is pre-compiled and close to machine code, the execution will be pretty fast. So WebAssembly is just a new gym-rat friend for JavaScript. WebAssembly can do the heavy-lifting CPU intensive tasks very well while JavaScript can do the tasks (DOM manipulations) it was supposed to do.

## Use cases of WebAssembly
Since WebAssembly runs at near-native speed, it can be used to build computationally intensive applications.

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

You could and most probably will build WebAssembly applications in near future.

## WebAssembly - beyond the browser
WebAssembly was initially designed as a binary instruction format for executing native code efficiently within web browsers. However, its potential extends far beyond the browser.

Yes, you read it right. You're eyes are good. There is another project that built with WASM as basis known as WASI (WebAssembly System Interface). It is a group of standards API specifications for softwares that compiled to WASM standard.

We can build cross-platform applications and produce a single binary. Previously if we wanted to build a cross-platform application we have to build binaries for all the platforms and architectures (x86, arm, etc.,) that we need to support. Or, we have a choice to use Java's virtual machine. By using Java, we are constrained within Java ecosystem.

But WASI enables us to write code in any languages, build a single binary file and just ship it! WASI runtimes are built for other platforms and architectures, so that we don't have to produce each binaries for every platform and architecture combinations.

It's so much great that, even Docker's founder posted a tweet saying that if WASI was invented in 2008, there is no need for Docker needed to be created in the first place.

Take a look at the tweet - https://x.com/solomonstre/status/1111004913222324225

We will look more about WASI in the upcoming posts.

## Before WebAssembly
Before WebAssembly was invented there were multiple projects that focused on running other programming languages on the web. Some of them was successful to a point, while others failed. WebAssembly was designed based to solve the problems faced by all these projects and standardized it.

Some of those old projects are,
1. **Microsoft's ActiveX** - allowed embedding native code in Internet explorer, but there were some major security vulnerabilities
2. **Java Applets** - Let the Java bytecode run in the browser, but it required to install Java plugin in browsers. It also possesed some degree of security issues.
3. **Adobe's Flash** - It was a big hit and many people used it. It also came in the form of plugin. It was a proprietary technology controlled by Adobe which had lack of standards and led to it's decline
4. **Google's Native client (NaCl)** - Above 3 faced performance issues, while NaCl allowed near-native performances and supported multiple architectures. But it was limited to Chrome browsers and failed to gain wide adoption.
5. **Firefox's asm.js** - Firefox's effort to bring near-native performance to the web. It can be said that it's a direct successor of today's WASM. asm.js is also specified a compilation target and compiled to a low-level, statically typed JavaScript. It enabled JIT compilers to execute fast as it was statically typed. But it was still slower than native code and produced large code sizes.
6. **Google's Dart** - Dart could be compiled to JavaScript or run natively in the Dart VM. But it never gained support in other browsers.
7. And some more like Silverlight.

All of these failed at some point mainly because of the lack of standards and poor performances in some cases. WebAssembly was designed to be solve these problems by being **standard**, **portable**, **secure**, **performant** and **extensible**.

The fact that it was adopted as a W3C standard made all major browsers to support it natively. Previously independed companies came up with solutions and tried to integrate with their own browsers and hoped other browsers would implement. But almost all of them. By adopting WebAssembly as a W3C made it clear that all major browsers will support it.


## Conclusion and next steps
That's it for this post. The goal was to understand what WASM is and what it is capable of doing at high-level. In the upcoming posts, we will dive deep into more topics.