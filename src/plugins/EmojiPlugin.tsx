import { useEffect } from "react";

import emojiRegex from "emoji-regex";

import {
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  TextNode
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { $createEmojiNode, EmojiNode } from "@/nodes/EmojiNode";
import { TEmoji } from "@/lib/types";

export const INSERT_EMOJI = createCommand("INSERT_EMOJI");

const EmojiRegex = emojiRegex();

function findAndTransformEmoji(node: TextNode): null | TextNode {
  const text = node.getTextContent();

  const matchArr = [...text.matchAll(EmojiRegex)];

  if (matchArr.length <= 0) {
    return null;
  }

  const firstMatch = matchArr[0];

  const emojiMatch = firstMatch[0];

  const startOffset = firstMatch.index as number;
  const endOffset = startOffset + emojiMatch.length;

  const nodes = node.splitText(startOffset, endOffset);
  let targetNode;

  if (startOffset === 0) {
    [targetNode] = nodes;
  } else {
    [, targetNode] = nodes;
  }
  const emojiNode = $createEmojiNode(emojiMatch);
  targetNode.replace(emojiNode);

  return emojiNode;
}

const textNodeTransform = (node: TextNode) => {
  let targetNode: TextNode | null = node;

  while (targetNode !== null) {
    if (!targetNode.isSimpleText()) {
      return;
    }

    targetNode = findAndTransformEmoji(targetNode);
  }
};

const insertEmojiCommand = (emoji: TEmoji) => {
  const { native } = emoji;

  const emojiNode = $createEmojiNode(native);
  $insertNodes([emojiNode]);
  //editor.focus();
  return true;
};

export function EmojiPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([EmojiNode])) {
      throw new Error("EmojisPlugin: EmojiNode not registered on editor");
    }

    return mergeRegister(
      editor.registerNodeTransform(TextNode, textNodeTransform),
      editor.registerCommand(
        INSERT_EMOJI,
        insertEmojiCommand,
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor]);

  return null;
}
