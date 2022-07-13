---
title: 'Create a fair NFT mint on Ethereum with Solidity and NextJS #1: Introduction'
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
- They are faster than humans by seconds
- They amplify the disparity between the richest buyers and the lesser by driving the gas fees to high levels
- They can create network congestion and slow down the Ethereum network

There have been a number of attempts to create a solution to this problem, like [Civic]() smart-contracts that can be used to verify the identity of the buyer, thus slowing down a lot of bots. But with the surge of high gas prices, it's currently not possible to create a solution on the blockchain that will be sustainable.

## Web2 to the rescue
Bots have been an issue for a decade in the Web2 ecosystem hence why there's so much anti-bots solutions existing and making life harder for the bots. [Akamai](), [Datadome](), [Cloudflare](), [reCaptcha]() are some of the most popular anti-bot solutions and even if a few bypass exist (btw checkout this [great repo]() where we analyze Akamai Bot Protection), **I would recommend** using one of them whenever you are dealing with high traffic on critical production servers. So why not try to integrate one of these solutions into your Web3 project?

### How can it help?
Let's say you are implementing a classic NFT minting system on the Ethereum blockchain. You would most likely use a [ERC-721]() smart contract to store the tokens and a basic frontend to interact with the smart contract.
As we said before, the main caveat here is leaving the door open for bots to purchase the tokens directly from the smart contract without using the frontend. 

![bot to smartcontract](/assets/blog/fair-mint/bot-to-sc.png)

With similar tools to the ones used in Web2 we could mitigate this behavior and slow down bots.

### But how are we going to integrate our Web2 solutions into our NFT minting system?
In definitive what we want to do is force a bot challenge to be solved by the user. To achieve this we're going to create an **extra-step** to the minting process which require to **call and wait for a response from a given backend**.

![server in between](/assets/blog/fair-mint/server-in-between.png)

As you can see, the server add an extra step between the smart contract and the bot/front-end. You can add **any type of bot protection** with this system as the bot will always require a valid response from the backend to be validated by the smart contract. 

## Implementation with NextJS and reCaptcha
Let's create a simple example of how to integrate reCaptcha into your minting website.

### Pre-minting
On a classic NFT minting system, you would interact directly with Metamask and send a request to mint a token. With our system, we will first need to send a request to the backend to validate the user's response to the reCaptcha challenge.

#### Client-side
```typescript
type Body = {
    account: string // Ethereum account address
    amount: number // Number of tokens to mint
    captcha: string // Response to the reCaptcha challenge
}

export type Data = {
    hash?: string // A hash representing an object {account, amount, nonce}
    signature?: string // Signature of the hash
    nonce?: string // Nonce used to generate the hash
    message?: string // A potential error message
}

const API_MINT = '/mint' // Endpoint to mint tokens

export const preMint = async (props: Body): Promise<Data> => {
    const res = await fetch(API_MINT, { 
        body: JSON.stringify(props), 
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST"
    });
    return res.json();
}
```

#### Server-side
First, we verify the user's response to the reCaptcha challenge. If the user fails the challenge, we return an error.
```typescript
const signerPrivateKey = process.env.SIGNER_PRIVATE_KEY;
const { account, amount, recaptcha } = req.body;

const ip = getIp(req)
if (process.env.RECAPTCHA_SECRET) {
    const recaptchaResponse = await recaptchaSolving({response: recaptcha, ip})
    if (recaptchaResponse.success === false) {
        const message = "error"
        return res.status(403).json({ message: "Captcha verification failed" })
    }
}
```

Then we generate a hash of the user's account, amount of token, generate nonce, sign it with the owner private key, and return it to the user.
```typescript
const nonce = crypto.randomBytes(9).toString("base64");

const content = web3.utils.soliditySha3(
    {
        type: "address", 
        value: account
    }, 
    {
        type: "uint256",
        value: amount
    }, 
    {
        type: "string",
        value: nonce
    }
);
const Web3 = new web3();
// Generate the signature
const { messageHash: hash, signature } = await Web3.eth.accounts.sign(content, signerPrivateKey)
// Send back
res.status(200).json({ hash, signature, nonce })
```