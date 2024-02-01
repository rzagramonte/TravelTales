const Blog = require('../models/Blog');

module.exports = {
    getLoggedInUserBlogs: async (req,res)=>{
        //console.log(req); //.user
        
        try{
            const userBlogs = await Blog.find({user:req.user.id});
            res.render('blogs.ejs', {blogs:userBlogs});
        }catch(err){
            console.log(err);
        };
        console.log(res)
    },

    createBlog: async (req, res)=>{
        try{
            await Blog.create({
                title: req.body.title, 
                body: req.body.body, 
                likes: 0, 
                user: req.user.id});
            console.log('Blog has been added!');
            res.redirect('/blogs');
        }catch(err){
            console.log(err);
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