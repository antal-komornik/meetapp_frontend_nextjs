import React from 'react';
import { fetchEvents } from '@/app/lib/data'
import Card from "@/app/ui/Card";
import { useSession, signIn, signOut } from 'next-auth/react';
import Sessiontest from '../ui/dashboard/sessiontest';

const Home = async () => {
  const events = await fetchEvents();



  return (
    <main className="flex mx-2">
      <>
        <div className="flex justify-center">
          <h4>helo</h4>
          <hr />
          <br />


        </div>

        <div>
          <Sessiontest />
        </div>

        {/* <div className="flex w-full justify-center items-center  gap-4  flex-col md:flex-row ">
          {events == undefined || events.length == 0 ?
            <h1>Nincs esemény</h1>
            :
            <>
              {events.map((event) => (
                <div key={event.id} >
                  <Card id={event.id} title={event.title} starting_time={event.starting_time} url={event.url} image={event.image} />
                </div>
              ))
              }
            </>
          }
        </div > */}
      </>
    </main>
  );
}

export default Home