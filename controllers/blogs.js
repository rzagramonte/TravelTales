const Blog = require('../models/Blog');

module.exports = {
    getLoggedInUserBlogs: async (req,res)=>{
        //console.log(req); //.user
        
        try{
            const userBlogs = await Blog.find({userId:req.user.id});
            res.render('blogs.ejs', {blogs:userBlogs});
        }catch(err){
            console.log(err);
        };
        console.log(res)
    },
    getAllBlogs: async (req,res)=>{
        console.log(req.user);
        try{
            const allBlogs = await Blog.find();
            //const blogLikes = await Todo.countDocuments({userId:req.user.id,liked: true});
            res.render('feed.ejs', {blogs: allBlogs});
        }catch(err){
            console.log(err);
        };
    },
    createBlog: async (req, res)=>{
        try{
            await Blog.create({title: req.body.title, body: req.body.body, likes: 0, userId: req.user.id});
            console.log('Blog has been added!');
            res.redirect('/blogs');
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
    deleteBlog: async (req, res)=>{
        console.log(req.body.blogIdFromJSFile);
        try{
            await Blog.findOneAndDelete({_id:req.body.blogIdFromJSFile});
            console.log('Deleted Blog');
            res.json('Deleted It');
        }catch(err){
            console.log(err);
        };
    }
};    