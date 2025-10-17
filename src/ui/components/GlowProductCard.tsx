"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";

interface GlowProductCardProps {
	product: {
		id: string;
		name: string;
		price: number;
		image: string;
		rating: number;
		reviews: number;
	};
	glowColor?: string;
	glowIntensity?: number;
}

export function GlowProductCard({ 
	product, 
	glowColor = "#3b82f6", 
	glowIntensity = 0.8 
}: GlowProductCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	return (
		<motion.div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 dark:bg-neutral-800"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			whileHover={{ 
				y: -8,
				scale: 1.02
			}}
			style={{
				boxShadow: isHovered 
					? `
						0 0 20px ${glowColor}40,
						0 0 40px ${glowColor}30,
						0 0 60px ${glowColor}20,
						0 0 80px ${glowColor}10
					`
					: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				border: isHovered ? `2px solid ${glowColor}80` : "2px solid transparent",
			}}
		>
			{/* 产品图片 */}
			<div className="relative aspect-square overflow-hidden">
				<motion.img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover transition-transform duration-500"
					whileHover={{ scale: 1.1 }}
				/>
				
				{/* 发光边框效果 */}
				<motion.div
					className="absolute inset-0 rounded-2xl"
					style={{
						background: `linear-gradient(45deg, ${glowColor}20, transparent, ${glowColor}20)`,
						opacity: isHovered ? 1 : 0,
					}}
					transition={{ duration: 0.3 }}
				/>
				
				{/* 悬停操作按钮 */}
				<motion.div
					className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 1 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
					>
						<Eye className="h-5 w-5" />
					</motion.button>
					
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
					>
						<ShoppingCart className="h-5 w-5" />
					</motion.button>
				</motion.div>

				{/* 收藏按钮 */}
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsLiked(!isLiked)}
					className={`absolute right-3 top-3 rounded-full p-2 transition-all ${
						isLiked 
							? "bg-red-500 text-white" 
							: "bg-white/90 text-gray-600 hover:bg-white"
					}`}
				>
					<Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
				</motion.button>
			</div>

			{/* 产品信息 */}
			<div className="p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
					{product.name}
				</h3>
				
				{/* 评分 */}
				<div className="flex items-center space-x-1 mb-3">
					<div className="flex">
						{[...Array(5)].map((_, i) => (
							<motion.div
								key={i}
								whileHover={{ scale: 1.2 }}
								className={`h-4 w-4 ${
									i < Math.floor(product.rating)
										? "text-yellow-400 fill-current"
										: "text-gray-300"
								}`}
							>
								★
							</motion.div>
						))}
					</div>
					<span className="text-sm text-gray-500 dark:text-neutral-400">
						({product.reviews})
					</span>
				</div>

				{/* 价格和按钮 */}
				<div className="flex items-center justify-between">
					<p className="text-xl font-bold text-gray-900 dark:text-neutral-100">
						${product.price}
					</p>
					
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
					>
						Add to Cart
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
}

// 多种光效颜色变体
export function RainbowGlowCard({ product }: { product: any }) {
	const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];
	const [currentColor, setCurrentColor] = useState(colors[0]);

	return (
		<div
			onMouseEnter={() => {
				const randomColor = colors[Math.floor(Math.random() * colors.length)];
				setCurrentColor(randomColor);
			}}
		>
			<GlowProductCard 
				product={product} 
				glowColor={currentColor}
				glowIntensity={1.0}
			/>
		</div>
	);
}

// 脉冲光效
export function PulseGlowCard({ product }: { product: any }) {
	return (
		<motion.div
			animate={{
				boxShadow: [
					"0 0 20px rgba(59, 130, 246, 0.3)",
					"0 0 40px rgba(59, 130, 246, 0.6)",
					"0 0 20px rgba(59, 130, 246, 0.3)",
				],
			}}
			transition={{
				duration: 2,
				repeat: Infinity,
				ease: "easeInOut",
			}}
		>
			<GlowProductCard 
				product={product} 
				glowColor="#3b82f6"
				glowIntensity={0.6}
			/>
		</motion.div>
	);
}

// 使用示例
export function GlowProductGrid() {
	const products = [
		{
			id: "1",
			name: "时尚连衣裙",
			price: 89.99,
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.5,
			reviews: 128
		},
		{
			id: "2",
			name: "优雅上衣",
			price: 59.99,
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.8,
			reviews: 256
		},
		{
			id: "3",
			name: "夏日短裙",
			price: 45.99,
			image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.3,
			reviews: 89
		}
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<GlowProductCard product={products[0]} glowColor="#3b82f6" />
			<RainbowGlowCard product={products[1]} />
			<PulseGlowCard product={products[2]} />
		</div>
	);
}
