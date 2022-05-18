import Table from "react-bootstrap/Table"
import { ITableAddress } from "../utils/interfaces"

const TableAddress: React.FC<ITableAddress> = ({ headings, data }) => {

    if (data.length === 0) return <div>Data not found</div>

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {headings.map(head => <th key={head}>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) =>
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.telephone}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default TableAddress