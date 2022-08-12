import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);
  console.log(hello);

  return (
    <>
      <Head>
        <title>Grass Root</title>
        <meta name="description" content="recruit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 justify-center content-center">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Home;
