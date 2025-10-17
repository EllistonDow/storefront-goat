import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense, type ReactNode } from "react";
import { type Metadata } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import { Providers } from "@/ui/providers/Providers";
import { PWAInstallPrompt } from "@/ui/components/PWAInstallPrompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
	manifest: "/manifest.json",
	themeColor: "#000000",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Saleor Storefront",
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: "Saleor Storefront",
		title: "Saleor Storefront example",
		description: "Starter pack for building performant e-commerce experiences with Saleor.",
	},
	twitter: {
		card: "summary",
		title: "Saleor Storefront example",
		description: "Starter pack for building performant e-commerce experiences with Saleor.",
	},
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh">
			<body className={`${inter.className} min-h-dvh`}>
				<Providers>
					{children}
					<Suspense>
						<DraftModeNotification />
					</Suspense>
					<PWAInstallPrompt />
				</Providers>
			</body>
		</html>
	);
}
