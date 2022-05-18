export const isNumeric = (value: string) => /^[0-9]*$/.test(value)

export const nameValidation = (value: string) => /^[a-zA-Z\s]*$/.test(value)

export const telephoneValidation = (value: string) => {
    const parsedToNum = value.replace(/\)/g, '').replace(/\(/g, '').replace(/\+/g, '')
    if (!isNumeric(parsedToNum)) return false
    if (value.indexOf("-") > 0) return false
    if (value[0] !== "+" && value[0] !== "0") return false
    if (value[0] === "+" && value[1] === "0") return false
    if (value.replace(/\)/g, '#').replace(/\(/g, '#').split("#").length > 3) return false
    return true
}

export const splitValuesForm = (value: string) => value.split(/\r?\n/)

export const countValuesForm = (value: string) => splitValuesForm(value).length