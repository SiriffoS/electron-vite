import { create } from "zustand";

type ExerciseStore = {
  attempts: number;
  hintsUsed: number;
  incrementAttempts: () => void;
  incrementHintsUsed: () => void;
  resetExercise: () => void;
};

const useExerciseStore = create<ExerciseStore>((set) => ({
  attempts: 0,
  hintsUsed: 0,
  incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
  incrementHintsUsed: () =>
    set((state) => ({ hintsUsed: state.hintsUsed + 1 })),
  resetExercise: () => {
    set({ attempts: 0, hintsUsed: 0 });
  },
}));

export default useExerciseStore;
