import 'telefunc';
import type { User } from './database';

declare module 'telefunc' {
  namespace Telefunc {
    interface Context {
      me: User;
    }
  }
}
