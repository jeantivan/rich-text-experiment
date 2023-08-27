import {
  EditorConfig,
  NodeKey,
  TextNode,
  SerializedTextNode,
  Spread,
  $applyNodeReplacement,
  LexicalNode
} from "lexical";

import { EMOJI_IMAGES_PATH } from "@/lib/constants";
import { TEmoji } from "@/lib/types";

const emojis: Record<string, TEmoji> = await import(
  "@/assets/dictionary-pretty.json"
).then((file) => file.default);

type SerializedEmojiNode = Spread<
  {
    native: string;
  },
  SerializedTextNode
>;

export class EmojiNode extends TextNode {
  __native;

  static getType(): string {
    return "emoji";
  }

  static clone(node: EmojiNode) {
    return new EmojiNode(node.__native, node.__key);
  }

  constructor(native: string, key?: NodeKey) {
    super(native, key);
    this.__native = native;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.emoji;
    if (className !== undefined) {
      span.className = className;
    }

    const { image } = emojis[this.getNative()];
    span.style.backgroundImage = `url(${EMOJI_IMAGES_PATH}/32/${image})`;

    const inner = super.createDOM(config);
    inner.className = "caret-red";
    inner.textContent = this.__native;

    span.appendChild(inner);

    return span;
  }

  updateDOM(
    prevNode: TextNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner as HTMLElement, config);
    return false;
  }

  static importJSON(serializedNode: SerializedEmojiNode): EmojiNode {
    const node = $createEmojiNode(serializedNode.native);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);

    return node;
  }

  exportJSON(): SerializedEmojiNode {
    return {
      ...super.exportJSON(),
      native: this.__native,
      type: "emoji",
      version: 1
    };
  }

  getNative() {
    const self = this.getLatest();
    return self.__native;
  }
}

export function $isEmojiNode(node: LexicalNode | null | undefined) {
  return node instanceof EmojiNode;
}

export function $createEmojiNode(native: string): EmojiNode {
  const node = new EmojiNode(native).setMode("token");

  return $applyNodeReplacement(node);
}
