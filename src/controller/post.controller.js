const postModel = require('../models/post.model');
const { generateCaption } = require('../services/ai.service');
const uploadFile = require('../services/storage.service');
const { v4: uuidv4 } = require('uuid'); 

async function createPostController(req, res) {
        const file = req.file;
        console.log("file recived: ", file);
        
        const base64Image = new Buffer.from(file.buffer).toString('base64');

        // const caption = await generateCaption(base64Image);
        // const result = await uploadFile(file.buffer, `${uuidv4()}`);

        cosnt [caption, result] = await Promise.all([
            generateCaption(base64Image),
            uploadFile(file.buffer, `${uuidv4()}`)
        ])

        const post = await postModel.create({
            caption: caption,
            image: result.url,
            user: req.user._id
        })

        res.status(201).json({
            message:"post created successfully",
            post,
            caption
        });
}


module.exports = {
    createPostController
}