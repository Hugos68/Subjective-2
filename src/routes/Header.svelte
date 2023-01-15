<script lang="ts">
	import { AppBar, drawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
    
    function openHamburger(): void {
        const settings: DrawerSettings = {
            position: 'right',
            width: 'w-[min(20rem,75vw)]',
            blur: 'backdrop-blur-sm'
        };
        drawerStore.open(settings);
	}
</script>

<AppBar class="h-[var(--header-height)]">
	<svelte:fragment slot="lead"><h2>Subjective</h2></svelte:fragment>
	<svelte:fragment slot="trail">
        <button class="btn p-0 md:hidden " on:click={() => openHamburger()}>
            <svg class="w-8 h-8" viewBox="0 0 100 100">
                <rect fill="currentColor" width="75" height="10" x="25" y="15"></rect>
                <rect fill="currentColor" width="65" height="10" x="35" y="45"></rect>
                <rect fill="currentColor" width="90" height="10" x="10" y="75"></rect>
            </svg>
        </button>
        <nav class="hidden md:block">
            <a href="/home">home</a>
            <a href="/home">home</a>
            <a href="/home">home</a>
        </nav>
    </svelte:fragment>
</AppBar>