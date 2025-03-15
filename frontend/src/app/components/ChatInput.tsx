import React from 'react'

type ChatInputProps = {
    input: string;
    onInputChange: (value: string) => void;
    onSend: () => void;
}

const ChatInput:React.FC<ChatInputProps>= ({ input, onInputChange, onSend }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          onSend();
        }
     };
  
  
    return (
    <div>
    <input
          type="text"
          placeholder="Write your message..."
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={onSend}
        >
          Send
        </button>
      </div>
  )
}

export default ChatInput