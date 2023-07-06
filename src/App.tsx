import { RichText } from "@/components/rich-text";
import LexicalRoot from "@/components/lexical-root";
import { MessageItem } from "@/components/ui/message-item";

import useMessageStore from "@/lib/store";
import { TMessage } from "@/lib/types";

const mapElementsToRender = (elements: Map<string, TMessage>) => {
  const list = [];

  for (const [id, value] of elements) {
    list.push(<MessageItem key={id} {...value} />);
  }

  return list;
};

function App() {
  const messages = useMessageStore((state) => state.messages);

  const renderMessages = mapElementsToRender(messages);

  return (
    <div className="h-screen">
      <div className="p-4 w-full mx-auto max-w-[800px]">
        <div className="bg-white p-1.5 w-full rounded-md mb-4">
          <LexicalRoot>
            <RichText />
          </LexicalRoot>
        </div>
        <div>
          {messages.size <= 0 ? (
            <div className="text-2xl">No messages to show.</div>
          ) : (
            renderMessages
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
