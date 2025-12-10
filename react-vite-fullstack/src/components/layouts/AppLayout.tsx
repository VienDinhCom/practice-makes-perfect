import { Outlet } from 'react-router-dom';
import { AsyncBoundary } from '@suspensive/react';
import { AuthProvider } from '@app/contexts/AuthContext';
import { AlertProvider } from '@app/contexts/AlertContext';
import { PageError } from '@app/components/common/PageError';
import { PageLoader } from '@app/components/common/PageLoader';

export function AppLayout() {
  return (
    <AsyncBoundary pendingFallback={<PageLoader />} rejectedFallback={() => <PageError />}>
      <AuthProvider>
        <AlertProvider>
          <Outlet />
        </AlertProvider>
      </AuthProvider>
    </AsyncBoundary>
  );
}
