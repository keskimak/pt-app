import React, { useEffect,  useState } from "react";
import MaterialReactTable from 'material-react-table';
import dayjs from "dayjs";
import { Button } from "@mui/material";
import EditTraining from "./EditTraining";

export default function TrainingsTable() {

    const [trainings, setTrainings] = useState([]);

    const [rowSelection, setRowSelection] = useState({});

    const updateTraining = (training, id) => {
        fetch(`http://traineeapp.azurewebsites.net/api/trainings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchData())
            .catch(err => Error(err))
    }

    const columns = [

        {
            id: row => row.originalRow.id,
            Cell: ({ cell, row }) => (
                <div>  <EditTraining training={row.original} updateTraining={updateTraining} />{row.original.id} </div>
            ),
        },
        {
            accessorKey: 'id', //korjaa accessorkey esim row id:ksi tai joksikin joka toimii
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
            width: 100,
            Cell: ({ row }) => (
                <div>
                    <Button color="warning" onClick={() => deleteTraining(row.original.id)}>DELETE id {row.original.id} </Button>
                </div>
            ),
        },
        


        {
            accessorKey: 'date', //simple recommended way to define a column,
            Cell: row => dayjs(row.accessorKey).format('DD.MM.YYYY'),
            header: 'date',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'duration', //simple recommended way to define a column
            header: 'duration',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        },
        {
            accessorKey: 'activity', //simple recommended way to define a column
            header: 'activity',
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
    return (
        <div>
            <MaterialReactTable
                columns={columns}
                data={trainings}
                enableColumnFilter
                enableColumnOrdering
                enableRowSelection={(row) => row.original.postcode > 18}
                enableColumnDragging={false}
                muiSelectCheckboxProps={true}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
                getRowId={(originalRow) => originalRow.id}

            />
        </div>
    );
}



