import { TMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { Root } from "./lexical-context";

const messageItemVariants = cva(
  ["w-full max-w-[75%] p-1.5 mb-1", "rounded-sm"],
  {
    variants: {
      isOwn: {
        true: "ml-auto bg-blue-500 text-neutral-50",
        false: "mr-auto bg-white text-neutral-900"
      }
    }
  }
);

type MessageItemProps = TMessage;
export function MessageItem({ isOwn, body }: MessageItemProps) {
  return (
    <Root initialState={body}>
      <div className={cn(messageItemVariants({ isOwn }))}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="whitespace-pre-wrap break-words leading-tight" />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </Root>
  );
}
