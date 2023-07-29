import { useEffect, useState } from "react";
import style from './table.module.css';

type TableParams = {
    redArray: Array<any>,
    yellowArray: Array<any>,
    greenArray: Array<any>,
    blueArray?: Array<any>,
}

const Table: React.FC<TableParams> = ({redArray, yellowArray, greenArray}) => {
    
    const [yellowApps, setYellowApps] = useState(Array<any>)
    const [redApps, setRedApps] = useState(Array<any>);
    const [greenApps, setGreenApps] = useState(Array<any>);

    useEffect(()=>{
        setYellowApps(yellowArray);
        setGreenApps(greenArray);
        setRedApps(redArray);
    }, [redArray, yellowArray, greenArray]);

    return (
        <div className={style.table}>
            {
                greenApps 
                ?
                greenApps.map((item, index)=>(
                    <div key={index} className={style.green__apps}>
                        {item.originString == undefined ? "" : item.originString }
                    </div>
                ))
                :
                ""
            }

            {
                yellowApps 
                ?
                yellowApps.map((item, index)=>(
                    <div key={index} className={style.yellow__apps}>
                        {item.originString == undefined ? "" : item.originString }
                    </div>
                ))
                :
                ""
            }
            
            {
                redApps 
                ?
                redApps.map((item, index)=>(
                    <div key={index} className={style.red__apps}>
                        {item.originString == undefined ? "" : item.originString }
                    </div>
                ))
                :
                ""
            }
        </div>
    );
};

export default Table;