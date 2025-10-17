import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { HeroSlider } from "@/ui/components/ProductSlider";

export const metadata = {
	title: "ACME Storefront, powered by Saleor & Next.js",
	description:
		"Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	// 使用网络开源图片的英雄横幅数据
	const heroSlides = [
		{
			id: "1",
			title: "Discover Amazing Products",
			subtitle: "Shop the latest trends with unbeatable prices and premium quality",
			image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			ctaText: "Shop Now",
			ctaLink: "/products",
			badge: "New Collection"
		},
		{
			id: "2", 
			title: "Premium Quality",
			subtitle: "Crafted with care for the modern lifestyle and exceptional durability",
			image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
			ctaText: "Explore",
			ctaLink: "/collections/premium",
			badge: "Limited Time"
		},
		{
			id: "3",
			title: "Fast & Free Shipping",
			subtitle: "Get your orders delivered in 24 hours with our premium shipping service",
			image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80", 
			ctaText: "Learn More",
			ctaLink: "/shipping",
			badge: "Free Delivery"
		},
		{
			id: "4",
			title: "Exclusive Deals",
			subtitle: "Don't miss out on our limited-time offers and exclusive member discounts",
			image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			ctaText: "View Deals",
			ctaLink: "/collections/sale",
			badge: "Hot Deals"
		},
		{
			id: "5",
			title: "Customer Satisfaction",
			subtitle: "Join thousands of satisfied customers who trust our quality and service",
			image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			ctaText: "Read Reviews",
			ctaLink: "/reviews",
			badge: "5-Star Rated"
		}
	];

	return (
		<>
			{/* Hero Slider with Network Images */}
			<HeroSlider slides={heroSlides} />
			
			{/* Featured Products */}
			<section className="mx-auto max-w-7xl p-8 pb-16">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products} />
			</section>
		</>
	);
}
