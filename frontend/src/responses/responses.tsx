export const getResponse = async (
    arr: Array<string>,
    sendRequest: Function,
    index: number,
    setSuccess: Function,
    setDuplicate: Function,
    setInvalid: Function
) => {
    try {
        const response = await sendRequest(arr, index);

        response.forEach((item: any) => {
            if (item.hasOwnProperty('duplicate')) {
                setDuplicate(
                    (prevDuplicates: any[]) => [...prevDuplicates, item.duplicate]
                );
            } else if (item.hasOwnProperty('invalid')) {
                setInvalid(
                    (prevInvalid: any[]) => [...prevInvalid, item.invalid]
                );
            } else {
                setSuccess(
                    (prevSuccess: any[]) => [...prevSuccess, item.success]
                )
            }
        });
    } catch (err) {
        console.log(err);
    }
    
}
