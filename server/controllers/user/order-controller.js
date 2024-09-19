import Stripe from 'stripe';
import { turfSlot } from '../../db/models/turfTimeSlotsModel.js';
import { order } from '../../db/models/orderModel.js';
import { turf } from '../../db/models/turfModel.js';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

let sessionid;
let bookingdata;
let userId;
let managerId;

export const checkAvailability = async (req, res) => {
    const { selectedSlots } = req.body;
    const selectedSlotIds = selectedSlots.map(slot => slot._id);
    
    const turfSlots = await turfSlot.find({ date: req.body.selectedDate });
    
    const availableSlotIds = new Set();
  
    for (const turf of turfSlots) {
      for (const slot of turf.slots) {
        if (slot.status === 'available') {
          availableSlotIds.add(slot._id.toString());
        }
      }
    }
  
    const allAvailable = selectedSlotIds.every(slotId => availableSlotIds.has(slotId));
  
    return res.json({ available: allAvailable });
};

export const createCheckoutSession = async (req, res) => {
    try {
        const { selectedDate, selectedSlots, amount } = req.body;
        userId = req.user.id;
        bookingdata = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: selectedSlots.map(slot => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Booking for ${slot.timeRange} on ${selectedDate}`,
                    },
                    unit_amount: Math.floor(amount / selectedSlots.length),
                },
                quantity: 1,
            })),
            success_url: 'https://bookmyturfv2-frontend.vercel.app/success',
            cancel_url: 'https://bookmyturfv2-frontend.vercel.app/cancel',
        });
  
        res.json({ sessionId: session.id });
        sessionid = session.id;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res) => {
 
    try {
        const existingOrder = await order.findOne({
          userId:userId,
          turfId: bookingdata.id,
          bookingdate: bookingdata.selectedDate,
          timeRange: { $in: bookingdata.selectedSlots.map(slot => slot.timeRange) }
        });
    
        if (existingOrder) {
          return res.status(400).json({ error: 'Order already exists' });
        }
    
        const session = await stripe.checkout.sessions.retrieve(sessionid);
    
        if (session.payment_status === 'paid') {
          const turfData = await turf.findById(bookingdata.id);
    
          if (turfData) {
            const managerId = turfData.assignedTo;
            let amount = bookingdata.amount / 100;
    
            const turfSlots = await turfSlot.findOne({
              turfId: bookingdata.id,
              date: bookingdata.selectedDate
            });
    
            if (!turfSlots) {
              return res.status(404).json({ error: 'Turf slots not found' });
            }
    
            for (const selectedSlot of bookingdata.selectedSlots) {
              const matchingSlot = turfSlots.slots.find(turfSlot =>
                turfSlot._id.toString() === selectedSlot._id.toString()
              );
    
              if (matchingSlot) {
                matchingSlot.status = 'booked';
              }
            }
    
            await turfSlots.save();
    
            
            await order.create({
              userId,
              turfId: bookingdata.id,
              managerId,
              bookingdate: bookingdata.selectedDate,
              timeRange: bookingdata.selectedSlots.map(slot => slot.timeRange),
              billAmount: amount,
              status: 'confirmed',
              sessionid
            });
    
            res.status(200).json({ message: 'Order created successfully!' });
          } else {
            res.status(404).json({ error: 'Turf not found' });
          }
        } else {
          res.status(400).json({ error: 'Payment not completed' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

