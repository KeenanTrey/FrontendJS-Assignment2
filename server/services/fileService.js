const fs = require('fs')
const path = require('path')

exports.getFileContents = (filePath)=>{
   let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)))
   console.log(fileContents)
   return fileContents
   
}

exports.writeFileContents = (filePath, data) =>{
    let fileContents = exports.getFileContents(filePath)
    console.log(fileContents)
    fileContents.push(data)
    fileContents = JSON.stringify(fileContents)
    fs.writeFileSync(path.join(__dirname, filePath), fileContents)
    
}


 