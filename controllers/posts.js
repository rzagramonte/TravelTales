const Post = require('../models/Post');

module.exports = {
    getFeed: async (req,res)=>{
        try{
            const allPosts = await Post.find().sort({ createdAt: "desc" }).lean();
            res.render('feed.ejs', {posts:allPosts});
        }catch(err){
            console.log(err);
        };
    },
    getPost: async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id);
            res.render('post.ejs', {post:post, user: req.user});
        }catch(err){
            console.log(err);
        };
    },
    getProfile: async (req,res)=>{
        try{
            const userPosts = await Post.find({user:req.user.id});
            res.render('profile.ejs', {posts:userPosts, user: req.user});
        }catch(err){
            console.log(err);
        };
        console.log(res)
    },
    createPost: async (req, res)=>{
        try{
            await Post.create({
                title: req.body.title, 
                body: req.body.body, 
                likes: 0, 
                user: req.user.id});
            console.log('Post has been added!');
            res.redirect('/userPosts');
        }catch(err){
            console.log(err);
        };
    },
    addComment: async (req, res)=>{
        try{
            await Post.create({
                title: req.body.title, 
                body: req.body.body, 
                likes: 0, 
                user: req.user.id});
            console.log('Post has been added!');
            res.redirect('/userPosts');
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


    deletePost: async (req, res)=>{
        console.log(req.body.postIdFromJSFile);
        try{
            await Post.findOneAndDelete({_id:req.body.postIdFromJSFile});
            console.log('Deleted Post');
            res.json('Deleted It');
        }catch(err){
            console.log(err);
        };
    }

}