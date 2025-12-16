import { ReactNode } from "react";
import "./styles.css";
import { Header } from "./header";
import { getAuth } from "@/lib/auth";

export const metadata = {
  title: "ESMate React Payload",
  description: "A blank template using Payload in a Next.js app.",
};

export default async function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  const auth = await getAuth();

  return (
    <html lang="en" className="light">
      <body>
        <main>
          <section className="flex min-h-screen flex-col">
            <Header user={auth} />
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
