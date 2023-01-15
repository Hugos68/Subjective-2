<script lang="ts">
	import { AppBar, drawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
    
    function openHamburger(): void {
        const settings: DrawerSettings = {
            position: 'right',
            width: 'w-[min(20rem,75vw)]',
            blur: 'backdrop-blur-sm',
            duration: 250
        };
        drawerStore.open(settings);
	}
</script>

<AppBar class="h-[var(--header-height)]">
	<svelte:fragment slot="lead">
        <a href="/home" class="font-bold text-2xl">Subjective</a>
    </svelte:fragment>
	<svelte:fragment slot="trail">
        <button class="btn p-0 md:hidden " on:click={() => openHamburger()}>
            <svg class="w-8 h-8 group" viewBox="0 0 100 100">
                <rect class="group-hover:translate-x-[15px] transition-transform duration-300" fill="currentColor" width="75" height="10" x="25" y="15"></rect>
                <rect class="group-hover:translate-x-[-20px] transition-transform duration-300" fill="currentColor" width="85" height="10" x="35" y="45"></rect>
                <rect class="group-hover:translate-x-[10px] transition-transform duration-300" fill="currentColor" width="90" height="10" x="10" y="75"></rect>
            </svg>
        </button>
        <nav class="hidden md:block">
            <a href="/home">home</a>
            <a href="/home">home</a>
            <a href="/home">home</a>
        </nav>
    </svelte:fragment>
</AppBar>