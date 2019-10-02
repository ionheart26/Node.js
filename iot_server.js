const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');


cnt = 1

app.get('/', function(req, res) {
	    console.log(`got here, you are ${cnt++}`)
	    res.send('You are not supposed to be here')
})

app.get('/update', function(req, res) {
	    v = req.query
	    console.log(`api_key=${v.api_key}, field1=${v.field1}`)
	    res.send(`api_key=${v.api_key}, field1=${v.field1}`)

	    api_key = v.api_key
	    field1 = v.field1
	    datetime = new Date().toISOString().replace(/-/g,"").replace('T',',').substring(0,14)
	    datetime = datetime + ',' + field1 + '\n'
	   

	    fs.appendFile('data.txt', datetime, (err) => {
		            if (err) throw err;

		            console.log(`got value key=${api_key} value=${field1}`)
		        });

})

app.get('/dump', function(req, res) {
	    v = req.query
	    fs.readFile('data.txt', 'utf-8',function(err, data) {
		           if (err) throw err
		           
		    	   array = data.split('\n')
		    	   result = ""
		           for(i=0;i<v.count;i++){
				console.log(array[i])
				result += (array[i]+'<br/>')
			   }
		     	   res.type('text/html')
		           res.send(result)
			   
		        })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
