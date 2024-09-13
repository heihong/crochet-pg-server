const ChapterService = require("./chapterService")

const chapterService = new ChapterService();

const getAllChapter = (request, response) => {
    chapterService.onSeletAllChapter().then(data =>{
    response.status(200).json(data)
   })
  }

const createChapter =(request, response) => {
    chapterService.onCreateChapter(request.body).then(insertId =>{
        response.status(201).send(`Chapter added with ID: ${insertId}`)
    })
}

const updateChapter = (request, response) => {
    chapterService.onUpdateChapter(request).then(id =>{
        response.status(200).send(`Chapter modified with ID: ${id}`)
    })
}
  
const deleteChapter = (request, response) => {
    chapterService.onDeleteChapter(request).then(id =>{
        response.status(200).send(`Chapter deleted with ID: ${id}`)
    })
}

module.exports = {
    getAllChapter,
    createChapter,
    updateChapter,
    deleteChapter
    
}