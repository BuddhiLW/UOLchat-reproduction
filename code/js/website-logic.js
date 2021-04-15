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
let populate = obj =>
    {let li = createElement('li');
     let list = mapKeys(obj);
     assignClass(li)(list[3].textContent);
     orderAppendMsg(li)(list);
     chat.appendChild(li);
    };
let populateWithId = obj =>
    {let li = createElement('li');
     let list = mapKeys(obj);
     assignClass(li)(list[3].textContent);
     assignId(li)("last");
     orderAppendMsg(li)(list);
     chat.appendChild(li);
    };

let handleChat = api =>
    {let promisseChat = axios.get(api);
     promisseChat.then(dataPerform);
     promisseChat.catch(errorHandle);
    };
var msgKeys = ["from", "to", "text", "type", "time"];
let keys = obj => Object.keys(obj);
let dataPerform = data => {let dataArray = data.data;
                           let lastThirty = dataArray.slice(Math.max(dataArray.length - 30, 1));
                           lastThirty.forEach((messageData, i) =>
                               (i !== lastThirty.length - 1) ?
                                   populate(messageData) :
                                   populateWithId(messageData));
                           focus();
                          };
let errorHandle = error => console.log(error);
handleChat('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');

let assignId = e => identity => e.id = `${identity}`;
let assignClass = e => c => e.classList.add(c);
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
let spanNodeClass = c =>
    {let span = createElement('span');
     assignClass(span)(c);
     return span;
    };
let createContentClass = c => content =>
    {let span = spanNodeClass(c);
     populateNode(span)(content);
     return span;
    };

let mapKeys = object => {
    newList = [];
    Object.entries(object).forEach(e => newList.push(createContentClass(e[0])(e[1])));
    return newList;
};

let orderAppendMsg = li => list =>
    {li.innerHTML += "(";
     li.appendChild(list[4]);
     li.innerHTML +=")";
     li.appendChild(list[0]);
     li.innerHTML += "&nbsp; para";
     li.appendChild(list[1]);
     li.innerHTML += ":";
     li.appendChild(list[2]);
    };

function refreshData(){
    let seconds = 3; 
    let ul = querier('ul');
    ul.innerHTML = ""; 
    handleChat('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages');
    setTimeout(refreshData, seconds*1000);
}
// refreshData();

let focus = () => querier('#last').scrollIntoView();
