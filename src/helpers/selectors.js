export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((dia) => dia.name === day);

  if (!selectedDay) {
    return [];
  }

  const appointments = selectedDay.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  );

  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    },
  };
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((days) => days.name === day);

  if (filteredDay.length === 0) {
    return filteredDay;
  }

  const filteredInterviewers = filteredDay[0].interviewers;

  const daysInterviewers = filteredInterviewers.map((id) => {
    return state.interviewers[id];
  });

  return daysInterviewers;
}
