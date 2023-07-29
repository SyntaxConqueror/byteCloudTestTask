import React, {useEffect, useState} from 'react';
import style from './form.module.css';
interface TextFormProps {
    formTitle: string;
    index: number;
    handleDataArr: (str: string, idx: number) => void;
    onDataSend: Boolean
}
  
const Form: React.FC<TextFormProps> = ({formTitle, handleDataArr, index, onDataSend}) => {
    const [text, setText] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        handleDataArr(event.target.value, index);
    };

    useEffect(()=>{ setText('') }, [onDataSend])
  
    return (
        <>
            <form>
                <p>{formTitle}</p>
                <textarea
                    rows={23}
                    cols={40}
                    className={style.textForm} 
                    value={text} 
                    onChange={handleChange} />
            </form>
        </>
      
    );
};
  
export default Form;