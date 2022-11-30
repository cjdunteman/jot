import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './AuthStyles.css'

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="Button violet" size="large">
        Sign In
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Sign In</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          
        </Dialog.Description>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Email
          </label>
          <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button className="Button green" onClick={handleLogin}>Send Magic Link</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
    // <div className="row flex-center flex">
    //   <div className="col-6 form-widget" aria-live="polite">
    //     {loading ? (
    //       "Sending magic link..."
    //     ) : (
    //       <form onSubmit={handleLogin}>
    //         <label htmlFor="email">Email</label>
    //         <input
    //           id="email"
    //           className="inputField"
    //           type="email"
    //           placeholder="Your email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <button className="button block" aria-live="polite">
    //           Send magic link
    //         </button>
    //       </form>
    //     )}
    //   </div>
    // </div>
  );
}
