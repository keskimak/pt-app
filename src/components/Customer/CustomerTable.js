import React, { useEffect, useState } from "react";
import MaterialReactTable from 'material-react-table';
import { Button } from "@mui/material";
import EditCustomer from "./EditCustomer";

export default function CustomerTable() {

    const [customers, setCustomers] = useState([]);

    const [rowSelection, setRowSelection] = useState({});


    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData())
            .catch(err => Error(err))
    }

    const columns = [
        {
            id: row => row.original.links[0].href,
            Cell: ({ cell, row }) => (
                <div>  <EditCustomer customer={row.original} updateCustomer={updateCustomer} /> {row.original.links[0].href}</div>
            ),
        },

        {
            id: row => row.original.id,
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
            Cell: ({ cell, row }) => (
                <div>
                    <Button color="warning" onClick={() => deleteCustomer(row.original.links[0].href)}>DELETE {row.original.links[0].href}</Button>
                </div>
            ),
        },



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
        },


    ];

    useEffect(() => fetchData(), [])
    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => Error(err))

    }

    const deleteCustomer = (link) => {
        alert(link)
        if (window.confirm('Delete?')) {
            fetch(link, { method: 'DELETE' })
                .then(response => fetchData())
                .catch(err => Error(err))
        }
    }

    return (
        <div>

            <MaterialReactTable
                columns={columns}
                data={customers}
                enableColumnFilter
                enableColumnOrdering
                enableRowSelection={(row) => row.original.postcode > 18}
                enableColumnDragging={false}
                muiSelectCheckboxProps={true}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
                getRowId={(originalRow) => originalRow.links[0].href}

            />
        </div>
    );
}

