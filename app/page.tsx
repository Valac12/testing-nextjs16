import ExploreBtn from "@/components/ui/ExploreBtn";
import EventCard from "@/components/ui/EventCard";
import {events} from "@/lib/constants";

const Page = () => {
    return (
        <section>
            <h1 className="text-center">The Hub For Every Dev <br/> Even You Cant Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetup, and Conferences, All in One Place</p>

            <ExploreBtn/>

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events list-none pl-0">
                    {events.map((event) => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    )
}
export default Page
