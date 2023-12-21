import {create} from 'zustand';

interface TimeStore {
  timeArray: Array<number | string>;
  setTimeArray: (newTimeArray: Array<number | string>) => void;
}

const useTimeStore = create<TimeStore>((set) => ({
  timeArray: [],
  setTimeArray: (newTimeArray) => set({ timeArray: newTimeArray }),
}));

export default useTimeStore;
