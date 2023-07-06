import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { v4 as uuid } from "uuid";

import useMessageStore from "@/lib/store";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { TMessage } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateMessage(content: string): TMessage {
  return {
    id: uuid(),
    isFav: false,
    isOwn: true,
    status: "received",
    createdAt: dayjs().format(),
    message: {
      content,
    },
  };
}

export function createMessage(content: string) {
  const newMessage = generateMessage(content);

  useMessageStore.setState((prev) => ({
    messages: new Map(prev.messages).set(newMessage.id, newMessage),
  }));
}
