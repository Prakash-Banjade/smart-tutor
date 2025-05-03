import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';

const TutorMessages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Emily Johnson',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastMessage: 'Thank you for the great session!',
      timestamp: '2:30 PM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Chris Thompson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastMessage: 'Can we reschedule to next week?',
      timestamp: '11:45 AM',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Sophia Martinez',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastMessage: 'Looking forward to our next session!',
      timestamp: 'Yesterday',
      unread: 1,
      online: true
    }
  ];

  // Mock data for messages in the selected conversation
  const messages = [
    {
      id: 1,
      senderId: 'me',
      text: 'Hi Emily! How can I help you today?',
      timestamp: '2:25 PM'
    },
    {
      id: 2,
      senderId: 1,
      text: 'I have some questions about the calculus homework.',
      timestamp: '2:26 PM'
    },
    {
      id: 3,
      senderId: 'me',
      text: 'Of course! Which problem are you stuck on?',
      timestamp: '2:28 PM'
    },
    {
      id: 4,
      senderId: 1,
      text: 'Problem 3, the integration by parts one.',
      timestamp: '2:29 PM'
    },
    {
      id: 5,
      senderId: 1,
      text: 'Thank you for the great session!',
      timestamp: '2:30 PM'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="h-[calc(95vh-theme(spacing.16))] flex">
      {/* Conversations list */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedChat === conversation.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedChat(conversation.id)}
            >
              <div className="flex items-center">
                <div className="relative shrink-0">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400" />
                  )}
                </div>
                <div className="ml-4 truncate">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {conversation.name}
                    </h3>
                    <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <img
                  src={conversations.find(c => c.id === selectedChat)?.avatar}
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {conversations.find(c => c.id === selectedChat)?.name}
                  </h3>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.senderId === 'me' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-lg rounded-lg px-4 py-2 ${
                      message.senderId === 'me'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 text-right text-gray-400">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorMessages;