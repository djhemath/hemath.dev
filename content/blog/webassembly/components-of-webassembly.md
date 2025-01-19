---
title: Components of WebAssembly
date: '2025-01-23T09:00:00.000Z'
draft: false
draft: true
type: blog
excerpt: Explore the core components of WebAssembly, including modules, execution environments, and memory models. This post simplifies complex concepts with clear examples, helping you understand how WebAssembly works.
keywords:
- WebAssembly architecture
- WebAssembly components
- WebAssembly stack machine
- WebAssembly memory model
- WebAssembly tables explained
- WebAssembly beginner guide
og_image: https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fog-components-of-webassembly.png?alt=media&token=9101bbf9-6f4c-4170-a589-b0752144c4b6
---

Hey makkals,

This post is a part of a multi-part series on WebAssembly. Check out other parts of the series [here](/blog/webassembly/webassembly-a-beginners-guide)

Now that we have a good idea about what WebAssembly is, it's time to understand the architecture that powers such a technology. WebAssembly comprises the following key components,
1. Module
2. Execution environment
3. Stack machine
4. Memory
5. Tables

## WebAssembly Module
A WebAssembly module is a compiled unit of code that contains functions, memory, tables and other resources required for running a piece of code. Each module is self-contained and can be instantiated independently.

A module is essentially a file with the `.wasm` extension.

Modules can import and export functions and memory. This enables modular programming and seamless integration with other web technologies.

## WebAssembly Execution Environment
WebAssembly relies on a sandboxed execution environment. It ensures secure and isolated code execution. This sandboxed environment is embedded within a host. The great thing about this is that a host can be a browser or NodeJS environment. 

This sandboxed environment ensures security by restricting access to the host system. WebAssembly environments are closed by default. If a resource needs to be accessed, it should be explicitly requested.

The execution environment includes a WebAssembly runtime, which is responsible for,
1. Loading modules
2. Verifying modules
3. Managing memory
4. Executing instructions

## Stack machine
WebAssembly operates as a stack-based virtual machine. All the instructions are executed by this virtual machine. It uses stack data structure to manage data and the control flow during the execution.

A stack machine uses a stack data structure where instructions are pushed and popped during execution. Let's take a look at a simple example,

```asm
(
    func $add(param $a i32) (param $b i32) (result i32)
        local.get $a
        local.get $b

        i32.add
)
```

The above example does the following,
1. Defines a function named `add`
2. The function takes 2 integers of 32-bits as parameter - `a` and `b`
3. Adds `a` and `b`
4. Returns the value of addition as a 32-bit integer

The stack machine executes the instructions in the following order,
1. Initially the stack is empty
2. Put the value of `$a` in the stack
3. Put the value of `$b` in the stack
4. Pop both `$a` and `$b`, perform 32-bit integer addition operation
5. Put the result in the stack

And whatever is left in the stack is the return value of the function.

![WebAssembly stack machine](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fwebassembly-stack-machine.png?alt=media&token=21aa097d-3423-4d59-b0d5-1a81cd676a8d)


