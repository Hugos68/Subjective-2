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
	import { AppShell, Toast, drawerStore } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import SlotWrapper from '$lib/components/SlotWrapper.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BreadCrumbs from '$lib/components/BreadCrumbs.svelte';

	import { supabaseClient } from '$lib/supabase';
	import { invalidate, afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	
	onMount(() => {
		const {data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => invalidate('supabase:auth'));
		return () => subscription.unsubscribe();
	});
	beforeNavigate(() => {
		drawerStore.close();
	})
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
	<SlotWrapper>
		<BreadCrumbs />
		<slot />
	</SlotWrapper>
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>

