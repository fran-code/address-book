import React from "react"
import constants from '../../utils/constants'
import { ISaveAddress } from "../../utils/interfaces"
import TableAddress from "../../components/TableAddress"
import './listAddress.css'

const useList = () => {
    const [state, setState] = React.useState<ISaveAddress[]>([])

    React.useEffect(() => {
        const addressList = window.localStorage.getItem(constants.addressList)
        if (addressList) {
            const addressListParsed: ISaveAddress[] = JSON.parse(addressList)
            const addressListSorted = addressListParsed.sort((a, b) => a.name.localeCompare(b.name))
            setState(addressListSorted)
        }
    }, [])

    return [state] as const
}

const ListAddress: React.FC = () => {
    const [addressList] = useList()

    return (
        <div className="listAddressContainer">
            <TableAddress headings={["Name", "Telephone"]} data={addressList} />
        </div>
    )
}

export default ListAddress