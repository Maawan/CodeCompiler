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

app.post("/compile", (req, res) => {
  const {code , lang} = req.body;
  var envData = { OS : "windows" , cmd : "g++" , options: {timeout:1000 } }; 
  var envDataLinux = { OS : "linux" , cmd : "gcc" , options: {timeout:1000 }  }; // ( uses gcc command to compile )
    compiler.compileCPP(envData , code , function (data) {
        if(data.output){

           return res.status(200).json({compileOutput: data.output , executionOutput : data.output});
        }else{
            return res.status(200).json({compileOutput: data.error , executionOutput : data.error});
        }
        
    });

});
app.listen(3002, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

