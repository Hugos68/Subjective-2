import '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
 

export const handleAuth = (async ({ event, resolve }) => {
    const { session, supabaseClient } = await getSupabase(event);
    event.locals.sb = supabaseClient;
    event.locals.session = session;
    return resolve(event);
}) satisfies Handle;

export const handleAuthRouting = (async ({ event, resolve }) => {
    const url = new URL(event.request.url);
    const loggedIn = event.locals.session!==null;
    if (!loggedIn && (url.pathname==='/account')) {
        url.pathname = '/'
        return Response.redirect(url.toString(), 302)
    }
    return resolve(event);
}) satisfies Handle;


export const handle: Handle = sequence(handleAuth, handleAuthRouting)