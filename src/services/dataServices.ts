import { Employee } from "../assets/interfaces";


export const dataServices = {
    /**
     * Retrieves a list of U.S. state names.
     * 
     * @returns {string[]} An array containing the names of all U.S. states.
     */
    getStates: (): string[] => {
        return statesNames
    },

    /**
     * Retrieves a list of department names.
     * 
     * @returns {string[]} An array containing the names of all departments.
     */
    getDepartments: (): string[] => {
        return departmentsData
    },
    
    /**
     * Checks if the given text is a valid name.
     * A valid name is 1-31 characters long and contains only letters and a single hyphen or space.
     * The text can also contain accented letters in the range of ' ' to ' '.
     * @param {string} text - The text to validate.
     * @returns {boolean} true if the text is valid, false otherwise.
     */
    isValidText: (text: string): boolean => {
        const regex = /^(?:[a-zA-ZÀ-ÿ]{1,31}|[a-zA-ZÀ-ÿ]{1,15}[ -][a-zA-ZÀ-ÿ]{1,15})$/;
        return regex.test(text);
    },
    
    /**
     * Checks if the given text is a valid city name.
     * A valid city name is 1-31 characters long and contains only letters and a single hyphen or space.
     * The text can also contain accented letters in the range of ' ' to ' '.
     * @param {string} text - The text to validate.
     * @returns {boolean} true if the text is valid, false otherwise.
     */
    isValidCity: (text: string): boolean => {
        const regex = /^(?:[a-zA-ZÀ-ÿ]{1,31}|[a-zA-ZÀ-ÿ]{1,15}[- ][a-zA-ZÀ-ÿ]{1,15})$/;
        return regex.test(text);
    },
    
    /**
     * Checks if the given text is a valid address.
     * A valid address is 1-99 characters long and contains only letters, numbers, and a single comma.
     * The text should start with a number, followed by a space, and then the street name.
     * The street name can be followed by an optional comma and unit number.
     * The regex pattern is as follows: ^\d+\s+\w+(\s\w+)*(,\s*(Apt|Suite|Unit|Building|Bldg)\s*\d+)?$
     * @param {string} text - The text to validate.
     * @returns {boolean} true if the text is valid, false otherwise.
     */
    isValidAddress: (text: string): boolean => {
        const regex = /^\d+\s+\w+(\s\w+)*(,\s*(Apt|Suite|Unit|Building|Bldg)\s*\d+)?$/
        return regex.test(text)
    },
    
    /**
     * Checks if the given text is a valid US zip code.
     * A valid zip code is either a 5-digit number or a 5-digit number followed by a hyphen and a 4-digit number.
     * @param {string} text - The text to validate.
     * @returns {boolean} true if the text is valid, false otherwise.
     */
    isValidZipCode: (text: string): boolean => {
        const regex = /^\d{5}(-\d{4})?$/
        return regex.test(text)
    },

    /**
     * Checks if the given text is a valid department name.
     * A valid department name is a string that matches one of the department names in the departmentsData array.
     * @param {string} text - The text to validate.
     * @returns {boolean} true if the text is valid, false otherwise.
     */
    isValidDepartment: (text: string): boolean => {
        return departmentsData.includes(text)
    },
    
    /**
     * Checks if the given text is a valid U.S. state name.
     * A valid state name is one that matches an entry in the statesNames array.
     * @param {string} text - The text to validate.
     * @returns {boolean} true if the text is valid, false otherwise.
     */
    isValidState: (text: string): boolean => {
        return statesNames.includes(text)
    },
    
    /**
     * Checks if the given formData is valid.
     * A valid formData contains valid values for all of its properties.
     * @param {object} data - The formData object to validate.
     * @returns {boolean} true if the formData is valid, false otherwise.
     */
    isValidFormData: (data: Employee): boolean => {
        if(!dataServices.isValidText(data.firstname)) {
            //console.log('firstname is not valid')
            return false
        }
        if(!dataServices.isValidText(data.lastname)) {
            //console.log('lastname is not valid')
            return false
        }
        if(!dataServices.isValidCity(data.city)) {
            //console.log('city is not valid')
            return false
        }
        if(!dataServices.isValidAddress(data.street)) {
            //console.log('street is not valid')
            return false
        }
        if(!dataServices.isValidZipCode(data.zipcode)) {
            //console.log('zipcode is not valid')
            return false
        }
        if(!dataServices.isValidDepartment(data.department)) {
            //console.log('department is not valid')
            return false
        }
        if(!dataServices.isValidState(data.state)) {
            //console.log('state is not valid')
            return false
        }
        return true
    },
    
    /**
     * Returns an array of error messages for the given formData.
     * The returned array is empty if the formData is valid.
     * @param {object} data - The formData object to validate.
     * @returns {string[]} An array of error messages.
     */
    getErrListFormData: (data: Employee): string[] => {
        const errorList = []
        if(!dataServices.isValidText(data.firstname)) {
            errorList.push('Firstname is not valid')
        }
        if(!dataServices.isValidText(data.lastname)) {
            errorList.push('Lastname is not valid')
        }
        if(!dataServices.isValidCity(data.city)) {
            errorList.push('City is not valid')
        }
        if(!dataServices.isValidAddress(data.street)) {
            errorList.push('Street is not valid')
        }
        if(!dataServices.isValidZipCode(data.zipcode)) {
            errorList.push('Zipcode is not valid')
        }
        if(!dataServices.isValidDepartment(data.department)) {
            errorList.push('Department is not valid')
        }
        if(!dataServices.isValidState(data.state)) {
            errorList.push('State is not valid')
        }
        return errorList
    },
}


const statesNames = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

const departmentsData = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']