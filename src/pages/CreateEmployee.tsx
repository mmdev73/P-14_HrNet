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
  const dob = useAppStore(state => state.formData.dob);
  const start = useAppStore(state => state.formData.start);
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

  // DatePicker 
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const localString: string = 'en-US'

/**
 * Converts a date string into a timestamp.
 * 
 * @param {string} date - The date string to convert.
 * @returns {number} The timestamp representing the given date.
 */
  const handleDateChange = (date: string): number => {
    return new Date(date).getTime()
  }

/**
 * Formats a given date timestamp into a human-readable date string.
 * 
 * @param {number} date - The timestamp to format.
 * @returns {string} The formatted date string in 'month day, year' format.
 */
  const formatDate = (date: number): string => {
    return new Date(date).toLocaleDateString(localString, dateOptions)
  }
  
/**
 * Handles the form submission event.
 * 
 * Prevents the default form submission behavior and gathers form data into an Employee object.
 * Validates the form data and, if valid, adds the employee to the list and resets the form.
 * If invalid, sets error flags and generates an error list.
 * Finally, toggles the display of the modal.
 * 
 * @param {React.FormEvent} e - The form submission event.
 */
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    const formData: Employee = {
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      start: start,
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

/**
 * Toggles the modal's visibility state.
 * 
 * Flips the boolean state of `isOpen` between true and false.
 * This is typically used to show or hide the modal.
 */
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

/**
 * Handles the "Cancel" button click event.
 * 
 * Toggles the modal's visibility state and resets the form.
 */
  const handleCancel = () => {
    toggleModal()
    resetForm()
  }

/**
 * Handles the modal's cancel button click event.
 * 
 * Prevents the default event behavior and toggles the modal's visibility state.
 * This is typically used to hide the modal when the user clicks the cancel button.
 */
  const handleCancelModal = (e: React.FormEvent) => {
    e.preventDefault()
    toggleModal()
  }

/**
 * Handles the modal's view employees button click event.
 * 
 * Prevents the default event behavior, toggles the modal's visibility state
 * and navigates to the /view route.
 */
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
        error && <button className="btn modal__btn" onClick={handleCancelModal}>Close</button>
      }
      {
        !error && (
          <>
            <button className="btn modal__btn" onClick={handleCancel}>New employee</button>
            <button className="btn modal__btn" onClick={handleViewEmployees}>View employees</button>
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
            regex={/^(?:[a-zA-ZÀ-ÿ]{1,31}|[a-zA-ZÀ-ÿ]{1,15}[ -][a-zA-ZÀ-ÿ]{1,15})$/}
          />
          <InputText
            label="Last Name"
            id="lastname"
            value={lastname}
            onChange={(e) => updateField('lastname', e.target.value)}
            regex={/^(?:[a-zA-ZÀ-ÿ]{1,31}|[a-zA-ZÀ-ÿ]{1,15}[ -][a-zA-ZÀ-ÿ]{1,15})$/}
          />
          <DatePicker
            id="dob"
            label="Date of Birth"
            value={formatDate(dob)}
            onChange={(date) => updateField('dob', handleDateChange(date))}
            initialDaysOffset={(-365 * 18)}
            dateOptions={dateOptions}
            localDate={localString}
          />
          <DatePicker
            id="start"
            label="Start date"
            value={formatDate(start)}
            onChange={(date) => updateField('start', handleDateChange(date))}
            initialDaysOffset={-1}
            dateOptions={dateOptions}
            localDate={localString}
          />
        </fieldset>
        <fieldset className="create__form__fieldset">
          <legend className="create__form__legend">Adress</legend>
          <InputText
            label="Street"
            id="street"
            value={street}
            onChange={(e) => updateField('street', e.target.value)}
            regex={/^\d+\s+\w+(\s\w+)*(,\s*(Apt|Suite|Unit|Building|Bldg)\s*\d+)?$/}
          />
          <InputText
            label="City"
            id="city"
            value={city}
            onChange={(e) => updateField('city', e.target.value)}
            regex={/^(?:[a-zA-ZÀ-ÿ]{1,31}|[a-zA-ZÀ-ÿ]{1,15}[- ][a-zA-ZÀ-ÿ]{1,15})$/}
          />
          <InputText
            label="ZipCode"
            id="zipcode"
            value={zipcode}
            onChange={(e) => updateField('zipcode', e.target.value)}
            regex={/^\d{5}(-\d{4})?$/}
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