import { useSession, signIn, signOut } from 'next-auth/react';
import { baseUrl } from '../constants/baseURL';
// import { sendLoginEmail } from '../utils/mailer';

export default function Component() {
  const { data: session } = useSession();
  const sendmail = async () => {};
  if (session) {
    console.log(session);
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={sendmail}>Send mail</button>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
