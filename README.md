# Interview Scheduler

This project is a single page application (SPA) called Interview Scheduler, built using React. It enables users to book, edit and cancel interviews, select an interviewer, and shows them the appointments for each day. Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. Jest tests are used throughout the development of the project.

## Features

- Book, edit, and cancel appointments with interviewers
- See the number of spots available for each day
- Error handling for booking, editing, and deleting appointments
- User-friendly interface with dynamic styling
- Responsive design for desktop and mobile

## Final Product

### Main View

![Interview Scheduler](https://github.com/JimHwkins/scheduler/blob/master/docs/Main.png)

### Book Appointment

![Interview Scheduler - Book interview](https://github.com/JimHwkins/scheduler/blob/master/docs/BookInterview.png)
![Interview Scheduler - Saving load](https://github.com/JimHwkins/scheduler/blob/master/docs/Saving.png)

### Cancel Appointment

![Interview Scheduler - Cancel interview](https://github.com/JimHwkins/scheduler/blob/master/docs/DeleteInterview.png)
![Interview Scheduler - Deleting load](https://github.com/JimHwkins/scheduler/blob/master/docs/Deleting.png)

### Error

![Interview Scheduler - Error](https://github.com/JimHwkins/scheduler/blob/master/docs/Error.png)

## Technologies used:

- React
- Axios
- PostgreSQL
- Jest
- Storybook
- Cypress

## Getting Started

1. Install dependencies: `npm install`.
2. Start the Webpack Development Server: `npm start`.
3. In another terminal, start the scheduler-api server: `npm start` from the scheduler-api directory.
4. Visit `http://localhost:8000/` in your web browser.

## Dependencies

- Node.js
- React
- Axios
- Classnames
- Normalize.css

## Dev-dependencies

- Storybook
- Jest-dom
- React-hooks-testing-library
- Cypress
- Prop-types
- React-test-renderer
- Sass

## Testing

- Storybook: `npm run storybook`
- Jest: `npm test`
- Cypress: `npm run cypress`
