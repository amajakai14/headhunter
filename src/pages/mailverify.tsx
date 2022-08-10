import { useRouter } from 'next/router';
import { baseUrl } from '../constants/baseURL';
import { trpc } from '../utils/trpc';
import { useState } from 'react';
function VerifyPage() {
  const router = useRouter();
  const [render, setRender] = useState(true);
  const hash = router.asPath.split('token=')[1];
  console.log(hash);
  const verify = trpc.useMutation(['user.verify-user']);
  if (hash && render) {
    const x = verify.mutate({ hash });
    console.log(x);
    setRender(false);
  }
  return (
    <>
      <div>Verify page</div>
    </>
  );
}
export default VerifyPage;
