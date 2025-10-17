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

	// 使用时尚美女图片的英雄横幅数据
	const heroSlides = [
		{
			id: "1",
			title: "Fashion Forward",
			subtitle: "Discover the latest trends and style inspiration for the modern woman",
			image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			ctaText: "Shop Fashion",
			ctaLink: "/collections/women",
			badge: "New Collection"
		},
		{
			id: "2", 
			title: "Elegant Style",
			subtitle: "Sophisticated pieces that define your unique personality and grace",
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80",
			ctaText: "Explore Style",
			ctaLink: "/collections/elegant",
			badge: "Premium"
		},
		{
			id: "3",
			title: "Trendy Looks",
			subtitle: "Stay ahead of the curve with our curated selection of trendy outfits",
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
			ctaText: "View Trends",
			ctaLink: "/collections/trendy",
			badge: "Hot Trend"
		},
		{
			id: "4",
			title: "Beauty & Style",
			subtitle: "Complete your look with our beauty essentials and fashion accessories",
			image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			ctaText: "Shop Beauty",
			ctaLink: "/collections/beauty",
			badge: "Beauty"
		},
		{
			id: "5",
			title: "Confident You",
			subtitle: "Express your confidence with pieces that make you feel amazing",
			image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			ctaText: "Be Confident",
			ctaLink: "/collections/confidence",
			badge: "Empower"
		},
		{
			id: "6",
			title: "Summer Vibes",
			subtitle: "Embrace the season with fresh, vibrant styles perfect for summer",
			image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			ctaText: "Summer Style",
			ctaLink: "/collections/summer",
			badge: "Summer"
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
