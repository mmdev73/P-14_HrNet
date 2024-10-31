import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { StoreApi, UseBoundStore } from 'zustand'
import { FunctionComponent } from 'react'

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
  setFormData: (data: Employee) => void
  resetFormData: () => void
  updateField: (field: keyof Employee, value: string) => void
  addEmployee: (employee: Employee) => void
  removeEmployee: (index: number) => void
}
interface Employee {
  firstname: string,
  lastname: string,
  dob: number,
  start: string,
  street: string,
  city: string,
  state: string,
  zipcode: string,
  department: string,
  employeesList: string[],
  resetForm: () => void
}
const Middlewares : (f:any) => any = (f: FunctionComponent<any>) => devtools(persist(f, { name: 'hrNet-store' }))
export const useAppStore = createSelectors(
  create<State & Actions>()(
    Middlewares(
      (set:(arg:any)=>any) => ({
        formData: {
          firstname: '',
          lastname: '',
          dob: 0,
          start: '',
          street: '',
          city: '',
          state: '',
          zipcode: '',
          department: '',
          employeesList: [],
        },
        employeesList: [],
        setFormData: (data: Employee) => set((state: State) => ({ ...state, formData: data })),
        resetFormData: () => set((state: State) => ({ ...state, formData: { ...state.formData } })),
        updateField: (field: keyof Employee, value: string | number) => set((state: State) => ({ ...state, formData: { ...state.formData, [field]: value } })),
        addEmployee: (employee: Employee) => set((state: State) => ({ ...state, employeesList: [...state.employeesList, employee] })),
        removeEmployee: (index: number) => set((state: State) => ({ ...state, employeesList: [...state.employeesList.slice(0, index), ...state.employeesList.slice(index + 1)] })),
      })
    )
  )  
)