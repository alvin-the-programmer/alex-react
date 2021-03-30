import { useState, useEffect } from "react";
import MessageItem from "./MessageItem";
import MessageCreateForm from "./MessageCreateForm";
import "./messageList.css";

const comparisons = {
  // figure out how to sort alphabetically
  alias: (a, b) => a.alias - b.alias,
  postedAt: (a, b) => {
    const aDate = new Date(a.postedAt);
    const bDate = new Date(b.postedAt);
    return aDate - bDate;
  },
  text: (a, b) => a.text - b.text,
};

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortFn, setSortFn] = useState("postedAt");

  const getMessages = async () => {
    const response = await fetch("http://localhost:3001/api/messages");
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  //   console.log(comparisons[sortFn]);
  let activeMessages = messages
    .slice(page * pageSize, (page + 1) * pageSize)
    .sort(comparisons[sortFn]);
  console.table(activeMessages);

  const messageItems = activeMessages.map((message, idx) => (
    <MessageItem key={idx} message={message} />
  ));

  const pageButtons = [];
  const numPages = Math.ceil(messages.length / pageSize);
  for (let i = 0; i < numPages; i++) {
    pageButtons.push(
      <button key={i} onClick={() => setPage(i)}>
        {i + 1}
      </button>
    );
  }

  return (
    <div id="messageList-container">
      <h2>Sort by:</h2>
      <button onClick={() => setSortFn("alias")}>ALIAS</button>
      <button onClick={() => setSortFn("text")}>TEXT</button>
      <button onClick={() => setSortFn("postedAt")}>POSTED AT</button>
      <MessageCreateForm getMessages={getMessages} />
      <button onClick={getMessages}>Refresh messages</button>
      <h4>messages</h4>
      {messageItems}
      <label forhtml="limit">Number of items per page</label>
      <select
        name="limit"
        value={pageSize}
        onChange={(e) => {
          setPageSize(e.target.value);
          setPage(0);
        }}
      >
        <option value="10">10</option>
        <option value="45">45</option>
        <option value="100">100</option>
      </select>
      {pageButtons}
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
