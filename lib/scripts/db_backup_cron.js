const cron = require('node-cron')
const {exec} = require('child_process')
const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path');
// Load .env file
require('dotenv').load({
  path: path.join(__dirname, '../../.env'),
  silent: true
});




function main () {
    let date = new Date()  
    console.log("Running main function at: ", date)
    var dirName = `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}` 
    fs.mkdirSync(`db_backup/${dirName}`)

  exec(`mongodump -h localhost:27017 -d ${process.env.DB_NAME} -o db_backup/${dirName}`, (err, stdout, stderr) => {

     if(err) {
       return  console.error("Some error occured while creating backup !!", err)
     }
     console.log("STDERR >> ", stderr)

     fs.readdir('db_backup', (err, files) => {

           if(err) {
            return  console.error("Some error occured  !!\n", err)
           }
           for (const i in files) {
               if(files[i] !== dirName) {
                   rimraf(`db_backup/${files[i]}`, (err) => {

                        if(err) {console.error(err)}
                        console.log(`Dir Deleted: ` , files[i])

                   })
               }
                
           }
     })

  })
}


console.log("ENV >>" , process.env.RUN_MAIN)
if(process.env.RUN_MAIN == 'true') {
  console.log("RUNNING MAIN METHOD !!")
  main()
}



// var date = new Date()

console.log("DB backup cron starts at: ", new Date() )

cron.schedule("59 23 * * *", main);

