"use client";

import { useState } from "react";
import { useSpring, animated, useTransition, useTrail } from "@react-spring/web";
import { Heart, ShoppingCart, Eye, Star, Zap } from "lucide-react";

interface PhysicsGlowCardProps {
	product: {
		id: string;
		name: string;
		price: number;
		image: string;
		rating: number;
		reviews: number;
	};
	physicsType?: "bounce" | "elastic" | "wobble" | "magnetic" | "gravity";
}

export function PhysicsGlowCard({ product, physicsType = "bounce" }: PhysicsGlowCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	// 物理动画配置
	const physicsConfigs = {
		bounce: { tension: 300, friction: 10 },
		elastic: { tension: 400, friction: 25 },
		wobble: { tension: 200, friction: 8 },
		magnetic: { tension: 500, friction: 30 },
		gravity: { tension: 100, friction: 20 }
	};

	// 主卡片动画
	const cardSpring = useSpring({
		transform: isHovered 
			? "translateY(-12px) scale(1.05) rotateX(5deg)" 
			: "translateY(0px) scale(1) rotateX(0deg)",
		boxShadow: isHovered
			? "0 20px 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.2), 0 0 80px rgba(59, 130, 246, 0.1)"
			: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
		borderColor: isHovered ? "rgba(59, 130, 246, 0.8)" : "rgba(255, 255, 255, 0)",
		config: physicsConfigs[physicsType]
	});

	// 图片缩放动画
	const imageSpring = useSpring({
		transform: isHovered ? "scale(1.15) rotate(2deg)" : "scale(1) rotate(0deg)",
		filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1) contrast(1)",
		config: physicsConfigs[physicsType]
	});

	// 发光效果动画
	const glowSpring = useSpring({
		opacity: isHovered ? 1 : 0,
		transform: isHovered ? "scale(1.1)" : "scale(0.8)",
		config: { tension: 400, friction: 20 }
	});

	// 按钮动画序列
	const buttonTrail = useTrail(3, {
		opacity: isHovered ? 1 : 0,
		transform: isHovered ? "translateY(0px) scale(1)" : "translateY(20px) scale(0.8)",
		config: physicsConfigs[physicsType]
	});

	// 磁力效果
	const magneticSpring = useSpring({
		transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
		config: physicsConfigs.magnetic
	});

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		setMousePosition({ x, y });
	};

	return (
		<animated.div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-neutral-800"
			style={physicsType === "magnetic" ? magneticSpring : cardSpring}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
				setMousePosition({ x: 0, y: 0 });
			}}
			onMouseMove={physicsType === "magnetic" ? handleMouseMove : undefined}
		>
			{/* 产品图片 */}
			<div className="relative aspect-square overflow-hidden">
				<animated.img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover"
					style={imageSpring}
				/>
				
				{/* 物理发光效果 */}
				<animated.div
					className="absolute inset-0 rounded-2xl"
					style={{
						...glowSpring,
						background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
					}}
				/>
				
				{/* 动态光粒子效果 */}
				{isHovered && (
					<div className="absolute inset-0">
						{[...Array(6)].map((_, i) => (
							<animated.div
								key={i}
								className="absolute w-2 h-2 bg-blue-400 rounded-full"
								style={{
									left: `${20 + i * 15}%`,
									top: `${30 + i * 10}%`,
									opacity: glowSpring.opacity,
									transform: glowSpring.transform,
									animationDelay: `${i * 0.1}s`,
								}}
							/>
						))}
					</div>
				)}
				
				{/* 悬停操作按钮 */}
				<div className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-4">
					{buttonTrail.map((spring, index) => (
						<animated.button
							key={index}
							style={spring}
							className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
						>
							{index === 0 && <Eye className="h-5 w-5" />}
							{index === 1 && <ShoppingCart className="h-5 w-5" />}
							{index === 2 && <Zap className="h-5 w-5" />}
						</animated.button>
					))}
				</div>

				{/* 收藏按钮 */}
				<animated.button
					onClick={() => setIsLiked(!isLiked)}
					className={`absolute right-3 top-3 rounded-full p-2 transition-all ${
						isLiked 
							? "bg-red-500 text-white" 
							: "bg-white/90 text-gray-600 hover:bg-white"
					}`}
					style={{
						transform: isLiked ? "scale(1.2)" : "scale(1)",
						transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
					}}
				>
					<Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
				</animated.button>
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
							<animated.span
								key={i}
								className={`h-4 w-4 ${
									i < Math.floor(product.rating)
										? "text-yellow-400"
										: "text-gray-300"
								}`}
								style={{
									transform: isHovered ? `scale(${1 + i * 0.05})` : "scale(1)",
									transition: `transform 0.3s ease ${i * 0.05}s`
								}}
							>
								★
							</animated.span>
						))}
					</div>
					<span className="text-sm text-gray-500 dark:text-neutral-400">
						({product.reviews})
					</span>
				</div>

				{/* 价格和按钮 */}
				<div className="flex items-center justify-between">
					<animated.p 
						className="text-xl font-bold text-gray-900 dark:text-neutral-100"
						style={{
							transform: isHovered ? "scale(1.1)" : "scale(1)",
							color: isHovered ? "#3b82f6" : undefined,
							transition: "all 0.3s ease"
						}}
					>
						${product.price}
					</animated.p>
					
					<animated.button
						className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
						style={{
							transform: isHovered ? "scale(1.05)" : "scale(1)",
							boxShadow: isHovered 
								? "0 4px 12px rgba(59, 130, 246, 0.3)" 
								: "0 2px 4px rgba(0, 0, 0, 0.1)",
							transition: "all 0.3s ease"
						}}
					>
						Add to Cart
					</animated.button>
				</div>
			</div>
		</animated.div>
	);
}

