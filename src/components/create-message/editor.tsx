import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ScrollArea } from "@/components/ui/scroll-area";

const Placeholder = () => (
  <div className="absolute w-full h-full inset-0 pointer-events-none flex items-center text-neutral-600">
    Enter your message...
  </div>
);

export function Editor() {
  return (
    <div className="w-full flex rounded-xl pl-2">
      <ScrollArea className="w-full relative max-h-20">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="w-full outline-none text-neutral-950 leading-tight" />
          }
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={<Placeholder />}
        />
      </ScrollArea>
    </div>
  );
}
