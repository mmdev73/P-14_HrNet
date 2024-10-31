import { NavLink, useRouteError } from 'react-router-dom'
import '../sass/pages/Error.scss'
const Error = () => {
  const error: any = useRouteError()
  if (error) {
    console.log(error)
    const status: number = error.status || null
    const statusText: string = error.statusText || null
    const message: string = error.message || null
    return (<>
      <section className="section-container error">
        <div className="error">
          <h1 className="error__status">{status || 'Error'}</h1>
          <p className="error__message">
            {(message || statusText) ? `${message || statusText}` : 'This page can\'t be reach.'}
            . Please return to <NavLink to="/">Home</NavLink>
          </p>
        </div>
      </section>
    </>)
  }
  return (<>
    <section className="section-container error">
      <div className="error">
        <h1 className="error__status">Error</h1>
        <p className="error__message">
          This page can't be reach.
          Please return to <NavLink to="/">Home</NavLink>
        </p>
      </div>
    </section>
  </>)

}

export default Error