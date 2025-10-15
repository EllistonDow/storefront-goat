import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function AccountManagement() {
	try {
		const { me: user } = await executeGraphQL(CurrentUserDocument, {
			cache: "no-cache",
		});

		if (!user) {
			// 获取当前 channel 信息
			const headersList = await headers();
			const pathname = headersList.get("x-pathname") || "";
			const channelMatch = pathname.match(/^\/([^\/]+)/);
			const channel = channelMatch ? channelMatch[1] : "default-channel";
			
			// 用户未登录，跳转到登录页面
			redirect(`/${channel}/login`);
		}

		return (
			<div className="mx-auto mt-16 w-full max-w-lg">
				<div className="rounded border p-8 shadow-md">
					<h1 className="mb-6 text-2xl font-bold text-center">My Account</h1>

					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email Address
							</label>
							<p className="text-gray-900">{user.email}</p>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								User ID
							</label>
							<p className="text-gray-900 text-sm">{user.id}</p>
						</div>

						{user.firstName && (
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									First Name
								</label>
								<p className="text-gray-900">{user.firstName}</p>
							</div>
						)}

						{user.lastName && (
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Last Name
								</label>
								<p className="text-gray-900">{user.lastName}</p>
							</div>
						)}
					</div>

					<div className="mt-8 space-y-4">
						<LinkWithChannel
							href="/orders"
							className="block w-full rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
						>
							View My Orders
						</LinkWithChannel>

						<form action="/api/auth/logout" method="POST">
							<button
								type="submit"
								className="block w-full rounded bg-gray-600 px-4 py-2 text-center text-white hover:bg-gray-700"
							>
								Log Out
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	} catch (error) {
		// 获取当前 channel 信息
		const headersList = await headers();
		const pathname = headersList.get("x-pathname") || "";
		const channelMatch = pathname.match(/^\/([^\/]+)/);
		const channel = channelMatch ? channelMatch[1] : "default-channel";
		
		// 如果获取用户信息失败，跳转到登录页面
		redirect(`/${channel}/login`);
	}
}
