"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";

interface CSSGlowCardProps {
	product: {
		id: string;
		name: string;
		price: number;
		image: string;
		rating: number;
		reviews: number;
	};
	glowType?: "blue" | "red" | "green" | "purple" | "rainbow";
}

export function CSSGlowCard({ product, glowType = "blue" }: CSSGlowCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	const getGlowStyles = () => {
		const styles = {
			blue: {
				shadow: "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)",
				border: "2px solid rgba(59, 130, 246, 0.8)",
				background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1), transparent, rgba(59, 130, 246, 0.1))"
			},
			red: {
				shadow: "0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.1)",
				border: "2px solid rgba(239, 68, 68, 0.8)",
				background: "linear-gradient(45deg, rgba(239, 68, 68, 0.1), transparent, rgba(239, 68, 68, 0.1))"
			},
			green: {
				shadow: "0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1)",
				border: "2px solid rgba(16, 185, 129, 0.8)",
				background: "linear-gradient(45deg, rgba(16, 185, 129, 0.1), transparent, rgba(16, 185, 129, 0.1))"
			},
			purple: {
				shadow: "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)",
				border: "2px solid rgba(139, 92, 246, 0.8)",
				background: "linear-gradient(45deg, rgba(139, 92, 246, 0.1), transparent, rgba(139, 92, 246, 0.1))"
			},
			rainbow: {
				shadow: "0 0 20px rgba(255, 0, 150, 0.3), 0 0 40px rgba(0, 255, 150, 0.3), 0 0 60px rgba(150, 0, 255, 0.3)",
				border: "2px solid transparent",
				background: "linear-gradient(45deg, #ff0080, #00ff80, #8000ff, #ff8000)"
			}
		};
		return styles[glowType];
	};

	const glowStyles = getGlowStyles();

	return (
		<div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 dark:bg-neutral-800"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				boxShadow: isHovered ? glowStyles.shadow : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				border: isHovered ? glowStyles.border : "2px solid transparent",
			}}
		>
			{/* 产品图片 */}
			<div className="relative aspect-square overflow-hidden">
				<img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>
				
				{/* 发光边框效果 */}
				<div
					className="absolute inset-0 rounded-2xl transition-opacity duration-300"
					style={{
						background: glowStyles.background,
						opacity: isHovered ? 1 : 0,
					}}
				/>
				
				{/* 悬停操作按钮 */}
				<div className={`absolute inset-0 bg-black/20 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}>
					<button className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110">
						<Eye className="h-5 w-5" />
					</button>
					
					<button className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110">
						<ShoppingCart className="h-5 w-5" />
					</button>
				</div>

				{/* 收藏按钮 */}
				<button
					onClick={() => setIsLiked(!isLiked)}
					className={`absolute right-3 top-3 rounded-full p-2 transition-all hover:scale-110 ${
						isLiked 
							? "bg-red-500 text-white" 
							: "bg-white/90 text-gray-600 hover:bg-white"
					}`}
				>
					<Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
				</button>
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
							<span
								key={i}
								className={`h-4 w-4 ${
									i < Math.floor(product.rating)
										? "text-yellow-400"
										: "text-gray-300"
								}`}
							>
								★
							</span>
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
					
					<button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:scale-105 dark:bg-neutral-700 dark:hover:bg-neutral-600">
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}

// 特殊效果：彩虹边框
export function RainbowBorderCard({ product }: { product: any }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="relative p-1 rounded-2xl transition-all duration-500"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				background: isHovered 
					? "linear-gradient(45deg, #ff0080, #00ff80, #8000ff, #ff8000, #ff0080)"
					: "transparent",
				backgroundSize: isHovered ? "400% 400%" : "100% 100%",
				animation: isHovered ? "rainbow-border 2s ease infinite" : "none",
			}}
		>
			<div className="bg-white rounded-2xl overflow-hidden dark:bg-neutral-800">
				<CSSGlowCard product={product} glowType="blue" />
			</div>
			
			<style jsx>{`
				@keyframes rainbow-border {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}
			`}</style>
		</div>
	);
}

// 特殊效果：脉冲光
export function PulseGlowCard({ product }: { product: any }) {
	return (
		<div className="relative">
			<div
				className="absolute inset-0 rounded-2xl opacity-75"
				style={{
					background: "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))",
					animation: "pulse-glow 2s ease-in-out infinite alternate",
				}}
			/>
			<div className="relative">
				<CSSGlowCard product={product} glowType="blue" />
			</div>
			
			<style jsx>{`
				@keyframes pulse-glow {
					from {
						box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
					}
					to {
						box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4);
					}
				}
			`}</style>
		</div>
	);
}

// 使用示例
export function CSSGlowProductGrid() {
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
			<CSSGlowCard product={products[0]} glowType="blue" />
			<CSSGlowCard product={products[1]} glowType="purple" />
			<PulseGlowCard product={products[2]} />
		</div>
	);
}
