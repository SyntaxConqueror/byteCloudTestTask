import axios from 'axios';

export const sendDataRequest = async (arr: Array<string>, index: number) => {
    try {
        const items = arr[index].split("\n");
        const endpoints = ['patient', 'doctor']

        const promises = items.map(async (item) => {
            const itemData = item.split(", ");
            if (itemData[0].length <= 0) return;
            let isDateValid = false;

            if(itemData.length>2){
                const inputDate = itemData[2];
                const [day, month, year] = inputDate.split(".").map(Number);
                isDateValid = !isNaN(new Date(year, month - 1, day).getTime());
            }
            
            const requestBody = {
                "_id": itemData[0],
                "time": itemData[1],
                "name": isDateValid ? null : itemData[2] || null,
                "birthDay": isDateValid ? itemData[2] || null : itemData[3] || null,
                "originString": item
            };
            
            const response = await axios.post(`/${index == 0 ? endpoints[0]: endpoints[1]}`, requestBody);
            return response.data;
        });
    
    return Promise.all(promises);
    } catch (err) {
        console.log(err);
    }
    
}

export const sendAppointmentDataRequest = async(arr: Array<string>, index: number) => {
    try {
        const appointments = arr[index].split("\n");

        const promises = appointments.map(async(item) => {
            const itemData = item.split(", ");

            const requestBody = {
                "patientID": itemData[0],
                "doctorID": itemData[1],
                "time": itemData[2] || null,
                "originString": item
            };

            console.log(requestBody);

            const response = await axios.post(`/appointment`, requestBody);
            return response.data;
        })

    return Promise.all(promises);
    } catch (err) {
        console.log(err);
    }
}

export const sendAnalyzeRequest = async (tableData: Array<any>) => {
    try {
        const response = await axios.post(`/analyze`, tableData);
        return response.data;
    } catch (err) {
        console.log(err);
    }
    
}

export const clearDB = async () => {
    try {
        const response = await axios.delete(`/clearDB`);

        return response.data;
    } catch (err) {
        console.log(err);
    }
    
}