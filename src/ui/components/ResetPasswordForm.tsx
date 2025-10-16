"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export function ResetPasswordForm() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [token, setToken] = useState("");
	const router = useRouter();
	const params = useParams<{ channel?: string }>();
	const searchParams = useSearchParams();

	useEffect(() => {
		// 从 URL 参数获取 token
		const tokenFromUrl = searchParams.get("token");
		if (tokenFromUrl) {
			setToken(tokenFromUrl);
		} else {
			setError("Invalid or missing reset token.");
		}
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMessage("");
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

		if (!token) {
			setError("Invalid reset token");
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
						mutation SetPassword($token: String!, $password: String!) {
							setPassword(token: $token, password: $password) {
								errors {
									field
									message
									code
								}
							}
						}
					`,
					variables: {
						token,
						password,
					},
				}),
			});

			const data = await response.json() as {
				data: {
					setPassword: {
						errors: Array<{ message: string; code: string }>;
					};
				};
			};

			if (data.data.setPassword.errors.length > 0) {
				setError(data.data.setPassword.errors[0].message);
			} else {
				setMessage("Password reset successfully! You can now sign in with your new password.");
				// 3秒后跳转到登录页面
				setTimeout(() => {
					const channel = params.channel || "default-channel";
					router.push(`/${channel}/login?message=Password reset successful. Please sign in with your new password.`);
				}, 3000);
			}
		} catch (err) {
			setError("Failed to reset password. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (!token) {
		return (
			<div className="mx-auto mt-16 w-full max-w-lg">
				<div className="rounded border p-8 shadow-md text-center">
					<h1 className="mb-4 text-2xl font-bold text-red-600">Invalid Reset Link</h1>
					<p className="mb-6 text-gray-600">
						This password reset link is invalid or has expired.
					</p>
					<LinkWithChannel href="/forgot-password" className="text-blue-600 hover:text-blue-800">
						Request a new reset link
					</LinkWithChannel>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<div className="rounded border p-8 shadow-md">
				<h1 className="mb-6 text-2xl font-bold text-center">Set New Password</h1>
				<p className="mb-6 text-center text-gray-600">
					Enter your new password below.
				</p>
				
				{error && (
					<div className="mb-4 rounded bg-red-100 p-3 text-red-700">
						{error}
					</div>
				)}

				{message && (
					<div className="mb-4 rounded bg-green-100 p-3 text-green-700">
						{message}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
							New Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your new password"
							className="w-full rounded border bg-neutral-50 px-4 py-2"
							required
							minLength={8}
						/>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
							Confirm New Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm your new password"
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
						{isLoading ? "Resetting..." : "Reset Password"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Remember your password?{" "}
						<LinkWithChannel href="/login" className="text-blue-600 hover:text-blue-800">
							Sign in here
						</LinkWithChannel>
					</p>
				</div>
			</div>
		</div>
	);
}
