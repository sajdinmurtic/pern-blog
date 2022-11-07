const express = require('express')
const router = express.Router()
const {
  addPost,
  updatePost,
  deletePost,
  getPost,
  getPosts
  
} = require('../controllers/postController.js')
const {auth } = require('../middleware/authMiddleware')
router.post('/add',auth, addPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.get('/:id', getPost)
router.get('/', getPosts)

module.exports = router