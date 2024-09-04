const Tale = require('../models/Tale');
const Comment = require('../models/Comment');

module.exports = {
    getTales: async (req,res)=>{
        try {
            const notes = await Tale.find({ status: 'public' })
              .populate('user')
              .sort({ createdAt: 'desc' })
              .lean()
        
            res.render('tales/index', {
              tales,
            })
          } catch (err) {
            console.error(err)
            res.render('error/500')
          }
    },
    getTale: async (req,res)=>{
        try {
            const tale = await Tale.findById(req.params.id).populate('user').lean();
           
        
            if (!note) {
              return res.render('error/404')
            }
        
            if (note.user._id != req.user.id && note.status == 'private') {
              res.render('error/404')
            } else {
              res.render('tales/show', {
                tale,
              })
            }
          } catch (err) {
            console.error(err)
            res.render('error/404')
          }
    },
    getProfile: async (req,res)=>{
        try {
            const tales = await Tales.find({ user: req.user.id }).lean()
            res.render('/dashboard', {
              name: req.user.firstName,
              tales,
            })
          } catch (err) {
            console.error(err)
            res.render('error/500')
          }
    },
    createTale: async (req, res)=>{
        try{
            await Post.create({
                title: req.body.title, 
                body: req.body.body, 
                likes: 0, 
                user: req.user.id});
            console.log('Post has been added!');
            res.redirect('/posts');
        }catch(err){
            console.log(err);
        };
    },
    editTale: async (req, res) => {
        try {
            let tale = await Tale.findById(req.params.id).lean()
        
            if (!tale) {
              return res.render('error/404')
            }
        
            if (tale.user != req.user.id) {
              res.redirect('/tales')
            } else {
              tale = await Tale.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
              })
        
              res.redirect('/dashboard')
            }
          } catch (err) {
            console.error(err)
            return res.render('error/500')
          }
    },
    addComment: async (req, res)=>{
        try{
            await Comment.create({ 
                post: req.params.id,
                body: req.body.body, 
                likes: 0, 
                user: req.user.id});
            console.log('Post has been added!');
            res.redirect(`/posts/${req.params.id}`);
        }catch(err){
            console.log(err);
            //console.log(req);
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
        try {
            let tale = await Tale.findById(req.params.id).lean()
        
            if (!tale) {
              return res.render('error/404')
            }
        
            if (tale.user != req.user.id) {
              res.redirect('/tales')
            } else {
              await Tale.deleteOne({ _id: req.params.id })
              res.redirect('/dashboard')
            }
          } catch (err) {
            console.error(err)
            return res.render('error/500')
          }
    }

}