import app from './app.js';
import connect from './config/ConnectToDatabase.js';

const PORT = process.env.PORT;

connect().then(()=>{
    app.listen(PORT, ()=>{
        console.log('Connected to Database 🚀🚀🚀');
        console.log(`Server is Listening on Port : ${PORT} 🚀🚀🚀`);
    })
}).catch((err)=>{
    console.log(`Cant Connect to Server 😔😔😔 due to : ${err}`);
})

