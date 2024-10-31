import '../sass/pages/CreateEmployee.scss'
import { useAppStore } from "../app/store"
const CreateEmployee = () => {
  // use state Manager
  const { firstname, lastname, dob, start, street, city, state, zipcode, department, resetForm } = useAppStore.use.formData()
  const updateField = useAppStore.use.updateField()
  const addEmployee = useAppStore.use.addEmployee()

  return (
    <section className="section-container create">
      <h1 className="create__title">Create Employee</h1>
      <form className="create__form">
        <fieldset className="create__form__fieldset">          
          <legend className="create__form__legend">Informations</legend>
          
        </fieldset>
        <fieldset className="create__form__fieldset">
          <legend className="create__form__legend">Adress</legend>

        </fieldset>
      </form>
    </section>
  )
}

export default CreateEmployee