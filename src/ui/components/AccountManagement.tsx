import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { AccountTabs } from "./AccountTabs";

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
			<div className="mx-auto mt-8 w-full max-w-6xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-100">My Account</h1>
					<p className="mt-2 text-gray-600 dark:text-neutral-400">Manage your account settings and preferences</p>
				</div>

				<AccountTabs user={user} />
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
