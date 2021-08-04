const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")
const moment = require("moment");
const Room = require("../models/room")
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")(
    'sk_test_51JI5GhSGivLIjXe0VIeRiPdTQD2zI360MmMqEU8AHaXYySCv8NAur5AttKE3Vuz3BmGOeWrMmjFRZWWVF98qYY8u00izVlGv38'
)

router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
    } = req.body



    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })

        const payment = await stripe.charges.create(
            {
                amount: totalamount * 100,
                customer: customer.id,
                currency: "inr",
                receipt_email: token.email,
            },
            {
                idempotencykey: uuidv4()
            }
        )

        if (payment) {

            const newbooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate: moment(fromdate).format("DD-MM-YYYY"),
                todate: moment(todate).format("DD-MM-YYYY"),
                totalamount,
                totaldays,
                transactionId: '1234'
            });

            const booking = await newbooking.save();

            const roomtemp = await Room.findOne({ _id: room._id })

            roomtemp.currentbookings.push({
                bookingid: booking._id,
                fromdate: moment(fromdate).format("DD-MM-YYYY"),
                todate: moment(todate).format("DD-MM-YYYY"),
                userid: userid,
                status: booking.status
            });

            await roomtemp.save()

            // res.send("Room Booked Sucessfully")
            //  catch (error) {
            // return res.status(400).json({ error });

            // }
        }

        res.send("Payment Successfull, Your Room is booked")

    } catch (error) {
        return res.status(400).json({ error })
        // console.log(error);
    }






});

module.exports = router;