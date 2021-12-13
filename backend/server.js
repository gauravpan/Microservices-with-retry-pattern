const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')

var amqp = require('amqplib/callback_api');
/**@type {amqp.Channel} */
var ch;


app.use(cors())

app.post('/order', (req, res) => {
    const phone = req.body.phone || '+977986975***';
    var queue = 'Order_Received';
    ch.sendToQueue(queue, Buffer.from(JSON.stringify({ phone })));
    console.log(`${phone} sent to queue.`);
    res.send({ phone })

})

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        console.log('Error on connecting to rabbitMQ.')
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'Order_Received';
        ch = channel;
        ch.assertQueue(queue);
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    });
});

