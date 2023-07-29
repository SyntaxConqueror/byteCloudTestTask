import React from 'react'
import style from './panel.module.css'

interface PanelProps {
    onSendData: () => void;
    onClearDB: () => void;
    
}

export const Panel: React.FC<PanelProps> = ({ onSendData, onClearDB }) => {

    const handleSendData = () => { onSendData() }
    const handleClearDB = () => { onClearDB() }

    return (
        <div className={style.panel__container}>
            <button 
                className={style.btn} 
                style={{marginRight: "10px"}} 
                type="submit"
                onClick={handleSendData}
            >Send Data</button>
            
            <button 
                className={style.btn} 
                type="submit"
                onClick={handleClearDB}
            >Clear DB</button>
        </div>
    )
}