import React from 'react';
import ReactApexChart from 'react-apexcharts'
import './Audience.css'
import NavBar from "../frontend/common/NavBar";

export default function Audience() {
    let optionsSports = {

        series: [44, 55, 13, 43, 22],

        labels: ['Tennis', 'Football', 'Swimming', 'Basketball', 'Volleyball'],
        responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
        colors:['#204451','#204451', '#2e6274','#3c7f97','#4d9cb7'],
        dataLabels: {
            enabled: false,
        }
    };

    let optionsPeople = {

        series: [60, 40],

        labels: ['Man', 'Women'],
        responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
        colors:['#204451', '#2e6274'],
        dataLabels: {
            enabled: false,
        }
    };
    return (
        <NavBar >
            <div className="statistics-container">
                <h1 className="d-flex justify-content-left">Statistics</h1>
                <div id="charts" className="d-flex flex-row">
                    <ReactApexChart className="p-2"  options={optionsSports} series={optionsSports.series} labels={['Tennis', 'Football', 'Swimming', 'Basketball', 'Volleyball']} type="pie" width={550}/>
                    <ReactApexChart className="p-2" options={optionsPeople} series={optionsPeople.series} type="pie" width={550}/>
                </div>
                <div>
                    <p>Most searched sport: Football</p>
                    <p>Most audience: man</p>
                </div>
            </div>
        </NavBar>
    );
}