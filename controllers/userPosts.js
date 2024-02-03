const Post = require('../models/Post');

module.exports = {
    getLoggedInUserPosts: async (req,res)=>{
        //console.log(req); //.user
        
        try{
            const userPosts = await Post.find({user:req.user.id});
            res.render('userPosts.ejs', {posts:userPosts});
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
};    