"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;
	prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallPrompt, setShowInstallPrompt] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			setShowInstallPrompt(true);
		};

		const handleAppInstalled = () => {
			setShowInstallPrompt(false);
			setDeferredPrompt(null);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		window.addEventListener("appinstalled", handleAppInstalled);

		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, []);

	const handleInstallClick = async () => {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		
		if (outcome === "accepted") {
			console.log("PWA installed successfully");
		} else {
			console.log("PWA installation dismissed");
		}
		
		setDeferredPrompt(null);
		setShowInstallPrompt(false);
	};

	const handleDismiss = () => {
		setShowInstallPrompt(false);
		// 记住用户的选择，24小时内不再显示
		localStorage.setItem("pwa-install-dismissed", Date.now().toString());
	};

	// 检查是否在24小时内被用户拒绝过
	useEffect(() => {
		const dismissed = localStorage.getItem("pwa-install-dismissed");
		if (dismissed) {
			const dismissedTime = parseInt(dismissed);
			const now = Date.now();
			const hoursPassed = (now - dismissedTime) / (1000 * 60 * 60);
			
			if (hoursPassed < 24) {
				setShowInstallPrompt(false);
			}
		}
	}, []);

	if (!showInstallPrompt || !deferredPrompt) {
		return null;
	}

	return (
		<div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
			<div className="rounded-lg bg-white p-4 shadow-lg border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
				<div className="flex items-start justify-between">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0">
							<Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
						</div>
						<div className="flex-1">
							<h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
								Install App
							</h3>
							<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
								Install this app on your device for a better experience
							</p>
						</div>
					</div>
					<button
						onClick={handleDismiss}
						className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				<div className="mt-4 flex space-x-3">
					<button
						onClick={handleInstallClick}
						className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
					>
						Install
					</button>
					<button
						onClick={handleDismiss}
						className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 dark:focus:ring-offset-neutral-800"
					>
						Not now
					</button>
				</div>
			</div>
		</div>
	);
}
