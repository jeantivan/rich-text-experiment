import { useRef, useState } from "react";
import { Send } from "lucide-react";

import { EditorState } from "lexical";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import ClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import { useLexicalIsTextContentEmpty } from "@lexical/react/useLexicalIsTextContentEmpty";

import AutoLinkPlugin from "@/plugins/AutoLinkPlugin";
import { SaveEditorPlugin, SAVE_EDITOR } from "@/plugins/SaveEditorPlugin";

import { Button } from "@/components/ui/button";

import { createMessage } from "@/lib/utils";

const Placeholder = () => (
  <div className="pl-2 absolute w-full h-full inset-0 pointer-events-none flex items-center text-neutral-600">
    Enter your message...
  </div>
);

const LexicalPlugins = () => (
  <>
    <HistoryPlugin />
    <LinkPlugin />
    <AutoLinkPlugin />
    <ClickableLinkPlugin />
    {/* <TrimEmptyParagraphPlugin /> */}
    <ClearEditorPlugin />
    <HashtagPlugin />
    <SaveEditorPlugin />
  </>
);

function RichText() {
  const editorStateRef = useRef<null | EditorState>();
  const [editor] = useLexicalComposerContext();
  const isEditorEmpty = useLexicalIsTextContentEmpty(editor, true);

  const handleSubmit = () => {
    editor.dispatchCommand(SAVE_EDITOR, {
      onSave: createMessage,
      asHtml: true,
    });
  };

  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-full flex overflow-y-auto bg-neutral-50 border-neutral-100 border p-2 relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="w-full max-h-20 outline-none text-neutral-950" />
          }
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={<Placeholder />}
        />
      </div>
      <Button onClick={handleSubmit} disabled={isEditorEmpty}>
        Submit <Send className="ml-2 h-4 w-4 rotate-45" />
      </Button>
      <OnChangePlugin
        onChange={(editorState) => {
          editorStateRef.current = editorState;
          console.log(editorState);
        }}
      />
      <LexicalPlugins />
    </div>
  );
}

export default RichText;
