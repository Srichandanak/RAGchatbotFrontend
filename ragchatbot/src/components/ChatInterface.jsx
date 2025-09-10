// import { useState } from "react";
// import { MessageCircle, User, Bot, Send } from "lucide-react"; // assuming lucide-react
// import { useTheme } from "../context/ThemeContext"; // adjust path to your hook

// // Chat Component
// const ChatInterface = () => {
//   const theme = useTheme();
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: "bot" },
//     { id: 2, text: "Hi there! I'd like to know about the uploaded documents.", sender: "user" },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       const newMessage = {
//         id: messages.length + 1,
//         text: inputMessage,
//         sender: "user",
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setInputMessage("");

//       // Simulate bot response
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: prev.length + 1,
//             text: "Thanks for your message! I'm processing your request and will respond shortly.",
//             sender: "bot",
//           },
//         ]);
//       }, 1000);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Header */}
//       <div
//         className={`${theme.colors.card} ${theme.colors.border} border-b px-6 py-4 flex items-center space-x-3`}
//       >
//         <MessageCircle size={24} className="text-blue-600" />
//         <div>
//           <h2 className={`${theme.colors.text} text-xl font-semibold`}>
//             AI Assistant
//           </h2>
//           <p className={`${theme.colors.textSecondary} text-sm`}>
//             Online and ready to help
//           </p>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex items-start space-x-3 ${
//               message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
//             }`}
//           >
//             <div
//               className={`
//                 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
//                 ${
//                   message.sender === "user"
//                     ? "bg-blue-600 text-white"
//                     : `${theme.colors.secondary} ${theme.colors.text}`
//                 }
//               `}
//             >
//               {message.sender === "user" ? (
//                 <User size={16} />
//               ) : (
//                 <Bot size={16} />
//               )}
//             </div>
//             <div
//               className={`
//                 max-w-xs lg:max-w-md px-4 py-3 rounded-lg
//                 ${
//                   message.sender === "user"
//                     ? "bg-blue-600 text-white ml-auto"
//                     : `${theme.colors.card} ${theme.colors.border} border ${theme.colors.text}`
//                 }
//               `}
//             >
//               <p className="text-sm">{message.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className={`${theme.colors.border} border-t p-6`}>
//         <div className="flex space-x-3">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type your message..."
//             className={`
//               flex-1 px-4 py-3 rounded-lg ${theme.colors.input} ${theme.colors.border}
//               border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//             `}
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 font-medium"
//           >
//             <Send size={18} />
//             <span className="hidden sm:inline">Send</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
import { useState } from "react";
import { MessageCircle, User, Bot, Send } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ChatInterface = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

const handleSendMessage = async () => {
  if (inputMessage.trim()) {
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputMessage }), // ✅ key must be "query"
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: data.answer, // ✅ backend returns "answer"
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  }
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className={`${theme.colors.card} ${theme.colors.border} border-b px-6 py-4 flex items-center space-x-3`}
      >
        <MessageCircle size={24} className="text-blue-600" />
        <div>
          <h2 className={`${theme.colors.text} text-xl font-semibold`}>
            AI Assistant
          </h2>
          <p className={`${theme.colors.textSecondary} text-sm`}>
            {loading ? "Thinking..." : "Online and ready to help"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === "user"
                ? "flex-row-reverse space-x-reverse"
                : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : `${theme.colors.secondary} ${theme.colors.text}`
                }`}
            >
              {message.sender === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg
                ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : `${theme.colors.card} ${theme.colors.border} border ${theme.colors.text}`
                }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={`${theme.colors.border} border-t p-6`}>
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-3 rounded-lg ${theme.colors.input} ${theme.colors.border}
              border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 font-medium disabled:opacity-50"
          >
            <Send size={18} />
            <span className="hidden sm:inline">
              {loading ? "Sending..." : "Send"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
