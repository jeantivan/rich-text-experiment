import { create } from "zustand";

import { TMessage } from "@/lib/types";
import { generateMessage } from "./utils";

type MessageStore = {
  messages: TMessage[];
  addMessage(message: string): void;
};

export const useMessageStore = create<MessageStore>()((set) => ({
  messages: [
    {
      id: "c55f7244-1678-46a4-844c-d4e88e5a42dd",
      isFav: false,
      isOwn: true,
      status: "received",
      createdAt: "2023-08-24T00:30:20-04:00",
      body: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Mensaje de prueba","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
    }
  ],
  addMessage(body) {
    const message = generateMessage(body);

    return set((state) => ({ messages: [...state.messages, message] }));
  }
}));
