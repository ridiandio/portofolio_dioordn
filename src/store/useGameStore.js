import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useGameStore = create((set, get) => ({
  myColor: '#00ffff', // Default cosmic color for the local user
  forceFields: {},
  mousePos: null,

  setMousePos: (pos) => set({ mousePos: pos }),

  addForce: (position, type) => {
    const id = uuidv4();
    const newForce = {
      id,
      position,
      type,
      createdAt: Date.now(),
      color: get().myColor,
    };

    set((state) => ({
      forceFields: { ...state.forceFields, [id]: newForce },
    }));

    // Auto-remove force field after 3 seconds for local standalone version
    setTimeout(() => {
      set((state) => {
        const newForces = { ...state.forceFields };
        delete newForces[id];
        return { forceFields: newForces };
      });
    }, 3000);
  },
}));
