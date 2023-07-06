import { create } from "zustand";

import { TMessage } from "@/lib/types";

type MessageStore = {
  messages: Map<string, TMessage>;
};

const useMessageStore = create<MessageStore>()(() => ({
  messages: new Map([
    [
      "1083a395-8628-4b04-b293-46119b9062c5",
      {
        id: "1083a395-8628-4b04-b293-46119b9062c5",
        isFav: false,
        isOwn: false,
        status: "received",
        createdAt: "2023-07-04T20:59:29-04:00",
        message: {
          content: '<p dir="ltr"><span>Test message</span></p>',
        },
      },
    ],
    [
      "425448f6-9719-47fa-b6be-2adeac8ccc78",
      {
        id: "425448f6-9719-47fa-b6be-2adeac8ccc78",
        isFav: false,
        isOwn: false,
        status: "received",
        createdAt: "2023-07-04T20:59:29-04:00",
        message: {
          content: '<p dir="ltr"><span>Test message 2</span></p>',
        },
      },
    ],
  ]),
}));

export default useMessageStore;
