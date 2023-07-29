import style from './modal.module.css';
import ModalItem from './ModalItem';

interface TextFormProps {
    wasSendDataClicked: Boolean,
    setWasSendDataClicked: Function,
    patientSuccess: Array<any>,
    patientDuplicates: Array<any>,
    patientInvalid: Array<any>,
    doctorsSuccess: Array<any>,
    doctorsDuplicates: Array<any>,
    doctorsInvalid: Array<any>,
    appsSuccess: Array<any>,
    appsDuplicates: Array<any>,
    appsInvalid: Array<any>
}


const ModalWindow: React.FC<TextFormProps> = ({
    wasSendDataClicked,
    setWasSendDataClicked,
    patientSuccess,
    patientDuplicates,
    patientInvalid,
    doctorsSuccess,
    doctorsDuplicates,
    doctorsInvalid,
    appsSuccess,
    appsDuplicates,
    appsInvalid
}) => {

    return (
        <>
            {
                wasSendDataClicked
                &&
                <div className={style.modal}>
                    <div className={style.modal__content}>
                        <span onClick={() => setWasSendDataClicked(false)} className={style.close}>
                            &times;
                        </span>
                        {   patientSuccess.length ? <ModalItem title={"Successful Patients"} items={patientSuccess}/> : ""}
                        {   doctorsSuccess.length ? <ModalItem title={"Successful Doctors"} items={doctorsSuccess}/> : ""}
                        {   appsSuccess.length ? <ModalItem title={"Successful Appointments"} items={appsSuccess}/> : ""}
                        {   patientInvalid.length ? <ModalItem title={"Wrong Format Patients"} items={patientInvalid}/> : ""}
                        {   doctorsInvalid.length ? <ModalItem title={"Wrong Format Doctors"} items={doctorsInvalid}/> : ""}
                        {   appsInvalid.length ? <ModalItem title={"Wrong Format Appointments"} items={appsInvalid}/> : ""}
                        {   patientDuplicates.length ? <ModalItem title={"Duplicates Patients"} items={patientDuplicates}/> : ""}
                        {   doctorsDuplicates.length ? <ModalItem title={"Duplicates Doctors"} items={doctorsDuplicates}/> : ""}
                        {   appsDuplicates.length ? <ModalItem title={"Duplicates Appointments"} items={appsDuplicates}/> : ""}
                    </div> 
                </div>
            }
        </>
    )
}

export default ModalWindow;