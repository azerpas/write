---
title: 'Create a fair NFT mint on Ethereum with Solidity and NextJS #2: Smart Contract setup'
excerpt: "After seeing how we could leverage Web2 bot protections to protect our mint, let's deep dive into the smart contract setup."
coverImage: '/assets/blog/fair-mint/cover2.jpg'
date: '2022-07-10T12:35:07.322Z'
author:
  name: Anthony Manikhouth
  picture: '/assets/blog/authors/anthony.jpg'
ogImage:
  url: '/assets/blog/fair-mint/cover2.jpg'
---

## Papers, please
[In the last post](https://blog.azerpas.com/posts/fair-mint-1), we've setup a request to our back-end as a requirement of the mint process.

Indeed, we fetched the hash, signature and nonce generated from the back-end and we sent them to the smart contract through the `buy` method.

Let's see how we're going to process those informations.

## Verify the signer identity

First of all let's add a field that contains the address of the transaction signer to our smart contract. As we saw in the previous post, **this address is an account that we own and with which we sign the transaction in our NextJS backend**.
```solidity
address private _signerAddress = 0x5260818d61ff27B7d0db3A96310246C041F7191e;

// So we can modify the signer address on each drop to enhance security
function setSignerAddress(address addr) external onlyOwner {
    _signerAddress = addr;
}
```

Then we create a function called `matchAddresSigner` to check if the address that signed the hash is the same as the one we set in the contract.
```solidity
function matchAddresSigner(bytes32 hash, bytes memory signature) private view returns(bool) {
    return _signerAddress == hash.recover(signature);
}
```

Finally, we can use this function as a require in our `buy` method.
```solidity
require(matchAddresSigner(hash, signature), "DIRECT_MINT_DISALLOWED");
```