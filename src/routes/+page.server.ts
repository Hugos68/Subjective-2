import { type Provider, AuthApiError } from '@supabase/supabase-js';
import type {Actions} from './$types';
import {fail, redirect} from "@sveltejs/kit";

export const actions: Actions = {
    login: async ({request, locals, url}) => {
            
        const body = Object.fromEntries(await request.formData());

        const provider = url.searchParams.get("provider") as Provider;
    

        if (provider) {
            const {data, error: err } = await locals.sb.auth.signInWithOAuth({
                provider: provider
            });
                        
            if (err) {
                return fail(400, {
                    message: 'Something went wrong'
                });
            }
            throw redirect(303, data.url);
        }
        else if (
            !body.email ||
            !body.password
        ) {
            return fail(400, {
                message: 'Please fill in all fields'
            });
        }
        const {data, error: err} = await locals.sb.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string
        });

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    message: err.message
                });
            }
            
            return fail(500, {
                message: err.message
            });
        }
        
        return {success: true}
    },
    register: async ({request, locals}) => {
        const body = Object.fromEntries(await request.formData());

        if (body.password!==body.confirmPassword) {
            return fail(400, {
                message: 'Password mismatch'
            });
        }
        if (
            !body.email ||
            !body.password
        ) {
            return fail(400, {
                message: 'Please fill in all fields'
            });
        }

        const {error: err, data}  = await locals.sb.auth.signUp({
            email: body.email as string,
            password: body.password as string
        });

        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, {
                    message: err.message
                });
            }
            return fail(500, {
                message: err.message
            });
        }

        // Janky hotfix to check wether an email is taken or not until supabase gives us a better solution
        if(data?.user?.identities?.length === 0){
            return fail(500, {
                message: "Email is already registered"
            });
        }

        return {success: true}
    },
}