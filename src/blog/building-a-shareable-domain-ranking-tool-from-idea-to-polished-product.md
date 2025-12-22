---
layout: blog
title: "Building a Shareable Domain Ranking Tool: From Idea to Polished Product"
description: "A practical journey through building a domain ranking tool using Vue and Tranco, focusing on URL-driven state, shareable links, and real-world UX feedback."
date: 2025-12-22
tags: ["vue", "Nestjs", "Neon", "Postgress"]
excerpt: "A behind-the-scenes look at building a simple domain ranking tool, how URL-driven state and shareable links shaped the product, and why small UX decisions made a big difference."
featureImage: "/images/blog/building-domain-ranking-app.webp"
featureImageAlt: "Domain ranking comparison chart showing multiple websites over time"
---

# Building a Shareable Domain Ranking Tool: From Idea to Polished Product
**Live app:** <a href="https://domainrank.sajantamu.com">Domain Ranking App</a>

>**Looking for the step-by-step implementation?**  
>  
> This post focuses on the *why* behind the product and engineering decisions rather than being a tutorial.  
> If you want to follow the build step by step, the full source code is available here:
>  
> - **Frontend (Vue, UI, URL-driven state):**  
>   <a href="https://github.com/SajanMG/domain-ranking-app-frontend">Frontend Github Repo</a>
> - **Backend (API, Tranco integration):**  
>   <a href="https://github.com/SajanMG/domain-ranking-app-backend">Backend Github Repo</a> 
>  
> The commit history in both repositories roughly follows the progression described below.


## Why I Built This

I wanted a simple way to compare domain popularity over time.

- Not an SEO audit.  
- Not a gated enterprise dashboard.  
- Just a clean tool where you can say:

> “How does site A compare to site B over time?”

Most existing tools either hide data behind logins, overwhelm you with metrics, or make sharing comparisons awkward.

I wanted something fast, visual, and simple.

That’s how this domain ranking tool started.


## The First Version (MVP)

The first version was intentionally minimal.

**Frontend**
- A domain input
- A “run” button
- A chart showing ranking history

**Backend**
- Accept a list of domains
- Fetch ranking data from Tranco
- Return a clean time series per domain

There was no authentication, saved state, or advanced filtering.

The goal was simple: **prove the core interaction worked**.


## Frontend Decisions That Actually Mattered

### Designing the Domain Input

One of the first UX decisions was using a chip-style input for domains instead of a textarea.

Domains are discrete items. Users need to add, remove, and adjust them easily, and chips reduce formatting errors.

A few small touches made a noticeable difference:
- Removing the placeholder once a domain is added
- A proper “Clear” action that resets input, results, and URL
- Example comparisons under the input to guide first-time users

These aren’t flashy features, but they remove friction.


### Using the URL as State (Suggested Feedback That Changed the Direction)

Originally, comparisons only existed in memory. Refreshing the page or sharing results meant starting over.

At this point, I shared an early version with **<a href="https://geshan.com.np/">Geshan Dai</a>**, who suggested a different approach:  
**use the URL itself as application state.**

The idea was simple but powerful:
- pass selected domains via the URL
- make comparisons shareable by default
- auto-load charts when a shared link is opened
- use an array-based format for domains in the URL (`domains[]`) instead of a single comma-separated value

This shifted the tool away from being a single-session UI and towards something that behaves like a proper, link-driven product.

With this change, comparisons began to live directly in the URL: https://appurl/?domains[]=domain1.com.au&domains[]=domain2.com.au

That immediately unlocked:
- shareable links
- bookmarks
- auto-rendered results on page load
- example comparisons that require zero manual input

Once the URL became the state, the rest of the UX became much more obvious.

If you’re curious how this is implemented, the URL parsing and auto-run logic lives in the frontend codebase:  
<a href="https://github.com/SajanMG/domain-ranking-app-frontend/blob/main/src/App.vue">Link</a>


### Loading States & Feedback

Early versions felt awkward during data fetches because nothing indicated progress.

I ended up using:
- A loading modal
- A blurred background
- Temporarily locked interaction

This made the wait feel intentional instead of broken.

Sometimes blocking the UI is better than pretending nothing is happening.


## Backend Design: Keeping It Boring on Purpose

The backend exists to make the frontend simple.

It:
- Talks to Tranco
- Shapes data into a predictable format
- Handles edge cases (unranked domains, missing data)
- Remains cache-friendly

There’s no Tranco logic on the frontend, and that’s intentional. The frontend shouldn’t care where the data comes from — only how to render it.

The main comparison endpoint and data shaping logic live here:  
<a href="https://github.com/SajanMG/domain-ranking-app-backend/blob/main/src/ranking/ranking.service.ts">Link</a>


## Iterating Through Real Feedback

This project improved most when it was shared early.

Feedback around:
- using URLs as first-class state
- making everything shareable
- removing unnecessary friction
- simplifying how users explore the tool

had a disproportionate impact compared to adding more features.


## Things I Chose Not to Build (On Purpose)

There are many features I deliberately skipped:
- User accounts
- Saving comparisons
- Heavy filtering
- Alerts and notifications

Not because they’re bad ideas — but because they’d distract from the core value.

Right now, the app does one thing well:

**Compare domains and make the result easy to share.**


## What’s Next

There are a few natural extensions:
- Rotating or trending example comparisons
- More curated presets

But the foundation is intentionally small and focused.


## Conclusion

This project reinforced something I keep relearning:

Small tools become powerful when:
- State is transparent
- Sharing is effortless
- UX decisions are deliberate

You don’t need a massive feature set to build something useful.  
You need clarity, focus, and restraint.

Thanks to **<a href="https://geshan.com.np/">Geshan Dai</a>** for the early feedback around using the URL as state, shareable comparisons, example links, and array-based domain parameters — ideas that fundamentally shaped the direction of the product.

If you’re building something similar, my advice is simple:

**Make it shareable early.**


