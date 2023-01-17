<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import { page } from "$app/stores";
	import { Avatar, toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
    
    const submitLogout: SubmitFunction = () => {
        return async ({result}) => {
            await applyAction(result);
            if (result.type==='redirect') {
                const t: ToastSettings = {
                    message: 'Logged out successfully, See you later...',
                    preset: 'success',
                    autohide: true,
                    timeout: 5000,
                };
                toastStore.trigger(t);
            }
            else if (result.type='failure' && result.data) {
                const t: ToastSettings = {
                    message: result.data.message,
                    preset: 'error',
                    autohide: true,
                    timeout: 5000,
                };
                toastStore.trigger(t);
            }   
        }
    }
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