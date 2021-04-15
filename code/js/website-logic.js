alert();
var querier = (e) => document.querySelector(e);
var populateWith = (e) => (c) => e.appendChild(c.cloneNode(true));

var chat = querier('.chat');
let createElement = e => document.createElement(e);
var querierAll = s => document.querySelectorAll(s);

var remover = e => c => e.classList.remove(c);
var cons = e => c => e.classList.add(c);

let createMsg = message => document.createTextNode(message);
let appendMsgNode = e => nodeMessage => e.appendChild(nodeMessage);  

let populate = message =>
    {let complete_li = appendMsgNode(createElement(li))(createMsg(message));
     populateWith(chat)(complete_li);
    };
