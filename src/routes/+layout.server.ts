import type { LayoutServerLoad } from './$types'
import { getServerSession } from '@supabase/auth-helpers-sveltekit'

export const load = (async (event) => {

  const serializedCookieConsent: string | undefined = event.cookies.get('cookie-consent');

  if (serializedCookieConsent) {
    return {
      session: await getServerSession(event),
      consentCookie: JSON.parse(serializedCookieConsent) as ConsentCookie
    }
  }

  return {
    session: await getServerSession(event)
  }
}) satisfies LayoutServerLoad;