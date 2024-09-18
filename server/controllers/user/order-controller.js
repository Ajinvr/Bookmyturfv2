import Stripe from 'stripe';
import { turfSlot } from '../../db/models/turfTimeSlotsModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


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
      const { id, selectedDate, selectedSlots, amount } = req.body;
  
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
        success_url: 'http://192.168.1.36:5173/success',
        cancel_url: 'http://192.168.1.36:5173/cancel',  
      });
  

      


      res.json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

export const createPaymentIntent = async (req, res) => {
  try {
    console.log(req.body);
    
    const { ff } = req.body;

    let amount = 10000

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
