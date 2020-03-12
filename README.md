# evote
A blockchain-based electronic voting system for simple, open, inexpensive and
transparent elections.


# Features

* Each voter is identified by a public key they create on their own smartphone
* Voters must be enrolled by a Registrar duly appointed by a Chief Electoral
* The list of registrars and list of qualified voters are Ξthereum smart
contracts
* A vote is the voter's digital signature of a message unique to his chosen candidate, stored publicly in a vote smart contract.
* Smart contracts have ens names specific to the locale, such as
`registrars.cascadia.eth` and `voters.cascadia.eth`
* Each election/vote is a smart contract e.g. `election2022.cascadia.eth`
* Election results can be validated by any program that can scan the vote
contract and verify the digital signatures.
* Each voter pays gas (pennies) to vote (pay to vote).
* Anyone can run the voting program and vote from anywhere, anytime OR
* Anyone not wishing to run the voting program themselves can compensate anyone
else to add their vote for them (public library computer, workplace computer,
etc)
* Vote as many times as you like and overwrite your previous vote any number of
times until the election closes

# Dependencies

* Uses the [ADILOS](https://github.com/bitsanity/adilos) self-sovereign
  identity system protocol
* nw.js, web3.js, Ethereum

# node.js Modules

* keythereum
* elliptic
* eth-ens-namehash
* qr-scanner
* secp256k1

