import clsx from 'clsx';
import { useImmer } from 'use-immer';
import { Dialog, Transition } from '@headlessui/react';
import { ReactNode, createContext, Fragment } from 'react';
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';

interface Alert {
  message: string;
  onOk?: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
}

interface Variant {
  icon: ReactNode;
  className: string;
}

const variants: Record<string, Variant> = {
  default: {
    icon: <InformationCircleIcon className="h-6 w-6 shrink-0 stroke-primary" />,
    className: '',
  },
  info: {
    icon: <InformationCircleIcon className="h-6 w-6 shrink-0 stroke-info" />,
    className: 'alert-info',
  },
  success: {
    icon: <CheckCircleIcon className="h-6 w-6 shrink-0 stroke-success" />,
    className: 'alert-success',
  },
  warning: {
    icon: <ExclamationTriangleIcon className="h-6 w-6 shrink-0 stroke-warning" />,
    className: 'alert-warning',
  },
  error: {
    icon: <XCircleIcon className="h-6 w-6 shrink-0 stroke-error" />,
    className: 'alert-error',
  },
};

interface AlertContextValue {
  show: (alert: Alert) => void;
}

export const AlertContext = createContext<AlertContextValue>(undefined as unknown as AlertContextValue);

interface Props {
  children: ReactNode;
}

interface State {
  alerts: Alert[];
}

export function AlertProvider(props: Props) {
  const [state, setState] = useImmer<State>({ alerts: [] });

  const activeAlert = state.alerts[0] || {};
  const activeVariant = variants[activeAlert.variant || 'default'] || {};

  return (
    <AlertContext.Provider
      value={{
        show: (alert) =>
          setState((draft) => {
            draft.alerts.push(alert);
          }),
      }}
    >
      <Transition appear show={Boolean(state.alerts.length)} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={clsx('container alert mt-[-25%] max-w-2xl', activeVariant.className)}>
                  {activeVariant.icon}

                  <Dialog.Description>{activeAlert?.message}</Dialog.Description>

                  <div>
                    {activeAlert.onCancel && (
                      <button
                        className="btn-sm btn mr-2"
                        onClick={() => {
                          setState((draft) => {
                            draft.alerts.shift();
                          });
                          activeAlert.onCancel && activeAlert.onCancel();
                        }}
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      className="btn-primary btn-sm btn w-16"
                      onClick={() => {
                        setState((draft) => {
                          draft.alerts.shift();
                        });

                        activeAlert.onOk && activeAlert.onOk();
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {props.children}
    </AlertContext.Provider>
  );
}
