import { useState, useRef } from "react";
import { Message } from "../components/ChatWindows";

type SSEEventType = 'chunk' | 'tool_use' | 'tool_output' | 'end' | null;

export function useLexStreaming(sessionId: string){
    const [messages, setMessages] = useState<Message[]>([]);
    const [toolInUse, setToolInUse] = useState<"get_weather" | "get_dealership_address" | "check_appointment_availability" | "schedule_appointment" | null>(null);

    const messageIdRef = useRef(0);

    const sendMessage = async (message: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: messageIdRef.current++, text: message, sender: 'user' },
        ]);

        const response = await fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_id: sessionId, query: message }),
        });
        if(!response.ok || !response.body){
            console.error('Error en la respuesta del servidor');
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        let buffer = '';

        while(true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
        
          // Decode the chunk and add it to the buffer
          buffer += decoder.decode(value, { stream: true });
          
          const parts = buffer.split(/\r?\n\r?\n/);
        
          buffer = parts.pop() || '';
        
          for (const rawEvent of parts) {
            parseSSEEvent(rawEvent.trim());
          }
        }
    };


    /**
   * Function to parse an SSE event and update the state accordingly
   */
    const parseSSEEvent = (raw: string) => {
        const lines = raw.split('\n');
        let eventType: SSEEventType = null;
        let eventData = '';
    
        for (const line of lines) {
          if (line.startsWith('event:')) {
            
            eventType = line.replace('event:', '').trim() as SSEEventType;
          } else if (line.startsWith('data:')) {
            eventData = line.replace('data:', '').trim();
          }
        }

        if (!eventType) {
          console.log('No type found in event', raw);
          return;
        }
    
        switch (eventType) {
          case 'chunk': {
            const text = eventData;
            setMessages((prev) => {
              // if the last message is from the AI, concatenate with a space
              if (prev.length && prev[prev.length - 1].sender === 'ai') {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  text: updated[updated.length - 1].text + text + ' ',
                };
                return updated;
              }
              //if there is no message from the AI, create a new one
              return [
                ...prev,
                { id: messageIdRef.current++, text: text + ' ', sender: 'ai' },
              ];
            });
            break;
          }
          case 'tool_use': {
            setToolInUse(eventData.trim() as "get_weather" | "get_dealership_address" | "check_appointment_availability" | "schedule_appointment" | null);
            break;
          }
          case 'tool_output': {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              let parsedData: any;
              try {
                parsedData = JSON.parse(eventData);
              } catch {
                // if there is an error, just use the raw data
                parsedData = eventData;
              }
            setMessages((prev) => [
              ...prev,
              {
                id: messageIdRef.current++,
                text: `Tool output: ${eventData}`,
                sender: 'ai',
                toolName: toolInUse,
                toolData: parsedData
              },
            ]);
            break;
          }
          case 'end': {
            break;
          }
        }
      };
    
      return {
        messages,
        toolInUse,
        sendMessage,
      };
}