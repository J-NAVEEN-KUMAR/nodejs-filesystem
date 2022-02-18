const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const AdmZip = require('adm-zip');

// console.log(process.env.PORT)

//creating a directory

const folderName = `D:/GUVI/Backend/nodejs_task_1/textfiles`;

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (error) {
  console.log(error);
}

console.log(folderName)

var uplodDir = fs.readdirSync(folderName)

// Listening express server at given port

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})



app.get('/', (req,res) => {

  const currentDate = new Date();
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  fs.appendFileSync(`${folderName}/Current_Date_${currentDay}_${currentMonth+1}_${currentYear}_${hours}_${minutes}_${seconds}.txt`, `Current Time :: ${hours}:${minutes}:${seconds}\n`, (err) => {
    if(err) {
      console.log(err)
      return
    }
  })
  uplodDir = fs.readdirSync(folderName)
  console.log('file operation successful');
  
  res.send(`Current Time :: ${hours}:${minutes}:${seconds} \n 
  To download files go to end point http://localhost:${port}/download`)


})

app.get('/download', (req,res) => {
  const zip = new AdmZip()
  for (let i = 0; i < uplodDir.length; i++) {
    zip.addLocalFile(__dirname+"/textfiles/"+uplodDir[i])
    console.log("upload dir", uplodDir[i])
  }

  const textfiles = "textfiles.zip"
  const data = zip.toBuffer();
  console.log(data.toString())

  res.set('Content-Type', 'application/octet-stream')
  res.set('Content-Disposition', `attachement; filename=${textfiles}`)
  res.set('Content-Length', data.length)
  res.send(data)
  }, (err) => {
    if(err) {
      console.log(err)
    }
  })  


