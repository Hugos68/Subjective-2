<script lang="ts">
	import { enhance } from "$app/forms";
	import { Drawer, drawerStore, LightSwitch, storeLightSwitch, Tab, TabGroup } from "@skeletonlabs/skeleton";	
	import { writable, type Writable } from "svelte/store";
	import { fly } from "svelte/transition";

	function closeHamburger(): void {
		drawerStore.close();
	}	

	function toggleLightSwitch(): void {
		storeLightSwitch.update(state => {return !state});
		const elemHtmlClassList = document.documentElement.classList;
		$storeLightSwitch ? elemHtmlClassList.add('dark') : elemHtmlClassList.remove('dark');
	}

	const storeTab: Writable<string> = writable('login');
</script>

<Drawer	>
	{#if $drawerStore.id==='hamburger'}
		<div class="flex flex-col h-screen items-end">
			<div class="h-[var(--header-height)] w-full border-b-2 border-surface-700-200-token flex justify-between items-center p-4">
				<h2>Subjective</h2>
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
						<a class="font-semibold text-lg w-full text-end capitalize" href="/{navItem}" in:fly={{x: 500, delay: i*50}}>{navItem}</a>
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
			<form class="flex flex-col items-center gap-6" method="POST" use:enhance>
				<h2>Login</h2>
				<label class="w-full" for="email">
					<span>Email:</span>
					<input type="text" id="email" name="email">
				</label>
				<label class="w-full" for="password">
					<span>Password:</span>
					<input type="password" id="password" name="password">
				</label>
				<button class="btn btn-lg btn-filled-secondary mt-5" formaction="/login" type="submit">Login</button>
				<label>
					<span class="text-center">Or login using:</span>
					<button class="btn bg-surface-700-200-token mx-4" formaction="/login&provider=google">
						<svg class="w-8 h-8" viewBox="0 0 16 16"  fill="none"><path fill="#4285F4" d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"/><path fill="#34A853" d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"/><path fill="#FBBC04" d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"/><path fill="#EA4335" d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"/></svg>
					</button>
					<button class="btn bg-surface-700-200-token mx-4" formaction="/login&provider=discord">
						<svg class="w-8 h-8" viewBox="0 0 127.14 96.36" fill="#5865f2"><g id="图层_2" data-name="图层 2"><g id="Discord_Logos" data-name="Discord Logos"><g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White"><path class="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></g></g></g></svg>
					</button>
					<button class="btn bg-surface-700-200-token mx-4 text-surface-200-700-token" formaction="/login&provider=github">
						<svg class="w-8 h-8" viewBox="0 0 32 32" fill="currentColor"><path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"/></svg>
					</button>
				</label>
			</form>
		{:else if $storeTab==="register"}
			<form class="flex flex-col items-center gap-6" method="POST" use:enhance>
				<h2>Register</h2>
				<label class="w-full" for="email">
					<span>Email:</span>
					<input type="text" id="email" name="email" minlength="4" required>
				</label>
				<label class="w-full" for="password">
					<span>Password:</span>
					<input type="password" id="password" name="password" minlength="6" required>
				</label>
				<label class="w-full" for="confirmPassword">
					<span>Confirm Password:</span>
					<input type="password" id="confirmPassword" name="confirmPassword" minlength="6" required>
				</label>
				<button class="btn btn-lg btn-filled-secondary mt-5" formaction="/register" type="submit">Register</button>
			</form>
		{/if}
		</div>

	{/if}
</Drawer>