const Router = require('express');
const router = Router();
const chapter = require('./chapterController')    

router.get('/getAllChapter', chapter.getAllChapter);
router.post('/createChapter', chapter.createChapter);
router.put('/updateChapter/:id', chapter.updateChapter)
router.delete('/deleteChapter/:id', chapter.deleteChapter)

module.exports = router;