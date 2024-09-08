const Router = require('express');
const router = Router();
const pattern = require('./patternController')    

router.get('/getAllPattern', pattern.getAllPattern);
router.post('/createPattern', pattern.createPattern);
router.put('/updatePattern/:id', pattern.updatePattern)
router.delete('/deletePattern/:id', pattern.deletePattern)
router.post('/findPattern', pattern.findPattern);

module.exports = router;