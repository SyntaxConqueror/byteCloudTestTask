import { useEffect, useState } from 'react'
import style from './App.module.css'

import Form from './components/Form'
import { Panel } from './components/Panel'
import { clearDB, sendAppointmentDataRequest, sendDataRequest } from './requests/requests';
import { getResponse } from './responses/responses';
import ModalWindow from './components/ModalWindow';

function App() {
  
    const [isDataSend, setIsDataSend] = useState(false);
    const [isDbCleared, setIsDbCleared] = useState(false);
    const [wasSendDataClicked, setWasSendDataClicked] = useState(false);

    const [data, setData] = useState(Array<string>);
    const cols = ["Patients", "Doctors", "Appointments"];

    // Patients arrays
    const [patientsSuccess, setPatientsSuccess] = useState(Array<any>);
    const [patientDuplicates, setPatientDuplicates] = useState(Array<any>);
    const [patientInvalid, setPatientInvalid] = useState(Array<any>);

    // Doctors arrays
    const [doctorsSuccess, setDoctorsSuccess] = useState(Array<any>);
    const [doctorsDuplicates, setDoctorsDuplicates] = useState(Array<any>);
    const [doctorsInvalid, setDoctorsInvalid] = useState(Array<any>);

    // Appointments arrays
    const [appsSuccess, setAppsSuccess] = useState(Array<any>);
    const [appsDuplicates, setAppsDuplicates] = useState(Array<any>);
    const [appsInvalid, setAppsInvalid] = useState(Array<any>);

    // FUNCTIONS for tracking buttons clicks
    const onSendData = () => {
        setPatientDuplicates([]); setPatientInvalid([]); setPatientsSuccess([]);
        setDoctorsDuplicates([]); setDoctorsInvalid([]); setDoctorsSuccess([]);
        setAppsDuplicates([]); setAppsInvalid([]); setAppsSuccess([]);
    
        setIsDataSend(true);
        setWasSendDataClicked(true);
    }

    const onClearDB = () => {
        setIsDbCleared(true);
    }

    const handleDataArr = (str: string, index: number) => {
        setData((prevRows) => {
          const newRows = [...prevRows];
          newRows[index] = str;
          return newRows;
        });
    };

    // useEffect to track clicking and sending requests
    useEffect(() => {
        const fetchData = async () => {
            if (isDataSend) {
                await getResponse(
                    data,
                    await sendDataRequest, 0,
                    setPatientsSuccess, setPatientDuplicates, setPatientInvalid
                );
                
                await getResponse(
                    data,
                    await sendDataRequest, 1,
                    setDoctorsSuccess, setDoctorsDuplicates, setDoctorsInvalid
                );

                await getResponse(data,
                    await sendAppointmentDataRequest, 2,
                    setAppsSuccess, setAppsDuplicates, setAppsInvalid
                );

                setIsDataSend(false);
            }
      
            if (isDbCleared) {
                const response = await clearDB();
                alert(
                    `The DB was cleared successfuly!\n\nDeleted rows from Patients: ${response.patientDeleteCount}\nDeleted rows from Doctors: ${response.doctorDeleteCount}\nDeleted rows from Appointments: ${response.appointmentDeleteCount}`
                )
                setIsDbCleared(false);
            }
        };
        fetchData();
      
    }, [isDataSend, isDbCleared]);
    
    useEffect(()=>{ if(!isDataSend) setData([]) }, [isDataSend])


    return (
        <>
            <ModalWindow
                wasSendDataClicked = {wasSendDataClicked}
                setWasSendDataClicked = {setWasSendDataClicked}
                patientSuccess={patientsSuccess}
                patientDuplicates={patientDuplicates}
                patientInvalid= {patientInvalid}
                doctorsSuccess={doctorsSuccess}
                doctorsDuplicates= {doctorsDuplicates}
                doctorsInvalid={doctorsInvalid}
                appsSuccess={appsSuccess}
                appsDuplicates={appsDuplicates}
                appsInvalid={appsInvalid}
            />
            
            <div className={style.link}>
                <a href='https://bytecloudtask-cb08fed83ade.herokuapp.com/secondPage'>Go to the second page</a>
            </div>

            <div className={style.main__container}>    
                {cols.map((col, idx) => (
                    <Form key={idx} index={idx} handleDataArr={handleDataArr} onDataSend={isDataSend} formTitle={col}></Form>
                ))}
            </div>
            
            <Panel onSendData={onSendData} onClearDB={onClearDB}></Panel>
            
        </>
    )
}


export default App
