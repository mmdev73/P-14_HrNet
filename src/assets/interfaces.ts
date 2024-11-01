
export interface Employee {
  firstname: string,
  lastname: string,
  dob: number,
  start: number,
  street: string,
  city: string,
  state: string,
  zipcode: string,
  department: string,
  employeesList?: string[],
  resetForm?: () => void
}

export interface dataServices {
  getStates: () => string[],
  getDepartments: () => string[],
  isValidText: (text: string) => boolean,
  isValidCity: (text: string) => boolean,
  isValidAddress: (text: string) => boolean,
  isValidZipCode: (text: string) => boolean,
  isValidDepartment: (text: string) => boolean,
  isValidState: (text: string) => boolean,
  isValidFormData: (data: Employee) => boolean,
  getErrListFormData: (data: Employee) => string[],
}