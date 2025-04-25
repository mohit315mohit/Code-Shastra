import Message from "./Message";

const ChatBox = ({ messages }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto mb-4">
      {messages.map((msg, idx) => (
        <Message key={idx} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default ChatBox;
