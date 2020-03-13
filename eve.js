const express = require('express')
const app = express();
const path = path();  
app.use(express.static('public'))

app.get ('/',(req,res) => {
  res.end('works')
});

app.listen(30000, () => {
   console.log('servidor prendido')
})


