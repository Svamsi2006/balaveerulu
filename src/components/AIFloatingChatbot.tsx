
import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIFloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Balaveerulu assistant. I can help you with questions about our personalized comic books, pricing, how it works, and more! What would you like to know?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage: string) => {
    const GEMINI_API_KEY = 'AIzaSyA582yQ2JKbUNiGDts678dEPxU0Q5fWCXQ';
    
    const websiteContext = `
    You are a helpful chatbot assistant for Balaveerulu, a website that creates personalized comic books for children.

    IMPORTANT RESPONSE GUIDELINES:
    - Keep responses SHORT and conversational (1-3 sentences max for basic questions)
    - For greetings like "hi", "hello", "how are you" - respond warmly but briefly
    - For "who are you" - briefly introduce yourself as Balaveerulu assistant
    - Only provide detailed information when specifically asked about features, pricing, or processes
    - Be friendly, helpful, and chat-like in your responses
    - Use emojis occasionally to be more engaging

    ABOUT BALAVEERULU:
    - We create magical, personalized comic books where children become the superhero
    - Both digital and printed books available
    - Professional illustrations with positive values and safe themes

    SAMPLE THEMES: Hanuman's Little Helper, Spider Kid Adventure, Iron Kid's Mission, Thor's Young Apprentice

    HOW IT WORKS: Choose theme → Upload photo → Personalize → Order → Receive books

    PAGES: Home, How It Works, Gallery, Create Book, Pricing, About, Contact

    Remember: Be conversational and concise unless detailed information is specifically requested!
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${websiteContext}\n\nUser: ${userMessage}\n\nRespond as Balaveerulu assistant - keep it short and conversational unless detailed info is requested:`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return 'Sorry, I\'m having trouble right now. Please try again! 😊';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Please enter a message",
        description: "Type your question before sending.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(message);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="relative rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white border-4 border-white/20 min-h-[64px] min-w-[64px] p-0 animate-bounce transition-all duration-300 hover:scale-110"
          aria-label="Open AI chat assistant"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-pulse opacity-75"></div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/50">
            <img 
              src="/lovable-uploads/26aab459-6fcc-4964-a14d-07eba0bfa570.png" 
              alt="Balaveerulu AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
        </Button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 border-4 border-gradient-to-r from-purple-400 to-pink-400 flex flex-col overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/50">
                <img 
                  src="/lovable-uploads/26aab459-6fcc-4964-a14d-07eba0bfa570.png" 
                  alt="Balaveerulu AI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">Balaveerulu AI</h3>
                <p className="text-xs text-white/80">Your Comic Book Helper</p>
              </div>
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 min-h-[32px] min-w-[32px] rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Close AI chat assistant"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-blue-50 to-purple-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl transition-all duration-200 hover:scale-105 ${
                      msg.isUser
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-800 shadow-md border-2 border-pink-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap font-medium">{msg.text}</p>
                    <span className={`text-xs mt-1 block ${msg.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white text-gray-800 p-3 rounded-2xl shadow-md border-2 border-pink-100">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 animate-bounce text-purple-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
                      </div>
                      <span className="text-sm font-medium text-purple-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>
          
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t-2 border-pink-100">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about our comic books..."
                disabled={isLoading}
                className="flex-1 rounded-full border-2 border-purple-200 focus:border-purple-400 bg-purple-50/50 placeholder:text-purple-400 font-medium"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !message.trim()}
                size="sm"
                className="min-h-[40px] min-w-[40px] p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                aria-label="Send message to AI assistant"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIFloatingChatbot;
