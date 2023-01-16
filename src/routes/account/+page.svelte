<script lang="ts">
	import { type SubmitFunction, enhance, applyAction } from "$app/forms";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

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
<form action="/?/logout" method="POST" use:enhance={submitLogout}>
    <button type="submit" class="btn btn-filled-error">Logout</button>
</form>