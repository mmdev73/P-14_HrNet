//import React from 'react'
import { useAppStore } from '../app/store'
import { DataTable } from 'hrnet-lib'
const ViewEmployee = () => {
  const employeeList = useAppStore.use.employeesList()
  const thList: string[] = [
    "First Name",
    "Last Name",
    "Start Date",
    "Department",
    "Date of Birth",
    "Street",
    "City",
    "State",
    "Zip Code"
  ]
  const dataProperties:string[] = [
    "firstname",
    "lastname",
    "start",
    "department",
    "dob",
    "street",
    "city",
    "state",
    "zipcode"
  ]

  return (
    <section className="section-container view">
      <h1 className="view__title">View Employees</h1>
      <DataTable 
        id='view-dataTable'
        headColumnList={thList}
        dataPropertiesList={dataProperties}
        bodyDataList={employeeList}
      />
    </section>
  )
}
 
export default ViewEmployee