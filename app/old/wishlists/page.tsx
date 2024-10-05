import Card from "@/app/ui/Card";
import WishLister from "@/app/ui/wishlist/wishlister";

const Page = async () => {


    return (
        <main className="flex mx-2">
            <>
                <WishLister />

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

export default Page