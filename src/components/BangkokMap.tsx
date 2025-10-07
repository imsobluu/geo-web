"use client";

import { useState } from "react";

interface Location {
	id: string;
	name: string;
	x: number; // x coordinate as percentage
	y: number; // y coordinate as percentage
	coordinates: [number, number]; // [lng, lat] for GISTDA
	description: string;
}

const locations: Location[] = [
	{
		id: "A1",
		name: "พื้นที่เขตบางเขน",
		x: 50, // Central-North Bangkok
		y: 20,
		coordinates: [100.532867, 13.847277], // Bang Khen (District 5)
		description: "พื้นที่ศักยภาพสูง \n เขตบางเขน (District 5)",
	},
	{
		id: "A2",
		name: "พื้นที่เขตปทุมวัน",
		x: 34.5, // Central Bangkok
		y: 47,
		coordinates: [100.534402, 13.738529], // Pathum Wan (District 7)
		description: "พื้นที่ศักยภาพสูง \n เขตปทุมวัน (District 7)",
	},
	{
		id: "B1",
		name: "พื้นที่เขตคลองเตย",
		x: 41, // Eastern Central Bangkok
		y: 52,
		coordinates: [100.559301, 13.720125], // Khlong Toei (District 33)
		description: "พื้นที่ศักยภาพปานกลาง \n เขตคลองเตย (District 33)",
	},
	{
		id: "B2",
		name: "พื้นที่เขตบางขุนเทียน",
		x: 16, // Western Bangkok
		y: 74,
		coordinates: [100.449055, 13.695512], // Bang Khun Thian (District 21)
		description: "พื้นที่ศักยภาพปานกลาง \n เขตบางขุนเทียน (District 21)",
	},
	{
		id: "B3",
		name: "พื้นที่เขตลาดกระบัง",
		x: 75, // Eastern Bangkok
		y: 45,
		coordinates: [100.7493, 13.723062], // Lat Krabang (District 11)
		description: "พื้นที่ศักยภาพปานกลาง \n เขตลาดกระบัง (District 11)",
	},
];

const getLocationColor = (id: string) => {
	switch (id) {
		case "A1":
			return "#A3E047"; // Bright green
		case "A2":
			return "#86D933"; // Green
		case "B1":
			return "#6BCF1F"; // Medium green
		case "B2":
			return "#50C50B"; // Darker green
		case "B3":
			return "#3AB800"; // Dark green
		default:
			return "#A3E047";
	}
};

interface BangkokMapProps {
	onLocationClick?: (location: Location) => void;
	className?: string;
}

export default function BangkokMap({
	onLocationClick,
	className = "",
}: BangkokMapProps) {
	const [selectedLocation, setSelectedLocation] = useState<string | null>(
		"B1"
	);
	const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

	const handleLocationClick = (location: Location) => {
		setSelectedLocation(location.id);
		onLocationClick?.(location);
	};

	return (
		<div
			className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 ${className}`}
		>
			{/* Header */}
			<div className="mb-6">
				<h3 className="text-2xl font-light text-white mb-2">
					แผนที่กรุงเทพมหานคร
				</h3>
				<p className="text-white/60">
					คลิกที่จุดสีเขียวเพื่อดูข้อมูลพื้นที่และไปยังตำแหน่งบนแผนที่
				</p>
			</div>

			{/* Map Container */}
			<div className="relative">
				{/* Bangkok SVG Map */}
				<div className="relative w-full max-w-4xl mx-auto">
					<div
						className="relative w-full rounded-lg overflow-hidden"
						style={{
							aspectRatio: "871 / 692", // SVG viewBox ratio
						}}
					>
						<img
							src="/Blank_Bangkok_Map.svg"
							alt="Bangkok Map"
							className="w-full h-full object-fill filter brightness-75 contrast-125"
						/>

						{/* Location Markers - Positioned relative to the image */}
						<div className="absolute inset-0">
							{locations.map((location) => (
								<div
									key={location.id}
									className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
									style={{
										left: `${location.x}%`,
										top: `${location.y}%`,
									}}
									onClick={() =>
										handleLocationClick(location)
									}
									onMouseEnter={() =>
										setHoveredLocation(location.id)
									}
									onMouseLeave={() =>
										setHoveredLocation(null)
									}
								>
									{/* Outer ring for selected state */}
									{selectedLocation === location.id && (
										<div
											className="absolute rounded-full animate-pulse"
											style={{
												width: "28px",
												height: "28px",
												backgroundColor:
													getLocationColor(
														location.id
													),
												opacity: 0.3,
												top: "50%",
												left: "50%",
												transform:
													"translate(-50%, -50%)",
											}}
										/>
									)}

									{/* Main marker */}
									<div
										className={`w-5 h-5 rounded-full border-2 border-white shadow-lg transition-all duration-200 flex items-center justify-center ${
											hoveredLocation === location.id
												? "scale-125"
												: "scale-100"
										}`}
										style={{
											backgroundColor: getLocationColor(
												location.id
											),
										}}
									>
										<span className="text-[#042918] text-[10px] font-bold">
											{location.id}
										</span>
									</div>

									{/* Tooltip */}
									{hoveredLocation === location.id && (
										<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#042918]/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-white/20">
											<div className="font-medium">
												{location.name}
											</div>
											<div className="text-white/70 text-xs">
												{location.description}
											</div>
											<div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#042918]/90"></div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Legend */}
				<div className="mt-6 bg-[#042918]/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
					<h4 className="text-white font-medium mb-3">
						ระดับศักยภาพพื้นที่
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
						{locations.map((location) => (
							<div
								key={location.id}
								className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
									selectedLocation === location.id
										? "bg-white/10 border border-white/20"
										: "hover:bg-white/5"
								}`}
								onClick={() => handleLocationClick(location)}
							>
								<div
									className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0"
									style={{
										backgroundColor: getLocationColor(
											location.id
										),
									}}
								/>
								<div>
									<div className="text-white text-sm font-medium">
										{location.id}
									</div>
									<div className="text-white/60 text-xs">
										{location.name}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
