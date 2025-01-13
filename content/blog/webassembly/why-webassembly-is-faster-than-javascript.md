---
title: Why WebAssembly is faster than JavaScript
date: '2025-01-15T09:00:00.000Z'
draft: true
type: blog
excerpt: Discover why WebAssembly often outperforms JavaScript and how it achieves faster execution by leveraging its design advantages.
---

Alright, you might now be wondering why exactly WebAssembly is faster than JavaScript. And that's the question we are gonna answer in this post.

## How is JavaScript executed?
Before we can understand how WebAssembly is faster, we need to understand how JavaScript is executed under the hood. Take a look at the following diagram.

![Steps involved in the execution of JavaScript](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fjs-execution.png?alt=media&token=29d8797c-f2ad-4444-b8a7-ec004d49b29e)

The above chart explains the steps involved in executing JavaScript code. Each bar represents the relative time taken between each process.

> NOTE: This is not an exact representation. It differs from browser to browser and the amount of JavaScript loaded in the page
> But it gives a high-level idea about all the steps involved.


Each bar represents time taken for each step:
### Parsing
Parsing is the process of converting text JavaScript code into an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree). This step takes place after the JavaScript is downloaded by the browser. Representing the JavaScript code as an AST tree helps the interpreter to execute the JavaScript code.

### Compiling + optimizing
Modern browsers these days have a just-in-time compiler that compiles JavaScript. It's not technically a static compilation like it's done on C and other compiled languages. Instead the compiler assumes the types of parameters and returns types based on the usage. It then compiles it and keeps it in the memory for reuse. It results in a better optimized execution

### Re-optimizing
However these assumptions are not always right. Sometimes a function can get/return different value types. In such cases, the JIT compiler throws away the existing optimized version and re-compiles it.

### Execution
Execution is step where the JavaScript code is converted to executable instructions followed by executing the code line by line

### Garbage collection
In this step, unused memory will be cleaned up by the built-in garbage collector. This adds an extra bit of overhead to the JavaScript's execution since the garbage collector keeps checking what memory objects need to be cleaned up.

## How is WebAssembly executed?
After downloading the WASM file, it goes through only 3 steps instead of 5 steps.

![Steps involved in the execution of WebAssembly](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fwasm-execution.png?alt=media&token=b82b650d-dbea-4a51-9970-ec66c995c326)

### Decode
Similar to parsing JavaScript. But WASM doesn't need to be converted into any structures. So after decoding, the integrity of the module is validated. After the validation, the WASM is ready to be executed.

### Compiling + optimizing
WebAssembly code starts off much closer to the machine code. So compiling and optimizing WebAssembly is quicker than JavaScript. Since it is statically typed, the compiler doesn't need to spend time running the code to observe the usage of types.

Moreover, many optimizations are already done in the build step. So less work is needed to compile and optimize it.

### Execution
Since compilers already produced the set of instructions, execution is a lot faster than JavaScript.


## Conclusion
referred from [Lin Clark's post](https://hacks.mozilla.org/2017/02/what-makes-webassembly-fast/)

WebAssembly is faster than JavaScript in many cases because:

- **fetching** WebAssembly takes less time because it is more compact than JavaScript, even when compressed.
- **decoding** WebAssembly takes less time than parsing JavaScript.
- **compiling** and optimizing takes less time because WebAssembly is closer to machine code than JavaScript and already has gone through optimization on the server side.
- **re-optimizing** doesn’t need to happen because WebAssembly has types and other information built in, so the JS engine doesn’t need to speculate when it optimizes the way it does with JavaScript.
- **executing** often takes less time because there are fewer compiler tricks and gotchas that the developer needs to know to write consistently performant code, plus WebAssembly’s set of instructions are more ideal for machines.
- **garbage collection** is not required since the memory is managed manually.

And, This is why, in many cases, WebAssembly will outperform JavaScript when doing the same task.


