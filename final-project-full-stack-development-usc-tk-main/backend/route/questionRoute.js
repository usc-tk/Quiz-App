import express from 'express'
import Question from '../model/QuestionModal.js';

const router = express.Router();

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

router.post('/add', async (req, res) => {
    try {
        let question = new Question({
            question: req.body.question,
            options: req.body.options
        })
        question = await question.save();
        res.send({ question })
    } catch (e) {
        console.error('Error Posting data:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/get', async (req, res) => {
    try {
        const allData = await Question.find().select(["-_id", "-__v"]);
        // Shuffle the data array in random order
        const shuffledData = shuffleArray(allData);
        res.json(shuffledData);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.status(500).json({ error: 'Internal server error' });

    }
})


export default router;