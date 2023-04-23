import React, { useEffect, useMemo, useState } from "react";
import CustomerList from "./CustomerList";
import MaterialReactTable from 'material-react-table';

function CustomerTable() {

    const [customers, setCustomers] = useState([]);

    const columns = useMemo(() => [
        {
            accessorKey: 'firstname', //simple recommended way to define a column
            header: 'First name',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'lastname', //simple recommended way to define a column
            header: 'Last name',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'streetaddress', //simple recommended way to define a column
            header: 'streetaddress',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'postcode', //simple recommended way to define a column
            header: 'postcode',
            size: 50,
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'city', //simple recommended way to define a column
            header: 'city',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'email', //simple recommended way to define a column
            header: 'email',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        }

    ], []);

    useEffect(() => fetchData(), [])
    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .then(data => console.log(data.content))
    }

    return (
        <div>
            <MaterialReactTable
                columns={columns}
                data={customers}
                enableColumnFilter
                enableColumnOrdering
            
            />
        </div>
    );
}

export default CustomerTable;