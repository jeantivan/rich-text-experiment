export type TMessage = {
  id: string;
  createdAt: string;
  isOwn: boolean;
  isFav: boolean;
  status: "idle" | "send" | "received" | "read";
  message: {
    content: string | number;
  };
};
