"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Share2, ShoppingCart, Eye, Filter, Search } from "lucide-react";

// 产品数据接口
interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	reviews: number;
	category: string;
	tags: string[];
	description: string;
	inStock: boolean;
}

// 产品卡片组件
interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
	onToggleWishlist: (product: Product) => void;
	onViewDetails: (product: Product) => void;
}

export function ModernProductCard({ 
	product, 
	onAddToCart, 
	onToggleWishlist, 
	onViewDetails 
}: ProductCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	return (
		<motion.div
			className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-neutral-800"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			whileHover={{ y: -8, scale: 1.02 }}
		>
			{/* 产品图片 */}
			<div className="relative aspect-square overflow-hidden">
				<motion.img
					src={product.image}
					alt={product.name}
					className="h-full w-full object-cover transition-transform duration-500"
					whileHover={{ scale: 1.1 }}
				/>
				
				{/* 悬停操作按钮 */}
				<motion.div
					className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 1 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.button
						onClick={() => onViewDetails(product)}
						className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Eye className="h-5 w-5" />
					</motion.button>
					
					<motion.button
						onClick={() => onAddToCart(product)}
						className="rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition-all hover:bg-white"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<ShoppingCart className="h-5 w-5" />
					</motion.button>
					
					<motion.button
						onClick={() => {
							setIsLiked(!isLiked);
							onToggleWishlist(product);
						}}
						className={`rounded-full p-3 shadow-lg transition-all ${
							isLiked 
								? "bg-red-500 text-white" 
								: "bg-white/90 text-gray-600 hover:bg-white"
						}`}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
					</motion.button>
				</motion.div>

				{/* 标签 */}
				{product.tags.length > 0 && (
					<div className="absolute left-3 top-3 flex flex-wrap gap-1">
						{product.tags.slice(0, 2).map((tag, index) => (
							<span
								key={index}
								className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white"
							>
								{tag}
							</span>
						))}
					</div>
				)}

				{/* 收藏按钮 */}
				<motion.button
					onClick={() => {
						setIsLiked(!isLiked);
						onToggleWishlist(product);
					}}
					className={`absolute right-3 top-3 rounded-full p-2 transition-all ${
						isLiked 
							? "bg-red-500 text-white" 
							: "bg-white/90 text-gray-600 hover:bg-white"
					}`}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
				</motion.button>
			</div>

			{/* 产品信息 */}
			<div className="p-6">
				{/* 分类 */}
				<p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
					{product.category}
				</p>
				
				{/* 产品名称 */}
				<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2 line-clamp-2">
					{product.name}
				</h3>
				
				{/* 评分 */}
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

				{/* 价格 */}
				<div className="flex items-center space-x-2 mb-4">
					<span className="text-xl font-bold text-gray-900 dark:text-neutral-100">
						${product.price}
					</span>
					{product.originalPrice && (
						<span className="text-sm text-gray-500 line-through">
							${product.originalPrice}
						</span>
					)}
				</div>

				{/* 库存状态 */}
				<div className="mb-4">
					{product.inStock ? (
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
							有库存
						</span>
					) : (
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
							缺货
						</span>
					)}
				</div>

				{/* 操作按钮 */}
				<div className="flex space-x-2">
					<motion.button
						onClick={() => onAddToCart(product)}
						disabled={!product.inStock}
						className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
							product.inStock
								? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						}`}
						whileHover={product.inStock ? { scale: 1.02 } : {}}
						whileTap={product.inStock ? { scale: 0.98 } : {}}
					>
						{product.inStock ? "加入购物车" : "缺货"}
					</motion.button>
					
					<motion.button
						onClick={() => onViewDetails(product)}
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						查看详情
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
}

// 产品筛选组件
interface ProductFilterProps {
	categories: string[];
	priceRange: { min: number; max: number };
	onCategoryChange: (category: string) => void;
	onPriceChange: (range: { min: number; max: number }) => void;
	onReset: () => void;
}

export function ProductFilter({
	categories,
	priceRange: initialPriceRange,
	onCategoryChange,
	onPriceChange,
	onReset
}: ProductFilterProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [priceRange, setPriceRange] = useState(initialPriceRange);

	return (
		<div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
					筛选产品
				</h3>
				<button
					onClick={onReset}
					className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
				>
					重置
				</button>
			</div>

			{/* 分类筛选 */}
			<div className="mb-6">
				<h4 className="text-sm font-medium text-gray-900 dark:text-neutral-100 mb-3">
					分类
				</h4>
				<div className="space-y-2">
					{categories.map((category) => (
						<label key={category} className="flex items-center">
							<input
								type="radio"
								name="category"
								value={category}
								checked={selectedCategory === category}
								onChange={(e) => {
									setSelectedCategory(e.target.value);
									onCategoryChange(e.target.value);
								}}
								className="mr-2 text-blue-600 focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700 dark:text-neutral-300">
								{category}
							</span>
						</label>
					))}
				</div>
			</div>

			{/* 价格范围 */}
			<div className="mb-6">
				<h4 className="text-sm font-medium text-gray-900 dark:text-neutral-100 mb-3">
					价格范围
				</h4>
				<div className="space-y-4">
					<div className="flex space-x-4">
						<input
							type="number"
							placeholder="最低价格"
							value={priceRange.min}
							onChange={(e) => {
								const newRange = { ...priceRange, min: Number(e.target.value) };
								setPriceRange(newRange);
								onPriceChange(newRange);
							}}
							className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
						/>
						<input
							type="number"
							placeholder="最高价格"
							value={priceRange.max}
							onChange={(e) => {
								const newRange = { ...priceRange, max: Number(e.target.value) };
								setPriceRange(newRange);
								onPriceChange(newRange);
							}}
							className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// 产品搜索组件
interface ProductSearchProps {
	onSearch: (query: string) => void;
	placeholder?: string;
}

export function ProductSearch({ onSearch, placeholder = "搜索产品..." }: ProductSearchProps) {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={placeholder}
					className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
				/>
			</div>
		</form>
	);
}

// 产品网格组件
interface ProductGridProps {
	products: Product[];
	onAddToCart: (product: Product) => void;
	onToggleWishlist: (product: Product) => void;
	onViewDetails: (product: Product) => void;
}

export function ProductGrid({ 
	products, 
	onAddToCart, 
	onToggleWishlist, 
	onViewDetails 
}: ProductGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{products.map((product) => (
				<ModernProductCard
					key={product.id}
					product={product}
					onAddToCart={onAddToCart}
					onToggleWishlist={onToggleWishlist}
					onViewDetails={onViewDetails}
				/>
			))}
		</div>
	);
}

// 使用示例
export function EcommerceComponentsDemo() {
	const [products] = useState<Product[]>([
		{
			id: "1",
			name: "时尚连衣裙",
			price: 89.99,
			originalPrice: 129.99,
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.5,
			reviews: 128,
			category: "女装",
			tags: ["新品", "热销"],
			description: "优雅的时尚连衣裙，适合各种场合",
			inStock: true
		},
		{
			id: "2",
			name: "运动鞋",
			price: 159.99,
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.8,
			reviews: 256,
			category: "鞋类",
			tags: ["运动"],
			description: "舒适的运动鞋，适合日常穿着",
			inStock: true
		},
		{
			id: "3",
			name: "智能手表",
			price: 299.99,
			image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
			rating: 4.6,
			reviews: 89,
			category: "电子产品",
			tags: ["智能", "科技"],
			description: "功能丰富的智能手表",
			inStock: false
		}
	]);

	const [filteredProducts, setFilteredProducts] = useState(products);

	const handleAddToCart = (product: Product) => {
		console.log("添加到购物车:", product);
	};

	const handleToggleWishlist = (product: Product) => {
		console.log("切换收藏:", product);
	};

	const handleViewDetails = (product: Product) => {
		console.log("查看详情:", product);
	};

	const handleSearch = (query: string) => {
		const filtered = products.filter(product =>
			product.name.toLowerCase().includes(query.toLowerCase()) ||
			product.description.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredProducts(filtered);
	};

	const handleCategoryChange = (category: string) => {
		const filtered = products.filter(product => product.category === category);
		setFilteredProducts(filtered);
	};

	const handlePriceChange = (range: { min: number; max: number }) => {
		const filtered = products.filter(product =>
			product.price >= range.min && product.price <= range.max
		);
		setFilteredProducts(filtered);
	};

	const handleReset = () => {
		setFilteredProducts(products);
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* 标题 */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
						🛍️ 无头电商组件演示
					</h1>
					<p className="text-lg text-gray-600 dark:text-neutral-400">
						现代化的产品展示和交互组件
					</p>
				</div>

				{/* 搜索和筛选 */}
				<div className="mb-8">
					<div className="flex flex-col lg:flex-row gap-6">
						<div className="flex-1">
							<ProductSearch onSearch={handleSearch} />
						</div>
						<div className="lg:w-80">
							<ProductFilter
								categories={["女装", "鞋类", "电子产品"]}
								priceRange={{ min: 0, max: 1000 }}
								onCategoryChange={handleCategoryChange}
								onPriceChange={handlePriceChange}
								onReset={handleReset}
							/>
						</div>
					</div>
				</div>

				{/* 产品网格 */}
				<ProductGrid
					products={filteredProducts}
					onAddToCart={handleAddToCart}
					onToggleWishlist={handleToggleWishlist}
					onViewDetails={handleViewDetails}
				/>
			</div>
		</div>
	);
}
