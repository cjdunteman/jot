import './App.css'

import TipTap from './components/TipTap'

import { useState, useEffect } from 'react'
import { supabase } from './utils/supabaseClient'
import Auth from './components/Auth'
import Account from './components/Account.jsx'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  return (
    <div className="App">
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      <TipTap />
    </div>
  )
}
