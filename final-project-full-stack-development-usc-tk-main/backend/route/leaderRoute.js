import express from 'express'
import Leader from '../model/LeaderModal.js';

const router = express.Router();


router.post('/add', async (req, res) => {
    try {
        let leader = new Leader({
            name: req.body.name,
            email: req.body.email,
            score: req.body.score,
            date: Date.now()
        })
        leader = await leader.save();
        res.send({ leader })
    } catch (e) {
        console.error('Error Posting data:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/get', async (req, res) => {
    try {
        const allData = await Leader.find().select(["-_id", "-__v"]).sort({ score: -1 });
        res.json(allData);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.status(500).json({ error: 'Internal server error' });

    }
})


export default router;