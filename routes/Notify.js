const express = require('express');
const { Notification } = require('../models/notifications');
const Joi = require('joi');

const router = express.Router()

//API to get all notifications
router.get('/', async (req, res) => {
    try{
        const notification = await Notification.find().sort({ date: -1 });
        res.send(notification);
    }catch(error){
        res.status(400).send(error.message)
    }
})

//API to get a specific notification
router.get('/:id', async (req, res) => {
    try{
        const userNotification = req.params.id;
        if (!userNotification) return res.status(404).send("User with the id cannot be found....")
        const notification = await Notification.findById(userNotification).sort({ date: -1 });
        res.send(notification);
    }catch(error){
        res.status(400).send(error.message)
    }
})

//API to post notification
router.post('/api/create', async (req, res) => {
    const Schema = Joi.object({
        recepient: Joi.string().required().min(3).max(100),
        message: Joi.string().required().min(1).max(2000),
        uid: Joi.string()
    })
    const { error } = Schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { recepient , message} = req.body;
    let notification = new Notification({
        recepient,
        message,
    })
    try{
        notification = await notification.save()
        res.send(notification)
    }catch(error){
        res.status(400).send("Error sending notification")
    }
})

//API to delete notifications
router.delete('/:id', async (req, res) => {
    try{
        const notification = req.params.id
        if (!notification) return res.status(404).send('Notification not found...')
        const deletedNotification = await Notification.findByIdAndDelete(notification)
        res.send(deletedNotification)
    }catch(error){
        console.error(error.message)
    }
})

module.exports = router;