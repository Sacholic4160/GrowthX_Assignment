
const  app  = require("./src/app.js")
const connectDB  = require('./src/utils/db.js')



connectDB()
.then(() => {
    app.on('error' , (err) => {
        console.log('Mongodb connection successful, but Express is not listening!', err)
    throw err;
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log(`Mongodb connection failed ${error}`);
})