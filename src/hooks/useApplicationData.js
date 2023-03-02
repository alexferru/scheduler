// Imports
import { useReducer, useEffect } from "react";
import axios from "axios";

// Define constants for action types.
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// Reducer function that handles state changes based on dispatched actions.
function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      // Update state with the selected day
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      // Update state with all application data
      return { ...state, ...action.value };
    case SET_INTERVIEW:
      // Update state with appointment and day data after a booking or cancellation.
      return {
        ...state,
        appointments: action.value.appointments,
        days: action.value.days,
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

// Custom hook that encapsulates the state and behavior of Application data
export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // updates the state with the selected day.
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  // updates the number of spots available in a day after booking or cancelling an interview.
  function updateSpots(state, appointments, id) {
    const dayIndex = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );
    const day = state.days[dayIndex];

    // Count the number of appointments in the day that don't have an interview scheduled.
    const numSpots = day.appointments.reduce((acc, currId) => {
      if (!appointments[currId].interview) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    // Create a new array of days with the updated number of spots for the day with the given id
    const newDays = [...state.days];
    const newDay = { ...day, spots: numSpots };
    newDays[dayIndex] = newDay;

    return newDays;
  }

  // Books an interview for a given appointment id and interview data.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Updates the number of spots available in the state
    const days = updateSpots(state, appointments, id);

    // Sends a PUT request to the server to update the appointment data.
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, value: { appointments, days } });
    });
  }

  // Deletes an interview for a given appointment id
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Updates the number of spots available in the state.
    const days = updateSpots(state, appointments, id);

    // Sends a DELETE request to the server to delete the appointment data.
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() =>
        dispatch({ type: SET_INTERVIEW, value: { appointments, days } })
      );
  };

  // Use useEffect hook to fetch the initial application data from the server when the component is mounted.
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all.map(
        (response) => response.data
      );
      dispatch({
        type: SET_APPLICATION_DATA,
        value: { days, appointments, interviewers },
      });
    });
  }, []);

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onopen = () => {
      socket.send("ping");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === SET_INTERVIEW) {
        const appointments = { ...state.appointments, ...message.appointments };
        const days = updateSpots(state, appointments, message.id);
        dispatch({ type: SET_INTERVIEW, value: { appointments, days } });
      }
    };

    return () => {
      socket.close();
    };
  }, [state]);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

export default useApplicationData;
