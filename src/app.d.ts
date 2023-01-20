import type {TypedSupabaseClient} from '@supabase/auth-helpers-sveltekit/dist/types';
import type { Session } from '@supabase/supabase-js';

declare global {

    declare namespace App {

        interface Locals {
            sb: TypedSupabaseClient,
            session: Session | null,
            consentCookie: ConsentCookie | null
        }

        interface PageData {
            session: Session | null,
            consentCookie: ConsentCookie | null
        }

    }

}