import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { User } from '@prisma/client';
import { config } from 'telefunc/client';
import { ReactNode, createContext } from 'react';
import { http } from '@app/utilities/http.shared';
import { PageLoader } from '@app/components/common/PageLoader';
import { clientAuth, GoogleAuthProvider, signInWithRedirect } from '@app/utilities/auth.client';

type AuthUser = User | null;

export const AuthContext = createContext<AuthUser>(null);

interface Props {
  children: ReactNode;
}

interface State {
  authUser: AuthUser;
  loading: boolean;
}

export function AuthProvider(props: Props) {
  const [state, setState] = useImmer<State>({ authUser: null, loading: true });

  useEffect(() => {
    clientAuth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const authorization = await user.getIdToken();

          const authUser = await http.post<AuthUser>({
            url: '/auth',
            data: authorization,
          });

          config.httpHeaders = { ...config.httpHeaders, authorization };

          setState((draft) => {
            draft.authUser = authUser;
          });
        } else {
          setState((draft) => {
            draft.authUser = null;
          });
        }
      } catch (error) {
        setState((draft) => {
          draft.authUser = null;
        });
      } finally {
        setState((draft) => {
          draft.loading = false;
        });
      }
    });
  }, [setState]);

  return (
    <AuthContext.Provider value={state.authUser}>
      {(() => {
        if (state.loading) return <PageLoader />;

        if (state.authUser) return props.children;

        return (
          <section className="flex h-screen  items-start justify-center px-3 pt-40">
            <div>
              <button
                className="btn-primary btn-lg btn normal-case"
                onClick={() => signInWithRedirect(clientAuth, new GoogleAuthProvider())}
              >
                Sign In with Google
              </button>
            </div>
          </section>
        );
      })()}
    </AuthContext.Provider>
  );
}
