<script lang="ts">

	// Order of css imports matters
	// Order should be:
	// 1. Theme
	// 2. All
	// 3. App
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
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
	import ManagedDrawer from './ManagedDrawer.svelte';
	import Main from './Main.svelte';
	import Footer from './Footer.svelte';
</script>

<AppShell>	
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<Main><slot /></Main>
	<svelte:fragment slot="footer"><Footer /></svelte:fragment>
</AppShell>

<ManagedDrawer />

<Toast />


