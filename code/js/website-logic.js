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
    {let li = createElement('li');
     appendMsgNode(li)(createMsg(message));
     chat.appendChild(li);
    };

let handleChat = api =>
    {let promisseChat = axios.get(api);
     promisseChat.then(dataPerform);
     promisseChat.catch(errorHandle);
    };
var msgKeys = ["from", "to", "text", "type", "time"];
let keys = obj => Object.keys(obj);
let dataPerform = data => {console.log(keys(data.data[0]));
                           console.log(data.data[0]);
                          };
let errorHandle = error => console.log(error);
handleChat('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');

let assignId = e => identity => e.id = `${identity}`;
let spanNodeId = id =>
    {let span = createElement('span');
     assignId(span)(id);
     return span;
    };
let populateNode = node => content => appendMsgNode(node)(createMsg(content));
let createContent = id => content =>
    {let span = spanNodeId(id);
     populateNode(span)(content);
     return span;
    };

let add = a => b => a+b;
let mapKeys = object => {
    newList = [];
    Object.entries(object).forEach(e => newList.push(createContent(e[0])(e[1])));
    return newList;
};


