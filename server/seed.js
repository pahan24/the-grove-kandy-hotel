const Admin = require('./models/Admin');
const Room = require('./models/Room');
const mongoose = require('mongoose');
require('dotenv').config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/morning_dew');
        console.log('Connected to seed database');

        // Seed Admin
        await Admin.deleteMany();
        const admin = new Admin({
            username: process.env.ADMIN_USER || 'admin',
            password: process.env.ADMIN_PASS || 'morningdew2026'
        });
        await admin.save();
        console.log('Admin seeded');

        // Seed Rooms
        await Room.deleteMany();
        const rooms = [
            {
                name: 'Deluxe Mountain View Room',
                description: 'Panoramic views of Ella Rock and the valley.',
                price: 120,
                category: 'Deluxe',
                slug: 'deluxe-mountain-view'
            },
            {
                name: 'King Room with Balcony',
                description: 'Spacious room with a private balcony.',
                price: 180,
                category: 'King',
                slug: 'king-with-balcony'
            },
            {
                name: 'Deluxe Family Room',
                description: 'Perfect for families exploring Ella.',
                price: 220,
                category: 'Family',
                slug: 'deluxe-family'
            },
            {
                name: 'Morning Dew Suite',
                description: 'The ultimate luxury experience.',
                price: 350,
                category: 'Suite',
                slug: 'morning-dew-suite'
            }
        ];
        await Room.insertMany(rooms);
        console.log('Rooms seeded');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
