const MessageItem = (props) => {
    const {alias, text, postedAt} = props.message;

    return (
        <>
            <p>{alias} {text} {postedAt}</p>
        </>
    );
};

export default MessageItem;