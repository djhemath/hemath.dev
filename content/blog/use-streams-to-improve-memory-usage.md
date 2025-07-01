---
title: Use Streams to improve memory usage
date: '2025-04-22T18:00:00.000Z'
draft: false
type: blog
excerpt: Most people load entire files into memory and call it a script. But real-world data doesn’t wait, it flows. That’s where streams shine.
categories: ["Engineering"]
table_of_contents: false
---

Let's say you're writing a Node JS script to clean up some log files.  Maybe it’s part of an internal tool. You want to read each line, remove the timestamp, and save the cleaned file somewhere else. Easy, right?

So you write,

```js
const fs = require('fs');

const data = fs.readFileSync('./logs/2025-04-23.log', 'utf8');

const cleaned = data
  .split('\n')
  .map(line => line.replace(/^\[\d{2}:\d{2}:\d{2}\]/, '').trim())
  .join('\n');

fs.writeFileSync('./cleaned/2024-05-01.log', cleaned);
```

This works for small log files. But let's say you want to process a 2GB log file. This time your script won't just slow down, it will crash. If you have a powerful computer, it'll startup a jet engine for sure.

## Why this fails?
Well Node JS just does what you told it to. You asked it read a file using `readFileSync`. After loading the file, you asked it to split it to multiple lines, do some cleanup and write the file back to your hard disk.

The `readFileSync` basically copies the whole file from the Hard disk and puts in the RAM. So if you have less RAM, it'll be very hard for your OS to accept such a big file into the RAM.
![Picture of Activity monitor showing too much usage of RAM by a NodeJS script](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fstreams%2Fstream%20more%20memory-min.png?alt=media&token=294d8d30-2b7c-4f12-bb3c-07dfda8fec4d)


So the script takes a lot of time to load the file into RAM, loops through all the content one-by-one and write the whole file back to hard disk. And that's why it either hangs or crashes.

## How can we fix this?
Node JS got that unsexy "meh I’ll deal with that later" feature called **[Streams](https://nodejs.org/api/stream.html)**. I know, the docs look cryptic and horrifying. It got so many classes and functions to deal with. But trust me, everything is easy once you understand the basic idea behind Streams. Let me explain Stream as simple as I could.

### Streams
A stream is a way to handle data piece by piece, instead of all at once. Instead of waiting for everything to load before you start working with it, a stream lets you start processing as soon as the first chunk arrives.

> A stream can be thought of as items on a conveyor belt being processed one at a time rather than in large batches.
>
> -- [Streams @ Wikipedia](https://en.wikipedia.org/wiki/Stream_(computing))

The basic idea is that, you don't wait for everything to be there. You will operate on whatever you get in the moment and wait for other. In real life, mostly, we don't want to do repeated things as they come. Instead we gather similar works together and batch them and do it together. But when it comes to computer, it will be inefficient to keep the computer idle to load all the things before processing.

![Streams](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fstreams%2Fstreams-min.png?alt=media&token=67d2a0fb-b868-4af0-a1e3-f9c5edb833a1)

So let's rewrite our script which makes use of Streams.


```js
const readStream = fs.createReadStream('./logs/2025-04-23.log');
```

Instead of `readFileSync`, we use `createReadStream`. This basically creates a pipe which reads one little chunk of data at a time. It doesn't load the entire file like `readFileSync`.


Now that we're streaming, we need a way to process lines as they come in. Node gives us a built-in module for that called `readline`.

```js
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});
```

We pass in the `readStream` to get an interface to work with. For now, just know that this readline interface fires some events related to reading our file.

One such event is `line`. This event is fired whenever the readStream completes reading a line. We can capture that event by attaching an event handler like follows,

```js
rl.on('line', (line) => {
  //   Do something with line
});
```

This event will be fired for every line of the file which we are reading. We can do anything with these lines. As per our example, let's clean up the log.

```js
rl.on('line', (line) => {
  const cleaned = line.replace(/^\[\d{2}:\d{2}:\d{2}\]/, '').trim();
});
```

Now that we were able to read the big file with streams, we now need to write in the same way. Again, if we store all the data in an array and write it at the end, it'll still accumulate the whole 2GB of space in the RAM. So we need to write the data as soon as we process it.

To write chunks of data in streams, we need one more stream. This time it's a write stream. Let's start by creating one.

```js
const writeStream = fs.createWriteStream('./cleaned/2025-04-23.log');
```

And to write, it's easy, just call `write` method. Let's write the data which we cleaned up in `line` event handler.

```js
rl.on('line', (line) => {
  const cleaned = line.replace(/^\[\d{2}:\d{2}:\d{2}\]/, '').trim();
  writeStream.write(cleaned + '\n');
});
```

Note that each of these streams are I/O resources. So we should close them after completing our task. Luckily, `readline` gives us an event to do that as well.

```js
rl.on('close', () => {
  writeStream.end();
});

```

You might wonder why I didn't close the `readStream`. The `readline` module automatically closes the read stream for us.

Putting it all together,
```js
const fs = require('fs');
const readline = require('readline');

const readStream = fs.createReadStream('./logs/2025-04-23.log');
const writeStream = fs.createWriteStream('./cleaned/2025-04-23.log');

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const cleaned = line.replace(/^\[\d{2}:\d{2}:\d{2}\]/, '').trim();
  writeStream.write(cleaned + '\n');
});

rl.on('close', () => {
  writeStream.end();
});
```

Now, we tell the Node JS to read one line at a time. Whenever a line is read, clean up the string with our logic, and immediately write it into a file in chunks again. By doing this way, we don't need to load whole file in the memory before using it.

This is what the Activity monitor shows when we use streams,
![Picture of Activity monitor showing very less usage of RAM by a NodeJS script](https://firebasestorage.googleapis.com/v0/b/djhemath-site.firebasestorage.app/o/blogs%2Fstreams%2Fstream%20less%20memory-min.png?alt=media&token=5b3fa17b-8435-47d0-925b-128b25064941)

## Streams are not Node JS specific
Although I used Node JS to explain Streams, it is not specific to Node JS. Many other programming languages have support to streams. In fact, Java's entire I/O system is built around streams.

Node JS basically exposes streams explicitly, so you can chain them and pipe them. But other languages usually hide it or abstract it. That's why Stream looks scarier in Node JS even though it gives you more control.

