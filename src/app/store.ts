import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { StoreApi, UseBoundStore } from 'zustand'
import { FunctionComponent } from 'react'
import { Employee } from '../assets/interfaces'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
type State = {
  formData: Employee
  employeesList: Employee[]

}
type Actions = {
  resetForm: () => void
  updateField: (field: keyof Employee, value: string|number) => void
  addEmployee: (employee: Employee) => void
  removeEmployee: (index: number) => void
}

const initialFormData: Employee = {
  firstname: '',
  lastname: '',
  dob: 0,
  start: 0,
  street: '',
  city: '',
  state: '',
  zipcode: '',
  department: '',
}

const Middlewares : (f:any) => any = (f: FunctionComponent<any>) => devtools(persist(f, { name: 'hrNet-store' }))
export const useAppStore = createSelectors(
  create<State & Actions>()(
    Middlewares(
      (set:(arg:any)=>any) => ({
        formData: initialFormData,
        employeesList: [],   
        resetForm: () => set(() => ({ formData: initialFormData })),    
        updateField: (field: keyof Employee, value: string | number) => set((state: State) => ({ ...state, formData: { ...state.formData, [field]: value } })),
        addEmployee: (employee: Employee) => set((state: State) => ({ ...state, employeesList: [...state.employeesList, employee] })),
        removeEmployee: (index: number) => set((state: State) => ({ ...state, employeesList: [...state.employeesList.slice(0, index), ...state.employeesList.slice(index + 1)] })),
      })
    )
  )  
)