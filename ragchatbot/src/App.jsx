import React from "react";
import {
  Upload,
  Send,
  Moon,
  Sun,
  FileText,
  MessageCircle,
  User,
  Bot,
} from "lucide-react";

import Navbar from "../src/components/Navbar";       // adjust paths
import FileUpload from "../src/components/FileUpload";
import ChatInterface from "../src/components/ChatInterface";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext"; // your separate file

// ----------------- MAIN APP -----------------
const App = () => {
  const theme = useTheme();

  return (
    <div className={`min-h-screen ${theme.colors.secondary}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
          {/* File Upload Section */}
          <div
            className={`${theme.colors.card} rounded-xl shadow-sm p-6 ${theme.colors.border} border`}
          >
            <FileUpload />
          </div>

          {/* Chat Section */}
          <div
            className={`${theme.colors.card} rounded-xl shadow-sm overflow-hidden ${theme.colors.border} border`}
          >
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------- ROOT WITH THEME -----------------
const ChatbotInterface = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default ChatbotInterface;
