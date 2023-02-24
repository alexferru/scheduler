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
