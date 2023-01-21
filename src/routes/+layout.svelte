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
	import { page } from '$app/stores';

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
<!-- The key block is here to solve the bug where the scroll position of the page is not reset when routing to different pages -->
{#key $page.route.id}
	<AppShell>	
		<svelte:fragment slot="header"><Header /></svelte:fragment>
		<div class="base-page-container"><slot /></div>
		<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
	</AppShell>
{/key}
