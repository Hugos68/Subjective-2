import type { LayoutServerLoad } from './$types'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'

export const load = (async (event) => {
  return {
    session: await getServerSession(event),
    consentCookie: event.locals.consentCookie
  }
}) satisfies LayoutServerLoad;