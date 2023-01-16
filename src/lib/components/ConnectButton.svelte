<script lang="ts">
	import { drawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
    function openLogin(): void {
        const settings: DrawerSettings = {
            id: 'connect',
            position: 'top',
            height: 'h-max',
            blur: 'backdrop-blur-sm',
            duration: 250
        };
        drawerStore.open(settings);
	}
</script>

<button on:click={() => openLogin()}>Connect</button>