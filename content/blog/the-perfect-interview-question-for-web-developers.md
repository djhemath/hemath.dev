---
title: The perfect interview question for web developers
date: '2024-01-05T19:05:00.000Z'
draft: false
type: blog
table_of_contents: false
excerpt: Q1 of 2024 was filled with surprises and new experiences. From an unforgettable birthday surprise and an unintentional pre-birthday celebration to a spontaneous trip to Pondicherry and my mom’s first BBQ dinner, these months were all about laughter, exploration, and creating lasting memories.
---

Hi makkals,

So I recently about this somewhere, I forgot where it was. But that made me think of writing this piece down.

If someone is hiring for a web developer, they can ask one question to the candidate with which we can determine the depth of knowledge that the candidate has in the web development. The question goes by,

> What happens when you click a link in a website?

Explain it as in-depth as possible!


This question may sound simple, but it’s deceptively powerful. A strong web developer can break it down into layers, demonstrating knowledge of everything from browser internals to networking, rendering, and security. Let’s dive into what an ideal answer could look like, step by step:

## 1. DNS Resolution

When you click a link, the browser extracts the domain name (e.g., example.com) from the URL. If the browser doesn’t already have the IP address for this domain cached, it sends a DNS query to resolve the domain to an IP address.
* If the DNS query isn’t cached locally or by the ISP, the request travels up the DNS hierarchy, starting from root servers.
* Once the IP is resolved, the browser knows where to send the request.

## 2. TCP Connection and TLS Handshake

With the IP address in hand, the browser initiates a TCP connection to the server. For secure connections (HTTPS), a TLS handshake follows:
* The client and server exchange cryptographic keys to establish a secure, encrypted communication channel.
* This ensures data integrity and privacy during the session.

## 3. HTTP Request

Once the connection is established, the browser sends an HTTP or HTTPS request to the server. This includes:
* The request method (e.g., GET)
* Headers (e.g., cookies, user agent, etc.)
* Any additional data, such as query parameters

## 4. Server Response

The server processes the request and sends back an HTTP response. This typically includes:
* A status code (e.g., 200 OK, 404 Not Found)
* Headers (e.g., content type, cache control)
* The response body, which could be an HTML document, JSON, or other resources

## 5. Browser Rendering

When the browser receives the response, the rendering engine gets to work:
* Parsing HTML: The browser parses the HTML document to build a DOM (Document Object Model).
* CSS and JavaScript: External stylesheets and scripts are fetched and executed.
* Layout and Painting: The browser calculates the layout of elements and paints them on the screen.

## 6. Asynchronous Tasks

Modern web pages often include asynchronous operations like:
* Fetching additional resources via AJAX or Fetch API
* WebSocket connections for real-time updates
* Lazy-loading images or other content

## 7. Security Checks

Throughout the process, browsers enforce security measures like:
* Same-Origin Policy: Prevents malicious scripts from accessing data across domains.
* Content Security Policy (CSP): Blocks unauthorized scripts.
* HTTPS Enforcement: Ensures secure communication.

And many many more layers are involved. It can go upto the tranisistors level in the processor. But just think about it.

This question is a litmus test for understanding the breadth and depth of a developer’s knowledge. A junior developer might focus on the high-level process, while a seasoned engineer will dive into optimizations, edge cases, and even browser quirks.

So, next time you’re hiring a web developer or preparing for an interview, keep this question in mind. It’s simple yet effective!

Let me know your thoughts by writing me to [hem@hemath.dev](mailto:hem@hemath.dev).

Until next time, happy engineering!