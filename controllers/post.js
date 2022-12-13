const Post = require('../models/Post');


exports.createPost = async (req, res, next) => {
    try {
        const newPostData = {
            caption: req.body.caption,
            image: {
                // * for now passing as a string and needs to be changed
                public_id: "req.body.public_id",
                url: "req.body.url"
            },
            owner: req.user._id,
        }
        const newPost = await Post.create(newPostData);

        // * we have to push the post to the logged in user posts array

        res.status(201).json({
            success: true,
            post: newPost,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}