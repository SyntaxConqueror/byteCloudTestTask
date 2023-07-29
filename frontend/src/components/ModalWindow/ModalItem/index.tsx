
interface ModalItemProps {
    title: String,
    items: Array<any>
}

const ModalItem: React.FC<ModalItemProps> = ({title, items}) => {

    const _items = items.map((value) => {
        return value;
    });

    return (
        <>
            <h2>{title}</h2>
            {_items.map((item, key)=>{
                return (
                    <p key={key}>{item}</p>
                )
            })}
        </>
    )
}

export default ModalItem;