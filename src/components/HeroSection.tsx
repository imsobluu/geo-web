"use client";

import { ArrowRight } from "lucide-react";

export default function HeroSection() {
	return (
		<section className="relative min-h-screen flex items-center justify-center pt-20">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Curved lines - similar to design */}
				<div className="absolute top-20 left-0 w-96 h-96 border border-white/10 rounded-full transform -translate-x-48 -translate-y-48"></div>
				<div className="absolute bottom-20 right-0 w-80 h-80 border border-white/10 rounded-full transform translate-x-40 translate-y-40"></div>
				<div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				{/* Left Content */}
				<div className="space-y-8">
					{/* Small label */}
					<div className="text-white/60 text-sm uppercase tracking-wider">
						ENCOURAGING SUSTAINABLE
					</div>

					{/* Main heading */}
					<div className="space-y-4">
						<h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight">
							Green environment
							<br />
							<span className="text-white/90">and raising</span>
							<br />
							<span className="text-white/90">awareness</span>
						</h1>
					</div>

					{/* Divider line */}
					<div className="w-16 h-px bg-[#A3E047]"></div>

					{/* Description */}
					<p className="text-white/70 text-lg max-w-md leading-relaxed">
						A green environment emphasizes the protection and conservation of natural resources such as forests.
					</p>

					{/* Statistics and users */}
					<div className="flex items-center space-x-6">
						{/* User count */}
						<div className="flex items-center space-x-3">
							<span className="text-3xl font-light text-white">+124</span>
							
							{/* User avatars */}
							<div className="flex -space-x-2">
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#042918]"></div>
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-[#042918]"></div>
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-[#042918]"></div>
							</div>
						</div>
					</div>

					{/* Call to action button */}
					<button className="group flex items-center space-x-4 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full hover:border-[#A3E047] hover:text-[#A3E047] transition-all duration-300">
						<span className="text-sm uppercase tracking-wider">Environmental Education and Awareness</span>
						<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
					</button>
				</div>

				{/* Right Content - Statistics */}
				<div className="space-y-8">
					{/* Recreational areas stat */}
					<div className="text-right">
						<div className="text-white/60 text-sm uppercase tracking-wider mb-2">
							Recreational areas
						</div>
						<div className="text-4xl font-light text-white mb-4">
							150.543
						</div>
						
						{/* Data visualization bars */}
						<div className="flex justify-end space-x-1 mb-8">
							{[40, 60, 80, 45, 70, 55, 90, 35, 65, 50, 75, 45, 60, 40].map((height, index) => (
								<div 
									key={index}
									className="w-1 bg-[#A3E047] opacity-60"
									style={{ height: `${height}px` }}
								></div>
							))}
						</div>
					</div>

					{/* Sustainable Agriculture card */}
					<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-sm ml-auto">
						<div className="flex justify-between items-start mb-4">
							<div className="text-2xl font-light text-white">01</div>
							<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
								<div className="w-6 h-6 bg-[#042918] rounded"></div>
							</div>
						</div>
						
						<h3 className="text-white text-lg font-medium mb-2">
							SUSTAINABLE
							<br />
							AGRICULTURE
						</h3>
						
						<p className="text-white/60 text-sm mb-4">
							Implementing eco-friendly farming practices for sustainable food production.
						</p>
						
						{/* Mini chart */}
						<div className="flex items-end space-x-1 h-12">
							{[30, 45, 60, 40, 70, 55].map((height, index) => (
								<div 
									key={index}
									className="flex-1 bg-[#A3E047] rounded-t"
									style={{ height: `${height}%` }}
								></div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}