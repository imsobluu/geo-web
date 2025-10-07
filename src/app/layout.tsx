import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
	),
	title: "Bangkok Area Development Potential | Oasis-H",
	description:
		"Interactive 3D mapping platform showcasing Bangkok's development potential areas. Explore urban development zones with advanced geospatial visualization and GISTDA integration powered by Oasis-H.",
	keywords: [
		"Bangkok",
		"Development",
		"Urban Planning",
		"Oasis-H",
		"GIS",
		"3D Mapping",
		"Area Development",
		"Thailand",
		"GISTDA",
		"Real Estate",
	],
	authors: [{ name: "Oasis-H" }],
	creator: "Oasis-H",
	publisher: "Oasis-H",
	robots: "index, follow",
	openGraph: {
		title: "Bangkok Area Development Potential | Oasis-H",
		description:
			"Explore Bangkok's development potential areas through interactive 3D mapping and urban development visualization.",
		type: "website",
		locale: "en_US",
		siteName: "Bangkok Development Potential - Oasis-H",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Bangkok Area Development Potential - Oasis-H Platform",
			},
		],
		url: "/",
	},
	twitter: {
		card: "summary_large_image",
		title: "Bangkok Area Development Potential | Oasis-H",
		description:
			"Interactive 3D mapping platform for Bangkok's urban development areas powered by Oasis-H.",
		images: ["/og-image.png"],
	},
	icons: {
		icon: [
			{ url: "/favicon-filled.svg", type: "image/svg+xml" },
			{ url: "/tree-icon.svg", sizes: "32x32", type: "image/svg+xml" },
		],
		apple: { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
		shortcut: { url: "/favicon-filled.svg", type: "image/svg+xml" },
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#042918",
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`}>
			<body>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}
