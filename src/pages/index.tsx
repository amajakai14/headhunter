import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import LoginBtn from '../components/LoginBtn';
import Navbar from '../components/Navbar';
import { trpc } from '../utils/trpc';

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <>
      <Head>
        <title>Grass Root</title>
        <meta name="description" content="recruit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />

        <Footer />
      </main>
    </>
  );
};

export default Home;
