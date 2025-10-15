import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

export async function POST() {
	// 清除认证相关的 cookies
	const cookieStore = await cookies();
	
	// 清除 Saleor 认证 token
	cookieStore.delete("saleor-auth-token");
	cookieStore.delete("saleor-refresh-token");
	
	// 获取当前 channel 信息
	const headersList = await headers();
	const referer = headersList.get("referer") || "";
	const channelMatch = referer.match(/\/\/([^\/]+)\/([^\/]+)/);
	const channel = channelMatch ? channelMatch[2] : "default-channel";
	
	// 重定向到首页（包含 channel）
	redirect(`/${channel}/`);
}
