import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, BarElement, CategoryScale } from 'chart.js'
import { useEffect, useState } from 'react';

ChartJS.register(LinearScale, BarElement)


//const arrVendasMensais = [ ];





const BarChart = () => {
    const [arrVendasMensais, setArrVendasMensais] = React.useState([]);

    useEffect(() => {
        const pegarInfoApi = async () => {
            try {
                const respostaFetch = await fetch('http://localhost:3000/vendas');
                const jsonResFetch = await respostaFetch.json();
                setArrVendasMensais(jsonResFetch);
                
            } catch (error) {
                console.log("Deu erro", error);
            }
}
pegarInfoApi();
}, []);
    
const data = {
    datasets: [{
        label: "Vendas Mensais",
        data: arrVendasMensais,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        parsing: {
            xAxisKey: "mes",
            yAxisKey: "valorVendido",
        },
    },]

};

const chartOptions = {
    scales: {
        x: {
            type: "linear",
            position: "bottom",
            min: 1,
        },
    
    y: {
        beginAtZero: true,

    },
},
}

    return <Bar data={data} options={chartOptions}/>;
};

export default BarChart;
