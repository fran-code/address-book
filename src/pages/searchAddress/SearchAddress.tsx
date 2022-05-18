import React from "react"
import constants from '../../utils/constants'
import { ISaveAddress, ISearchInput, IFilterTable } from "../../utils/interfaces"
import TableAddress from "../../components/TableAddress"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import './searchAddress.css'

const useList = () => {
    const [state, setState] = React.useState<ISaveAddress[]>([])

    React.useEffect(() => {
        const addressList = window.localStorage.getItem(constants.addressList)
        if (addressList) {
            const addressListParsed: ISaveAddress[] = JSON.parse(addressList)
            setState(addressListParsed)
        }
    }, [])

    return [state] as const
}

const initialFilter: IFilterTable = { value: undefined, filterBy: "name" }

const SearchInput: React.FC<ISearchInput> = ({ setFilterValue }) => {
    const [state, setState] = React.useState<IFilterTable>(initialFilter)

    const handleChange = (e: any) => setState({ ...state, value: e.target.value })

    const handleSearch = () => setFilterValue(state)

    const changeFilterButton = (filterBy: "name" | "telephone") => setState({ value: "", filterBy })

    const clearInput = () => {
        const newState = { ...state, value: "" }
        setState(newState)
        setFilterValue(newState)
    }

    return (
        <InputGroup className="mb-3">
            <InputGroup.Append>
                <Button variant={state.filterBy === "name" ? "primary" : "outline-primary"} onClick={() => changeFilterButton("name")}>Name</Button>
            </InputGroup.Append>
            <InputGroup.Append>
                <Button variant={state.filterBy === "telephone" ? "primary" : "outline-primary"} onClick={() => changeFilterButton("telephone")}>Telephone</Button>
            </InputGroup.Append>
            <FormControl
                placeholder={state.filterBy === "name" ? "Search by name" : "Search by telephone"}
                aria-label={state.filterBy === "name" ? "Search by name" : "Search by telephone"}
                aria-describedby="basic-addon2"
                onChange={handleChange}
                value={state.value}
            />
            <InputGroup.Append>
                <Button disabled={!state.value} variant="outline-primary" onClick={handleSearch}>Search</Button>
            </InputGroup.Append>
            <InputGroup.Append>
                <Button variant="outline-primary" onClick={clearInput}>Clear</Button>
            </InputGroup.Append>
        </InputGroup >
    )
}

const SearchAddress: React.FC = () => {
    const [addressList] = useList()
    const [filterValue, setFilterValue] = React.useState<IFilterTable>(initialFilter)
    let dataFilter: ISaveAddress[] = []

    if (filterValue.value) {
        dataFilter = addressList.filter(address => {
            if (filterValue.filterBy === "name") {
                return address.name.toLowerCase().indexOf(filterValue.value!.toLowerCase()) > -1
            }

            if (filterValue.filterBy === "telephone") {
                return address.telephone === filterValue.value
            }
        })
    }

    return (
        <div className="searchAddressContainer">
            <SearchInput setFilterValue={setFilterValue} />
            {filterValue.value && <TableAddress headings={["Name", "Telephone"]} data={dataFilter} />}
        </div>
    )
}

export default SearchAddress