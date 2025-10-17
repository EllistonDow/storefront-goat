"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { 
	Heart, 
	ShoppingCart, 
	Share2, 
	Star, 
	Minus, 
	Plus, 
	Truck, 
	Shield, 
	RefreshCw,
	ChevronLeft,
	ChevronRight,
	ZoomIn,
	X
} from "lucide-react";

// 导入 Swiper 样式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

// 产品数据接口
interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	images: string[];
	description: string;
	shortDescription: string;
	category: string;
	brand: string;
	rating: number;
	reviews: number;
	inStock: boolean;
	stockQuantity: number;
	variants: ProductVariant[];
	attributes: ProductAttribute[];
	reviews: ProductReview[];
	relatedProducts: Product[];
}

interface ProductVariant {
	id: string;
	name: string;
	value: string;
	type: "color" | "size" | "material";
	price?: number;
	inStock: boolean;
}

interface ProductAttribute {
	name: string;
	value: string;
	icon?: string;
}

interface ProductReview {
	id: string;
	user: string;
	rating: number;
	comment: string;
	date: string;
	verified: boolean;
}

// 产品详情页主组件
interface ProductDetailPageProps {
	product: Product;
	onAddToCart: (product: Product, quantity: number, variants: Record<string, string>) => void;
	onToggleWishlist: (product: Product) => void;
	onShare: (product: Product) => void;
}

