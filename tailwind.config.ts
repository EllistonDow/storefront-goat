import TypographyPlugin from "@tailwindcss/typography";
import FormPlugin from "@tailwindcss/forms";
import ContainerQueriesPlugin from "@tailwindcss/container-queries";
import { type Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	darkMode: 'class', // 启用暗色模式，使用 class 策略
	plugins: [TypographyPlugin, FormPlugin, ContainerQueriesPlugin],
};

export default config;
