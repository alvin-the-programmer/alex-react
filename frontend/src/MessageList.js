import { useState, useEffect } from 'react';
import MessageItem from './MessageItem';
import MessageCreateForm from './MessageCreateForm'
import './messageList.css'

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        const response = await fetch('http://localhost:3001/api/messages');
        const data = await response.json();
        setMessages(data);
    }

    useEffect(() => {
        getMessages()
    }, []);

    const messageItems = messages.map((message, idx) => <MessageItem key={idx} message={message} />);

    return (
        <div id="messageList-container">
            <MessageCreateForm getMessages={getMessages} />
            <button onClick={getMessages}>Refresh messages</button>
            <h4>messages</h4>
            {messageItems}
        </div>
    );
};


// await fetch(url, {
//   method: 'POST', // *GET, POST, PUT, DELETE, etc.   XXXXXXXX
//   mode: 'cors', // no-cors, *cors, same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json'              XXXXXXX
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   redirect: 'follow', // manual, *follow, error
//   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   body: JSON.stringify(data) // body data type must match "Content-Type" header XXXXXX
// });


// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export default MessageList;