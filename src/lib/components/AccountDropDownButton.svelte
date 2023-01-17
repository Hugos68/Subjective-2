<script>
	import { menu } from "@skeletonlabs/skeleton";
</script>

<span class="relative">
	<button use:menu={{ menu: 'account-drop-down-menu' }} on:click={() => console.log("click")}>
        <svg class="h-6 w-6 text-token" fill="currentColor" viewBox="0 0 32 32"><path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/><path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/></svg>
    </button>
	<nav class="bg-surface-200-700-token p-4 rounded-token list-nav" data-menu="account-drop-down-menu">
        <ul>
            <li><a class="btn " href="/account">Account</a></li>
            <li><a class="btn r" href="/logout">Logout</a></li>
        </ul>
    </nav>
</span>