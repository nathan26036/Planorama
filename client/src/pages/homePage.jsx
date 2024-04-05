// importing navigation links, hook for making GraphQL queries and QUERY_EVENTS to render a list of events
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';


function MyVerticallyCenteredModal(props) {
  const [formState, setFormState] = useState({ title: '', description: '', date: '' });
  const [addEvent] = useMutation(ADD_EVENT);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addEvent({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      title: '',
      description: '',
      date: ''
    });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Enter the name of your new event:</Form.Label>
        <Form.Control type="email" name='title' placeholder="New Event" onChange={handleChange} value={formState.title}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter a short description of the event:</Form.Label>
        <Form.Control as="textarea" name='description' placeholder="Description" onChange={handleChange} value={formState.description}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Enter the date and time of your event:</Form.Label>
        <Form.Control type="datetime-local" name='date' id="eventDate" onChange={handleChange} value={formState.date}/>
      </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onSubmit={handleFormSubmit}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const Home = () => {
  const [modalShow, setModalShow] = useState(false);

    const { loading, data } = useQuery(QUERY_EVENTS, {
        // this ensures that the data is always fetched from the server
        fetchPolicy: "no-cache"
    });

    // extracting the events array from the data object
    // if there are no events an empty array is initialized
    const eventList = data?.events || [];

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

<>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Create an Event!
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
</>
            </div>
        </div>
    )
};

export default Home;