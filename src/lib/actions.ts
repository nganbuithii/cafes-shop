'use server'
import { supabase } from '@/config/supabaseClient'
import { redirect } from 'next/navigation'

const signInWith = (provider: 'google' | 'github' | 'facebook' | 'twitter') => async () => {
    const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider, 
        options: {
            redirectTo: auth_callback_url,
        },
    });

    if (error) {
        console.log(error);
        return;
    }
// console.log("data", data)
    redirect(data.url);
}

const signinWithGoogle = signInWith('google');
export { signinWithGoogle };
