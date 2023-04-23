import React, { useEffect, useMemo, useState } from "react";
import CustomerList from "./CustomerList";
import MaterialReactTable from 'material-react-table';

function TrainingsTable() {

    const [trainings, setTrainings] = useState([]);

    const columns = useMemo(() => [
        {
            accessorKey: 'links.href', //simple recommended way to define a column
            header: 'Customer',
            muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
        }, 
        {
            accessorKey: 'date', //simple recommended way to define a column
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
    

    ], []);

    useEffect(() => fetchData(), [])
    const fetchData = () => {
        //fetch('http://traineeapp.azurewebsites.net/api/gettrainings') with customer info
        fetch('http://traineeapp.azurewebsites.net/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data.content))
            .then(data => console.log(data.content))
    }

    return (
        <div>
            <MaterialReactTable
                columns={columns}
                data={trainings}
                enableColumnFilter
                enableColumnOrdering
                enableColumnDragging={false}
            />
        </div>
    );
}

export default TrainingsTable;

