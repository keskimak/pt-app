import React, { useEffect, useState } from "react";


export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), [])
    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .then(data => console.log(data.content))
    }


    return (
        <div></div>
    );
}
