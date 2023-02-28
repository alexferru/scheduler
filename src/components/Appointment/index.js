import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { time, interview, interviewers, id } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd = () => {
    transition(CREATE);
  };

  const onEdit = () => {
    transition(EDIT, { interview });
  };

  const onCancel = () => {
    transition(SHOW);
  };

  function save(name, interviewer) {
    if (!name || !interviewer) {
      transition(ERROR_SAVE, true);
      return;
    }

    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  const deleteAppointment = function () {
    transition(CONFIRM);
  };

  const confirmDeleteAppointment = function () {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && interview && (
        <Show {...interview} onDelete={deleteAppointment} onEdit={onEdit} />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onCancel={back}
          onConfirm={confirmDeleteAppointment}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={save}
          name={interview.student}
          interviewer={interview.interviewer.id}
          interview={interview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={back} />
      )}
    </article>
  );
}
