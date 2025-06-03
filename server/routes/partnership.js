const express = require('express');
const router = express.Router();
const PartnershipRequest = require('../models/PartnershipRequest');

// Create a new partnership request
router.post('/', async (req, res) => {
    try {
        const { fullName, phoneNumber, email } = req.body;
        
        const partnershipRequest = new PartnershipRequest({
            fullName,
            phoneNumber,
            email
        });

        await partnershipRequest.save();
        
        res.status(201).json({
            success: true,
            message: 'Partnership request submitted successfully',
            data: partnershipRequest
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error submitting partnership request',
            error: error.message
        });
    }
});

// Get all partnership requests (admin only)
router.get('/', async (req, res) => {
    try {
        const requests = await PartnershipRequest.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching partnership requests',
            error: error.message
        });
    }
});

// Update partnership request status (admin only)
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const request = await PartnershipRequest.findByIdAndUpdate(
            req.params.id,
            { 
                status,
                updatedAt: Date.now()
            },
            { new: true }
        );
        
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Partnership request not found'
            });
        }

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating partnership request',
            error: error.message
        });
    }
});

module.exports = router; 