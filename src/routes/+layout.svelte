<script lang="ts">

	// Order of css imports matters
	// Order should be:
	// 1. Theme
	// 2. All
	// 3. App
	import './../theme.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { supabaseClient } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

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

	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';
	import OnMount from '$lib/components/OnMount.svelte';
	import ManagedDrawer from './ManagedDrawer.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';
</script>

<AppShell>	
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<OnMount>
		{#key $page.route.id}
			<main class="p-[var(--body-padding)] h-full">
				<slot />  
			</main>
		{/key}
	</OnMount>
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>

<ManagedDrawer />

<Toast />


