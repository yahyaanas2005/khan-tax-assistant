"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, Bot, Home, FileText, Download, Loader2 } from "lucide-react";
import useHandleStreamResponse from "@/utils/useHandleStreamResponse";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [jurisdiction, setJurisdiction] = useState(null);
  const messagesEndRef = useRef(null);

  const jurisdictions = [
    { code: "USA", name: "United States (IRS)", flag: "🇺🇸" },
    { code: "Canada", name: "Canada (CRA)", flag: "🇨🇦" },
    { code: "KSA", name: "Saudi Arabia (ZATCA)", flag: "🇸🇦" },
    { code: "Pakistan", name: "Pakistan (FBR)", flag: "🇵🇰" },
  ];

  // Initialize session
  useEffect(() => {
    const sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(sid);

    // Try to load existing conversation
    loadConversation(sid);
  }, []);

  const loadConversation = async (sid) => {
    try {
      const response = await fetch(`/api/conversations?sessionId=${sid}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.messages) {
          setConversationId(data.id);
          setJurisdiction(data.jurisdiction);
          setMessages(
            data.messages.map((m) => ({ role: m.role, content: m.content })),
          );
        }
      }
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleJurisdictionSelect = async (jur) => {
    setJurisdiction(jur);

    // Create conversation in database
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, jurisdiction: jur }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversationId(data.id);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }

    // Add welcome message
    const welcomeMsg = {
      role: "assistant",
      content: `Welcome! I'm your Senior International Tax Counsel specializing in ${jur} tax matters. How can I assist you today?`,
    };
    setMessages([welcomeMsg]);
  };

  const handleFinish = useCallback((message) => {
    setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    setStreamingMessage("");
    setIsLoading(false);
  }, []);

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: handleFinish,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Save user message to database
    if (conversationId) {
      try {
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId,
            role: "user",
            content: userMessage.content,
          }),
        });
      } catch (error) {
        console.error("Error saving user message:", error);
      }
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          conversationId,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      handleStreamResponse(response);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
        },
      ]);
    }
  };

  const handleGeneratePDF = async (formType) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/generate-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          jurisdiction,
          formType,
          messages, // Send full conversation for data extraction
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const data = await response.json();

      // Download PDF
      const link = document.createElement("a");
      link.href = data.pdfUrl;
      link.download = `${formType}_${jurisdiction}_form.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `✓ I've generated your ${formType} form with the information from our discussion. The PDF has been downloaded to your device. Please review it carefully before filing.`,
        },
      ]);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I encountered an error generating the PDF. Please ensure we've discussed all required information for the ${formType} form.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect if AI message suggests a form
  const detectSuggestedForms = (content) => {
    const formPatterns = {
      USA: [
        { pattern: /\bForm\s+1040\b/gi, name: "Form 1040" },
        { pattern: /\bForm\s+1120\b/gi, name: "Form 1120" },
        { pattern: /\bForm\s+1065\b/gi, name: "Form 1065" },
        { pattern: /\bForm\s+1099\b/gi, name: "Form 1099" },
        { pattern: /\bSchedule\s+C\b/gi, name: "Schedule C" },
      ],
      Canada: [
        { pattern: /\bT1\s+(General|Return)?\b/gi, name: "T1 General" },
        { pattern: /\bT2\s+(Corporate|Return)?\b/gi, name: "T2 Corporate" },
        { pattern: /\bGST\/HST\s+Return\b/gi, name: "GST/HST Return" },
        { pattern: /\bRC1\s+Form\b/gi, name: "RC1 Form" },
      ],
      KSA: [
        { pattern: /\bVAT\s+Return\b/gi, name: "VAT Return" },
        { pattern: /\bCIT\s+Form\b/gi, name: "CIT Form" },
        { pattern: /\bZakat\s+Return\b/gi, name: "Zakat Return" },
        { pattern: /\bE-Invoice\s+Form\b/gi, name: "E-Invoice Form" },
      ],
      Pakistan: [
        { pattern: /\bSection\s+114\b/gi, name: "Section 114" },
        { pattern: /\bSection\s+116\b/gi, name: "Section 116" },
        { pattern: /\bSales\s+Tax\s+Return\b/gi, name: "Sales Tax Return" },
        { pattern: /\bIncome\s+Tax\s+Return\b/gi, name: "Income Tax Return" },
      ],
    };

    const patterns = formPatterns[jurisdiction] || [];
    const suggestedForms = [];

    patterns.forEach(({ pattern, name }) => {
      if (pattern.test(content)) {
        suggestedForms.push(name);
      }
    });

    return [...new Set(suggestedForms)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex flex-col">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-[#FF6E40]" />
            <div>
              <h1 className="text-xl font-bold text-white font-montserrat">
                AI Tax Assistant
              </h1>
              <p className="text-sm text-white/60 font-inter">
                Khan Waheed & Co.
              </p>
            </div>
          </div>
          <a
            href="/"
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <Home size={18} />
            <span className="text-sm font-inter">Home</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-6">
        {/* Jurisdiction Selection */}
        {!jurisdiction && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Select Your Tax Jurisdiction
            </h2>
            <p
              className="text-white/70 mb-8 text-center max-w-md"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Choose the country for your tax filing needs
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {jurisdictions.map((jur) => (
                <button
                  key={jur.code}
                  onClick={() => handleJurisdictionSelect(jur.code)}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:border-[#FF6E40] transition-all duration-200 text-left group"
                >
                  <div className="text-4xl mb-3">{jur.flag}</div>
                  <h3
                    className="text-xl font-bold text-white mb-1 group-hover:text-[#FF6E40] transition-colors"
                    style={{ fontFamily: '"Montserrat", sans-serif' }}
                  >
                    {jur.name}
                  </h3>
                  <p
                    className="text-sm text-white/60"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Tap to select
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Interface */}
        {jurisdiction && (
          <>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {messages.map((msg, index) => {
                const suggestedForms =
                  msg.role === "assistant"
                    ? detectSuggestedForms(msg.content)
                    : [];

                return (
                  <div key={index}>
                    <div
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-[#FF6E40] text-white"
                            : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                        }`}
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        {msg.role === "assistant" && (
                          <div className="flex items-center mb-2">
                            <Bot size={16} className="mr-2 text-[#FF6E40]" />
                            <span className="text-xs text-white/60">
                              Tax Counsel
                            </span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>
                    </div>

                    {/* Show form download buttons if forms are suggested */}
                    {suggestedForms.length > 0 && (
                      <div className="flex justify-start mt-2 ml-4">
                        <div className="flex flex-wrap gap-2">
                          {suggestedForms.map((form, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleGeneratePDF(form)}
                              disabled={isLoading}
                              className="flex items-center space-x-2 px-4 py-2 bg-[#FF6E40] text-white rounded-full hover:bg-[#D4541A] transition-all duration-200 text-xs disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                              <Download size={14} />
                              <span>Download {form}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Streaming Message */}
              {streamingMessage && (
                <div className="flex justify-start">
                  <div
                    className="max-w-[80%] px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/20"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    <div className="flex items-center mb-2">
                      <Bot size={16} className="mr-2 text-[#FF6E40]" />
                      <span className="text-xs text-white/60">Tax Counsel</span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {streamingMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && !streamingMessage && (
                <div className="flex justify-start">
                  <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <Loader2 className="w-5 h-5 text-[#FF6E40] animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your tax filing..."
                disabled={isLoading}
                className="w-full px-6 py-4 pr-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF6E40] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: '"Inter", sans-serif' }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-[#FF6E40] text-white rounded-xl hover:bg-[#D4541A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FF6E40]"
              >
                <Send size={18} />
              </button>
            </form>

            {/* Disclaimer */}
            <p
              className="text-xs text-white/40 text-center mt-4"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              AI-generated advice. Please verify with a certified professional
              before filing.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
