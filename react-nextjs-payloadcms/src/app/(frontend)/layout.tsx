import { ReactNode } from "react";
import "./styles.css";

export const metadata = {
  title: "ESMate React Payload",
  description: "A blank template using Payload in a Next.js app.",
};

export default async function RootLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className="dark">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
