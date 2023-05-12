import React, { useEffect, useState } from "react";
import MaterialReactTable from 'material-react-table';
import { Button } from "@mui/material";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";

export default function CustomerTable(props) {

    const [customers, setCustomers] = useState([]);

    const [rowSelection, setRowSelection] = useState({});

    const columns = [
        {
            id: row => row.original.links[0].href,
            size: 20, //medium column
            enableColumnActions: false,
            Cell: ({ cell, row }) => (
                <div>  <EditCustomer customer={row.original} updateCustomer={updateCustomer} /> </div>
            ),
        },
        {
            id: row => row.original.id,
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
            size: 20, //medium column
            enableColumnActions: false,
            Cell: ({ cell, row }) => (
                <div>
                    <Button color="warning" onClick={() => deleteCustomer(row.original.links[0].href)}>DELETE</Button>
                </div>
            ),
        },
        {
            accessorKey: 'firstname', //simple recommended way to define a column
            header: 'FIRST NAME',
            minSize: 20, //min size enforced during resizing
            maxSize: 400, //max size enforced during resizing
            size: 50, //medium column
            wordWrap: "break-word",
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'lastname', //simple recommended way to define a column
            header: 'LAST NAME',
            minSize: 20, //min size enforced during resizing
            maxSize: 400, //max size enforced during resizing
            size: 50, //medium column
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'streetaddress', //simple recommended way to define a column
            header: 'STREET ADDRESS',
            minSize: 20, //min size enforced during resizing
            maxSize: 400, //max size enforced during resizing
            size: 50, //medium column
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'postcode', //simple recommended way to define a column
            header: 'POSTCODE',
            minSize: 20, //min size enforced during resizing
            maxSize: 400, //max size enforced during resizing
            size: 20, //medium column
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'city', //simple recommended way to define a column
            header: 'CITY',
            minSize: 20, //min size enforced during resizing
            maxSize: 400, //max size enforced during resizing
            size: 50, //medium column
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'email', //simple recommended way to define a column
            header: 'EMAIL',
            minSize: 20, //min size enforced during resizing
            maxSize: 400, //max size enforced during resizing
            size: 50, //medium column
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
        if (window.confirm('Delete?')) {
            fetch(link, { method: 'DELETE' })
                .then(response => fetchData())
                .catch(err => Error(err))
        }
    }

    const addCustomer = (customer) => {
     
            fetch('http://traineeapp.azurewebsites.net/api/customers',
             { method: 'POST',     headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)},)
                .then(response => fetchData())
                .catch(err => Error(err))

            console.log(customer)
   
    }
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

    return (
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <MaterialReactTable
                columns={columns}
                data={customers}
                enableColumnFilter
                enableColumnOrdering
                enableRowSelection={(row) => row.original.postcode > 18}
                enableColumnDragging={false}
                muiSelectCheckboxProps={true}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
                getRowId={(originalRow) => originalRow.links[0].href}

            />
        </div>
    );
}

