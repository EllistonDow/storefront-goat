"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export function ForgotPasswordForm() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const params = useParams<{ channel?: string }>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMessage("");
		setIsLoading(true);

		try {
			const response = await fetch("https://api.saleor.tattoogoat.com/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
						mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
							requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
								errors {
									field
									message
									code
								}
							}
						}
					`,
					variables: {
						email,
						redirectUrl: "https://storefront.saleor.tattoogoat.com/reset-password",
					},
				}),
			});

			const data = await response.json() as {
				data: {
					requestPasswordReset: {
						errors: Array<{ message: string; code: string }>;
					};
				};
			};

			if (data.data.requestPasswordReset.errors.length > 0) {
				const error = data.data.requestPasswordReset.errors[0];
				if (error.code === "NOT_FOUND") {
					setMessage("If an account with this email exists, you will receive a password reset link shortly.");
				} else {
					setError(error.message);
				}
			} else {
				setMessage("If an account with this email exists, you will receive a password reset link shortly.");
			}
		} catch (err) {
			setError("Failed to send password reset email. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<div className="rounded border p-8 shadow-md dark:border-neutral-600 dark:bg-neutral-800">
				<h1 className="mb-6 text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100">Reset Password</h1>
				<p className="mb-6 text-center text-gray-600 dark:text-neutral-400">
					Enter your email address and we'll send you a link to reset your password.
				</p>
				
				{error && (
					<div className="mb-4 rounded bg-red-100 p-3 text-red-700 dark:bg-red-900 dark:text-red-300">
						{error}
					</div>
				)}

				{message && (
					<div className="mb-4 rounded bg-green-100 p-3 text-green-700 dark:bg-green-900 dark:text-green-300">
						{message}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-2 dark:text-neutral-300" htmlFor="email">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="w-full rounded border bg-neutral-50 px-4 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100 dark:placeholder:text-neutral-400"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
							className="w-full rounded bg-neutral-800 px-4 py-2 text-neutral-200 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-600 dark:hover:bg-neutral-500"
					>
						{isLoading ? "Sending..." : "Send Reset Link"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600 dark:text-neutral-400">
						Remember your password?{" "}
						<LinkWithChannel href="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
							Sign in here
						</LinkWithChannel>
					</p>
				</div>
			</div>
		</div>
	);
}
