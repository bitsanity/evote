STRINGS["English"].AboutText = `
Evoting Client 0.1.0a

* enables secure, open, honest elections
* vote from home/office/work over the internet
* all votes are cryptographic digital signatures recorded on blockchain
* a governing body allows N registrars to enroll voters
* voters register by using the ADILOS smartphone app to answer a challenge
* a voter votes by making a digital signature of a Candidate or Option's data
* Candidates/Options are read-only in the same smart contract holding the votes

---------------------
External Dependencies
---------------------

High-Speed Internet

Requires Ethereum service via WebSocket

Runs on nw.js platform

Requires HD webcam

Voters need ADILOS app installed on cell phone and create a key

------------------------------
Software/Internal Dependencies
------------------------------

Includes jQuery jquery.min.js to simply code

Includes web3 module web3.min.js to access the Ethereum network

Includes keythereum keythereum.min.js to parse geth account files

Includes secp256k1 module to validate ECDSA digital signatures

Includes qrcode.min.js
* turns a cryptographic challenge in bytes into a QR code image
* from https://davidshimjs.github.io/qrcodejs/
* released under MIT license.

Includes jsQR
* turns an image of a QR code into data
* from https://github.com/cozmo/jsQR
* Apache 2.0 License
`;
