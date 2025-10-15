import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { AccountManagement } from "@/ui/components/AccountManagement";

export default function AccountPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<AccountManagement />
			</section>
		</Suspense>
	);
}
