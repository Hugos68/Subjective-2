import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	}
};

export default config;