export function ProductDetailPage({ 
	product, 
	onAddToCart, 
	onToggleWishlist, 
	onShare 
}: ProductDetailPageProps) {
	const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
	const [quantity, setQuantity] = useState(1);
	const [isLiked, setIsLiked] = useState(false);
	const [activeTab, setActiveTab] = useState("description");
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);

	// 处理变体选择
	const handleVariantChange = (type: string, value: string) => {
		setSelectedVariants(prev => ({
			...prev,
			[type]: value
		}));
	};

	// 处理数量变化
	const handleQuantityChange = (change: number) => {
		setQuantity(prev => Math.max(1, Math.min(product.stockQuantity, prev + change)));
	};

	// 处理添加到购物车
	const handleAddToCart = () => {
		onAddToCart(product, quantity, selectedVariants);
	};

	// 处理收藏切换
	const handleToggleWishlist = () => {
		setIsLiked(!isLiked);
		onToggleWishlist(product);
	};

	// 处理分享
	const handleShare = () => {
		onShare(product);
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* 面包屑导航 */}
				<nav className="mb-8">
					<ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-neutral-400">
						<li>首页</li>
						<li>/</li>
						<li>{product.category}</li>
						<li>/</li>
						<li className="text-gray-900 dark:text-neutral-100">{product.name}</li>
					</ol>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* 产品图片区域 */}
					<div className="space-y-4">
						{/* 主图片轮播 */}
						<div className="relative">
							<Swiper
								spaceBetween={10}
								navigation={true}
								thumbs={{ swiper: thumbsSwiper }}
								modules={[Navigation, Pagination, Thumbs]}
								className="product-main-swiper rounded-lg overflow-hidden"
								onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
							>
								{product.images.map((image, index) => (
									<SwiperSlide key={index}>
										<div 
											className="relative aspect-square cursor-zoom-in"
											onClick={() => setIsImageModalOpen(true)}
										>
											<img
												src={image}
												alt={`${product.name} ${index + 1}`}
												className="h-full w-full object-cover"
											/>
											<div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
												<ZoomIn className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>

							{/* 图片缩略图 */}
							<div className="mt-4">
								<Swiper
									onSwiper={setThumbsSwiper}
									spaceBetween={10}
									slidesPerView={4}
									freeMode={true}
									watchSlidesProgress={true}
									modules={[FreeMode, Thumbs]}
									className="product-thumbs-swiper"
								>
									{product.images.map((image, index) => (
										<SwiperSlide key={index}>
											<div 
												className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
													selectedImage === index 
														? "border-blue-500" 
														: "border-transparent hover:border-gray-300"
												}`}
											>
												<img
													src={image}
													alt={`${product.name} ${index + 1}`}
													className="h-full w-full object-cover"
												/>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>
					</div>

					{/* 产品信息区域 */}
					<div className="space-y-6">
						{/* 产品标题和品牌 */}
						<div>
							<p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
								{product.brand}
							</p>
							<h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
								{product.name}
							</h1>
							
							{/* 评分 */}
							<div className="flex items-center space-x-2 mb-4">
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${
												i < Math.floor(product.rating)
													? "text-yellow-400 fill-current"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-gray-500 dark:text-neutral-400">
									{product.rating} ({product.reviews} 评价)
								</span>
							</div>
						</div>

						{/* 价格 */}
						<div className="flex items-center space-x-4">
							<span className="text-3xl font-bold text-gray-900 dark:text-neutral-100">
								${product.price}
							</span>
							{product.originalPrice && (
								<span className="text-xl text-gray-500 line-through">
									${product.originalPrice}
								</span>
							)}
							{product.originalPrice && (
								<span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
									省 ${product.originalPrice - product.price}
								</span>
							)}
						</div>

						{/* 简短描述 */}
						<p className="text-gray-600 dark:text-neutral-400">
							{product.shortDescription}
						</p>

						{/* 产品变体选择 */}
						{product.variants.length > 0 && (
							<div className="space-y-4">
								{Object.entries(
									product.variants.reduce((acc, variant) => {
										if (!acc[variant.type]) acc[variant.type] = [];
										acc[variant.type].push(variant);
										return acc;
									}, {} as Record<string, ProductVariant[]>)
								).map(([type, variants]) => (
									<div key={type}>
										<h3 className="text-sm font-medium text-gray-900 dark:text-neutral-100 mb-2">
											{type === "color" ? "颜色" : type === "size" ? "尺寸" : "材质"}
										</h3>
										<div className="flex flex-wrap gap-2">
											{variants.map((variant) => (
												<button
													key={variant.id}
													onClick={() => handleVariantChange(type, variant.value)}
													className={`px-4 py-2 rounded-lg border transition-colors ${
														selectedVariants[type] === variant.value
															? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
															: "border-gray-300 hover:border-gray-400 dark:border-neutral-600 dark:hover:border-neutral-500"
													} ${!variant.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
													disabled={!variant.inStock}
												>
													{variant.value}
												</button>
											))}
										</div>
									</div>
								))}
							</div>
						)}

						{/* 数量选择 */}
						<div>
							<h3 className="text-sm font-medium text-gray-900 dark:text-neutral-100 mb-2">
								数量
							</h3>
							<div className="flex items-center space-x-3">
								<button
									onClick={() => handleQuantityChange(-1)}
									disabled={quantity <= 1}
									className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed dark:border-neutral-600"
								>
									<Minus className="h-4 w-4" />
								</button>
								<span className="px-4 py-2 border border-gray-300 rounded-lg dark:border-neutral-600">
									{quantity}
								</span>
								<button
									onClick={() => handleQuantityChange(1)}
									disabled={quantity >= product.stockQuantity}
									className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed dark:border-neutral-600"
								>
									<Plus className="h-4 w-4" />
								</button>
							</div>
							<p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
								库存: {product.stockQuantity} 件
							</p>
						</div>

						{/* 操作按钮 */}
						<div className="space-y-3">
							<div className="flex space-x-3">
								<motion.button
									onClick={handleAddToCart}
									disabled={!product.inStock}
									className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
										product.inStock
											? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
											: "bg-gray-300 text-gray-500 cursor-not-allowed"
									}`}
									whileHover={product.inStock ? { scale: 1.02 } : {}}
									whileTap={product.inStock ? { scale: 0.98 } : {}}
								>
									<ShoppingCart className="h-5 w-5 mr-2 inline" />
									{product.inStock ? "加入购物车" : "缺货"}
								</motion.button>
								
								<motion.button
									onClick={handleToggleWishlist}
									className={`p-3 rounded-lg border transition-all ${
										isLiked
											? "border-red-500 bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200"
											: "border-gray-300 hover:border-gray-400 dark:border-neutral-600 dark:hover:border-neutral-500"
									}`}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
								</motion.button>
								
								<motion.button
									onClick={handleShare}
									className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all dark:border-neutral-600 dark:hover:border-neutral-500"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Share2 className="h-5 w-5" />
								</motion.button>
							</div>
						</div>

						{/* 产品特性 */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							{product.attributes.map((attr, index) => (
								<div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
									{attr.icon && <span className="text-lg">{attr.icon}</span>}
									<div>
										<p className="text-sm font-medium text-gray-900 dark:text-neutral-100">
											{attr.name}
										</p>
										<p className="text-sm text-gray-500 dark:text-neutral-400">
											{attr.value}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* 服务保障 */}
						<div className="space-y-3">
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-neutral-400">
								<Truck className="h-4 w-4" />
								<span>免费配送</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-neutral-400">
								<Shield className="h-4 w-4" />
								<span>7天无理由退货</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-neutral-400">
								<RefreshCw className="h-4 w-4" />
								<span>1年质保</span>
							</div>
						</div>
					</div>
				</div>

				{/* 产品详情标签页 */}
				<div className="mt-16">
					<div className="border-b border-gray-200 dark:border-neutral-700">
						<nav className="flex space-x-8">
							{["description", "reviews", "shipping"].map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
										activeTab === tab
											? "border-blue-500 text-blue-600 dark:text-blue-400"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-neutral-400 dark:hover:text-neutral-300"
									}`}
								>
									{tab === "description" ? "产品详情" : 
									 tab === "reviews" ? "用户评价" : "配送信息"}
								</button>
							))}
						</nav>
					</div>

					<div className="py-8">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeTab}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								{activeTab === "description" && (
									<div className="prose max-w-none dark:prose-invert">
										<div dangerouslySetInnerHTML={{ __html: product.description }} />
									</div>
								)}
								
								{activeTab === "reviews" && (
									<div className="space-y-6">
										{product.reviews.map((review) => (
											<div key={review.id} className="border-b border-gray-200 dark:border-neutral-700 pb-6">
												<div className="flex items-center justify-between mb-2">
													<div className="flex items-center space-x-2">
														<span className="font-medium text-gray-900 dark:text-neutral-100">
															{review.user}
														</span>
														{review.verified && (
															<span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
																已验证购买
															</span>
														)}
													</div>
													<div className="flex">
														{[...Array(5)].map((_, i) => (
															<Star
																key={i}
																className={`h-4 w-4 ${
																	i < review.rating
																		? "text-yellow-400 fill-current"
																		: "text-gray-300"
																}`}
															/>
														))}
													</div>
												</div>
												<p className="text-gray-600 dark:text-neutral-400 mb-2">
													{review.comment}
												</p>
												<p className="text-sm text-gray-500 dark:text-neutral-500">
													{review.date}
												</p>
											</div>
										))}
									</div>
								)}
								
								{activeTab === "shipping" && (
									<div className="space-y-4">
										<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
											<h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
												配送信息
											</h3>
											<ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
												<li>• 免费配送至全国</li>
												<li>• 预计3-5个工作日送达</li>
												<li>• 支持货到付款</li>
												<li>• 可追踪物流信息</li>
											</ul>
										</div>
									</div>
								)}
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* 相关产品 */}
				{product.relatedProducts.length > 0 && (
					<div className="mt-16">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-8">
							相关产品
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{product.relatedProducts.map((relatedProduct) => (
								<div key={relatedProduct.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
									<img
										src={relatedProduct.images[0]}
										alt={relatedProduct.name}
										className="h-48 w-full object-cover"
									/>
									<div className="p-4">
										<h3 className="font-medium text-gray-900 dark:text-neutral-100 mb-2">
											{relatedProduct.name}
										</h3>
										<p className="text-lg font-bold text-gray-900 dark:text-neutral-100">
											${relatedProduct.price}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* 图片放大模态框 */}
			<AnimatePresence>
				{isImageModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
						onClick={() => setIsImageModalOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							className="relative max-w-4xl max-h-full"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={() => setIsImageModalOpen(false)}
								className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
							>
								<X className="h-8 w-8" />
							</button>
							<img
								src={product.images[selectedImage]}
								alt={product.name}
								className="max-w-full max-h-full object-contain"
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// 使用示例
export function ProductDetailDemo() {
	const mockProduct: Product = {
		id: "1",
		name: "时尚连衣裙",
		price: 89.99,
		originalPrice: 129.99,
		images: [
			"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
		],
		description: `
			<h2>产品详情</h2>
			<p>这款时尚连衣裙采用优质面料制作，设计简约大方，适合各种场合穿着。</p>
			<h3>面料特性</h3>
			<ul>
				<li>100% 纯棉面料</li>
				<li>透气性好</li>
				<li>易清洗</li>
				<li>不易起球</li>
			</ul>
			<h3>尺码说明</h3>
			<p>请参考尺码表选择合适的尺寸。</p>
		`,
		shortDescription: "优雅的时尚连衣裙，适合各种场合",
		category: "女装",
		brand: "Fashion Brand",
		rating: 4.5,
		reviews: 128,
		inStock: true,
		stockQuantity: 50,
		variants: [
			{ id: "1", name: "颜色", value: "黑色", type: "color", inStock: true },
			{ id: "2", name: "颜色", value: "白色", type: "color", inStock: true },
			{ id: "3", name: "颜色", value: "红色", type: "color", inStock: false },
			{ id: "4", name: "尺寸", value: "S", type: "size", inStock: true },
			{ id: "5", name: "尺寸", value: "M", type: "size", inStock: true },
			{ id: "6", name: "尺寸", value: "L", type: "size", inStock: true },
		],
		attributes: [
			{ name: "材质", value: "100% 纯棉", icon: "🧵" },
			{ name: "产地", value: "中国", icon: "🇨🇳" },
			{ name: "洗涤", value: "机洗", icon: "🧺" }
		],
		reviews: [
			{
				id: "1",
				user: "张小姐",
				rating: 5,
				comment: "质量很好，穿着很舒服，推荐购买！",
				date: "2024-12-15",
				verified: true
			},
			{
				id: "2",
				user: "李女士",
				rating: 4,
				comment: "款式不错，就是颜色比图片稍微深一点。",
				date: "2024-12-10",
				verified: true
			}
		],
		relatedProducts: []
	};

	const handleAddToCart = (product: Product, quantity: number, variants: Record<string, string>) => {
		console.log("添加到购物车:", { product, quantity, variants });
	};

	const handleToggleWishlist = (product: Product) => {
		console.log("切换收藏:", product);
	};

	const handleShare = (product: Product) => {
		console.log("分享产品:", product);
	};

	return (
		<ProductDetailPage
			product={mockProduct}
			onAddToCart={handleAddToCart}
			onToggleWishlist={handleToggleWishlist}
			onShare={handleShare}
		/>
	);
}
