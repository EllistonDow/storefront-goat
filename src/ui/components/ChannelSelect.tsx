"use client";

import { useParams, useRouter } from "next/navigation";

export const ChannelSelect = ({
	channels,
}: {
	channels: { id: string; name: string; slug: string; currencyCode: string }[];
}) => {
	const router = useRouter();
	const params = useParams<{ channel: string }>();

	return (
		<select
			className="h-10 w-fit rounded-md border border-neutral-300 bg-transparent bg-white px-4 py-2 pr-10 text-sm placeholder:text-neutral-500 focus:border-black focus:ring-black dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400 dark:focus:border-neutral-400 dark:focus:ring-neutral-400"
			onChange={(e) => {
				const newChannel = e.currentTarget.value;
				return router.push(`/${newChannel}`);
			}}
			value={params.channel}
		>
			{channels.map((channel) => (
				<option key={channel.id} value={channel.slug}>
					{channel.name} ({channel.currencyCode})
				</option>
			))}
		</select>
	);
};
