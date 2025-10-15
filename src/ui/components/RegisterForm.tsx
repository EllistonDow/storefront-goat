"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const params = useParams<{ channel?: string }>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("https://api.saleor.tattoogoat.com/graphql/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
						mutation AccountRegister($input: AccountRegisterInput!) {
							accountRegister(input: $input) {
								user {
									id
									email
								}
								errors {
									field
									message
									code
								}
							}
						}
					`,
					variables: {
						input: {
							email,
							password,
							channel: "default-channel",
							redirectUrl: "https://storefront.saleor.tattoogoat.com",
						},
					},
				}),
			});

			const data = await response.json() as { 
				data: { 
					accountRegister: { 
						errors: Array<{ message: string }> 
					} 
				} 
			};

			if (data.data.accountRegister.errors.length > 0) {
				setError(data.data.accountRegister.errors[0].message);
			} else {
				// 注册成功，跳转到登录页面（包含 channel）
				const channel = params.channel || "default-channel";
				router.push(`/${channel}/login?message=Registration successful. Please log in.`);
			}
		} catch (err) {
			setError("Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<div className="rounded border p-8 shadow-md">
				<h1 className="mb-6 text-2xl font-bold text-center">Create Account</h1>
				
				{error && (
					<div className="mb-4 rounded bg-red-100 p-3 text-red-700">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="w-full rounded border bg-neutral-50 px-4 py-2"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							className="w-full rounded border bg-neutral-50 px-4 py-2"
							required
							minLength={8}
						/>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm your password"
							className="w-full rounded border bg-neutral-50 px-4 py-2"
							required
							minLength={8}
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full rounded bg-neutral-800 px-4 py-2 text-neutral-200 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Creating Account..." : "Create Account"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<LinkWithChannel href="/login" className="text-blue-600 hover:text-blue-800">
							Sign in here
						</LinkWithChannel>
					</p>
				</div>
			</div>
		</div>
	);
}
