import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    console.log(locals);
    
    const { error: err } = await locals.sb.auth.signOut();
    if (err) {
        throw fail(500, {message: "Something went wrong logging you out."});
    }
    throw redirect(303,'/');
};