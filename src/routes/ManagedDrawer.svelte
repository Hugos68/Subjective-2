<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { invalidate, invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";
	import { Drawer, drawerStore, LightSwitch, storeLightSwitch, Tab, TabGroup, toastStore, type DrawerSettings, type ToastSettings } from "@skeletonlabs/skeleton";	
	import { writable, type Writable } from "svelte/store";
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

	const storeTab: Writable<string> = writable('login');

	$: loggedIn = $page.data.session!==null;

	const submitLogin: SubmitFunction = () => {
		return async ({result}) => {
			await applyAction(result);
            if (result.type==='success') {
				await invalidateAll();
				drawerStore.close();
                const t: ToastSettings = {
                    message: 'Logged in successfully, Welcome!',
                    preset: 'success',
                    autohide: true,
                    timeout: 5000,
                };
                toastStore.trigger(t);
            }
            else if (result.type='failure' && result.data) {
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
	const submitRegister: SubmitFunction = () => {
		return async ({result}) => {
			await applyAction(result);
			if (result.type==='success') {
				storeTab.set('login');
                const t: ToastSettings = {
                    message: 'Success! Confirmation email sent...',
                    preset: 'success',
                    autohide: true,
                    timeout: 5000,
                };
                toastStore.trigger(t);
            }
            else if (result.type='failure' && result.data) {
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
</script>

<Drawer	>
	{#if $drawerStore.id==='hamburger'}
		<div class="flex flex-col h-screen items-end overflow-x-hidden">
			<div class="h-[var(--header-height)] w-full border-b-2 border-surface-700-200-token flex justify-between items-center p-4">
				{#if !loggedIn} 
					<button class="btn btn-sm btn-filled-tertiary" on:click={() => openConnect()}>Connect</button>
				{:else}
					<a class="btn btn-sm btn-filled-tertiary" href="/account" on:click={() => closeHamburger()}>Account</a>
				{/if}
				<button class="btn p-0" on:click={() => closeHamburger()}>
					<svg class="w-8 h-8" viewBox="0 0 100 100">
						<line stroke="currentColor" x1="10" y1="90" x2="90" y2="10" stroke-width="10" />
						<line stroke="currentColor" x1="10" y1="10" x2="90" y2="90" stroke-width="10" />
					</svg>
				</button>
			</div>
			<div class="w-full h-full flex flex-col p-4 justify-between items-end bg-surface-200-900-token">
				<nav class="h-max w-full flex flex-col items-end">
					{#each ["shop", "about"] as navItem, i} 
						<a class="font-semibold text-lg w-full text-end capitalize" href="/{navItem}" on:click={() => closeHamburger()} in:fly={{x: 500, delay: i*50}}>{navItem}</a>
					{/each}
				</nav>
				<button class="w-full flex items-center justify-between" on:click={() => toggleLightSwitch()}>
					<p class="font-semibold">Theme:</p>
					<div class="pointer-events-none">
						<LightSwitch />
					</div>
				</button>
			</div>
			<div class="h-[var(--header-height)] border-t-2 border-surface-700-200-token opacity-50 5 w-full flex justify-center items-center p-4">
				<p>© All Rights Reserved</p>
			</div>
		</div>
	{:else if $drawerStore.id==='connect'}
		<TabGroup justify='justify-center' selected={storeTab}>
			<Tab value="login">Login</Tab>
			<Tab value="register">Register</Tab>
		</TabGroup>
		<div class="p-12 mx-auto w-[min(50rem,100%)]">
			{#if $storeTab==="login"}
			<form class="flex flex-col items-center gap-6" method="POST" use:enhance={submitLogin}>
				<h2>Login</h2>
				<label class="relative w-full" for="email">
					<span>Email:</span>
					<input class="pl-10" type="text" id="email" name="email">
					<icon class="absolute left-4 top-[2.6rem]">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 512 512"><g><path class="st0" d="M510.678,112.275c-2.308-11.626-7.463-22.265-14.662-31.054c-1.518-1.915-3.104-3.63-4.823-5.345c-12.755-12.818-30.657-20.814-50.214-20.814H71.021c-19.557,0-37.395,7.996-50.21,20.814c-1.715,1.715-3.301,3.43-4.823,5.345C8.785,90.009,3.63,100.649,1.386,112.275C0.464,116.762,0,121.399,0,126.087V385.92c0,9.968,2.114,19.55,5.884,28.203c3.497,8.26,8.653,15.734,14.926,22.001c1.59,1.586,3.169,3.044,4.892,4.494c12.286,10.175,28.145,16.32,45.319,16.32h369.958c17.18,0,33.108-6.145,45.323-16.384c1.718-1.386,3.305-2.844,4.891-4.43c6.27-6.267,11.425-13.741,14.994-22.001v-0.064c3.769-8.653,5.812-18.171,5.812-28.138V126.087C512,121.399,511.543,116.762,510.678,112.275z M46.509,101.571c6.345-6.338,14.866-10.175,24.512-10.175h369.958c9.646,0,18.242,3.837,24.512,10.175c1.122,1.129,2.179,2.387,3.112,3.637L274.696,274.203c-5.348,4.687-11.954,7.002-18.696,7.002c-6.674,0-13.276-2.315-18.695-7.002L43.472,105.136C44.33,103.886,45.387,102.7,46.509,101.571z M36.334,385.92V142.735L176.658,265.15L36.405,387.435C36.334,386.971,36.334,386.449,36.334,385.92z M440.979,420.597H71.021c-6.281,0-12.158-1.651-17.174-4.552l147.978-128.959l13.815,12.018c11.561,10.046,26.028,15.134,40.36,15.134c14.406,0,28.872-5.088,40.432-15.134l13.808-12.018l147.92,128.959C453.137,418.946,447.26,420.597,440.979,420.597z M475.666,385.92c0,0.529,0,1.051-0.068,1.515L335.346,265.221L475.666,142.8V385.92z"/></g></svg>
					</icon>
				</label>
				<label class="relative w-full" for="password">
					<span>Password:</span>
					<input class="pl-10" type="password" id="password" name="password">
					<icon class="absolute left-4 top-[2.6rem]">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 512 512"><g><path class="st0" d="M461.344,197.344c-15.813-15.875-37.984-25.781-62.156-25.75h-8.953v-37.375c0.016-36.969-15.078-70.719-39.328-94.906C326.703,15.063,292.969-0.016,256,0c-36.969-0.016-70.719,15.063-94.922,39.313C136.844,63.5,121.75,97.25,121.766,134.219v37.375h-8.969c-24.172-0.031-46.328,9.875-62.141,25.75c-15.859,15.813-25.766,37.969-25.75,62.156v164.594c-0.016,24.188,9.891,46.344,25.75,62.156c15.813,15.875,37.969,25.766,62.141,25.75h286.391c24.172,0.016,46.344-9.875,62.156-25.75c15.859-15.813,25.766-37.969,25.75-62.156V259.5C487.109,235.313,477.203,213.156,461.344,197.344z M179.891,134.219c0.016-21.094,8.469-39.938,22.297-53.813C216.047,66.594,234.891,58.125,256,58.125s39.953,8.469,53.813,22.281c13.828,13.875,22.281,32.719,22.297,53.813v37.375H179.891V134.219z M420.25,445.156c-5.484,5.438-12.75,8.719-21.063,8.719H112.797c-8.313,0-15.563-3.281-21.047-8.719c-5.438-5.469-8.703-12.75-8.719-21.063V259.5c0.016-8.328,3.281-15.594,8.719-21.063c5.484-5.438,12.734-8.719,21.047-8.719h286.391c8.313,0,15.578,3.281,21.063,8.719c5.422,5.469,8.703,12.734,8.719,21.063v164.594C428.953,432.406,425.672,439.688,420.25,445.156z"/><path class="st0" d="M255.984,279.969c-23.109,0-41.844,18.75-41.844,41.875c0,17.031,10.219,31.625,24.828,38.156l-9.25,60.094h26.266h26.297L273.016,360c14.609-6.531,24.844-21.125,24.844-38.156C297.859,298.719,279.109,279.969,255.984,279.969z"/></g></svg>
					</icon>
				</label>
				<button class="btn btn-filled-secondary mt-5" formaction="/?/login" type="submit">Login</button>
				<label class="w-full">
					<span class="text-center">Or login using:</span>
					<div class="flex justify-center gap-[5vw] mt-8">
						<button class="btn bg-surface-700-200-token" formaction="/?/login&provider=google">
							<svg class="w-8 h-8" viewBox="0 0 16 16"  fill="none"><path fill="#4285F4" d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"/><path fill="#34A853" d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"/><path fill="#FBBC04" d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"/><path fill="#EA4335" d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"/></svg>
						</button>
						<button class="btn bg-surface-700-200-token" formaction="/?/login&provider=discord">
							<svg class="w-8 h-8" viewBox="0 0 127.14 96.36" fill="#5865f2"><g id="图层_2" data-name="图层 2"><g id="Discord_Logos" data-name="Discord Logos"><g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White"><path class="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></g></g></g></svg>
						</button>
						<button class="btn bg-surface-700-200-token text-surface-200-700-token" formaction="/?/login&provider=github">
							<svg class="w-8 h-8" viewBox="0 0 32 32" fill="currentColor"><path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"/></svg>
						</button>
					</div>
				</label>
			</form>
		{:else if $storeTab==="register"}
			<form class="flex flex-col items-center gap-6" method="POST" use:enhance={submitRegister}>
				<h2>Register</h2>
				<label class="relative w-full" for="email">
					<span>Email:</span>
					<input class="pl-10" type="text" id="email" name="email" minlength="4" required>
					<icon class="absolute left-4 top-[2.6rem]">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 512 512"><g><path class="st0" d="M510.678,112.275c-2.308-11.626-7.463-22.265-14.662-31.054c-1.518-1.915-3.104-3.63-4.823-5.345c-12.755-12.818-30.657-20.814-50.214-20.814H71.021c-19.557,0-37.395,7.996-50.21,20.814c-1.715,1.715-3.301,3.43-4.823,5.345C8.785,90.009,3.63,100.649,1.386,112.275C0.464,116.762,0,121.399,0,126.087V385.92c0,9.968,2.114,19.55,5.884,28.203c3.497,8.26,8.653,15.734,14.926,22.001c1.59,1.586,3.169,3.044,4.892,4.494c12.286,10.175,28.145,16.32,45.319,16.32h369.958c17.18,0,33.108-6.145,45.323-16.384c1.718-1.386,3.305-2.844,4.891-4.43c6.27-6.267,11.425-13.741,14.994-22.001v-0.064c3.769-8.653,5.812-18.171,5.812-28.138V126.087C512,121.399,511.543,116.762,510.678,112.275z M46.509,101.571c6.345-6.338,14.866-10.175,24.512-10.175h369.958c9.646,0,18.242,3.837,24.512,10.175c1.122,1.129,2.179,2.387,3.112,3.637L274.696,274.203c-5.348,4.687-11.954,7.002-18.696,7.002c-6.674,0-13.276-2.315-18.695-7.002L43.472,105.136C44.33,103.886,45.387,102.7,46.509,101.571z M36.334,385.92V142.735L176.658,265.15L36.405,387.435C36.334,386.971,36.334,386.449,36.334,385.92z M440.979,420.597H71.021c-6.281,0-12.158-1.651-17.174-4.552l147.978-128.959l13.815,12.018c11.561,10.046,26.028,15.134,40.36,15.134c14.406,0,28.872-5.088,40.432-15.134l13.808-12.018l147.92,128.959C453.137,418.946,447.26,420.597,440.979,420.597z M475.666,385.92c0,0.529,0,1.051-0.068,1.515L335.346,265.221L475.666,142.8V385.92z"/></g></svg>
					</icon>
				</label>
				<label class="relative w-full" for="password">
					<span>Password:</span>
					<input class="pl-10" type="password" id="password" name="password" minlength="6" required>
					<icon class="absolute left-4 top-[2.6rem]">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 512 512"><g><path class="st0" d="M461.344,197.344c-15.813-15.875-37.984-25.781-62.156-25.75h-8.953v-37.375c0.016-36.969-15.078-70.719-39.328-94.906C326.703,15.063,292.969-0.016,256,0c-36.969-0.016-70.719,15.063-94.922,39.313C136.844,63.5,121.75,97.25,121.766,134.219v37.375h-8.969c-24.172-0.031-46.328,9.875-62.141,25.75c-15.859,15.813-25.766,37.969-25.75,62.156v164.594c-0.016,24.188,9.891,46.344,25.75,62.156c15.813,15.875,37.969,25.766,62.141,25.75h286.391c24.172,0.016,46.344-9.875,62.156-25.75c15.859-15.813,25.766-37.969,25.75-62.156V259.5C487.109,235.313,477.203,213.156,461.344,197.344z M179.891,134.219c0.016-21.094,8.469-39.938,22.297-53.813C216.047,66.594,234.891,58.125,256,58.125s39.953,8.469,53.813,22.281c13.828,13.875,22.281,32.719,22.297,53.813v37.375H179.891V134.219z M420.25,445.156c-5.484,5.438-12.75,8.719-21.063,8.719H112.797c-8.313,0-15.563-3.281-21.047-8.719c-5.438-5.469-8.703-12.75-8.719-21.063V259.5c0.016-8.328,3.281-15.594,8.719-21.063c5.484-5.438,12.734-8.719,21.047-8.719h286.391c8.313,0,15.578,3.281,21.063,8.719c5.422,5.469,8.703,12.734,8.719,21.063v164.594C428.953,432.406,425.672,439.688,420.25,445.156z"/><path class="st0" d="M255.984,279.969c-23.109,0-41.844,18.75-41.844,41.875c0,17.031,10.219,31.625,24.828,38.156l-9.25,60.094h26.266h26.297L273.016,360c14.609-6.531,24.844-21.125,24.844-38.156C297.859,298.719,279.109,279.969,255.984,279.969z"/></g></svg>
					</icon>
				</label>
				<label class="relative w-full" for="confirmPassword">
					<span>Confirm Password:</span>
					<input class="pl-10" type="password" id="confirmPassword" name="confirmPassword" minlength="6" required>
					<icon class="absolute left-4 top-[2.6rem]">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 512 512"><g><g><path d="M484.088,292.46c-5.1-5.128-11.968-8.076-19.156-8.076l0.172,0.036H330.588c-14.832,0-26.864,12.308-26.864,27.132v22.788c0,7.16,2.784,13.908,7.88,19c5.088,5.092,11.836,7.9,18.992,7.9l39.088,0.004c-32.072,34.348-76.7,53.888-123.708,53.888c-93.256,0-169.132-75.876-169.132-169.132S152.716,76.868,245.972,76.868c69.824,0,133.388,43.836,158.172,109.084c5.636,14.82,20.076,24.784,35.924,24.784c4.66,0,9.248-0.852,13.636-2.52c19.808-7.52,29.796-29.76,22.268-49.568C439.932,63.772,347.504,0.024,245.976,0.024C110.344,0.024,0,110.368,0,246s110.184,245.976,245.816,245.976c62.608,0,123.232-24.64,169.336-67.9v21.796c0,14.832,12.392,26.824,27.22,26.824h22.792c14.828,0,26.836-11.992,26.836-26.824V311.648C492,304.468,489.204,297.548,484.088,292.46z"/></g></g><g><g><path d="M361.06,179.392l-11.068-11.072c-2.86-2.86-6.676-4.436-10.744-4.436s-7.884,1.58-10.736,4.436L221.228,275.604l-64.792-64.792c-2.86-2.86-6.676-4.436-10.736-4.436c-4.068,0-7.88,1.58-10.74,4.436l-11.08,11.068c-5.912,5.92-5.912,15.56,0,21.48l86.612,86.604c2.856,2.856,6.668,4.432,10.736,4.432s7.88-1.58,10.812-4.512l129.02-129.02C366.984,194.944,366.984,185.312,361.06,179.392z"/></g></g></svg>
					</icon>
				</label>
				<button class="btn btn-filled-secondary mt-5" formaction="/?/register" type="submit">Register</button>
			</form>
		{/if}
		</div>

	{/if}
</Drawer>