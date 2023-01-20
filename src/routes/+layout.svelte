<script lang="ts">

	// Order of css imports matters
	// Order should be:
	// 1. Theme
	// 2. All
	// 3. App
	import './../theme.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, Toast, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';
	import ManagedDrawer from './ManagedDrawer.svelte';
	import Footer from './Footer.svelte';

	import { supabaseClient } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	import { browser } from '$app/environment';

	export let data: PageData;
	const {consentCookie} = data;

	// Cookie toast
	if (browser && !consentCookie) {
		const t: ToastSettings = {
			message: '👋 Hello! We use Cookies.',
			position: 'bl',
			background: 'bg-secondary-500',
		};
		toastStore.trigger(t);		
	}

	onMount(() => {

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		}
	});
</script>

<AppShell>	
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<svelte:fragment slot="sidebarRight"><ManagedDrawer /></svelte:fragment>
	<main class="p-[var(--body-padding)] min-h-screen">
		<slot />  
	</main>
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>

<Toast />
