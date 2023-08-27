export type TMessage = {
  id: string;
  createdAt: string;
  isOwn: boolean;
  isFav: boolean;
  status: "idle" | "send" | "received" | "read";
  body: string;
};

type BaseEmoji = { unified: string; image: string; native: string };

export type TEmoji = BaseEmoji & {
  name: string;
  short_name: string;
  short_names: string[];
  skin_variations?: { [key: string]: BaseEmoji };
  category: string;
  sort_order: number;
};
