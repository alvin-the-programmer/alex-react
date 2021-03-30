import { useState } from 'react';

const MessageCreateForm = (props) => {
    const getMessages = props.getMessages;
    const [alias, setAlias] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const handleAliasChange = (e) => {
        setAlias(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (alias === "" || text === "") {
            setError(!error)
            return
        }

        const response = await fetch('http://localhost:3001/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ alias, text })
        });

        if (response.ok) { // reset state if it was submitted correctly
            getMessages()
            setAlias("");
            setText("");
            setError(false);
        }
    };

    const displayError = error ? <div>Fields cannot be blank.</div> : null;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={alias} placeholder="alias" onChange={handleAliasChange} />
                <input type="text" value={text} placeholder="text" onChange={handleTextChange} />
                <button>submit</button>
            </form>
            {displayError}
        </>
    );
};

export default MessageCreateForm;