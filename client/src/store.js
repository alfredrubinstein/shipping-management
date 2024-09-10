import create from 'zustand';

const useArrayStore = 
//esto es el estado inicial
create((set) => ({array: [],
  //esto es una funcion que recibe un elemento y lo agrega al array
  addElement: (element) => set((state) => ({
    array: [...state.array, element]
  })),
  //esto es una funcion que recibe un shipmentNumber y lo elimina del array
  removeElement: (shipmentNumber) => set((state) => ({
    array: state.array.filter(item => item.shipmentNumber !== shipmentNumber)
  }))
  
}));

export default useArrayStore;
