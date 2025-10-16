import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { ResetPasswordForm } from "@/ui/components/ResetPasswordForm";

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<ResetPasswordForm />
			</section>
		</Suspense>
	);
}
