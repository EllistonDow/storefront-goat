"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileEditFormProps {
	user: {
		id: string;
		email: string;
		firstName?: string | null;
		lastName?: string | null;
	};
	onSuccess?: () => void;
}

export function ProfileEditForm({ user, onSuccess }: ProfileEditFormProps) {
	const [firstName, setFirstName] = useState(user.firstName || "");
	const [lastName, setLastName] = useState(user.lastName || "");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		setSuccess("");

		try {
			const response = await fetch("/api/account/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName: firstName.trim() || null,
					lastName: lastName.trim() || null,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Failed to update profile. Please try again.");
			} else {
				setSuccess("Profile updated successfully!");
				onSuccess?.();
				// Refresh the page to show updated data
				setTimeout(() => {
					router.refresh();
				}, 1000);
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && (
				<div className="rounded bg-red-50 p-3 text-red-700 dark:bg-red-900 dark:text-red-300">
					{error}
				</div>
			)}
			
			{success && (
				<div className="rounded bg-green-50 p-3 text-green-700 dark:bg-green-900 dark:text-green-300">
					{success}
				</div>
			)}

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300">
					Email Address
				</label>
				<input
					type="email"
					value={user.email}
					disabled
					className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-400"
				/>
				<p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">Email cannot be changed</p>
			</div>

			<div>
				<label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300">
					First Name
				</label>
				<input
					id="firstName"
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
					placeholder="Enter your first name"
				/>
			</div>

			<div>
				<label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300">
					Last Name
				</label>
				<input
					id="lastName"
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
					placeholder="Enter your last name"
				/>
			</div>

			<div className="flex space-x-3">
				<button
					type="submit"
					disabled={isLoading}
					className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600"
				>
					{isLoading ? "Updating..." : "Update Profile"}
				</button>
				
				<button
					type="button"
					onClick={() => {
						setFirstName(user.firstName || "");
						setLastName(user.lastName || "");
						setError("");
						setSuccess("");
					}}
					className="flex-1 rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}