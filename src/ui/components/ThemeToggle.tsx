"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// 防止水合不匹配
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 bg-transparent bg-white text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200">
				<span className="sr-only">Toggle theme</span>
				<div className="h-5 w-5" />
			</button>
		);
	}

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 bg-transparent bg-white text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<Sun className="h-5 w-5" />
			) : (
				<Moon className="h-5 w-5" />
			)}
		</button>
	);
}
