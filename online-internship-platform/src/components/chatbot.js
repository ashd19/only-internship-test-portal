import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

// AI Service Class
class OnlyInternshipAI {
  constructor() {
    this.basePrompt = `You are an AI assistant for OnlyInternship.in, an online internship test platform by Yuga Yatra Retail (OPC) Private Limited.

ROLE & TONE:
- Be professional, clear, and encouraging — like a mentor who genuinely wants students to succeed.
- Speak in a friendly but formal tone, suitable for college students and fresh graduates.
- Keep answers concise (2–4 sentences) but valuable.
- If a student is anxious or unsure, reassure them with confidence-building tips.

PLATFORM INFORMATION:
- Test format: 35 questions in 30 minutes.
- Cost: ₹750 (one-time fee).
- Secure, proctored test with anti-cheating technology.
- Instant results with merit-based rankings.
- Target audience: students and graduates seeking internships.

WHAT YOU CAN DO:
- Answer FAQ-style questions (e.g., test process, results, preparation).
- Give practical preparation tips for different types of questions (AI, application-based, coding, etc.).
- Offer time-management strategies for the test.
- Encourage students with career advice when relevant.
- Redirect technical issues or account-related questions to support@onlyinternship.in.

IMPORTANT:
- Never guess or invent details not provided here.
- You CAN go slightly out of context to give genuinely helpful tips that improve the student’s chances.
- If unsure, politely suggest contacting support.
`;
    this.conversationHistory = [];
  }

  // Method to call OpenAI API
  async sendToGemini(userMessage) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {   
              role:"user",
              parts: [{ text: `${this.basePrompt}\n\nUser: ${userMessage}` }]
            }
          ]
        })
      }
    );
  
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }
  
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
    // Save to history
    this.conversationHistory.push(
      { role: 'user', content: userMessage },
      { role: 'assistant', content: text }
    );
  
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }
  
    return text || "Sorry, I couldn't understand that. Try rephrasing your question.";
  }

  // Method for FAQ responses (fallback for common questions)
  getFAQResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    const faqResponses = {
      'cost|price|fee|payment': "The test costs ₹250 + GST as a one-time fee. Payment is secure and GST compliant.",
      'time|duration|minutes': "You'll have 30 minutes to complete 35 questions. The timer starts once you begin the test.",
      'questions|format|test': "The assessment contains 35 carefully designed questions to evaluate your skills and knowledge for internship readiness.",
      'result|score|ranking': "You'll receive instant results with detailed analysis and merit-based ranking immediately after completing the test.",
      'register|signup|account': "To register, visit our student login page, verify your email, and complete your profile before taking the test.",
      'cheat|monitoring|proctored': "We use advanced anti-cheating technology and secure proctoring to ensure fair assessment for all students.",
      'support|help|contact': "For additional support, please email us at support@onlyinternship.in or use the contact information on our website."
    };

    for (const [keywords, response] of Object.entries(faqResponses)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => message.includes(keyword))) {
        return response;
      }
    }
    
    return null; // No FAQ match found
  }

  // Main method to get AI response
  async getResponse(userMessage) {
    // First try FAQ for quick responses
    const faqResponse = this.getFAQResponse(userMessage);
    if (faqResponse) {
      return faqResponse;
    }



    // If no FAQ match and API key is available, use OpenAI
    if (process.env.REACT_APP_GEMINI_API_KEY) {
      return await this.sendToGemini(userMessage);
    }

    // Fallback response if no API key
    return "The Chatbot is not working currently !Thank you for your question! For detailed assistance, please contact our support team at support@onlyinternship.in. They'll be happy to help you with any queries about the internship test platform.";
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your OnlyInternship assistant. I can help you with questions about the internship test, registration process, or any other queries. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const aiService = useRef(new OnlyInternshipAI());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Get AI response
      const botResponse = await aiService.current.getResponse(currentInput);

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I apologize for the technical difficulty. Please try again or contact support@onlyinternship.in for immediate assistance.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border-2 border-yellow-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">OnlyInternship Assistant</h3>
                <p className="text-xs opacity-90">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-yellow-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.sender === 'user' 
                      ? 'bg-yellow-500 text-white shadow-sm' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={`px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-yellow-500 text-white rounded-br-sm shadow-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-yellow-100'
                  }`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-xs">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600">
                    <Bot size={12} />
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm shadow-sm border border-yellow-100">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-yellow-200 p-3 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-yellow-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-0' 
            : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 border-2 border-yellow-300'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}