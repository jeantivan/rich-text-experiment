import { Editor } from "./editor";
import { EmojiPicker } from "./emoji-picker";
import { LexicalRoot } from "./root";
import { SendMessage } from "./send-message";

export function CreateMessage() {
  return (
    <LexicalRoot>
      <Editor />
      <EmojiPicker />
      <SendMessage />
    </LexicalRoot>
  );
}
