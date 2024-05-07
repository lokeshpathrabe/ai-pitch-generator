import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "./ui/badge";
import { Account } from "@prisma/client";
import { Button } from "./ui/button";

export function CreditsMenu({ account }: { account: Account | null }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant={"outline"}>{`${account?.credits} credits`}</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[260px] bg-background border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Credits available</h3>
            <div className="flex items-center gap-2">
              <Badge>{account?.credits}</Badge>
            </div>
          </div>
          <div className="text-xs py-1">
            Generating pitch costs 1 credit / pitch
          </div>
          <div className="flex justify-center flex-col text-sm pt-8">
            <Button>Buy more</Button>
            <div className="text-center py-1">5 credits / $1</div>
          </div>
          <Popover.Arrow className="fill-foreground" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
