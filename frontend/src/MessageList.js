import React, { useState, useEffect } from 'react';
import MessageItem from './MessageItem';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [alias, setAlias] = useState("");
    const [text, setText] = useState("");

    const getMessages = async () => {
        const response = await fetch('http://localhost:3001/api/messages');
        const data = await response.json();
        setMessages(data);
    }

    useEffect(() => {
        getMessages()
    }, []);

    const messageItems = messages.map((message, idx) => <MessageItem key={idx} message={message} />);

    const handleAliasChange = (e) => {
        setAlias(e.target.value);
        console.log(alias);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
        console.log(text);
    };

    const handleSubmit = async (e) => {
        // read abt stopPropogation
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({alias, text})
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={alias} onChange={handleAliasChange}/>
                <input type="text" value={text} onChange={handleTextChange} />
                <button>submit</button>
            </form>

            <h4>messages</h4>
            {messageItems}
        </>
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