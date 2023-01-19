<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { page } from "$app/stores";
	import { AppBar, drawerStore, LightSwitch, menu, toastStore, type DrawerSettings, type ToastSettings } from "@skeletonlabs/skeleton";
    
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

    const submitLogout: SubmitFunction = () => {
        return async ({result}) => {
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
            else if (result.type='failure') {
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

<AppBar class="fixed w-full h-[var(--header-height)]">
	<svelte:fragment slot="lead">
        <a href="/" class="font-bold text-4xl text-primary-400-500-token">Subjective</a>
    </svelte:fragment>
	<svelte:fragment slot="trail">
        <nav class="list-nav hidden md:flex items-center gap-4">
            {#each ["home", "shop", "about"] as navItem}
                <a class="capitalize" href="/{navItem}">{navItem}</a>
            {/each}
            {#if !loggedIn} 
                <button class="btn bg-primary-400-500-token" on:click={() => openConnect()}>Connect</button>
            {:else}
                <span class="relative">
                    <button class="btn hover:card-glass-primary" use:menu={{ menu: 'account-drop-down-menu-header' }}>
                        <svg class="h-6 w-6 text-token" fill="currentColor" viewBox="0 0 32 32"><path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/><path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/></svg>
                    </button>
                    <nav class="bg-surface-200-700-token shadow-xl p-4 rounded-token list-nav" data-menu="account-drop-down-menu-header">
                        <ul>
                            <li><a href="/account">Account</a></li>
                            <li>
                                <form action="/?/logout" method="POST" use:enhance={submitLogout}>
                                    <button type="submit" class="rounded-token p-3 w-full hover:card-glass-primary">Logout</button>
                                </form>
                            </li>
                        </ul>
                    </nav>
                </span>
            {/if}
        </nav>
        <div class="h-[calc(0.5*var(--header-height))] w-0.5 bg-surface-400-500-token hidden md:block"></div>
        <div class="hidden md:block">
            <LightSwitch  />
        </div>
        <button class="btn p-0 md:hidden " on:click={() => openHamburger()}>
            <svg class="w-8 h-8 group" viewBox="0 0 100 100">
                <rect class="group-hover:translate-x-[15px] group-active:translate-x-[15px] transition-transform duration-300 ease-out " fill="currentColor" width="75" height="10" x="25" y="17"></rect>
                <rect class="group-hover:translate-x-[-20px] group-active:translate-x-[-20px] transition-transform duration-300 ease-out " fill="currentColor" width="85" height="10" x="35" y="45"></rect>
                <rect class="group-hover:translate-x-[10px] group-active:translate-x-[10px] transition-transform duration-300 ease-out " fill="currentColor" width="90" height="10" x="10" y="73"></rect>
            </svg>
        </button>
    </svelte:fragment>
</AppBar>