const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express();
const fls =require('hls-fetcher')

app.use(express.static(path.join(__dirname,'videoFiles')));

const fetchHls = function(uri,name){
  let options={
    uri:uri,
    cwd:'videoFiles',
    videoName:name
  }
  fls.getIt(options)
}

fetchHls(`https://player.vimeo.com/external/249414131.m3u8?s=10bf9d088fff85588fdd56dacd5f9f716c1c8dd5`,'video2');
fetchHls(`https://player.vimeo.com/external/254060783.m3u8?s=268bba3c32a74512cf2491891689a9760bbbecfa`,'video1');


app.get('/stream',(req,res)=>{
  let filename = req.query.hlsurl;
  let filePath = path.join('./videoFiles',filename);
  // checks if file exists
  fs.exists(filePath,function (exist){
    if (!exist){
      // if file not send play default video
      console.log('video not found')
      res.writeHead(202,{
        'Content-Type':
        'application/vnd.apple.mpegurl'
      });
      var file   = fs.createReadStream('./videoFiles/notFound.m3u8');
      file.pipe(res);

    } else {
      console.log('videoFound',filePath)
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
