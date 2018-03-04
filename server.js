const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express();

// used to serve the staic video files
app.use(express.static(path.join(__dirname,'videoFiles')));



app.get('/stream',(req,res)=>{
  let filename = req.query.hlsurl;
  let filePath = path.join('./videoFiles',filename);
  // checks if file exists
  fs.exists(filePath,function (exist){
    if (!exist){
      // if file not send play default video
      res.writeHead(202,{
        'Content-Type':
        'application/vnd.apple.mpegurl'
      });
      var file   = fs.createReadStream('./videoFiles/notFound.m3u8');
      file.pipe(res);

    } else {
      // if file found send the appropoate .m3u8 file
      res.writeHead(200,{
        'Content-Type':
        'application/vnd.apple.mpegurl'
      });
      var file   = fs.createReadStream(filePath);
      file.pipe(res);
      // res.end()
    }
  })
})

app.listen(3000, () => console.log(' app listening on port 3000!'))
