const { onSeletAllChapter, onCreateChapter, onUpdateChapter, onDeleteChapter } = require("./services")

const getAllChapter = (request, response) => {
    onSeletAllChapter().then(data =>{
    response.status(200).json(data)
   })
  }

const createChapter =(request, response) => {
    onCreateChapter(request).then(insertId =>{
        response.status(201).send(`Chapter added with ID: ${insertId}`)
    })
}

const updateChapter = (request, response) => {
    onUpdateChapter(request).then(id =>{
        response.status(200).send(`Chapter modified with ID: ${id}`)
    })
}
  
const deleteChapter = (request, response) => {
    onDeleteChapter(request).then(id =>{
        response.status(200).send(`Chapter deleted with ID: ${id}`)
    })
}

module.exports = {
    getAllChapter,
    createChapter,
    updateChapter,
    deleteChapter
    
}