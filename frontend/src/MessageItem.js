const MessageItem = (props) => {
  const { alias, text, postedAt } = props.message;
  const date = new Date(postedAt);
  return (
    <>
      <p>
        {alias} {text} {date.toString()}
      </p>
    </>
  );
};

export default MessageItem;
