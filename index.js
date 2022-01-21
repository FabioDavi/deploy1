const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.get("/", function(req, res){
    res.send(`aplicação rodando na porta ${port}`)
})

app.listen(port, ()=>{
    console.info('rodando')
})
