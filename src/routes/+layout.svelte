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
	import Header from '$lib/components/Header.svelte';
	import CookiePopup from "$lib/components/CookiePopup.svelte";
	import ManagedDrawer from '$lib/components/ManagedDrawer.svelte';
	import Footer from '$lib/components/Footer.svelte';

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
<AppShell slotPageContent="scroll-p-[var(--header-height)] min-h-screen px-4 py-[15vh] bg-red">	
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<slot />  
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
