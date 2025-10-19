# High-End Multipurpose LMS

This is a Learning Management System (LMS) built with Next.js.

## Getting Started

First, install the dependencies:

```bash
npm install
```
Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode using Turbopack.

### `npm run build`

Builds the app for production to the `.next` folder using Turbopack.

### `npm run start`

Starts the application in production mode.

### `npm run lint`

Runs the ESLint linter.

## Folder Structure

The main application code is located in the `src` directory.

-   `src/app`: Contains the main application pages and layouts.
    -   `(auth)`: Authentication-related pages (login, register).
    -   `(public)`: Publicly accessible pages (about, contact, etc.).
    -   `dashboard`: User dashboards for different roles (admin, instructor, student).
-   `src/components`: Contains reusable React components.
-   `src/context`: Contains React context providers.
-   `src/hooks`: Contains custom React hooks.
-   `src/lib`: Contains library-related code.
-   `src/providers`: Contains application providers.
-   `src/store`: Contains Zustand stores for state management.
-   `src/utils`: Contains utility functions.

## Key Dependencies

-   [Next.js](https://nextjs.org/): React framework.
-   [React](https://reactjs.org/): A JavaScript library for building user interfaces.
-   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.
-   [Framer Motion](https://www.framer.com/motion/): A library for animations.
-   [i18next](https://www.i18next.com/): An internationalization-framework.
-   [Recharts](https://recharts.org/): A composable charting library built on React components.
-   [Zustand](https://github.com/pmndrs/zustand): A small, fast and scalable bearbones state-management solution.
