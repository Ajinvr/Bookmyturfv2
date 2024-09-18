import { turf } from "../db/models/turfModel.js";
import { turfSlot } from "../db/models/turfTimeSlotsModel.js";
import dotenv from 'dotenv';

dotenv.config();

export const createSlots = async (req, res) => {
    const { key } = req.params;
    const secretKey = process.env.CREATESLOTS_SECRET_KEY;

    if (key !== secretKey) {
        return res.status(400).json({ msg: 'Invalid key', ts: 'error' });
    }

    try {
        const turfs = await turf.find();
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), 0, 1); 
        const endDate = new Date(currentDate.getFullYear() + 1, 0, 0); 

        const tasks = [];

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dateString = new Date(date).toISOString().split('T')[0];
            tasks.push(
                turfs.map(async ({ _id, slots }) => {
                    const turfId = _id.toString();
                    const existingSlots = await turfSlot.findOne({ turfId, date: dateString });

                    if (!existingSlots) {
                        if (slots.length > 0) {
                            const newSlots = slots.map(slot => ({ ...slot, status: 'available' }));
                            await new turfSlot({ turfId, date: dateString, slots: newSlots }).save();
                        }
                    }
                })
            );
        }

        await Promise.all(tasks.flat());

        res.status(201).json({ msg: "Slots created successfully", ts: "success" });
    } catch (error) {
        res.status(500).json({ msg: "Error creating slots", ts: "error" });
    }
};



export const createSlotsForSpecificTurf = async (turfId) => {

    const selectedTurf = await turf.findById(turfId);
    if (!selectedTurf) {
        throw new Error('Turf not found');
    }

    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1); 
    const endDate = new Date(currentDate.getFullYear() + 1, 0, 0); 

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateString = new Date(date).toISOString().split('T')[0];
        const existingSlots = await turfSlot.findOne({ turfId, date: dateString });

        if (!existingSlots && selectedTurf.slots.length > 0) {
            const newSlots = selectedTurf.slots.map(slot => ({ ...slot, status: 'available' }));
            await new turfSlot({ turfId, date: dateString, slots: newSlots }).save();
        }
    }
};



import fs from 'fs';
import path from 'path';

// Helper function to get the directory name from import.meta.url
const getDirname = (importMetaUrl) => {
  const { pathname } = new URL(importMetaUrl);
  return path.dirname(pathname);
};

export function createUploadsDirectory() {
  const rootDir = getDirname(import.meta.url);
  const parentDir = path.resolve(rootDir, '..');
  const uploadsDir = path.join(parentDir, 'uploads');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created successfully.');
  } else {
    console.log('Uploads directory already exists.');
  }
}
