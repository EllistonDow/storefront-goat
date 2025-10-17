"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import type { ProductListItemFragment } from "@/gql/graphql";
import { ProductElement } from "./ProductElement";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ProductSliderProps {
	products: readonly ProductListItemFragment[];
	title?: string;
	showNavigation?: boolean;
	showPagination?: boolean;
	autoplay?: boolean;
	slidesPerView?: number;
	spaceBetween?: number;
	effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
}

export function ProductSlider({
	products,
	title = "Featured Products",
	showNavigation = true,
	showPagination = true,
	autoplay = true,
	slidesPerView = 3,
	spaceBetween = 30,
	effect = 'slide'
}: ProductSliderProps) {
	const modules = [Navigation, Pagination];
	if (autoplay) modules.push(Autoplay);
	if (effect === 'fade') modules.push(EffectFade);

	return (
		<div className="w-full">
			{title && (
				<h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-6 text-center">
					{title}
				</h2>
			)}
			
			<Swiper
				modules={modules}
				spaceBetween={spaceBetween}
				slidesPerView={slidesPerView}
				navigation={showNavigation}
				pagination={showPagination ? { clickable: true } : false}
				autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
				effect={effect}
				loop={true}
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 30,
					},
					1024: {
						slidesPerView: slidesPerView,
						spaceBetween: spaceBetween,
					},
				}}
				className="product-swiper"
			>
				{products.map((product) => (
					<SwiperSlide key={product.id}>
						<div className="flex justify-center">
							<ProductElement
								product={product}
								loading="lazy"
								priority={false}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<style jsx global>{`
				.product-swiper .swiper-button-next,
				.product-swiper .swiper-button-prev {
					color: #374151;
					background: rgba(255, 255, 255, 0.8);
					border-radius: 50%;
					width: 44px;
					height: 44px;
					margin-top: -22px;
				}
				
				.product-swiper .swiper-button-next:after,
				.product-swiper .swiper-button-prev:after {
					font-size: 18px;
				}
				
				.product-swiper .swiper-pagination-bullet {
					background: #374151;
					opacity: 0.3;
				}
				
				.product-swiper .swiper-pagination-bullet-active {
					background: #374151;
					opacity: 1;
				}
				
				.dark .product-swiper .swiper-button-next,
				.dark .product-swiper .swiper-button-prev {
					color: #f3f4f6;
					background: rgba(0, 0, 0, 0.8);
				}
				
				.dark .product-swiper .swiper-pagination-bullet {
					background: #f3f4f6;
					opacity: 0.3;
				}
				
				.dark .product-swiper .swiper-pagination-bullet-active {
					background: #f3f4f6;
					opacity: 1;
				}
			`}</style>
		</div>
	);
}

// Hero Banner Slider Component
interface HeroSliderProps {
	slides: Array<{
		id: string;
		title: string;
		subtitle: string;
		image: string;
		ctaText: string;
		ctaLink: string;
		badge?: string;
	}>;
}

export function HeroSlider({ slides }: HeroSliderProps) {
	return (
		<div className="relative">
			<Swiper
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				spaceBetween={0}
				slidesPerView={1}
				navigation={true}
				pagination={{ clickable: true }}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				effect="fade"
				loop={true}
				className="hero-swiper"
			>
				{slides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div 
							className="relative h-[60vh] min-h-[400px] sm:h-[70vh] sm:min-h-[500px] lg:h-[80vh] bg-cover bg-center bg-no-repeat"
							style={{ 
								backgroundImage: `url(${slide.image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat'
							}}
						>
							<div className="absolute inset-0 bg-black/40 sm:bg-black/30" />
							<div className="relative z-10 flex h-full items-center">
								<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
									<div className="max-w-2xl text-center sm:text-left">
										{slide.badge && (
											<div className="mb-4 inline-flex items-center rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm">
												{slide.badge}
											</div>
										)}
										
										<h1 className="mb-4 text-2xl font-bold tracking-tight text-white sm:mb-6 sm:text-4xl lg:text-6xl">
											{slide.title}
										</h1>
										
										<p className="mb-6 text-base text-gray-200 sm:mb-8 sm:text-lg lg:text-xl">
											{slide.subtitle}
										</p>
										
										<LinkWithChannel
											href={slide.ctaLink}
											className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-base font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 sm:px-8 sm:py-3 sm:text-lg"
										>
											{slide.ctaText}
										</LinkWithChannel>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<style jsx global>{`
				.hero-swiper .swiper-button-next,
				.hero-swiper .swiper-button-prev {
					color: white;
					background: rgba(255, 255, 255, 0.2);
					border-radius: 50%;
					width: 44px;
					height: 44px;
					margin-top: -22px;
					backdrop-filter: blur(4px);
				}
				
				.hero-swiper .swiper-button-next:after,
				.hero-swiper .swiper-button-prev:after {
					font-size: 18px;
				}
				
				.hero-swiper .swiper-pagination-bullet {
					background: white;
					opacity: 0.5;
				}
				
				.hero-swiper .swiper-pagination-bullet-active {
					background: white;
					opacity: 1;
				}
			`}</style>
		</div>
	);
}
