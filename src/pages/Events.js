import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setEvents, setLoading } from "../eventsSlice";

function Events() {
  const dispatch = useDispatch();
  // Fetching state from Redux 
  const events = useSelector((state) => state.events.list);
  const loading = useSelector((state) => state.events.loading);
  
  // Local state for search and filter 
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  // Fetch events inside useEffect 
  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(setLoading(true));
      
      const apiKey = process.env.TICKETMASTER_API_KEY;
      // Building API URL with filters
      let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;
      if (keyword) url += `&keyword=${keyword}`;
      if (category) url += `&classificationName=${category}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        // Ticketmaster stores events inside _embedded.events
        if (data._embedded && data._embedded.events) {
          dispatch(setEvents(data._embedded.events));
        } else {
          dispatch(setEvents([])); // No events found
        }
      } catch (error) {
        alert("Failed to fetch events from Ticketmaster.");
      }
      
      dispatch(setLoading(false));
    };

    // Use a small delay (debounce) to prevent spamming API while typing
    const delayFetch = setTimeout(() => {
      fetchEvents();
    }, 500); // (Auto-saving/Debouncing pattern)

    return () => clearTimeout(delayFetch);
  }, [keyword, category, dispatch]);

  return (
    <div>
      <h2>Explore Events</h2>
      
      // Search & Filter Form 
      <div style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Search events....." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "5px" }}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts">Arts & Theatre</option>
        </select>
      </div>

      // Rendering Events List 
      {loading ? (
        <p>Loading events.....</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} style={{ border: "1px solid lightblue", padding: "10px", width: "250px" }}>
                // Fallback image if available 
                {event.images && <img src={event.images[0].url} alt={event.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />}
                <h3>{event.name}</h3>
                <p><strong>Date:</strong> {event.dates?.start?.localDate}</p>
                <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name}</p>
                <Link to={`/events/${event.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No events found. Try a different search.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Events;