import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { time, interview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd = () => {
    transition(CREATE);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && interview && <Show {...interview} />}
      {mode === CREATE && (
        <Form interviewers={[]} onCancel={(back) => transition(EMPTY)} />
      )}
    </article>
  );
}
