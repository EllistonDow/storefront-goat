import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getServerAuthClient } from "@/app/config";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export async function LoginForm() {
	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<form
				className="rounded border p-8 shadow-md"
				action={async (formData) => {
					"use server";

					const email = formData.get("email")?.toString();
					const password = formData.get("password")?.toString();

					if (!email || !password) {
						throw new Error("Email and password are required");
					}

					try {
						const { data } = await (
							await getServerAuthClient()
						).signIn({ email, password }, { cache: "no-store" });

						if (data.tokenCreate.errors.length > 0) {
							// 登录失败，显示错误
							throw new Error(data.tokenCreate.errors[0].message);
						}

						// 获取当前 channel 信息
						const headersList = await headers();
						const pathname = headersList.get("x-pathname") || "";
						const channelMatch = pathname.match(/^\/([^\/]+)/);
						const channel = channelMatch ? channelMatch[1] : "default-channel";

						// 登录成功，跳转到账户页面（包含 channel）
						redirect(`/${channel}/account`);
					} catch (error) {
						// 处理登录错误
						throw error;
					}
				}}
			>
				<h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1>
				
				<div className="mb-2">
					<label className="sr-only" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="w-full rounded border bg-neutral-50 px-4 py-2"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="sr-only" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoCapitalize="off"
						autoComplete="off"
						className="w-full rounded border bg-neutral-50 px-4 py-2"
						required
					/>
				</div>

				<button
					className="w-full rounded bg-neutral-800 px-4 py-2 text-neutral-200 hover:bg-neutral-700"
					type="submit"
				>
					Log In
				</button>
			</form>
			
			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600">
					Don&apos;t have an account?{" "}
					<LinkWithChannel href="/register" className="text-blue-600 hover:text-blue-800">
						Create one here
					</LinkWithChannel>
				</p>
			</div>
		</div>
	);
}
