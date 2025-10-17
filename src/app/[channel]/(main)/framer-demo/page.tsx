"use client";

import { FramerMotionGlowCard, FloatingCard, MorphingCard } from "@/ui/components/FramerMotionGlowCard";
import { motion } from "framer-motion";

export default function FramerMotionDemo() {
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

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut"
			}
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-neutral-900 dark:to-blue-900 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* 标题区域 */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<motion.h1 
						className="text-5xl font-bold text-gray-900 dark:text-neutral-100 mb-6"
						animate={{
							backgroundPosition: ["0%", "100%", "0%"],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "linear"
						}}
						style={{
							background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
							backgroundSize: "300% 300%",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text"
						}}
					>
						🎬 Framer Motion 光效演示
					</motion.h1>
					
					<motion.p 
						className="text-xl text-gray-600 dark:text-neutral-400 max-w-3xl mx-auto"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						体验强大的 Framer Motion 动画库，包括磁力跟踪、粒子效果、火焰动画、波浪效果等
					</motion.p>
				</motion.div>

				{/* 效果说明卡片 */}
				<motion.div 
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div 
						className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
						variants={itemVariants}
						whileHover={{ y: -5, scale: 1.02 }}
					>
						<div className="text-3xl mb-3">🧲</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							磁力效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							3D鼠标跟踪，卡片跟随鼠标移动和旋转
						</p>
					</motion.div>
					
					<motion.div 
						className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
						variants={itemVariants}
						whileHover={{ y: -5, scale: 1.02 }}
					>
						<div className="text-3xl mb-3">✨</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							粒子效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							动态粒子动画，创造梦幻般的视觉效果
						</p>
					</motion.div>
					
					<motion.div 
						className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
						variants={itemVariants}
						whileHover={{ y: -5, scale: 1.02 }}
					>
						<div className="text-3xl mb-3">🔥</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							火焰效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							动态火焰动画，营造激情氛围
						</p>
					</motion.div>
					
					<motion.div 
						className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
						variants={itemVariants}
						whileHover={{ y: -5, scale: 1.02 }}
					>
						<div className="text-3xl mb-3">🌊</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							波浪效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							多层波浪边框，流动的视觉效果
						</p>
					</motion.div>
					
					<motion.div 
						className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
						variants={itemVariants}
						whileHover={{ y: -5, scale: 1.02 }}
					>
						<div className="text-3xl mb-3">🎈</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							浮动效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							轻盈的浮动动画，呼吸般的光效
						</p>
					</motion.div>
					
					<motion.div 
						className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
						variants={itemVariants}
						whileHover={{ y: -5, scale: 1.02 }}
					>
						<div className="text-3xl mb-3">🔄</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							变形效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							形状变化动画，从方形到圆形
						</p>
					</motion.div>
				</motion.div>

				{/* 产品卡片网格 */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div variants={itemVariants}>
						<FramerMotionGlowCard product={products[0]} animationType="magnetic" />
					</motion.div>
					
					<motion.div variants={itemVariants}>
						<FramerMotionGlowCard product={products[1]} animationType="particle" />
					</motion.div>
					
					<motion.div variants={itemVariants}>
						<FramerMotionGlowCard product={products[2]} animationType="fire" />
					</motion.div>
					
					<motion.div variants={itemVariants}>
						<FramerMotionGlowCard product={products[3]} animationType="wave" />
					</motion.div>
					
					<motion.div variants={itemVariants}>
						<FloatingCard product={products[4]} />
					</motion.div>
					
					<motion.div variants={itemVariants}>
						<MorphingCard product={products[5]} />
					</motion.div>
				</motion.div>

				{/* 技术说明 */}
				<motion.div 
					className="mt-20 bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.6 }}
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
						🚀 Framer Motion 技术特点
					</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">
								🎯 核心功能
							</h3>
							<ul className="space-y-3 text-gray-600 dark:text-neutral-400">
								<li className="flex items-center">
									<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
									鼠标位置跟踪和3D变换
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
									复杂的动画序列和交错动画
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
									手势识别和触摸支持
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
									布局动画和共享元素过渡
								</li>
							</ul>
						</div>
						
						<div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">
								⚡ 性能优势
							</h3>
							<ul className="space-y-3 text-gray-600 dark:text-neutral-400">
								<li className="flex items-center">
									<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
									硬件加速的动画渲染
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
									智能的动画优化和批处理
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
									60fps 流畅动画体验
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
									内存友好的动画管理
								</li>
							</ul>
						</div>
					</div>
				</motion.div>

				{/* 交互提示 */}
				<motion.div 
					className="mt-12 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2, duration: 0.6 }}
				>
					<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
						<h3 className="text-xl font-semibold mb-2">🎮 交互提示</h3>
						<p className="text-blue-100">
							移动鼠标体验磁力效果 • 悬停查看各种动画 • 点击收藏按钮感受反馈
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
