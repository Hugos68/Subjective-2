<script lang="ts">
	import { type SubmitFunction, enhance } from "$app/forms";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

    const submitLogout: SubmitFunction = () => {
        return async ({result}) => {
            if (result.type==='redirect') {
                const t: ToastSettings = {
                    message: 'Logged out successfully, See you later...',
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
</script>
<form action="/?/logout" method="POST" use:enhance>
    <button type="submit" class="btn btn-filled-error">Logout</button>
</form>