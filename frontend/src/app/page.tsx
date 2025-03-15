import React from "react";
import ChatWindow from "@/app/components/ChatWindows";



const Home: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-4 sm:p-8 md:px-20 overflow-x-hidden font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  row-start-2 items-center justify-center w-full">
        <ChatWindow />
      </main>
    </div>
  );
}


export default Home;