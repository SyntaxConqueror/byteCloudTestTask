
async function handleAppointmentsChanges(collection, io, schema) {
    io.on('connection', async (socket) => {
        console.log("user connected");
        const changeStream = await collection.watch({});

        changeStream.on('change', async () => {
            socket.emit('updateData', { appsArray: await schema.find({}) });
        });

        socket.on('disconnect', async ()=>{
            socket.emit('updateData', { appsArray: await schema.find({}) });
        })
    });
}


module.exports = handleAppointmentsChanges;