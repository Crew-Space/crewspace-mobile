import 'react-redux';
import { ReducerType } from 'store/reducer';

declare module 'react-redux' {
  interface DefaultRootState extends ReducerType {}
}
