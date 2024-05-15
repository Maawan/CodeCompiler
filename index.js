const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const cors = require("cors");
const readline = require("readline");
var compiler = require('compilex');
var options = {stats : true , timeout:2000}; //prints stats on console 
compiler.init(options);

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.get("/" , (req , res) => {
    res.status(200).json({
        message : "Ok"
    })
})
app.post("/compile", (req, res) => {
  const {code , lang} = req.body;
  var envData = { OS : "windows" , cmd : "g++" , options: {timeout:2000 } }; 
  var envDataLinux = { OS : "linux" , cmd : "g++" , options: {timeout:2000 }  }; // ( uses gcc command to compile )
    compiler.compileCPP(envDataLinux , code , function (data) {
        if(data.output){

        res.status(200).json({compileOutput: data.output , executionOutput : data.output});
        }else{
        res.status(200).json({compileOutput: data.error , executionOutput : data.error});
        }
        compiler.flush(function(){
            console.log("Clear");
        })

    });

});
app.listen(3002, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

