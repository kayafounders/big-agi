import * as React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import GoogleButton from 'react-google-button';

import { AppLayout } from '@/common/layouts/AppLayout';

import { Chat } from '../src/apps/chat/Chat';


export default function Home() {
  // const router = useRouter();
  // React.useEffect(() => {
  //   // noinspection JSIgnoredPromiseFromCall
  //   router.replace('/chat');
  // }, [router]);

  const { data: session, status } = useSession();
  const isSignedIn = session && session.user;
  const isSessionLoading = status === "loading";

  if (isSessionLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', textAlign: 'center'}}>
        <Spinner style={{alignSelf: 'center'}} />
      </div>
    );
  } else if (!isSignedIn) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', textAlign: 'center'}}>
        <div>
          <Image src="/logo.png" alt="kaya founders" height={200} width={578}/>
        </div>
        <GoogleButton style={{alignSelf: 'center'}} onClick={() => signIn("google").then(undefined)}/>
      </div>
    );
  }

  return (
    <AppLayout>
      <Chat />
    </AppLayout>
  );
}