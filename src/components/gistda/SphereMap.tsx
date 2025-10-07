"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { env } from "~/env";

const TILES_3DT =
	"https://va-cdn-02.vallarismaps.com/core/api/3d/1.0/tiles/66b8e76b869b1bcce1183566/tileset.json?api_key=5tIayeGkvLPb33FlO80Z20BHG4ptpQqGiQbD69mSMORanxJ00PgkxdsLsL2mERZ0";

interface SphereMapProps {
	className?: string;
	height?: string;
}

export interface SphereMapRef {
	navigateToLocation: (coordinates: [number, number], zoom?: number) => void;
}

const SphereMap = forwardRef<SphereMapRef, SphereMapProps>(({
	className = "",
	height = "500px",
}, ref) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Expose navigation function to parent component
	useImperativeHandle(ref, () => ({
		navigateToLocation: (coordinates: [number, number], zoom = 15) => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.goTo({
					center: coordinates,
					zoom: zoom,
					pitch: 60,
					duration: 2000 // 2 second animation
				});
			}
		}
	}));

	useEffect(() => {
		let map: any, myLayer: any;

		function init() {
			if (!mapRef.current || !(window as any).sphere) return;

			map = new (window as any).sphere.Map({
				placeholder: mapRef.current,
			});

			// Store map instance in ref for navigation
			mapInstanceRef.current = map;

			map.Event.bind((window as any).sphere.EventName.Ready, () => {
				const onTilesetLoad = (t: any) =>
					map.goTo({
						center: t.cartographicCenter,
						zoom: t.zoom + 3,
						pitch: 60,
					});

				myLayer = new (window as any).sphere.Layer("3dt", {
					type: (window as any).sphere.LayerType.Tiles3D,
					url: TILES_3DT,
					onTilesetLoad,
					opacity: 0.5,
				});

				map.Layers.add(myLayer);
				setIsLoading(false);
			});
		}

		// Load script if not already loaded
		if ((window as any).sphere) {
			init();
		} else {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://api.sphere.gistda.or.th/map/?key=${env.NEXT_PUBLIC_GISTDA_API_KEY}`;
			script.async = true;
			script.onload = init;
			document.head.appendChild(script);

			return () => {
				if (document.head.contains(script)) {
					document.head.removeChild(script);
				}
			};
		}
	}, []);

	return (
		<div className={`relative ${className}`}>
			{isLoading && (
				<div
					className="absolute inset-0 z-10 flex items-center justify-center bg-gray-800"
					style={{ height }}
				>
					<div className="text-white">Loading Map...</div>
				</div>
			)}
			<div ref={mapRef} style={{ height }} className="w-full" />
		</div>
	);
});

SphereMap.displayName = "SphereMap";

export default SphereMap;
