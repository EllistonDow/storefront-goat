"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";

interface ProductCardProps {
	product: {
		id: string;
		name: string;
		price: number;
		image: string;
		rating: number;
		reviews: number;
	};
}

export function EnhancedProductCard({ product }: ProductCardProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleAddToCart = () => {
		toast.success(`${product.name} 已添加到购物车！`, {
			duration: 2000,
			position: "top-center",
		});
	};

	const handleQuickView = () => {
		toast.success("正在加载产品详情...", {
			duration: 1500,
			position: "top-center",
		});
	};

	const handleLike = () => {
		setIsLiked(!isLiked);
		toast.success(isLiked ? "已取消收藏" : "已添加到收藏", {
			duration: 1500,
			position: "top-center",
		});
	};

	return (
		<>
			<Toaster />
			<motion.div
				className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-neutral-800"
				whileHover={{ y: -8 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Product Image */}
				<div className="relative aspect-square overflow-hidden">
					<motion.img
						src={product.image}
						alt={product.name}
						className="h-full w-full object-cover transition-transform duration-500"
						whileHover={{ scale: 1.1 }}
					/>
					
					{/* Overlay Actions */}
					<AnimatePresence>
						{isHovered && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-4"
							>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={handleQuickView}
									className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
								>
									<Eye className="h-5 w-5" />
								</motion.button>
								
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									onClick={handleAddToCart}
									className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
								>
									<ShoppingCart className="h-5 w-5" />
								</motion.button>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Wishlist Button */}
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={handleLike}
						className={`absolute right-3 top-3 rounded-full p-2 transition-all ${
							isLiked 
								? "bg-red-500 text-white" 
								: "bg-white/90 text-gray-600 hover:bg-white"
						}`}
					>
						<Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
					</motion.button>
				</div>

				{/* Product Info */}
				<div className="p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
						{product.name}
					</h3>
					
					{/* Rating */}
					<div className="flex items-center space-x-1 mb-3">
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`h-4 w-4 ${
										i < Math.floor(product.rating)
											? "text-yellow-400 fill-current"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="text-sm text-gray-500 dark:text-neutral-400">
							({product.reviews})
						</span>
					</div>

					{/* Price */}
					<div className="flex items-center justify-between">
						<p className="text-xl font-bold text-gray-900 dark:text-neutral-100">
							${product.price}
						</p>
						
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleAddToCart}
							className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
						>
							Add to Cart
						</motion.button>
					</div>
				</div>
			</motion.div>
		</>
	);
}

// 使用示例
export function ProductGrid() {
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
			{products.map((product) => (
				<EnhancedProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
