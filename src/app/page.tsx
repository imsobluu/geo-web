"use client";

import { useRef, useState } from "react";
import Header from "~/components/Header";
import HeroSection from "~/components/HeroSection";
import SphereMap, { type SphereMapRef } from "~/components/gistda/SphereMap";
import BangkokMap from "~/components/BangkokMap";

export default function Home() {
	const sphereMapRef = useRef<SphereMapRef>(null);
	const [navigationStatus, setNavigationStatus] = useState<string | null>(
		null
	);
	const [selectedLocation, setSelectedLocation] = useState<{
		id: string;
		coordinates: [number, number];
		name: string;
		description: string;
	} | null>(null);

	const handleLocationClick = (location: {
		id: string;
		coordinates: [number, number];
		name: string;
		description: string;
	}) => {
		// Set the selected location for display
		setSelectedLocation(location);

		// Show navigation status
		setNavigationStatus(
			`กำลังนำทางไปยัง ${location.name} (${location.id})`
		);

		// Navigate to the location on the SphereMap
		console.log(
			`Navigating to location ${location.id} (${location.name}) at coordinates:`,
			location.coordinates
		);

		// Navigate to the location on the map with a slight delay to allow scrolling
		setTimeout(() => {
			sphereMapRef.current?.navigateToLocation(location.coordinates, 16);

			// Clear navigation status after navigation completes
			setTimeout(() => {
				setNavigationStatus(null);
			}, 3000);
		}, 1000);
	};

	return (
		<div className="flex flex-col min-h-screen bg-[#042918] text-white">
			{/* Navigation Status Notification */}
			{navigationStatus && (
				<div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#A3E047] text-[#042918] px-6 py-3 rounded-full font-medium shadow-lg animate-pulse">
					{navigationStatus}
				</div>
			)}

			{/* Header */}
			<div className="flex-shrink-0">
				<Header />
			</div>

			{/* Hero Section */}
			<div className="flex-shrink-0">
				<HeroSection />
			</div>

			{/* Main Content Area with Maps */}
			<div className="flex-1 flex flex-col p-6 gap-6 min-h-0">
				{/* Maps Container */}
				<div className="flex-1 flex lg:flex-row flex-col gap-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 min-h-0">
					{/* Map Section */}
					<section className="flex-1 flex flex-col min-h-0">
						{/* Section heading */}
						<div className="flex-shrink-0 mb-6">
							<h2 className="text-2xl lg:text-3xl font-light text-white mb-2">
								แผนที่แสดงศักยภาพพัฒนาพื้นที่
							</h2>
							<p className="text-white/60 text-lg">
								Interactive map showing development potential
								areas
							</p>
						</div>

						{/* Map Integration - Flex container for map */}
						<div className="flex-1 flex flex-col relative min-h-0">
							{/* Selected Location Details */}
							{selectedLocation && (
								<div className="absolute bottom-2 left-2 z-30 bg-black/25 border border-[#A3E047]/30 rounded-lg p-4 max-w-xs backdrop-blur-sm">
									<h4 className="text-black font-medium mb-2">
										{selectedLocation.name} -{" "}
										{selectedLocation.id}
									</h4>
									<p className="text-black/80 text-sm mb-3 whitespace-pre-line">
										{selectedLocation.description}
									</p>
									<div className="text-black/60 text-xs">
										พิกัด: {selectedLocation.coordinates[1]}
										, {selectedLocation.coordinates[0]}
									</div>
								</div>
							)}

							{/* Map component container - takes remaining space */}
							<div className="flex-1 rounded-2xl overflow-hidden border text-black border-white/10 bg-black/20 backdrop-blur-sm">
								<SphereMap
									ref={sphereMapRef}
									className="w-full h-full"
									height="100%"
								/>
							</div>
						</div>
					</section>

					{/* Bangkok Map Section */}
					<section className="flex-1 flex flex-col min-h-0">
						<div className="flex-1 flex flex-col">
							<BangkokMap
								onLocationClick={handleLocationClick}
								className="flex-1"
							/>
						</div>
					</section>
				</div>
			</div>

			{/* Background decoration - kept as absolute positioned */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
				{/* Top right aerial view */}
				<div className="absolute top-0 right-0 w-96 h-96 opacity-20">
					<div className="w-full h-full bg-gradient-to-bl from-green-400/30 to-transparent rounded-full blur-3xl"></div>
				</div>

				{/* Bottom left aerial view */}
				<div className="absolute bottom-0 left-0 w-80 h-80 opacity-20">
					<div className="w-full h-full bg-gradient-to-tr from-green-300/30 to-transparent rounded-full blur-3xl"></div>
				</div>
			</div>
		</div>
	);
}
