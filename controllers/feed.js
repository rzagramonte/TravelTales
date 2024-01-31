const Blog = require('../models/Blog');

module.exports ={
    getAllBlogs: async (req,res)=>{
        console.log(req.user);
        try{
            const allBlogs = await Blog.find();
            //const blogLikes = await Todo.countDocuments({userId:req.user.id,liked: true});
            res.render('feed.ejs', {blogs:allBlogs});
        }catch(err){
            console.log(err);
        };
    },
    markLike: async (req, res)=>{
        try{
            const blogId = req.body.blogIdFromJSFile;
            const userId = req.user.id;
            const blog = await Blog.findOne({_id:blogId, likedBy: userId})
            if (blog) {
                await Blog.findOneAndUpdate(
                    { _id: blogId, likedBy: userId },
                    { $pull: { likedBy: userId }, $inc: { likes: -1 } }
                );
                console.log('User has already liked the post');
                res.status(400).json({ error: 'User has already liked the post' });
                return;
            }
            await Blog.findOneAndUpdate(
                { _id: blogId },
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