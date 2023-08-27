import { useEffect, useMemo, useState } from "react";
import groupBy from "lodash/groupBy";
import {
  Smile,
  User,
  Cat,
  Coffee,
  Ship,
  Gamepad2,
  Lightbulb,
  Flag,
  Hash,
  LucideIcon,
  Laugh,
  LucideProps
} from "lucide-react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_EMOJI } from "@/plugins/EmojiPlugin";

import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { TEmoji } from "@/lib/types";
import { EMOJI_IMAGES_PATH } from "@/lib/constants";

const CATEGORY_KEYS: ReadonlyArray<string> = [
  "Smileys & Emotion",
  "People & Body",
  "Animals & Nature",
  "Food & Drink",
  "Travel & Places",
  "Activities",
  "Objects",
  "Symbols",
  "Flags"
];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Smileys & Emotion": Smile,
  "People & Body": User,
  "Animals & Nature": Cat,
  "Food & Drink": Coffee,
  "Travel & Places": Ship,
  Activities: Gamepad2,
  Objects: Lightbulb,
  Symbols: Hash,
  Flags: Flag
};

type IconProps = { icon: LucideIcon } & LucideProps;
const Icon = ({ icon, ...rest }: IconProps) => {
  const Component = icon;

  return <Component {...rest} />;
};

type EmojiOptionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  emoji: TEmoji;
};
const EmojiOption = ({ emoji, ...rest }: EmojiOptionProps) => (
  <button {...rest} className="w-8 h-8 rounded-md">
    <img
      src={`${EMOJI_IMAGES_PATH}/32/${emoji.image}`}
      className="w-8 h-8"
      alt={`${emoji.name} emoji`}
      loading="lazy"
    />
  </button>
);

const useEmojis = () => {
  const [baseEmojis, setBaseEmojis] = useState<TEmoji[]>([]);

  useEffect(() => {
    import("../../assets/emojis.json").then((res) => {
      setBaseEmojis(res.default as TEmoji[]);
    });
  }, []);

  const emojis = useMemo(() => {
    if (baseEmojis.length === 0) {
      return null;
    }

    return groupBy(baseEmojis, "category");
  }, [baseEmojis]);

  return emojis;
};

export function EmojiPicker() {
  const [open, setOpen] = useState(false);
  const [editor] = useLexicalComposerContext();
  const emojis = useEmojis();

  const onSelectEmoji = (emoji: TEmoji) => {
    editor.dispatchCommand(INSERT_EMOJI, emoji);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 shrink-0">
          <Laugh />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        alignOffset={-5}
        side="top"
        sideOffset={10}
        onInteractOutside={(e) => e.preventDefault()}
        className="w-full h-72 overflow-hidden p-0"
      >
        <Tabs className="flex flex-col h-full" defaultValue={CATEGORY_KEYS[0]}>
          <TabsList className="w-full">
            {CATEGORY_KEYS.map((category) => (
              <TabsTrigger
                key={`${category}-content`}
                value={category}
                title={category}
                className="flex-1 border-b-2 border-b-background-7 data-[state=active]:border-cyan-500 rounded-none"
              >
                <Icon icon={CATEGORY_ICONS[category]} className="w-5 h-5" />
              </TabsTrigger>
            ))}
          </TabsList>
          {CATEGORY_KEYS.map((category) => (
            <TabsContent
              key={`${category}-content`}
              asChild
              className="mt-0 p-2 pr-2.5"
              value={category}
            >
              <ScrollArea type="auto">
                {emojis && (
                  <div className="w-full grid place-items-center gap-x-1 gap-y-2 grid-cols-8">
                    {emojis[category].map((emoji) => (
                      <EmojiOption
                        key={emoji.short_name}
                        emoji={emoji}
                        onClick={() => {
                          onSelectEmoji(emoji);
                        }}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
