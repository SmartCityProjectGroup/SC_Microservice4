
const amqp = require('amqplib/callback_api')

const RABBITMQUSERNAME = process.env.rabbitMQUsername
const RABBITMQPASSWORD = process.env.rabbitMQPassword
const RABBITMQSERVERURL = process.env.rabbitMQServerURL


const {ajv} = require("./validation")
const prisma = require('../lib/prisma.js')


amqp.connect(`amqp://${RABBITMQUSERNAME}:${RABBITMQPASSWORD}@${RABBITMQSERVERURL}`, function (error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }

        channel.consume('forum', async function (msg) {
            console.log(msg.content.toString())
            let newPost = JSON.parse(msg.content.toString())
            const validateCalendar = ajv.getSchema("event_Calendar")
            const validateNoCalendar = ajv.getSchema("event_NoCalendar")

            if (validateCalendar(newPost)) {
                const event_name = newPost.event_name
                if(event_name === "newServicePost"){
                    try{
                        console.log("validated")
                        const {title, short_description, long_description, service, picture_url} = newPost
                        let {event_on} = newPost
                        event_on = new Date(event_on)



                        const post = await prisma.post.create({
                            data: {
                                title,
                                short_description,
                                long_description,
                                service,
                                event_on
                            },

                        })
                        if(picture_url) {
                            const path = picture_url
                            const post_id = post.id;
                            const Picture = await prisma.picture.create({
                                data: {
                                    path,
                                    post_id

                                }
                            })
                        }
                    } catch (e) {
                        return console.log(e)
                    }
                }

            }else if(validateNoCalendar(newPost)) {
                const event_name = newPost.event_name
                if (event_name === "newServicePost") {
                    try {
                        console.log(newPost)
                        const {title, short_description, long_description, service, picture_url} = newPost


                        const post = await prisma.post.create({
                            data: {
                                title,
                                short_description,
                                long_description,
                                service
                            },
                        })
                        if (picture_url) {
                            const path = picture_url
                            const post_id = post.id;
                            const Picture = await prisma.picture.create({
                                data: {
                                    path,
                                    post_id

                                }
                            })
                        }

                    } catch (e) {
                        return console.log(e)
                    }
                }
            }

        }, {
            noAck: true,
        })
    })
})