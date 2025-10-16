"use client";

import { useState } from "react";
import { type AddressFragment } from "@/gql/graphql";

interface AddressManagementProps {
	addresses: AddressFragment[];
}

export function AddressManagement({ addresses }: AddressManagementProps) {
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

	const handleAddAddress = () => {
		setShowCreateForm(true);
		setEditingAddressId(null);
	};

	const handleEditAddress = (id: string) => {
		setEditingAddressId(id);
		setShowCreateForm(false);
	};

	const handleBackToList = () => {
		setShowCreateForm(false);
		setEditingAddressId(null);
	};

	const editingAddress = editingAddressId 
		? addresses.find(addr => addr.id === editingAddressId)
		: null;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-900">Address Book</h2>
				<button
					onClick={handleAddAddress}
					className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Add New Address
				</button>
			</div>

			{showCreateForm && (
				<div className="rounded border p-6">
					<h3 className="mb-4 text-lg font-medium">Add New Address</h3>
					<div className="text-center py-8">
						<p className="text-gray-600 mb-4">Address management will be available soon.</p>
						<button
							onClick={handleBackToList}
							className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
						>
							Back to List
						</button>
					</div>
				</div>
			)}

			{editingAddress && (
				<div className="rounded border p-6">
					<h3 className="mb-4 text-lg font-medium">Edit Address</h3>
					<div className="text-center py-8">
						<p className="text-gray-600 mb-4">Address editing will be available soon.</p>
						<button
							onClick={handleBackToList}
							className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
						>
							Back to List
						</button>
					</div>
				</div>
			)}

			{!showCreateForm && !editingAddress && (
				<div className="rounded border p-6">
					<h3 className="mb-4 text-lg font-medium">Saved Addresses</h3>
					{addresses.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-gray-600 mb-4">You don't have any saved addresses yet.</p>
							<button
								onClick={handleAddAddress}
								className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
							>
								Add Your First Address
							</button>
						</div>
					) : (
						<div className="space-y-4">
							{addresses.map((address) => (
								<div key={address.id} className="border rounded p-4">
									<div className="flex justify-between items-start">
										<div>
											<h4 className="font-medium">
												{address.firstName} {address.lastName}
											</h4>
											<p className="text-gray-600">
												{address.streetAddress1}
												{address.streetAddress2 && `, ${address.streetAddress2}`}
											</p>
											<p className="text-gray-600">
												{address.city}, {address.postalCode}
											</p>
											<p className="text-gray-600">
												{address.country?.country}
											</p>
											{address.phone && (
												<p className="text-gray-600">Phone: {address.phone}</p>
											)}
											<div className="mt-2">
												{address.isDefaultBillingAddress && (
													<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
														Default Billing
													</span>
												)}
												{address.isDefaultShippingAddress && (
													<span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
														Default Shipping
													</span>
												)}
											</div>
										</div>
										<button
											onClick={() => handleEditAddress(address.id)}
											className="text-blue-600 hover:text-blue-800"
										>
											Edit
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}