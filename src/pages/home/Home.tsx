import React from 'react'
import SaveAddress from "../../components/forms/SaveAddress"
import { ISaveAddress } from "../../utils/interfaces"
import { splitValuesForm } from '../../utils/helpers'
import constants from '../../utils/constants'
import { useMessageContext } from '../../context/MessageContext'
import Message from '../../components/Message'
import './home.css'

const useSaveAddress = () => {
    const [state, setState] = React.useState<ISaveAddress[]>([])
    const { setMessage } = useMessageContext()

    React.useEffect(() => {
        const addressList = window.localStorage.getItem(constants.addressList)
        if (addressList) setState(JSON.parse(addressList))
    }, [])

    const onSave = (valuesForm: ISaveAddress) => {
        let namesDuplicated: string[] = []
        const nameSplited = splitValuesForm(valuesForm.name)
        const telephoneSplited = splitValuesForm(valuesForm.telephone)
        let pairNameTelephone: ISaveAddress[] = nameSplited.map((nam, index) => {
            if (state.find(e => e.name.toLowerCase() === nam.toLowerCase())) {
                namesDuplicated.push(nam)
                return { name: "duplicate", telephone: "" }
            } else {
                return { name: nam, telephone: telephoneSplited[index] }
            }
        })
        pairNameTelephone = pairNameTelephone.filter(e => e.name !== "duplicate")
        let newAddressList = [...state, ...pairNameTelephone]
        if (newAddressList.length > 300) {
            setMessage({ status: "error", title: "Limit of 300 records exceeded" })
        } else if (namesDuplicated.length) {
            setMessage({ status: "error", title: `Name already exist ${namesDuplicated}`})
        } else {
            setMessage({ status: "success", title: "Data stored" })
        }
        if (state?.length < 300) {
            const limitQuantity = newAddressList.slice(0, 300)
            setState(limitQuantity)
            window.localStorage.setItem(constants.addressList, JSON.stringify(limitQuantity))
        }
    }


    return [onSave] as const
}

const Home: React.FC = () => {
    const [onSave] = useSaveAddress()
    const { dataMessage } = useMessageContext()

    return (
        <div className="homeContainer">
            <SaveAddress onSubmit={onSave} />
            {dataMessage && <Message messageProps={dataMessage} />}
        </div>
    )
}

export default Home