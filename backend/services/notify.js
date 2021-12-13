var amqp = require('amqplib/callback_api');
// strings
const { accountSid, apiKey, apiSecret, messagingServiceSid } = require('./config.js')
const client = require('twilio')(apiKey, apiSecret, { accountSid });

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'Order_Received'

        channel.assertQueue(queue);

        channel.consume(queue, function reply(msg) {
            const { phone } = JSON.parse(msg.content)
            console.log(`[received] order for ${phone}.`);
            if (phone[0] != '+') return console.log('Invalid number')
            client.messages
                .create({
                    body: 'Order Confirmed.',
                    messagingServiceSid,
                    to: phone,
                })
                .then(() => console.log(`[notified] ${phone}`)).catch(e => console.log(e, "ERROR"));

        })
    });
});

