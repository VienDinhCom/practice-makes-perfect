import { AlertContext } from '@app/contexts/AlertContext';
import { useContext } from 'react';

export function useAlert() {
  return useContext(AlertContext);
}
