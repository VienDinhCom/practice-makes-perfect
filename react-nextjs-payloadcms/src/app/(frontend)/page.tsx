import { headers as getHeaders } from "next/headers";
import Image from "next/image";
import { getPayload } from "payload";
import { fileURLToPath } from "url";
import config from "@/payload.config";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent } from "@esmate/shadcn/components/ui/card";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col items-center space-y-8 text-center">
            {/* Logo */}
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-xl" />
              <picture>
                <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
                <Image
                  alt="Payload Logo"
                  height={80}
                  src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
                  width={80}
                  className="relative"
                />
              </picture>
            </div>

            {/* Welcome Message */}
            <div className="space-y-2">
              {!user && (
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-slate-50">
                  Welcome to your new project
                </h1>
              )}
              {user && (
                <>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-slate-50">
                    Welcome back!
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400">{user.email}</p>
                </>
              )}
            </div>

            {/* Action Links */}
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={payloadConfig.routes.admin} rel="noopener noreferrer" target="_blank">
                  Go to admin panel
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="https://payloadcms.com/docs" rel="noopener noreferrer" target="_blank">
                  Documentation
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 space-y-2 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">Update this page by editing</p>
        <a
          href={fileURL}
          className="inline-block rounded-md bg-slate-800 px-4 py-2 font-mono text-sm text-slate-100 transition-colors hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          app/(frontend)/page.tsx
        </a>
      </div>
    </div>
  );
}
