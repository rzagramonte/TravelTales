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
            await Blog.findOneAndUpdate({_id:req.body.blogIdFromJSFile},{
                $set: {
                    likes:request.body.likesS + 1
                  }
            });
            console.log('Marked Like');
            res.json('Marked Like');
        }catch(err){
            console.log(err);
        };
    },
    markUnlike: async (req, res)=>{
        try{
            await Blog.findOneAndUpdate({_id:req.body.blogIdFromJSFile},{
                $set: {
                    likes:request.body.likesS - 1
                  }
            });
            console.log('Marked Unlike');
            res.json('Marked Unlike');
        }catch(err){
            console.log(err)
        };
    },
}