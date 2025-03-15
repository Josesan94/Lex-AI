
'use client';

import React, { useState } from 'react';
import { useLexStreaming } from '../hooks/useLexStreaming';
import WeatherInfo from './WeatherInfo';
import DealershipAddress from './DealershipAddress';
import AppointmentConfirmation from './AppointmentConfirmation';
import AppointmentAvailability from './AppointmentAvailability';
import ChatInput from './ChatInput';

export interface IToolData {
  output: string;
  name: string;   
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  toolName?: 'get_weather' | 'get_dealership_address' | 'check_appointment_availability' | 'schedule_appointment' | null;
  toolData?: IToolData;
}



const ChatWindow: React.FC = () => {
    const sessionId = '1234-5678';
    const [input, setInput] = useState<string>('');

    const {messages, sendMessage} = useLexStreaming(sessionId);

    const handleSendMessage = () => {
        if(!input.trim()) return;

        sendMessage(input);
        setInput('');
    }

    const renderMessageContent  = (msg: Message) => {
        if(!msg.toolName) {
            return <p>{msg.text}</p>
        }

        switch(msg.toolName) {
          case "get_weather":
            return <WeatherInfo data={msg.toolData ?? null} />;
          case "get_dealership_address":
            return <DealershipAddress data={msg.toolData ?? null} />;
          case "check_appointment_availability":
            return <AppointmentAvailability data={msg.toolData ?? null} />;
          case "schedule_appointment":
            return <AppointmentConfirmation data={msg.toolData ?? null} />;
          default:
            return <pre>Can you repeat the question, please?</pre>;
        }
    }

    return (
      <div
      className={`
        flex flex-col 
        w-full
        max-w-[95vw]
        sm:max-w-md 
        md:max-w-lg 
        lg:max-w-xl
        mx-auto
        h-[80vh]
        border border-gray-300 
        rounded-md 
        bg-white 
        overflow-hidden
        px-2
      `}
    >
      <div className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-lg font-semibold">Chat with Lex</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`
              max-w-[80%]
              p-3
              rounded-lg
              break-words
              whitespace-normal
              ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-black self-start mr-auto'}
            `}
          >
            {renderMessageContent(msg)}
          </div>
        ))}
      </div>
      <div className="flex p-4 bg-gray-200">
      <ChatInput input={input} onInputChange={setInput} onSend={handleSendMessage} />
      </div>
    </div>
    )
}



export default ChatWindow;


