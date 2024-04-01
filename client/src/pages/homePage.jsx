// importing navigation links, hook for making GraphQL queries and QUERY_EVENTS to render a list of events
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_EVENTS, {
        // this ensures that the data is always fetched from the server
        fetchPolicy: "no-cache"
    });

    // extracting the events array from the data object
    // if there are no events an empty array is initialized
    const eventList = data?.events || [];

    return(
        <div className='card bg-white card-rounded w-50'>
        
            <div className='card-body m-5'>
                <h2>Here's a list of all upcoming events:</h2>
                {/* if data is loading then 'Loading...' will be displayed otherwise all the events will be displayed */}
                {loading ? (
                 <div>Loading...</div>   
                ) : (
                    <ul className='square'>
                        {/* mapping through event list and rendering each event and linking to the actual event */}
                        {eventList.map((event) => {
                            return (
                                // generating each title of events by ID
                                <li key = {event._id}>
                                    <Link to = {{ pathname: `/event/${event._id}`}}>
                                        {event.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className='card-footer text-center m-3'>
                <h2>Want to create an event?</h2>
                <Link to="/event">
                    <button className='btn btn-lg btn-danger'>Create Event!</button>
                </Link>
            </div>
        </div>
    )
};

export default Home;