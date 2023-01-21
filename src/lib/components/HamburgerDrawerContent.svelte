<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { page } from "$app/stores";
	import { drawerStore, LightSwitch, menu, storeLightSwitch, toastStore, type DrawerSettings, type ToastSettings } from "@skeletonlabs/skeleton";
	import { fly } from "svelte/transition";

    function closeHamburger(): void {
		drawerStore.close();
	}	
	function openConnect(): void {
		drawerStore.close();
        const settings: DrawerSettings = {
            id: 'connect',
            position: 'top',
            height: 'h-max',
            blur: 'backdrop-blur-sm',
            duration: 250
        };
		
		// This timeout is required in order for the hamburger drawer to close properly before opening the connect drawer
		setTimeout(() => drawerStore.open(settings), 300);
	}
	function toggleLightSwitch(): void {
		storeLightSwitch.update(state => {return !state});
		const elemHtmlClassList = document.documentElement.classList;
		$storeLightSwitch ? elemHtmlClassList.add('dark') : elemHtmlClassList.remove('dark');
	}
    const submitLogout: SubmitFunction = () => {
        return async ({result}): Promise<void> => {
            await applyAction(result);
            if (result.type==='redirect') {
                const t: ToastSettings = {
                    message: 'Logged out successfully! See you later...',
                    preset: 'success',
                    autohide: true,
                    timeout: 5000,
                };
                toastStore.trigger(t);
            }
            else if (result.type==='failure') {
                const t: ToastSettings = {
                    message: result.data?.message,
                    preset: 'error',
                    autohide: true,
                    timeout: 5000,
                };
                toastStore.trigger(t);
            }   
        }
    }
    $: loggedIn = $page.data.session!==null;
</script>

<div class="flex flex-col h-screen items-end overflow-x-hidden">
    <div class="w-full border-b-2 border-surface-700-200-token flex justify-between items-center p-4">
        {#if !loggedIn} 
            <button class="btn bg-primary-400-500-token" on:click={() => openConnect()}>Connect</button>
        {:else}
        <span class="relative">
            <button class="btn hover:card-glass-primary" use:menu={{ menu: 'account-drop-down-menu-hamburger', fixed: true }}>
                <svg class="h-6 w-6 text-token" fill="currentColor" viewBox="0 0 32 32"><path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/><path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/></svg>
            </button>
            <nav class="bg-surface-100-800-token shadow-xl p-4 rounded-token menu-tl list-nav" data-menu="account-drop-down-menu-hamburger">
                <ul>
                    <li><a class="" href="/account" on:click={() => closeHamburger()}>Account</a></li>
                    <form action="/?/logout" method="POST" use:enhance={submitLogout}>
                        <button type="submit" class="rounded-token p-3 w-full hover:card-glass-primary" on:click={() => closeHamburger()}>Logout</button>
                    </form>
                </ul>
            </nav>
        </span>
        {/if}
        <button class="btn p-0" on:click={() => closeHamburger()}>
            <svg class="w-6 h-6" viewBox="0 0 100 100">
                <line stroke="currentColor" x1="10" y1="90" x2="90" y2="10" stroke-width="10" />
                <line stroke="currentColor" x1="10" y1="10" x2="90" y2="90" stroke-width="10" />
            </svg>
        </button>
    </div>
    <div class="w-full h-full flex flex-col p-4 justify-between items-end bg-surface-200-900-token">
        <nav class="list-nav h-max w-full flex flex-col items-end">
            {#each ["home","shop", "about"] as navItem, i} 
                <a class="w-full text-end capitalize" href="/{navItem}" on:click={() => closeHamburger()} in:fly={{x: 500, delay: i*50}}>{navItem}</a>
            {/each}
        </nav>
        <button class="w-full rounded-token flex items-center justify-between p-4 hover:badge-glass" on:click={() => toggleLightSwitch()}>
            <p>Theme</p>
            <div class="h-0.5 w-full mx-8 bg-[var(--text-token)]"></div>
            <div class="pointer-events-none">
                <LightSwitch />
            </div>
        </button>
    </div>
    <div class="h-[var(--header-height)] border-t-2 border-surface-700-200-token opacity-50 5 w-full flex justify-center items-center p-4">
        <p>© All Rights Reserved</p>
    </div>
</div>