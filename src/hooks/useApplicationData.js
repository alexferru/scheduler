import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    setDay: (day) => setState({ ...state, day }),
  });

  const setDay = (day) => setState({ ...state, day });

  function updateSpots(state, appointments, id) {
    const dayIndex = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );
    const day = state.days[dayIndex];

    const numSpots = day.appointments.reduce((acc, currId) => {
      if (!appointments[currId].interview) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const newDays = [...state.days];
    const newDay = { ...day, spots: numSpots };
    newDays[dayIndex] = newDay;

    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments, id);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, appointments, id);

    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState((prev) => ({
        ...prev,
        appointments,
        days,
      }))
    );
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      console.log("Interviewers:", all[2].data);
    });
  }, []);

  return {
    state,
    bookInterview,
    cancelInterview,
    setDay,
  };
}
