import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook that encapsulates the state and behavior of Application data
export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    setDay: (day) => setState({ ...state, day }),
  });

  // updates the state with the selected day.
  const setDay = (day) => setState({ ...state, day });

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
      setState((prev) => ({ ...prev, appointments, days }));
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
    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }))
    );
  };

  // Use useEffect hook to fetch the initial application data from the server when the component is mounted.
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      // Updates the state with the fetched data
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    bookInterview,
    cancelInterview,
    setDay,
  };
}
