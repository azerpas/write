---
title: 'Structure your application with a monorepo'
excerpt: 'Monorepos are a great way to structure your application. It allows you to have a single repository for all your projects, and to share code between them. But it also comes with some drawbacks. Let's see if it's the right solution for you.'
coverImage: '/assets/blog/monorepo/cover.jpeg'
date: '2022-12-20T12:35:07.322Z'
author:
  name: Anthony Manikhouth
  picture: '/assets/blog/authors/anthony.jpg'
ogImage:
  url: '/assets/blog/monorepo/cover.jpeg'
---

Imagine a company that need to build a landing page, a marketplace, a dashboard and a blog. All should carry the same brand identity, and share some common components. They would gain from dividing their codebase into multiple projects, thus creating multiple packages that can be reused between them, a package handling the UI, another one handling the API, another one handling the authentication, etc. 

But this comes with a cost. Each project would need to be deployed separately, and each project would need to be maintained separately. A simple commit or code review would require to go through multiple repositories to make sure everything is set up correctly.

## The monorepo solution
A monorepo is a single code repository that contains multiple projects, packages, programming languages, etc. It also allows you to have a single CI/CD pipeline, and to deploy/release all your projects at once. 