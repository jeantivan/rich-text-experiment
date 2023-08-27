import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ComponentPropsWithoutRef } from "react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";

import AutoLinkPlugin from "@/plugins/AutoLinkPlugin";
import { PurgeEditorPlugin } from "@/plugins/PurgeEditorPlugin";
import { EmojiPlugin } from "@/plugins/EmojiPlugin";
import { EmojiNode } from "@/nodes/EmojiNode";

const theme = {
  link: "text-blue-600 hover:underline",
  hashtag: "text-blue-500 bg-blue-50 mx-1",
  emoji:
    "emoji w-5 h-5 inline-block align-top text-transparent bg-cover select-text"
};

const editorConfig = {
  namespace: "RichTextEditor",
  theme: theme,
  nodes: [AutoLinkNode, LinkNode, EmojiNode],
  onError(error: Error) {
    console.error(error);
  }
};

type LexicalRootProps = Omit<
  ComponentPropsWithoutRef<typeof LexicalComposer>,
  "initialConfig"
>;
export function LexicalRoot({ children, ...rest }: LexicalRootProps) {
  return (
    <LexicalComposer initialConfig={editorConfig} {...rest}>
      <div className="w-full flex items-center gap-2 rounded-3xl p-2 bg-white">
        {children}
      </div>
      <HistoryPlugin />
      <LinkPlugin />
      <AutoLinkPlugin />
      <ClickableLinkPlugin />
      <ClearEditorPlugin />
      <PurgeEditorPlugin />
      <EmojiPlugin />
    </LexicalComposer>
  );
}
