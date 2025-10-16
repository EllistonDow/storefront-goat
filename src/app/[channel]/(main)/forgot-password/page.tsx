import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { ForgotPasswordForm } from "@/ui/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<ForgotPasswordForm />
			</section>
		</Suspense>
	);
}
