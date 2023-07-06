import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { HashtagNode } from "@lexical/hashtag";
import { ComponentPropsWithoutRef } from "react";
import theme from "./theme";

const editorConfig = {
  namespace: "RichTextEditor",
  theme: theme,
  nodes: [AutoLinkNode, LinkNode, HashtagNode],
  onError(error: Error) {
    console.error(error);
  },
};

type LexicalRootProps = Omit<
  ComponentPropsWithoutRef<typeof LexicalComposer>,
  "initialConfig"
>;
function LexicalRoot({ children, ...rest }: LexicalRootProps) {
  return (
    <LexicalComposer initialConfig={editorConfig} {...rest}>
      {children}
    </LexicalComposer>
  );
}

export default LexicalRoot;
