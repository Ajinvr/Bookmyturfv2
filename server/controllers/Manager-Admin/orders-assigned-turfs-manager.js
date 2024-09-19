import { order } from "../../db/models/orderModel.js";
import { turf } from "../../db/models/turfModel.js";
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// manager get assigned turfs
export const managerAssignedTurfs = async (req, res) => { 
      try { 
           const userId = req.user.id;
           const assignedTurfs = await turf.find({ assignedTo: userId });
        res.json({ assignedTurfs }); 
      } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", ts: "error" });
      }
};

// manager get assigned turfs orders
export const managerAssignedTurfsOrders = async (req, res) => {
      try {
          const userId = req.user.id;
          const assignedTurfsOrders = await order.find({ managerId: userId });
        res.json({ assignedTurfsOrders });
      } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", ts: "error" });
      }
};


// deleteorder
export const deleteOrder = async (req, res) => {      
       const { orderId } = req.body
       if (!orderId) return res.status(400).json({ msg: "Order ID is required", ts: "error" });

      try {
          const result = await order.findByIdAndDelete(orderId);
          if (!result) return res.status(404).json({ msg: "Order not found", ts: "error" });    
        return res.status(200).json({ msg: "Order successfully deleted", ts: "success" });
      } catch (error) {
        console.error("Error deleting order:", error);
        return res.status(500).json({ msg: "Server error", ts: "error" });
      }
};


// cancelorder
export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ msg: "Order ID is required", ts: "error" });

  try {
    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ msg: "Order not found", ts: "error" });

    const sessionId = updatedOrder.sessionid;

    if (!sessionId) return res.status(400).json({ msg: "No session ID found", ts: "error" });

    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
    const paymentIntentId = session.payment_intent;

    if (!paymentIntentId) return res.status(400).json({ msg: "No payment intent found", ts: "error" });

    const refund = await stripeInstance.refunds.create({
      payment_intent: paymentIntentId,
    });

    res.status(200).json({
      msg: "Order successfully cancelled and refund initiated",
      ts: "success",
      order: updatedOrder,
      refund,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", ts: "error" });
  }
};