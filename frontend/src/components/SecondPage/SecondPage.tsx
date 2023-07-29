import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { sendAnalyzeRequest } from "../../requests/requests";
import axios from "axios";
import style from './secondPage.module.css';
import Table from "./Table";


const SecondPage: React.FC = () => {
    const [tableData, setTableData] = useState(Array<any>);
    const [sortLeftTableData, setSortLeftTableData] = useState(Object);
    
    useEffect(() => {

        const socket: Socket = io(`/`);
        const fetchData = async () => {
            const response = await axios.get(`/getAllApps`)
                .then(response => response.data );

            setTableData(response);
        }
        fetchData();
        

        socket.on('updateData', (updatedData) => {
            setTableData(updatedData.appsArray);
        });

        return () => {
            socket.disconnect();
        };

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await sendAnalyzeRequest(tableData);
            console.log(response);
            setSortLeftTableData(response);
        }
        fetchData();
    }, [tableData])

    return (
        <>
            <div className={style.main__container}>
                <Table 
                redArray={sortLeftTableData.redArray} 
                yellowArray={sortLeftTableData.yellowArray} 
                greenArray={sortLeftTableData.greenArray}/>
            </div>
        </>
    );
};

export default SecondPage;