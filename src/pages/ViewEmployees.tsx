import React from 'react'
import { useAppStore } from '../app/store'
import {DataTable} from "hrnet-lib3"

const ViewEmployee = () => {
  const employeeList = useAppStore.use.employeesList()
  const thList = [
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
  const dataProperties = [
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

  React.useEffect(() => {
    console.log(employeeList[employeeList.length - 1])
    console.log(employeeList)
  }, [employeeList])

  return (
    <section className="section-container view">
      <h1 className="view__title">View Employees</h1>
      <DataTable headColumnList={thList} dataPropertiesList={dataProperties} bodyDataList={employeeList}/>
    </section>
  )
}
 
export default ViewEmployee