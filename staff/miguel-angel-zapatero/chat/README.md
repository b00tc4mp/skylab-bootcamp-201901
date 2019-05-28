- branch feature/chat
- location staff/<name>/chat
- create a chat implementing a client and server
- client file is `send.js` and its usage is as follows:
`$ node send.js <host>:<port> "the message"`
- server file is `receive.js` and its usage is as follows:
`$ node receive.js <port>`
this server shows each message received and exposes the ip that sends it, as follows
`<ip-address>: "the message"`