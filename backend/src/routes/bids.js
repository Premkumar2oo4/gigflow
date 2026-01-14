const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Bid = require('../models/Bid');
const Gig = require('../models/Gig');

router.post('/', authMiddleware, async (req, res) => {
    const { gigId, message, price } = req.body;

    try {
        if (!gigId || !message || !price || isNaN(price) || price <= 0) {
            return res.status(400).json({ message: 'Gig ID, message, and positive price are required' });
        }

        const gig = await Gig.findById(gigId);
        if (!gig) return res.status(404).json({ message: 'Gig not found' });
        if (gig.status !== 'open') return res.status(400).json({ message: 'Gig is not open for bidding' });
        if (gig.ownerId.toString() === req.user.id) {
            return res.status(400).json({ message: 'Cannot bid on your own gig' });
        }

        const bid = new Bid({
            gigId,
            freelancerId: req.user.id,
            message: message.trim(),
            price: Number(price),
            status: 'pending'
        });

        await bid.save();

        await bid.populate('freelancerId', 'name');

        res.status(201).json(bid);
    } catch (err) {
        console.error('Bid submission error:', err.message);
        res.status(500).json({ message: 'Server error while submitting bid' });
    }
});

router.get('/:gigId', authMiddleware, async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.gigId);
        if (!gig) return res.status(404).json({ message: 'Gig not found' });

        if (gig.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view bids' });
        }

        const bids = await Bid.find({ gigId: req.params.gigId })
            .populate('freelancerId', 'name email') 
            .sort({ createdAt: -1 });
        res.json(bids);
    } catch (err) {
        console.error('Get bids error:', err.message);
        res.status(500).json({ message: 'Server error while fetching bids' });
    }
});

router.patch('/:bidId/hire', authMiddleware, async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.bidId).populate('gigId');
        if (!bid) return res.status(404).json({ message: 'Bid not found' });

        const gig = bid.gigId;
        if (!gig) return res.status(404).json({ message: 'Gig not found' });

        if (gig.ownerId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to hire' });
        }

        if (gig.status !== 'open') {
            return res.status(400).json({ message: 'Gig is not open' });
        }

        gig.status = 'assigned';
        await gig.save();

        bid.status = 'hired';
        await bid.save();

        await Bid.updateMany(
            { gigId: gig._id, _id: { $ne: bid._id }, status: 'pending' },
            { status: 'rejected' }
        );

        const io = req.app.get('io');

        console.log('[HIRED] Checking io availability...');
        if (!io) {
            console.log('[HIRED] CRITICAL: io is undefined in route');
            console.log('[HIRED] req.app keys:', Object.keys(req.app || {}));
        } else {
            const freelancerId = bid.freelancerId.toString();
            console.log('[HIRED] io available - sending to room:', freelancerId);
            console.log('[HIRED] Payload:', {
                message: `You have been hired for "${gig.title}"!`,
                gigId: gig._id.toString()
            });

            io.to(freelancerId).emit('hiredNotification', {
                message: `You have been hired for "${gig.title}"!`,
                gigId: gig._id.toString()
            });

            console.log('[HIRED] Emit called - notification dispatched');
        }

        res.json({ message: 'Freelancer hired successfully' });
    } catch (err) {
        console.error('Hire error:', err.message, err.stack);
        res.status(500).json({ message: 'Server error during hire process' });
    }
});

module.exports = router;