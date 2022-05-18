
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ISaveAddress, IErrorsSaveAddress, ICheckValuesNum } from '../../utils/interfaces';
import { nameValidation, telephoneValidation, splitValuesForm, countValuesForm } from '../../utils/helpers';

interface IProps {
    onSubmit: Function;
    valuesForm?: ISaveAddress;
}

const initialFormState: ISaveAddress = {
    name: "",
    telephone: ""
}

const findFormErrors = (form: ISaveAddress) => {
    const { name, telephone } = form
    const newErrors: IErrorsSaveAddress = {}

    const nameSplited = splitValuesForm(name)
    nameSplited.forEach(nam => {
        if (!nameValidation(nam) || nam === "") newErrors.name = newErrors.name ? `${newErrors.name}, ${nam}` : `The following names are not correct: ${nam}`
    })

    const telephoneSplited = splitValuesForm(telephone)
    telephoneSplited.forEach(phone => {
        if (!telephoneValidation(phone)) newErrors.telephone = newErrors.telephone ? `${newErrors.telephone}, ${phone}` : `The following telephones are not correct: ${phone}`
    })

    return newErrors
}

const CheckValuesNum: React.FC<ICheckValuesNum> = ({ valuesForm }) => {

    const nameCount = !valuesForm.name ? 0 : countValuesForm(valuesForm.name)
    const telephoneCount = !valuesForm.telephone ? 0 : countValuesForm(valuesForm.telephone)

    if (nameCount > telephoneCount && nameCount < 51) return <div className="noticeCheckValuesNum">You must enter {nameCount - telephoneCount} more telephone numbers</div>
    if (nameCount < telephoneCount && telephoneCount < 51) return <div className="noticeCheckValuesNum">You must enter {telephoneCount - nameCount} more names</div>
    if (nameCount > 50 || telephoneCount > 50) return <div className="noticeCheckValuesNum">Only 50 records can be stored</div>
    return null
}

const SaveAddress: React.FC<IProps> = ({ onSubmit, valuesForm }) => {
    const [formState, setFormState] = useState<ISaveAddress>(valuesForm || initialFormState)
    const [errors, setErrors] = useState<IErrorsSaveAddress>({})

    const onChangeForm = (currentValues: ISaveAddress, errors: IErrorsSaveAddress, e: any) => {
        const { name, value } = e.target

        setFormState({ ...currentValues, [name]: value.indexOf(",") > 0 ? value.replace(/,/g, '\n') : value })

        // Check and see if errors exist, and remove them from the error object:  
        if (!!errors[name as keyof IErrorsSaveAddress]) setErrors({
            ...errors,
            [name]: null
        })
    }

    const onFormSubmit = (e: any, formValues: ISaveAddress) => {
        e.preventDefault()
        const newErrors = findFormErrors(formValues)
        if (Object.keys(newErrors).length) {
            setErrors(newErrors)
        } else {
            onSubmit(formValues)
            setFormState(valuesForm || initialFormState)
        }
    }

    let disabledSave: boolean = false
    const nameCount = !formState.name ? 0 : countValuesForm(formState.name)
    const telephoneCount = !formState.telephone ? 0 : countValuesForm(formState.telephone)
    if (nameCount === 0 || nameCount !== telephoneCount || nameCount > 50 || telephoneCount > 50) disabledSave = true

    return (
        <div className="saveAddressForm" data-testid="saveAddressForm">
            <div className="mb_20px"><b>Instructions: </b>Enter the names and telephone numbers in the areas below, each record must be in
                one row. You must enter the same number of both and only a maximum of 50 will be saved. You can paste
                several records to be saved if you do this on a new line or all on the same line, but separated
                by commas, e.g. "Fran,John,Luis".
            </div>
            <Form noValidate onSubmit={(e) => onFormSubmit(e, formState)}>
                <Form.Group controlId="name">
                    <Form.Label>Names</Form.Label>
                    <Form.Control
                        required
                        name="name"
                        type="string"
                        as="textarea"
                        onChange={e => onChangeForm(formState, errors, e)}
                        isInvalid={!!errors.name}
                        value={formState.name}
                        style={{ height: nameCount === 0 ? 60 : 30 + nameCount * 25 }}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="telephone">
                    <Form.Label>Telephones</Form.Label>
                    <Form.Control
                        required
                        name="telephone"
                        type="string"
                        as="textarea"
                        onChange={e => onChangeForm(formState, errors, e)}
                        isInvalid={!!errors.telephone}
                        value={formState.telephone}
                        style={{ height: telephoneCount === 0 ? 60 : 30 + telephoneCount * 25 }}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.telephone}
                    </Form.Control.Feedback>
                </Form.Group>
                <CheckValuesNum valuesForm={formState} />
                <Button block size="lg" type="submit" disabled={disabledSave} style={{ height: "65px" }}>
                    <span>Save</span>
                </Button>
            </Form>
        </div >
    );
}

export default SaveAddress;