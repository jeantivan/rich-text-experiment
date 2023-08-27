import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { v4 as uuid } from "uuid";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { TMessage } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateMessage(body: string): TMessage {
  return {
    id: uuid(),
    isFav: false,
    isOwn: true,
    status: "received",
    createdAt: dayjs().format(),
    body
  };
}
