# Node.js WebSocket

I wanted to understand how real-time communication works on the web, so I built a simple chat app.

You know how most websites work like a conversation where you have to keep asking questions? You click, the server responds, then silence. **WebSockets** are different. They're like leaving a phone line open. Both sides can talk whenever they want.

I used **TypeScript** with **Node.js**, **Express.js** for the server, **Vite**, **React** with **Tailwind CSS** for the interface. Nothing fancy. The goal wasn't to build the next big thing, just to see the mechanics up close.

What struck me most was how fragile these connections are. They drop, they timeout, they need constant care. Building it myself revealed all these little problems you never think about as a user.

Sometimes the best way to understand something isn't to read about it, but to break it, fix it, and watch it work.

## Usage

### `volta setup`

This project was developed with Node 24 and PNPM 10.<br>

To set up a compatible environment, please download [Volta](https://github.com/volta-cli/volta) and run `volta setup`.

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
