<script lang="ts">

	// Order of css imports matters
	// Order should be:
	// 1. Theme
	// 2. All
	// 3. App
	import './../theme.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import CookiePopup from "$lib/components/CookiePopup.svelte";
	import ManagedDrawer from '$lib/components/ManagedDrawer.svelte';
	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import SlotWrapper from '$lib/components/SlotWrapper.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { supabaseClient } from '$lib/supabase';
	import { invalidate, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	
	onMount(() => {
		const {data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => invalidate('supabase:auth'));
		return () => subscription.unsubscribe();
	});

	afterNavigate(() => {
		const page: HTMLElement | null = document.getElementById('page');
		if (page) page.scrollTo(0, 0);
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
	<SlotWrapper ><slot /></SlotWrapper>
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>

