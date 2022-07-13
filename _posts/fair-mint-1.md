---
title: 'Create a fair NFT mint on Ethereum with Solidity and NextJS #1'
excerpt: "One of NFTs biggest caveat is their drop method. Often unfair, bots outake humans by submitting transactions almost instantly and leave no room for manual purchasing. As they fight to be the first to purchase the tokens, they also consume a lot of gas, creating gas wars where only the rich buyers can afford the fees. How do we alleviate this problem?"
coverImage: '/assets/blog/rust-encryption-1/lock.jpg'
date: '2022-07-10T12:35:07.322Z'
author:
  name: Anthony Manikhouth
  picture: '/assets/blog/authors/anthony.jpg'
ogImage:
  url: '/assets/blog/rust-encryption-1/lock.jpg'
---

## Selling NFTs to your community is harder than ever
[ERC-721]() has been a great standard for tokenized collectibles. Easily customizable, you can create a lot of different ways to sell and distribute collectibles to your community.

Sadly, it doesn't support any kind of bot protection out of the box, and boy these bots can annoying. 
- They're faster than humans by seconds
- They amplify the disparity between the richest buyers and the lesser by driving the gas fees to high levels
- They can create network congestion and slow down the Ethereum network

There have been a number of attempts to create a solution to this problem, like [Civic] smart-contracts that can be used to verify the identity of the buyer, thus slowing down a lot of bots. But with the surge of high gas prices, it's currently not possible to create a solution on the blockchain that will be sustainable.

## Web2 to the rescue
Bots have been an issue for a decade in the Web2 ecosystem hence why there's so much anti-bots solutions existing and making life harder for the bots. [Akamai](), [Datadome](), [Cloudflare](), [reCaptcha]() are some of the most popular anti-bot solutions and even if a few bypass exist (btw checkout this [great repo]() where we analyze Akamai Bot Protection), **I would recommend** using one of them whenever you are dealing with high traffic on critical production servers.

### How can it help?
Let's say you are implementing a classic NFT minting system on the Ethereum blockchain. You would most likely use a [ERC-721]() smart contract to store the tokens and a basic frontend to interact with the smart contract.
As we said before, the main caveat here is leaving the door open for bots to purchase the tokens directly from the smart contract without using the frontend. 

![bot to smartcontract](/assets/blog/fair-mint/bot-to-sc.png)

**But what if we decided to add an extra step to the process?**

