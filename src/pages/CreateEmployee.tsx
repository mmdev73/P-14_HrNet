import '../sass/pages/CreateEmployee.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {dataServices} from '../services/dataServices'
import { useAppStore } from "../app/store"
import { InputText, Select, DatePicker, Modale } from 'hrnet-lib'
import { Employee } from '../assets/interfaces'
const CreateEmployee = () => {
  const navigate = useNavigate()
  // use state Manager
  const firstname = useAppStore(state => state.formData.firstname);
  const lastname = useAppStore(state => state.formData.lastname);
  const street = useAppStore(state => state.formData.street);
  const city = useAppStore(state => state.formData.city);
  const stateValue = useAppStore(state => state.formData.state);
  const zipcode = useAppStore(state => state.formData.zipcode);
  const department = useAppStore(state => state.formData.department);
  const updateField = useAppStore(state => state.updateField);
  const resetForm = useAppStore(state => state.resetForm);
  const addEmployee = useAppStore(state => state.addEmployee);

  const [selectOptionsState, setSelectOptionsState] = React.useState<string[]>([])
  const [selectOptionsDepartment, setSelectOptionsDepartment] = React.useState<string[]>([])
  
  React.useEffect(() => {
  /**
   * Returns an object containing select options data for states and departments.
   * 
   * @returns {Object} - An object with two properties: selectOptionsStatesData and selectOptionsDepartmentData.
   *                     Each property is an array of select options data.
   */
    const getOptions = () => {
      const selectOptionsStatesData = dataServices.getStates()
      const selectOptionsDepartmentData = dataServices.getDepartments()
      return {
        selectOptionsStatesData,
        selectOptionsDepartmentData
      }
    }
    const { selectOptionsStatesData, selectOptionsDepartmentData } = getOptions()

    setSelectOptionsState(selectOptionsStatesData)
    setSelectOptionsDepartment(selectOptionsDepartmentData)
  }, [])

  // Modal 

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(false)
  const [errorList, setErrorList] = React.useState<string[]>([])

  // DatePicker temporary state
  const [dobValue, setDobValue] = React.useState<string>('')
  const [startValue, setStartValue] = React.useState<string>('')
  
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    const formData: Employee = {
      firstname: firstname,
      lastname: lastname,
      dob: new Date(dobValue).getTime(),
      start: new Date(startValue).getTime(),
      street: street,
      city: city,
      state: stateValue,
      zipcode: zipcode,
      department: department
    }
    setError(false)
    setErrorList([])
    if (dataServices.isValidFormData(formData)) {
      addEmployee(formData)
      //handleReset()
      resetForm()
    } else {
      setError(true)
      setErrorList(dataServices.getErrListFormData(formData))
    }
    toggleModal()
    return
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleCancel = () => {
    toggleModal()
    resetForm()
  }

  const handleCancelModal = (e: React.FormEvent) => {
    e.preventDefault()
    toggleModal()
  }

  const handleViewEmployees = (e: React.FormEvent) => {
    e.preventDefault()
    toggleModal()
    navigate('/view')
  }

  const headerTemplate = (
    <h2 className="modal__title">HRNet employee creation</h2>
  )

  const footerTemplate = (
    <>
      {
        error && <button className="modal__btn" onClick={handleCancelModal}>Close</button>
      }
      {
        !error && (
          <>
            <button className="modal__btn" onClick={handleCancel}>New employee</button>
            <button className="modal__btn" onClick={handleViewEmployees}>View employees</button>
          </>
        )
      }
    </>
  )

  return (
    <section className="section-container create">
      <Modale isOpen={isOpen} onClose={toggleModal} header={headerTemplate} footer={footerTemplate}>
        <p className="modal__text">
          {
            !error && 'Employee created successfully'
          }
          {
            error && (
              <>
                At least one error occured, see the list below :
                {
                  errorList.map((err, i) => <li key={i}>{err}</li>)
                }
              </>
            )
          }
        </p>
      </Modale>
      <h1 className="create__title">Create Employee</h1>
      <form className="create__form">
        <fieldset className="create__form__fieldset">          
          <legend className="create__form__legend">Informations</legend>
          <InputText
            label="First Name"
            id="firstname"
            value={firstname}
            onChange={(e) => updateField('firstname', e.target.value)}
          />
          <InputText
            label="Last Name"
            id="lastname"
            value={lastname}
            onChange={(e) => updateField('lastname', e.target.value)}
          />
          <DatePicker
            id="dob"
            label="Date of Birth"
            value={dobValue}
            onChange={(date) => setDobValue(date)}
          />
          <DatePicker
            id="start"
            label="Start date"
            value={startValue}
            onChange={(date) => setStartValue(date)}
          />
        </fieldset>
        <fieldset className="create__form__fieldset">
          <legend className="create__form__legend">Adress</legend>
          <InputText
            label="Street"
            id="street"
            value={street}
            onChange={(e) => updateField('street', e.target.value)}
          />
          <InputText
            label="City"
            id="city"
            value={city}
            onChange={(e) => updateField('city', e.target.value)}
          />
          <InputText
            label="ZipCode"
            id="zipcode"
            value={zipcode}
            onChange={(e) => updateField('zipcode', e.target.value)}
          />
          <Select 
            options={selectOptionsState}
            id="state"
            label="State"
            defaultValue={stateValue}
            onChange={(value) => updateField('state', value)}
          />
        </fieldset>
        <fieldset className="create__form__fieldset">
          <legend className="create__form__legend">Other</legend>
          <Select 
            options={selectOptionsDepartment}
            id="department"
            label="Department"
            defaultValue={department}
            onChange={(value) => updateField('department', value)}
          />
        </fieldset>
        <button className="btn" onClick={(e) => handleClick(e)}>
          Create Employee
        </button>
      </form>
    </section>
  )
}

export default CreateEmployee