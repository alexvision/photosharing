# Photsharing Dapp

This is a basic photo sharing Dapp running on Ethereum and storing images on IPFS. It currently lets you sign up, and upload images (and a description) to IPFS/Ethereum and view the feed of images already uploaded.

It utilises drizzle to help keeping data in sync with the Ethereum network and requires the following to set it up: 

 1. `npm install -g truffle`
 1. `npm install -g ganache-cli`
 1. `npm i`
 1. in a new tab run `ganache-cli -b 3` - This starts up a development blockchain
 1. `truffle compile`
 1. `truffle migrate`
 1. `npm run start`