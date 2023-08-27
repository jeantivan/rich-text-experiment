import { ReactNode } from "react";

import { EditorState } from "lexical";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import {
  LexicalComposer,
  InitialConfigType
} from "@lexical/react/LexicalComposer";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import { EmojiPlugin } from "@/plugins/EmojiPlugin";
import { EmojiNode } from "@/nodes/EmojiNode";

const theme = {
  link: "text-blue-600 hover:underline",
  hashtag: "text-blue-500 bg-blue-50 mx-1",
  emoji:
    "emoji w-5 h-5 inline-block align-top text-transparent bg-cover select-text"
};

type RootProps = {
  children: ReactNode;
  initialState: string;
};
export function Root({ children, initialState }: RootProps) {
  const editorConfig: InitialConfigType = {
    namespace: "MessageParser",
    theme: theme,
    nodes: [AutoLinkNode, LinkNode, EmojiNode],
    editable: false,
    onError(error: Error) {
      console.error(error);
    },
    editorState: initialState
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <>{children}</>
      <LinkPlugin />
      <EmojiPlugin />
      <ClickableLinkPlugin />
    </LexicalComposer>
  );
}
