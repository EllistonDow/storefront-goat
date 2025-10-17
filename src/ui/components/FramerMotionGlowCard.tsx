"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useAnimation, useInView } from "framer-motion";
import { Heart, ShoppingCart, Eye, Star, Zap, Sparkles, Flame, Droplets } from "lucide-react";

interface FramerMotionGlowCardProps {
	product: {
		id: string;
		name: string;
		price: number;
		image: string;
		rating: number;
		reviews: number;
	};
	animationType?: "magnetic" | "floating" | "morphing" | "particle" | "wave" | "fire";
}

export function FramerMotionGlowCard({ product, animationType = "magnetic" }: FramerMotionGlowCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(cardRef, { once: true, margin: "-100px" });

	// 鼠标位置跟踪
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	// 变换值
	const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
	const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
	const scale = useTransform(mouseX, [-300, 300], [0.95, 1.05]);

	// 弹簧动画
	const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
	const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });
	const springScale = useSpring(scale, { stiffness: 300, damping: 30 });

	// 动画控制
	const controls = useAnimation();

	const handleMouseMove = (event: React.MouseEvent) => {
		if (!cardRef.current) return;
		
		const rect = cardRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		
		mouseX.set(event.clientX - centerX);
		mouseY.set(event.clientY - centerY);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
		setIsHovered(false);
	};

	// 动画变体
	const cardVariants = {
		hidden: { 
			opacity: 0, 
			y: 50,
			rotateX: -15,
			scale: 0.8
		},
		visible: { 
			opacity: 1, 
			y: 0,
			rotateX: 0,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.46, 0.45, 0.94],
				staggerChildren: 0.1
			}
		},
		hover: {
			y: -20,
			transition: { duration: 0.3, ease: "easeOut" }
		}
	};

	const imageVariants = {
		hidden: { scale: 1.2, opacity: 0 },
		visible: { 
			scale: 1, 
			opacity: 1,
			transition: { duration: 0.6, ease: "easeOut" }
		},
		hover: {
			scale: 1.15,
			rotate: 2,
			transition: { duration: 0.4, ease: "easeOut" }
		}
	};

	const glowVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { 
			opacity: 0,
			scale: 0.8,
			transition: { duration: 0.3 }
		},
		hover: {
			opacity: 1,
			scale: 1.2,
			transition: { duration: 0.4, ease: "easeOut" }
		}
	};

	const buttonVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.8 },
		visible: { 
			opacity: 0,
			y: 20,
			scale: 0.8,
			transition: { duration: 0.3 }
		},
		hover: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { 
				duration: 0.3, 
				ease: "easeOut",
				staggerChildren: 0.1
			}
		}
	};

	const buttonItemVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		hover: { 
			opacity: 1, 
			scale: 1,
			transition: { duration: 0.2, ease: "easeOut" }
		}
	};

	// 粒子动画
	const particles = Array.from({ length: 8 }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		delay: Math.random() * 0.5
	}));

	return (
		<motion.div
			ref={cardRef}
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-neutral-800"
			variants={cardVariants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			whileHover="hover"
			onMouseMove={animationType === "magnetic" ? handleMouseMove : undefined}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={() => setIsHovered(true)}
			style={
				animationType === "magnetic" 
					? {
						rotateX: springX,
						rotateY: springY,
						scale: springScale,
						transformStyle: "preserve-3d"
					}
					: {}
			}
		>
			{/* 产品图片 */}
			<div className="relative aspect-square overflow-hidden">
				<motion.img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover"
					variants={imageVariants}
					whileHover="hover"
				/>
				
				{/* 发光效果 */}
				<motion.div
					className="absolute inset-0 rounded-2xl"
					variants={glowVariants}
					style={{
						background: animationType === "fire" 
							? "radial-gradient(circle, rgba(255, 69, 0, 0.3) 0%, rgba(255, 140, 0, 0.2) 50%, transparent 70%)"
							: animationType === "wave"
							? "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(16, 185, 129, 0.3))"
							: "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
					}}
				/>
				
				{/* 粒子效果 */}
				{animationType === "particle" && isHovered && (
					<div className="absolute inset-0">
						{particles.map((particle) => (
							<motion.div
								key={particle.id}
								className="absolute w-2 h-2 bg-blue-400 rounded-full"
								style={{
									left: `${particle.x}%`,
									top: `${particle.y}%`,
								}}
								initial={{ opacity: 0, scale: 0 }}
								animate={{ 
									opacity: [0, 1, 0],
									scale: [0, 1, 0],
									y: [-20, -40, -60],
									x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
								}}
								transition={{
									duration: 2,
									delay: particle.delay,
									repeat: Infinity,
									ease: "easeOut"
								}}
							/>
						))}
					</div>
				)}
				
				{/* 火焰效果 */}
				{animationType === "fire" && isHovered && (
					<div className="absolute inset-0 flex items-end justify-center">
						{[...Array(5)].map((_, i) => (
							<motion.div
								key={i}
								className="w-1 h-8 bg-gradient-to-t from-orange-500 to-red-500 rounded-full"
								style={{ left: `${20 + i * 15}%` }}
								animate={{
									height: [20, 40, 20],
									opacity: [0.7, 1, 0.7],
									y: [0, -10, 0]
								}}
								transition={{
									duration: 1.5,
									delay: i * 0.1,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							/>
						))}
					</div>
				)}
				
				{/* 波浪效果 */}
				{animationType === "wave" && isHovered && (
					<div className="absolute inset-0">
						{[...Array(3)].map((_, i) => (
							<motion.div
								key={i}
								className="absolute w-full h-full border-2 border-blue-400 rounded-2xl"
								style={{ borderColor: `hsl(${200 + i * 60}, 70%, 50%)` }}
								animate={{
									scale: [1, 1.1, 1],
									opacity: [0.3, 0.7, 0.3],
									rotate: [0, 5, 0]
								}}
								transition={{
									duration: 2,
									delay: i * 0.3,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							/>
						))}
					</div>
				)}
				
				{/* 悬停操作按钮 */}
				<motion.div
					className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-4"
					variants={buttonVariants}
					whileHover="hover"
				>
					<motion.button
						variants={buttonItemVariants}
						className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Eye className="h-5 w-5" />
					</motion.button>
					
					<motion.button
						variants={buttonItemVariants}
						className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<ShoppingCart className="h-5 w-5" />
					</motion.button>
					
					<motion.button
						variants={buttonItemVariants}
						className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Zap className="h-5 w-5" />
					</motion.button>
				</motion.div>

				{/* 收藏按钮 */}
				<motion.button
					onClick={() => setIsLiked(!isLiked)}
					className={`absolute right-3 top-3 rounded-full p-2 transition-all ${
						isLiked 
							? "bg-red-500 text-white" 
							: "bg-white/90 text-gray-600 hover:bg-white"
					}`}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						animate={isLiked ? { rotate: [0, 10, -10, 0] } : {}}
						transition={{ duration: 0.5 }}
					>
						<Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
					</motion.div>
				</motion.button>
			</div>

			{/* 产品信息 */}
			<motion.div 
				className="p-6"
				variants={{
					hidden: { opacity: 0, y: 20 },
					visible: { 
						opacity: 1, 
						y: 0,
						transition: { delay: 0.3, duration: 0.5 }
					}
				}}
			>
				<motion.h3 
					className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2"
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.2 }}
				>
					{product.name}
				</motion.h3>
				
				{/* 评分 */}
				<div className="flex items-center space-x-1 mb-3">
					<div className="flex">
						{[...Array(5)].map((_, i) => (
							<motion.span
								key={i}
								className={`h-4 w-4 ${
									i < Math.floor(product.rating)
										? "text-yellow-400"
										: "text-gray-300"
								}`}
								whileHover={{ 
									scale: 1.2,
									rotate: [0, -10, 10, 0],
									transition: { duration: 0.3 }
								}}
								animate={{
									scale: isHovered ? [1, 1.1, 1] : 1,
									transition: { delay: i * 0.05, duration: 0.2 }
								}}
							>
								★
							</motion.span>
						))}
					</div>
					<span className="text-sm text-gray-500 dark:text-neutral-400">
						({product.reviews})
					</span>
				</div>

				{/* 价格和按钮 */}
				<div className="flex items-center justify-between">
					<motion.p 
						className="text-xl font-bold text-gray-900 dark:text-neutral-100"
						whileHover={{ 
							scale: 1.1,
							color: "#3b82f6",
							transition: { duration: 0.2 }
						}}
					>
						${product.price}
					</motion.p>
					
					<motion.button
						className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
						whileHover={{ 
							scale: 1.05,
							boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
						}}
						whileTap={{ scale: 0.95 }}
					>
						Add to Cart
					</motion.button>
				</div>
			</motion.div>
		</motion.div>
	);
}

// 浮动效果卡片
export function FloatingCard({ product }: { product: any }) {
	return (
		<motion.div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-neutral-800"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			whileHover={{ 
				y: -20,
				transition: { duration: 0.3, ease: "easeOut" }
			}}
		>
			<div className="relative aspect-square overflow-hidden">
				<motion.img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover"
					whileHover={{ 
						scale: 1.1,
						rotate: 2,
						transition: { duration: 0.4, ease: "easeOut" }
					}}
				/>
				
				{/* 浮动光效 */}
				<motion.div
					className="absolute inset-0 rounded-2xl"
					style={{
						background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
					}}
					animate={{
						opacity: [0, 0.5, 0],
						scale: [0.8, 1.2, 0.8],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
			</div>
			
			<div className="p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
					{product.name}
				</h3>
				<p className="text-xl font-bold text-gray-900 dark:text-neutral-100">
					${product.price}
				</p>
			</div>
		</motion.div>
	);
}

// 变形效果卡片
export function MorphingCard({ product }: { product: any }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-neutral-800"
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			whileHover={{ 
				scale: 1.05,
				rotateY: 5,
				rotateX: 5,
				transition: { duration: 0.3 }
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative aspect-square overflow-hidden">
				<motion.img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover"
					animate={{
						scale: isHovered ? 1.2 : 1,
						rotate: isHovered ? 5 : 0,
						filter: isHovered ? "brightness(1.2) contrast(1.1)" : "brightness(1) contrast(1)"
					}}
					transition={{ duration: 0.4, ease: "easeOut" }}
				/>
				
				{/* 变形光效 */}
				<motion.div
					className="absolute inset-0 rounded-2xl"
					style={{
						background: "linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))",
					}}
					animate={{
						opacity: isHovered ? 1 : 0,
						scale: isHovered ? 1.1 : 0.8,
						borderRadius: isHovered ? "50%" : "16px",
					}}
					transition={{ duration: 0.4, ease: "easeOut" }}
				/>
			</div>
			
			<div className="p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
					{product.name}
				</h3>
				<p className="text-xl font-bold text-gray-900 dark:text-neutral-100">
					${product.price}
				</p>
			</div>
		</motion.div>
	);
}

// 使用示例
export function FramerMotionProductGrid() {
	const products = [
		{
			id: "1",
			name: "磁力效果 - 科技产品",
			price: 299.99,
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.8,
			reviews: 256
		},
		{
			id: "2",
			name: "粒子效果 - 创意产品",
			price: 199.99,
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.7,
			reviews: 156
		},
		{
			id: "3",
			name: "火焰效果 - 激情产品",
			price: 159.99,
			image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.6,
			reviews: 178
		},
		{
			id: "4",
			name: "波浪效果 - 流动产品",
			price: 89.99,
			image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.5,
			reviews: 128
		},
		{
			id: "5",
			name: "浮动效果 - 轻盈产品",
			price: 79.99,
			image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.3,
			reviews: 203
		},
		{
			id: "6",
			name: "变形效果 - 变化产品",
			price: 129.99,
			image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.4,
			reviews: 145
		}
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<FramerMotionGlowCard product={products[0]} animationType="magnetic" />
			<FramerMotionGlowCard product={products[1]} animationType="particle" />
			<FramerMotionGlowCard product={products[2]} animationType="fire" />
			<FramerMotionGlowCard product={products[3]} animationType="wave" />
			<FloatingCard product={products[4]} />
			<MorphingCard product={products[5]} />
		</div>
	);
}
