---
title: Git branch cannot lock ref while creating a new branch
date: '2023-12-11T08:45:00.000Z'
draft: false
type: blog
hero_image: https://firebasestorage.googleapis.com/v0/b/dj-hemath-blog.appspot.com/o/blog-images%2Fissue-1.png?alt=media&token=c8bb904c-4018-4ded-ba79-f062e9d536ce
excerpt: I was trying to create a branch in some_branch/feature/ticket. But Git thrown cannot lock ref error saying that the branch already exists
category: issue
---
I just encountered a Git error yesterday. I was trying to create a branch in some_branch/feature/ticket. But Git thrown the following error,

```txt
fatal: cannot lock ref ‘refs/heads/some_branch/feature/ticket': ‘refs/heads/some_branch' exists; cannot create ‘refs/heads/some_branch/feature/ticket'
```

Initially I didn't understand it. Because I already created similar kinda branches like dev/hemath/feature. But this time it didn't work. So I did some research on the internet and found a great underrated answer in Stackoverflow. Check it out.

[https://stackoverflow.com/a/71216915](https://stackoverflow.com/a/71216915)

As the comment says, I already have a branch named `some_branch`, and it has some commits. The way Git works internally is, it'll create directories and files as per branch names.

So in my case, it should've created `some_branch/feature` as directories and put the `ticket` as a file at last. But as `some_branch` is already there not as a directory but as a file. So Git cannot just create a directory with the same name and also cannot convert this `some_branch` as a directory.

## The solution

If it's okay to delete that branch, then delete and create branches in the desired format. In my case, I cannot do that as many people are working on that. So I had to change my format to `some_branch-ticket/feature`