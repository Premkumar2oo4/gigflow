const express = require('express');
const authMiddleware = require('../middleware/auth');
const Gig = require('../models/Gig');

const router = express.Router();

router.get('/', async (req, res) => {
    const { search } = req.query;
    const query = { status: 'open' };

    if (search) {
        query.title = { $regex: search.trim(), $options: 'i' };
    }

    try {
        const gigs = await Gig.find(query)
            .populate('ownerId', 'name email') 
            .sort({ createdAt: -1 })           
            .limit(20);                        
        res.json(gigs);
    } catch (err) {
        console.error('Gigs list error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/', authMiddleware, async (req, res) => {
    const { title, description, budget } = req.body;

    
    if (!title || !description || !budget || budget <= 0) {
        return res.status(400).json({ message: 'Title, description, and positive budget are required' });
    }

    try {
        const gig = new Gig({
            title: title.trim(),
            description: description.trim(),
            budget: Number(budget),
            ownerId: req.user.id,
            status: 'open'
        });

        await gig.save();
        
        await gig.populate('ownerId', 'name');
        res.status(201).json(gig);
    } catch (err) {
        console.error('Create gig error:', err);
        res.status(400).json({ message: err.message || 'Failed to create gig' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id)
            .populate('ownerId', 'name email'); 

        if (!gig) {
            return res.status(404).json({ message: 'Gig not found' });
        }

        res.json(gig);
    } catch (err) {
        console.error('Single gig error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;