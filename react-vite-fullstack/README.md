# React Vite Fullstack

In 2023, realizing that nobody was coming to build the things I wanted to see. So I built my own stack from the ground up. Nothing fancy—just tools that made sense to me.

I started with Vite because I wanted speed, the kind that makes ideas feel light. I paired it with Express on the backend, then leaned on Postgres for data, using Prisma to keep everything clean and predictable. For server functions, I reached for Telefunc because it removed the usual noise. Authentication felt heavy until I used Firebase Auth, which made it almost boring—in a good way.

On the front end, I kept React close, styling everything with Tailwind and daisyUI to avoid overthinking. React Router gave me file-based routing, and Gulp handled the small, repetitive tasks.

Piece by piece, the stack became mine.


## Usage

### `volta setup`
This project was developed with Node 22 and NPM 10.<br>

To set up a compatible environment, please download [Volta](https://github.com/volta-cli/volta) and run `volta setup`.

### `docker compose up`

This project uses Postgres and Docker to run the database. Please run `docker compose up` to start the database.

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!