import { supabase } from "../utils/supabaseClient";

async function signOut() {
    console.log('signing out')
    const { error } = await supabase.auth.signOut()
}

export default function SignOut() {
    return <button onClick={signOut}>Sign Out</button>
}