<script lang="ts">
	import { page } from "$app/stores";
	import { Avatar} from "@skeletonlabs/skeleton";
</script>

<h1 class="text-center py-12">Account</h1>
<div class="mx-auto card w-[min(60rem,90vw)] flex flex-col items-center">
	<header class="card-header">
        <Avatar width="w-24" initials="{$page.data.session?.user.email?.charAt(0)}" />
    </header>
	<div class="p-4">
        <p><span class="font-semibold">Email: </span>{$page.data.session?.user.email}</p>
    </div>
	<footer class="card-footer flex justify-center mt-24">
    </footer>
</div>