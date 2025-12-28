import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	// Disabled prerendering due to syntax error with catch-all route
	// prerender: ['/*?'],
} satisfies Config;
