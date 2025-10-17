import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductSlider, HeroSlider } from "@/ui/components/ProductSlider";

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

	// Hero slides data
	const heroSlides = [
		{
			id: "1",
			title: "Discover Amazing Products",
			subtitle: "Shop the latest trends with unbeatable prices",
			image: "/hero-1.jpg",
			ctaText: "Shop Now",
			ctaLink: "/products",
			badge: "New Collection"
		},
		{
			id: "2", 
			title: "Premium Quality",
			subtitle: "Crafted with care for the modern lifestyle",
			image: "/hero-2.jpg",
			ctaText: "Explore",
			ctaLink: "/collections/premium",
			badge: "Limited Time"
		},
		{
			id: "3",
			title: "Fast & Free Shipping",
			subtitle: "Get your orders delivered in 24 hours",
			image: "/hero-3.jpg", 
			ctaText: "Learn More",
			ctaLink: "/shipping",
			badge: "Free Delivery"
		}
	];

	return (
		<>
			{/* Hero Slider */}
			<HeroSlider slides={heroSlides} />
			
			{/* Featured Products Slider */}
			<section className="mx-auto max-w-7xl p-4 pb-12 sm:p-8 sm:pb-16">
				<ProductSlider
					products={products}
					title="Featured Products"
					showNavigation={true}
					showPagination={true}
					autoplay={true}
					slidesPerView={3}
					spaceBetween={30}
					effect="slide"
				/>
			</section>
			
			{/* New Arrivals Slider */}
			<section className="mx-auto max-w-7xl p-4 pb-12 sm:p-8 sm:pb-16">
				<ProductSlider
					products={products}
					title="New Arrivals"
					showNavigation={true}
					showPagination={false}
					autoplay={true}
					slidesPerView={4}
					spaceBetween={20}
					effect="slide"
				/>
			</section>
			
			{/* Best Sellers Slider */}
			<section className="mx-auto max-w-7xl p-4 pb-12 sm:p-8 sm:pb-16">
				<ProductSlider
					products={products}
					title="Best Sellers"
					showNavigation={false}
					showPagination={true}
					autoplay={false}
					slidesPerView={2}
					spaceBetween={40}
					effect="slide"
				/>
			</section>
		</>
	);
}
