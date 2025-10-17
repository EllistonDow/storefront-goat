"use client";

import { PhysicsGlowCard, GravityCard, ElasticCard } from "@/ui/components/PhysicsGlowCard";

export default function PhysicsEffectsDemo() {
	const products = [
		{
			id: "1",
			name: "弹跳效果 - 运动鞋",
			price: 129.99,
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.5,
			reviews: 128
		},
		{
			id: "2",
			name: "重力效果 - 科技产品",
			price: 299.99,
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.8,
			reviews: 256
		},
		{
			id: "3",
			name: "弹性效果 - 奢侈品",
			price: 599.99,
			image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.9,
			reviews: 89
		},
		{
			id: "4",
			name: "磁力效果 - 互动产品",
			price: 199.99,
			image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.7,
			reviews: 156
		},
		{
			id: "5",
			name: "摇摆效果 - 创意产品",
			price: 79.99,
			image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.3,
			reviews: 203
		},
		{
			id: "6",
			name: "组合效果 - 综合产品",
			price: 159.99,
			image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.6,
			reviews: 178
		}
	];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* 标题 */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
						🚀 物理效果光效卡片演示
					</h1>
					<p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
						体验真实的物理效果，包括弹跳、重力、弹性、磁力和摇摆效果
					</p>
				</div>

				{/* 效果说明 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					<div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md">
						<div className="text-2xl mb-2">🏀</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							弹跳效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							真实的弹跳物理效果，适合运动类产品
						</p>
					</div>
					
					<div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md">
						<div className="text-2xl mb-2">🌍</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							重力效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							3D重力感，适合科技产品展示
						</p>
					</div>
					
					<div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md">
						<div className="text-2xl mb-2">🎈</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							弹性效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							橡皮筋般的弹性，适合高端产品
						</p>
					</div>
					
					<div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md">
						<div className="text-2xl mb-2">🧲</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							磁力效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							跟随鼠标移动，高互动性体验
						</p>
					</div>
					
					<div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md">
						<div className="text-2xl mb-2">🌊</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							摇摆效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							波浪般的摇摆，适合创意产品
						</p>
					</div>
					
					<div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md">
						<div className="text-2xl mb-2">✨</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
							组合效果
						</h3>
						<p className="text-sm text-gray-600 dark:text-neutral-400">
							多种效果组合，创造独特体验
						</p>
					</div>
				</div>

				{/* 产品卡片网格 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* 弹跳效果 */}
					<PhysicsGlowCard 
						product={products[0]} 
						physicsType="bounce" 
					/>
					
					{/* 重力效果 */}
					<GravityCard product={products[1]} />
					
					{/* 弹性效果 */}
					<ElasticCard product={products[2]} />
					
					{/* 磁力效果 */}
					<PhysicsGlowCard 
						product={products[3]} 
						physicsType="magnetic" 
					/>
					
					{/* 摇摆效果 */}
					<PhysicsGlowCard 
						product={products[4]} 
						physicsType="wobble" 
					/>
					
					{/* 弹性效果 */}
					<ElasticCard product={products[5]} />
				</div>

				{/* 使用说明 */}
				<div className="mt-16 bg-white dark:bg-neutral-800 rounded-lg p-8 shadow-md">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-6">
						🎯 使用说明
					</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">
								📱 交互方式
							</h3>
							<ul className="space-y-2 text-sm text-gray-600 dark:text-neutral-400">
								<li>• 鼠标悬停查看光效</li>
								<li>• 磁力效果跟随鼠标移动</li>
								<li>• 点击收藏按钮体验动画</li>
								<li>• 不同效果有不同的物理参数</li>
							</ul>
						</div>
						
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">
								⚙️ 技术特点
							</h3>
							<ul className="space-y-2 text-sm text-gray-600 dark:text-neutral-400">
								<li>• 基于 React Spring 物理引擎</li>
								<li>• 真实的物理参数配置</li>
								<li>• 硬件加速优化</li>
								<li>• 响应式设计支持</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
