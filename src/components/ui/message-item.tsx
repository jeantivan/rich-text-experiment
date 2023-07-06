import { TMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const messageItemVariants = cva(
  ["w-full max-w-[75%] p-1.5 mb-1", "rounded-sm"],
  {
    variants: {
      isOwn: {
        true: "ml-auto bg-blue-500 text-neutral-50",
        false: "mr-auto bg-white text-neutral-900",
      },
    },
  }
);

type MessageItemProps = TMessage;
export function MessageItem(props: MessageItemProps) {
  const { isOwn, message } = props;
  return (
    <div
      className={cn(messageItemVariants({ isOwn }))}
      dangerouslySetInnerHTML={{ __html: message.content }}
    />
  );
}
