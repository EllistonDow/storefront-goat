"use client";

import { useState } from "react";

interface PasswordChangeFormProps {
	onSuccess?: () => void;
}

export function PasswordChangeForm({ onSuccess }: PasswordChangeFormProps) {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		setSuccess("");

		// Validation
		if (newPassword !== confirmPassword) {
			setError("New passwords do not match.");
			setIsLoading(false);
			return;
		}

		if (newPassword.length < 8) {
			setError("New password must be at least 8 characters long.");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/account/password-change", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					oldPassword: currentPassword,
					newPassword: newPassword,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Failed to change password. Please check your current password.");
			} else {
				setSuccess("Password changed successfully!");
				setCurrentPassword("");
				setNewPassword("");
				setConfirmPassword("");
				onSuccess?.();
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
				<label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300">
					Current Password
				</label>
				<input
					id="currentPassword"
					type="password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
					required
					className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
					placeholder="Enter your current password"
				/>
			</div>

			<div>
				<label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300">
					New Password
				</label>
				<input
					id="newPassword"
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					required
					minLength={8}
					className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
					placeholder="Enter your new password"
				/>
				<p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">Password must be at least 8 characters long</p>
			</div>

			<div>
				<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 dark:text-neutral-300">
					Confirm New Password
				</label>
				<input
					id="confirmPassword"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					minLength={8}
					className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
					placeholder="Confirm your new password"
				/>
			</div>

			<div className="flex space-x-3">
				<button
					type="submit"
					disabled={isLoading}
						className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600"
				>
					{isLoading ? "Changing..." : "Change Password"}
				</button>
				
				<button
					type="button"
					onClick={() => {
						setCurrentPassword("");
						setNewPassword("");
						setConfirmPassword("");
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