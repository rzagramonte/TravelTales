const Post = require('../models/Post');

module.exports ={
    getAllPosts: async (req,res)=>{
        console.log(req.user);
        try{
            const allPosts = await Post.find();
            res.render('dashboard.ejs', {posts:allPosts});
        }catch(err){
            console.log(err);
        };
    },
    markLike: async (req, res)=>{
        try{
            const postId = req.body.postIdFromJSFile;
            const userId = req.user.id;
            const post = await Post.findOne({_id:postId, likedBy: userId})
            if (post) {
                await Post.findOneAndUpdate(
                    { _id: postId, likedBy: userId },
                    { $pull: { likedBy: userId }, $inc: { likes: -1 } }
                );
                console.log('User has already liked the post');
                res.status(400).json({ error: 'User has already liked the post' });
                return;
            }
            await Post.findOneAndUpdate(
                { _id: postId },
                { $push: { likedBy: userId }, $inc: { likes: 1 } },
                { upsert: true }
            );
            console.log('Marked Like');
            res.json('Marked Like');
        }catch(err){
            console.log(err);
        };
    },

}