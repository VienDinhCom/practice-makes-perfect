import { useContext } from 'react';
import { AuthContext } from '@app/contexts/AuthContext';

export function useAuthUser() {
  return useContext(AuthContext)!;
}
