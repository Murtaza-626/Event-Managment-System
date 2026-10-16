import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerEvent } from "../registrationSlice";

function EventDetails() {
  const { id } = useParams(); // Dynamic Route parameter
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [event, setEvent] = useState(null);
  
  // Get active user and all registrations from Redux 
  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector((state) => state.registration.list);

  // Fetch single event details 
  useEffect(() => {
    const fetchEventDetails = async () => {
      const apiKey = process.env.TICKETMASTER_API_KEY;
      const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        alert("Failed to load event details.");
      }
    };
    fetchEventDetails();
  }, [id]);

  if (!event) return <p>Loading event details.....</p>;

  // Checking if user is already registered to prevent duplicates 
  const isRegistered = user ? registrations.some(r => r.id === event.id && r.userEmail === user.email) : false;

  function handleRegister() {
    if (!user) {
      alert("Please login to register for events.");
      navigate("/login");
      return;
    }
    
    if (isRegistered) {
      alert("You are already registered for this event!");
      return;
    }

    // Save event details and associate with logged-in user
    const registrationData = {
      id: event.id,
      name: event.name,
      date: event.dates?.start?.localDate,
      image: event.images?.[0]?.url,
      userEmail: user.email // Associate with user 
    };

    dispatch(registerEvent(registrationData));
    alert("Successfully registered for the event!");
  }

  return (
    <div>
      <h2>{event.name}</h2>
      {event.images && <img src={event.images[0].url} alt={event.name} style={{ width: "300px", borderRadius: "10px" }} />}
      <p><strong>Date & Time:</strong> {event.dates?.start?.localDate} {event.dates?.start?.localTime}</p>
      <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name}</p>
      <p><strong>Venue:</strong> {event._embedded?.venues?.[0]?.name}</p>
      <p><strong>Location:</strong> {event._embedded?.venues?.[0]?.city?.name}, {event._embedded?.venues?.[0]?.country?.name}</p>
      
      <button 
        onClick={handleRegister} 
        disabled={isRegistered}
        style={{ padding: "10px", marginTop: "10px", background: isRegistered ? "gray" : "blue", color: "white" }}
      >
        {isRegistered ? "Already Registered" : "Register for Event"}
      </button>
    </div>
  );
}

export default EventDetails;