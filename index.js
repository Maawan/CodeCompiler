const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const cors = require("cors");
const readline = require("readline");
var compiler = require('compilex');
const {c, cpp, node, python, java} = require('codehelp-compiler');
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

  const sourcecode = `print("Hello World!")`;
  let resultPromise = cpp.runSource(code);
  resultPromise
      .then(result => {
          console.log(result);
          if(!result.stderr){
            return res.status(200).json({
                compileOutput : result.stdout,
                executionOutput : result.stdout
              })
          }else{
            return res.status(200).json({
                compileOutput : result.stderr,
                executionOutput : result.stderr
              })
          }
          
      })
      .catch(err => {
          console.log(err);
      });

//   var envData = { OS : "windows" , cmd : "g++" , options: {timeout:2000 } }; 
//   var envDataLinux = { OS : "linux" , cmd : "g++" , options: {timeout:2000 }  }; // ( uses gcc command to compile )
//     compiler.compileCPP(envDataLinux , code , function (data) {
//         if(data.output){

//         res.status(200).json({compileOutput: data.output , executionOutput : data.output});
//         }else{
//         res.status(200).json({compileOutput: data.error , executionOutput : data.error});
//         }
//         compiler.flush(function(){
//             console.log("Clear");
//         })

//     });

});
app.listen(3002, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

