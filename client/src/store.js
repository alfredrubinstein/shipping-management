import create from 'zustand';

const useArrayStore = create((set) => ({
  array: [],
  addElement: (element) => set((state) => ({
    array: [...state.array, element]
  })),
  removeElement: (shipmentNumber) => set((state) => ({
    array: state.array.filter(item => item.shipmentNumber !== shipmentNumber)
  }))
}));

export default useArrayStore;
