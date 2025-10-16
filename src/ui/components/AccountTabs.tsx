"use client";

import { useState } from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { ProfileEditForm } from "./ProfileEditForm";
import { PasswordChangeForm } from "./PasswordChangeForm";
import { AddressManagement } from "./AddressManagement";
import { type UserDetailsFragment } from "@/gql/graphql";

interface AccountTabsProps {
	user: UserDetailsFragment;
}

type TabType = "profile" | "password" | "addresses" | "orders";

export function AccountTabs({ user }: AccountTabsProps) {
	const [activeTab, setActiveTab] = useState<TabType>("profile");

	const tabs = [
		{ id: "profile" as TabType, label: "Profile", icon: "👤" },
		{ id: "password" as TabType, label: "Password", icon: "🔐" },
		{ id: "addresses" as TabType, label: "Addresses", icon: "🏠" },
		{ id: "orders" as TabType, label: "Orders", icon: "📦" },
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case "profile":
				return (
					<div className="rounded border p-6">
						<h2 className="mb-6 text-xl font-semibold">Profile Information</h2>
						<ProfileEditForm user={user} />
					</div>
				);
			case "password":
				return (
					<div className="rounded border p-6">
						<h2 className="mb-6 text-xl font-semibold">Change Password</h2>
						<PasswordChangeForm />
					</div>
				);
			case "addresses":
				return (
					<div className="rounded border p-6">
						<AddressManagement addresses={user.addresses || []} />
					</div>
				);
			case "orders":
				return (
					<div className="rounded border p-6">
						<h2 className="mb-6 text-xl font-semibold">Order History</h2>
						<div className="text-center py-8">
							<p className="text-gray-600 mb-4">View your order history and track your orders</p>
							<LinkWithChannel
								href="/orders"
								className="inline-block rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
							>
								View All Orders
							</LinkWithChannel>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="space-y-6">
			{/* Tab Navigation */}
			<div className="border-b border-gray-200">
				<nav className="-mb-px flex space-x-8">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`py-2 px-1 border-b-2 font-medium text-sm ${
								activeTab === tab.id
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
							}`}
						>
							<span className="mr-2">{tab.icon}</span>
							{tab.label}
						</button>
					))}
				</nav>
			</div>

			{/* Tab Content */}
			<div className="min-h-[400px]">
				{renderTabContent()}
			</div>

			{/* Quick Actions */}
			<div className="mt-8 rounded border p-6 bg-gray-50">
				<h3 className="mb-4 text-lg font-medium">Quick Actions</h3>
				<div className="flex flex-wrap gap-3">
					<LinkWithChannel
						href="/orders"
						className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						View Orders
					</LinkWithChannel>
					
					<form action="/api/auth/logout" method="POST" className="inline">
						<button
							type="submit"
							className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
						>
							Log Out
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
