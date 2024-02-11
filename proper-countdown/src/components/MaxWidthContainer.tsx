import React from "react";
import { cn } from "../lib/clsxTwMerge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MaxWidthContainer({ children, className }: Props) {
  return (
    <div
      className={cn("mx-auto w-[100%] max-w-[1200px] px-5 md:px-10", className)}
    >
      {children}
    </div>
  );
}
