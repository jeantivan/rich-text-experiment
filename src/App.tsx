import { MessageItem } from "@/components/message-item";
import { CreateMessage } from "@/components/create-message";

import { useMessageStore } from "@/lib/store";

function App() {
  const messages = useMessageStore((state) => state.messages);

  return (
    <div className="h-screen ">
      <div className="p-4 w-full max-w-[1000px] mx-auto">
        <CreateMessage />
        <div>
          {messages.length <= 0 ? (
            <div className="text-center my-8 text-2xl">
              No messages to show.
            </div>
          ) : (
            <div className="my-4">
              {messages.map((message) => {
                return <MessageItem key={message.id} {...message} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
