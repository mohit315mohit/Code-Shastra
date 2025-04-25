const Message = ({ text, sender }) => {
    const isUser = sender === "user";
    const align = isUser ? "justify-end" : "justify-start";
    const bg = isUser ? "bg-blue-100 text-right" : "bg-green-100 text-left";
  
    return (
      <div className={`flex ${align} mb-2`}>
        <div className={`p-3 rounded-xl max-w-[75%] ${bg}`}>{text}</div>
      </div>
    );
  };
  
  export default Message;
  