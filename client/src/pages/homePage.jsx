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

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });

    return(
        <div className='align-center flex-column container text-center text-light bg-primary'>
        
            <div className='m-5'>
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

            <div className='text-center m-3'>
                <h2>Want to create an event?</h2>

<button data-target="modal-js-example" id='eventButton' type="button" className="btn btn-lg btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
Create Event!
</button>

<div className="modal fade" id="modal-js-example" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Create Event!</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
            </div>
        </div>
    )
};

export default Home;