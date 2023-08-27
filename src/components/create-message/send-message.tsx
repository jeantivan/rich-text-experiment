import { Send } from "lucide-react";

import { CLEAR_EDITOR_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { PURGE_EDITOR } from "@/plugins/PurgeEditorPlugin";

import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/lib/store";
import { useIsEditorEmpty } from "@/lib/hook";

export function SendMessage() {
  const [editor] = useLexicalComposerContext();
  const isEditorEmpty = useIsEditorEmpty(editor);
  const addMessage = useMessageStore((state) => state.addMessage);

  return (
    <Button
      className="rounded-full"
      disabled={isEditorEmpty}
      onClick={() => {
        editor.dispatchCommand(PURGE_EDITOR, undefined);

        setTimeout(() => {
          const content = editor.getEditorState().toJSON();
          addMessage(JSON.stringify(content));

          editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        }, 0);
      }}
    >
      Submit <Send className="ml-2 h-4 w-4 rotate-45" />
    </Button>
  );
}
