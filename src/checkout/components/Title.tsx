import clsx from "clsx";
import React, { type PropsWithChildren } from "react";
import { type Classes } from "@/checkout/lib/globalTypes";

export const Title: React.FC<PropsWithChildren<Classes>> = ({ className, children }) => (
	<p className={clsx("mb-2 font-bold text-neutral-900 dark:text-neutral-100", className)}>{children}</p>
);
