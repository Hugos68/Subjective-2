<script lang="ts">
	import { page } from "$app/stores";
	import { AppBar, drawerStore, LightSwitch, type DrawerSettings } from "@skeletonlabs/skeleton";
    
    function openHamburger(): void {
        const settings: DrawerSettings = {
            id: 'hamburger',
            position: 'right',
            width: 'w-[min(20rem,75vw)]',
            blur: 'backdrop-blur-sm',
            duration: 250
        };
        drawerStore.open(settings);
	}

    function openConnect(): void {
        const settings: DrawerSettings = {
            id: 'connect',
            position: 'top',
            height: 'h-max',
            blur: 'backdrop-blur-sm',
            duration: 250
        };
        drawerStore.open(settings);
	}

    $: loggedIn = $page.data.session!==null;
</script>

<AppBar class="h-[var(--header-height)]">
	<svelte:fragment slot="lead">
        <a href="/home" class="font-bold text-2xl">Subjective</a>
    </svelte:fragment>
	<svelte:fragment slot="trail">
        <nav class="hidden md:flex items-center gap-4">
            {#each ["shop", "about"] as navItem}
                <a class="capitalize" href="/{navItem}">{navItem}</a>
            {/each}
        </nav>
        <button class="btn btn-filled-tertiary" on:click={() => openConnect()}>Connect</button>
        <div class="h-[calc(0.5*var(--header-height))] w-0.5 bg-surface-300-600-token hidden md:block"></div>
        <div class="hidden md:block">
            <LightSwitch  />
        </div>
        <button class="btn p-0 md:hidden " on:click={() => openHamburger()}>
            <svg class="w-8 h-8 group" viewBox="0 0 100 100">
                <rect class="group-hover:translate-x-[15px] group-active:translate-x-[15px] transition-transform duration-300 ease-out " fill="currentColor" width="75" height="10" x="25" y="15"></rect>
                <rect class="group-hover:translate-x-[-20px] group-active:translate-x-[-20px] transition-transform duration-300 ease-out " fill="currentColor" width="85" height="10" x="35" y="45"></rect>
                <rect class="group-hover:translate-x-[10px] group-active:translate-x-[10px] transition-transform duration-300 ease-out " fill="currentColor" width="90" height="10" x="10" y="75"></rect>
            </svg>
        </button>
    </svelte:fragment>
</AppBar>