// 重力效果卡片
export function GravityCard({ product }: { product: any }) {
	const [isHovered, setIsHovered] = useState(false);

	const gravitySpring = useSpring({
		transform: isHovered 
			? "translateY(-20px) rotateX(10deg) rotateY(5deg)" 
			: "translateY(0px) rotateX(0deg) rotateY(0deg)",
		boxShadow: isHovered
			? "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 60px rgba(59, 130, 246, 0.4)"
			: "0 4px 6px rgba(0, 0, 0, 0.1)",
		config: { tension: 100, friction: 20 }
	});

	return (
		<animated.div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-neutral-800"
			style={gravitySpring}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative aspect-square overflow-hidden">
				<animated.img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover"
					style={{
						transform: isHovered ? "scale(1.2) rotate(-2deg)" : "scale(1) rotate(0deg)",
						transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
					}}
				/>
				
				{/* 重力光效 */}
				<animated.div
					className="absolute inset-0 rounded-2xl"
					style={{
						opacity: isHovered ? 1 : 0,
						background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
						transform: isHovered ? "scale(1.1)" : "scale(0.9)",
						transition: "all 0.6s ease"
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
		</animated.div>
	);
}

// 弹性效果卡片
export function ElasticCard({ product }: { product: any }) {
	const [isHovered, setIsHovered] = useState(false);

	const elasticSpring = useSpring({
		transform: isHovered 
			? "scale(1.1) rotateZ(2deg)" 
			: "scale(1) rotateZ(0deg)",
		boxShadow: isHovered
			? "0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)"
			: "0 4px 6px rgba(0, 0, 0, 0.1)",
		config: { tension: 400, friction: 25 }
	});

	return (
		<animated.div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-neutral-800"
			style={elasticSpring}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative aspect-square overflow-hidden">
				<animated.img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover"
					style={{
						transform: isHovered ? "scale(1.3) rotate(5deg)" : "scale(1) rotate(0deg)",
						transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
					}}
				/>
				
				{/* 弹性光效 */}
				<animated.div
					className="absolute inset-0 rounded-2xl"
					style={{
						opacity: isHovered ? 1 : 0,
						background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
						transform: isHovered ? "scale(1.2)" : "scale(0.5)",
						transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
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
		</animated.div>
	);
}

// 使用示例
export function PhysicsGlowProductGrid() {
	const products = [
		{
			id: "1",
			name: "物理弹跳效果",
			price: 89.99,
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.5,
			reviews: 128
		},
		{
			id: "2",
			name: "重力效果",
			price: 59.99,
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.8,
			reviews: 256
		},
		{
			id: "3",
			name: "弹性效果",
			price: 45.99,
			image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.3,
			reviews: 89
		}
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<PhysicsGlowCard product={products[0]} physicsType="bounce" />
			<GravityCard product={products[1]} />
			<ElasticCard product={products[2]} />
		</div>
	);
}
