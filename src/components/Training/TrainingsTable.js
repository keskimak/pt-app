import React, { useEffect, useState } from "react";
import MaterialReactTable from 'material-react-table';
import dayjs from "dayjs";
import { Button } from "@mui/material";
import EditTraining from "./EditTraining";
import AddTraining from "./AddTraining";

export default function TrainingsTable() {

    const [trainings, setTrainings] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const columns = [
        //update ei toimi

        /**    {
            id: row => row.original.links[0].href,
            size: 20, //medium column
            Cell: ({ cell, row }) => (
                <div>  <EditCustomer customer={row.original} updateCustomer={updateCustomer} /> </div>
            ),
        }, */
        {  
            id: row => row.originalRow.id,
            size: 20, //medium column
            enableColumnActions: false,
            Cell: ({ cell, row }) => (
                <div>  <EditTraining training={row.original} updateTraining={updateTraining} /></div>
            ),
        },
        //delete toimii
        {
            id: row => row.originalRow.id,
            enableColumnActions: false,
            size: 20, //medium column,
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
            width: 100,
            Cell: ({ row }) => (
                <div>
                    <Button color="warning" onClick={() => deleteTraining(row.original.id)}>DELETE</Button>
                </div>
            ),
        },
        {
            accessorKey: 'customer',
            Cell: ({ row }) => (
                <div>
                   {row.original.customer.firstname} {row.original.customer.lastname} 
                </div>
            ),
            header: 'CUSTOMER',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'date', //simple recommended way to define a column,
            Cell: row => dayjs(row.accessorKey).format('DD.MM.YYYY'),
            header: 'DATE',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'duration', //simple recommended way to define a column
            header: 'DURATION',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'activity', //simple recommended way to define a column
            header: 'ACTIVITY',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
    ];

    useEffect(() => fetchData(), [])
    const fetchData = () => {
        //fetch('http://traineeapp.azurewebsites.net/api/gettrainings') with customer info
        fetch('http://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .then(data => console.log(data))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Delete?')) {
            fetch(`http://traineeapp.azurewebsites.net/api/trainings/${id}`, { method: 'DELETE' })
                .then(response => fetchData())
                .catch(err => Error(err))
        }
    }

    const updateTraining = (training) => {
        fetch(`http://traineeapp.azurewebsites.net/api/trainings/${training.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => Error(err))
    }

    
    const addTraining = (training) => {
        fetch(`http://traineeapp.azurewebsites.net/api/trainings/${training.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => Error(err))
    }

    /*
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
    }*/
    return (
        <div>
              <AddTraining addTraining={addTraining}/>
            <MaterialReactTable
                columns={columns}
                data={trainings}
                enableColumnFilter
                enableColumnOrdering
                enableRowSelection={(row) => row.original.duration > 0}
                enableColumnDragging={false}
                muiSelectCheckboxProps={true}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
                getRowId={(originalRow) => originalRow.id}

            />
        </div>
    );
}



