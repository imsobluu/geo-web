"use client";

import { Search } from "lucide-react";

export default function Header() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
			<div className="max-w-7xl mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center">
						<div className="text-white text-xl font-bold tracking-wide">
							OASIS-H
						</div>
					</div>

					{/* Navigation Menu */}
					<nav className="hidden md:flex items-center space-x-8">
						<div className="flex items-center space-x-8 text-sm text-white/80 uppercase tracking-wider">
							<button className="hover:text-[#A3E047] transition-colors">
								{"ข้อมูลพื้นที่"}
							</button>
							<button className="hover:text-[#A3E047] transition-colors">
								{"ข้อมูล Index"}
							</button>
							<button className="hover:text-[#A3E047] transition-colors">
								{"เกี่ยวกับเรา"}
							</button>
						</div>
					</nav>

					{/* Right side - Search and Request */}
					<div className="flex items-center space-x-4">
						{/* Search Icon */}
						<button className="p-2 text-white/80 hover:text-white transition-colors">
							<Search size={20} />
						</button>

						{/* Request Button */}
						<button className="bg-white text-[#042918] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#A3E047] transition-colors">
							REQUEST
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
