<script lang="ts">
	import { Drawer, drawerStore} from "@skeletonlabs/skeleton";
	import HamburgerDrawerContent from "$lib/components/HamburgerDrawerContent.svelte";
	import ConnectDrawerContent from "$lib/components/ConnectDrawerContent.svelte";
</script>

<Drawer	>
	{#if $drawerStore.id==='hamburger'}
		<HamburgerDrawerContent />
	{:else if $drawerStore.id==='connect'}
		<ConnectDrawerContent />
	{/if}
</Drawer>