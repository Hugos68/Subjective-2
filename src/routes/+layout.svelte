<script lang="ts">

	// Order of css imports matters
	// Order should be:
	// 1. Theme
	// 2. All
	// 3. App
	import './../theme.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';
	import CookiePopup from "$lib/components/CookiePopup.svelte";
	import ManagedDrawer from './ManagedDrawer.svelte';
	import Footer from './Footer.svelte';

	import { supabaseClient } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	
	onMount(() => {
		const {data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => invalidate('supabase:auth'));
		return () => subscription.unsubscribe();
	});
</script>

<!-- OVERLAYS -->
<Toast />
<ManagedDrawer />
{#if !data.consentCookie}
	<CookiePopup />
{/if}

<!-- MAIN STRUCTURE -->
<AppShell>	
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<main class="p-[var(--body-padding)] min-h-screen mt-[15vh]">
		<slot />  
	</main>
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
