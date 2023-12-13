import ToastersContext from './toasterContext';
import { useContext } from 'react';

export const useToasters = () => useContext(ToastersContext);