## Memory
One of the essential components that makes WebAssembly interoperable is its memory model. WebAssembly follows a [linear memory model](https://en.wikipedia.org/wiki/Flat_memory_model). It is a contiguous, growable array of bytes. It is a one-dimensional array used for storing data. This is the HEAP memory for WebAssembly programs.

![WebAssembly linear memory](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fwebassembly-linear-memory.png?alt=media&token=84b94342-f70e-46ef-9c37-e7b1f8e62059)

It is indexed using byte offsets. It allows direct access to specific locations.

For example: Let's say we store two 8-bit numbers (say 10 and 16) in the memory. Since 8 bits equal 1 byte, the addresses of the numbers will be as follows,

- 10 - address 0
- 16 - address 1

![WebAssembly linear memory example](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fwebassembly-linear-memory-example.png?alt=media&token=5cdfb82e-a3f3-414c-882b-c49f8f0d0f16)

Both of these integers necessarily need not to be exactly right next to each other. They can be in any location within the memory. But they can be accessed with the offset.

There can be any bits of data defined in the memory. It all comes down to the type of view we read the data.

It is not good to read a memory in an 8-bit view when the data defined are in 32-bit. It will produce unnecessary results. So it is better to stick with one view of memory to avoid unnecessary conflicts.


In JavaScript, we can access the memory with [WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Memory) interface. To define a piece of memory from JavaScript, we can instantiate the Memory class like following,

```js
const memory = new WebAssembly.Memory({
  initial: 10,
  maximum: 100,
});
```

The above code provisions 10 pages of memory. Generally in WebAssembly, **1 page** of memory equals **64kB**. In the above example, we provision `64 x 10 = 640kB` of memory as minimum. Since the memory can be grown as needed, the maximum set is `64 x 100 = 6.4mB` of memory.

We can also create [shared memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format#shared_memories) with JavaScript. By creating a shared memory, we can allow multiple threads to access and manipulate the same memory.

The easiest way to set or get a value from WASM memory is to use two runtime methods you can export during compilation,
- `setValue(ptr, value, type)`
- `getValue(ptr, type)`

Let's see a simple example to understand the usage of memory from JavaScript to C. I borrowed this example from one of my favourite [resource](https://marcoselvatici.github.io/WASM_tutorial/).

```c
void addOne(int* input_ptr, int* output_ptr){
	*output_ptr = (*input_ptr) + 1;
}
```

In the above code, the function `addOne` receives two pointers. It then gets whatever the value in the `input_ptr` and adds 1 to it. And it sets the resultant value to another pointer named `output_ptr`.


In JavaScript,

```js
var addOne = Module.cwrap("addOne", null, ["number", "number"]);

function main(){
	// alloc 4 bytes of memory for the input and 4 for the output (32-bit integers)
	var input_ptr = Module._malloc(4);
	var output_ptr = Module._malloc(4);
    
	var value = 6;

    // set the value in WASM memory
	Module.setValue(input_ptr, value, "i32");

    // call the WASM function
	addOne(input_ptr, output_ptr);

    // extract the result from WASM memory
	var result = Module.getValue(output_ptr, "i32");

	console.log("The result read is", result, "at position", output_ptr);
    
	// deallocate memory to avoid memory leaks
	Module._free(input_ptr);
	Module._free(output_ptr);
}

main()
```

The above code does,
1. Allocate two new memory locations in the heap and get pointers to them (`malloc`).
2. Set the value of the input writing directly to that memory position (`setValue`).
3. Call the C function to perform our calculation.
4. Access the output value stored in the memory (`getValue`).
5. Free the memory in the heap (`free`).

Note that we are explicitly de-allocating the memory at the end using the `free` method. Even though JavaScript has a garbage collector, C doesn't have one. So anytime we allocate something, we have to remember to de-allocate it.

Also, memory always needs not to be imported from JavaScript. A WebAssembly module can define its own memory. The syntax is different for each language.

## Tables
WebAssembly tables are a separate memory segment (not included in the memory we discussed above) that stores the references to functions in WASM. It enables dynamic function calls.

Dynamic function calls means invoking a function indirectly through a reference or index stored in a table, instead of calling it directly by name or address. In WebAssembly, this is achieved using tables and the `call_indirect` instruction.

This enables calling functions in runtime without knowing the function beforehand. We don't need to know the exact function name. All we need is the memory address or the index of the function in the WASM table.

For example, let's say we are building a game. The game lets users modify skins of characters and objects.

In this case, users can download any skin and add to the game. We will never know what all the functions are inside the new skin plugin. But our game engine should be able to call the necessary functions. This is where tables help us.

Let's say our game expects three skin methods,
- head() - to get the details of head like shape, color, eye color, etc.,
- hands() - to get the information related to hands
- shoes() - to get the information related to shoes

Our game instead of calling these functions with names, it instead calls with index. And our game expects that the shader or skin plugin stores the respective functions in the specified order in WASM tables.

Example, our game expects code related to,
- head in the index 0
- hands in the index 1
- shoes in the index 2


Now the plugin can define any number of functions. It doesn't matter what the names of these functions are. But there should be a proper WASM table implemented in the same order.

Then our original game can blindly call these functions via reference via index and things should work seamlessly.

![WebAssembly tables example](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fwebassembly%2Fwebassembly-tables-example.png?alt=media&token=def28306-4142-4795-8d1f-4cf4c9a54e49)


## Conclusion
That is the high-level information about the major components of WebAssembly. Note that this is a beginner guide, so the examples and the definition are intentionally kept simple. We can do much more with these components which are all not mentioned here.

There are a lot of resources out there on the internet about these individual components in detail.

Some of my favourite ones are,
- [WASM tutorial](https://marcoselvatici.github.io/WASM_tutorial/) by Marco Selvatici
- MDN's WebAssembly [documentation](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WASM by example](https://wasmbyexample.dev/home.en-us.html)

So far, we’ve covered the foundational theory of WebAssembly. Now it's time to build some projects with real values.

