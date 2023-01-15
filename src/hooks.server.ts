import '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
 

// Function for development purposes to prevent cookies from storing in 127.0.0.1 AND localhost
// which is differentiated for sameSite browser cookies.
export const redirectToLocaLhost = (async ({ event, resolve }) => {
    const url = new URL(event.request.url)
    if (url.hostname.startsWith('127.0.0.1')) {
        url.hostname = 'localhost'
        return Response.redirect(url.toString(), 302)
    }
    return await resolve(event);
}) satisfies Handle;

// Function to prevent users landing on the root page '/' which doesnt specify where they are unlike '/home'
export const redirectToHome = (async ({ event, resolve }) => {
    const url = new URL(event.request.url);
    if (url.pathname==='/') {
        url.pathname = '/home'
        return Response.redirect(url.toString(), 302)
    }
    return await resolve(event);
}) satisfies Handle;

export const handleAuth = (async ({ event, resolve }) => {
    const { session, supabaseClient } = await getSupabase(event);
    event.locals.sb = supabaseClient;
    event.locals.session = session;
    return resolve(event);
}) satisfies Handle;

export const handleAuthRouting = (async ({ event, resolve }) => {
    const url = new URL(event.request.url);
    const loggedIn = event.locals.session;
    if (loggedIn && (url.pathname==='/login' || url.pathname==='/register')) {
        url.pathname = '/home'
        return Response.redirect(url.toString(), 302)
    }
    else if (!loggedIn && (url.pathname==='/account' || url.pathname==='/blog')) {
        url.pathname = '/login'
        return Response.redirect(url.toString(), 302)
    }
    return resolve(event);
}) satisfies Handle;


export const handle: Handle = sequence(redirectToLocaLhost, redirectToHome, handleAuth, handleAuthRouting)