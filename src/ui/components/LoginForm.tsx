import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getServerAuthClient } from "@/app/config";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export async function LoginForm() {
	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<form
				className="rounded border p-8 shadow-md bg-white dark:bg-neutral-800 dark:border-neutral-600"
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
				<h1 className="mb-6 text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100">Sign In</h1>
				
				<div className="mb-2">
					<label className="sr-only" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="w-full rounded border bg-neutral-50 px-4 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100 dark:placeholder:text-neutral-400"
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
						className="w-full rounded border bg-neutral-50 px-4 py-2 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-100 dark:placeholder:text-neutral-400"
						required
					/>
				</div>

				<button
					className="w-full rounded bg-neutral-800 px-4 py-2 text-neutral-200 hover:bg-neutral-700 dark:bg-neutral-600 dark:hover:bg-neutral-500"
					type="submit"
				>
					Log In
				</button>
			</form>
			
			<div className="mt-6 text-center space-y-2">
				<p className="text-sm text-gray-600 dark:text-neutral-400">
					Don&apos;t have an account?{" "}
					<LinkWithChannel href="/register" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
						Create one here
					</LinkWithChannel>
				</p>
				<p className="text-sm text-gray-600 dark:text-neutral-400">
					Forgot your password?{" "}
					<LinkWithChannel href="/forgot-password" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
						Reset it here
					</LinkWithChannel>
				</p>
			</div>
		</div>
	);
}
