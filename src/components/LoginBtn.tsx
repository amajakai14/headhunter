import { useSession, signIn, signOut } from 'next-auth/react';
import { trpc } from '../utils/trpc';

export default function Component() {
  const { data: session } = useSession();
  const a = trpc.useMutation(['user.request-verify-user']);
  const email = session?.user?.email as string;
  function sendmail() {
    console.log('hi front');
    const result = a.mutate({ email });
    console.log(result);
  }
  if (session) {
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
