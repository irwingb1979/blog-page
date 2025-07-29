require('dotenv').config();
const express = require('express');
const flash = require('connect-flash'); // Import connect-flash
const app = express();
app.use(express.static('public'));
const ejs = require('ejs');
app.set('view engine', 'ejs');
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload')
app.use(fileUpload())


app.use((req, res, next) => { 
    global.loggedIn = req.session.userId; 
    next();
});

// Controller imports
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')


// Middleware imports
const validateMiddleware = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
app.get('/auth/logout', logoutController)

const mongoose = require('mongoose');
const { error } = require('console');
// mongoose.connect('mongodb://localhost:27017/blog')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// mongoose.connect('mongodb+srv://irwingb:y8N0S7JrIvnkxPL@clusterblog.kdtvaur.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBlog', {useNewUrlParser: true});
mongoose.connect(process.env.DB_CONNECTION_STRING) // Use the environment variable here
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

app.use(flash());

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, storePostController)

app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', loginUserController);
app.use((req, res) => res.render('notfound'));

app.post('/posts/store', validateMiddleware, async (req, res) => {
    try {
        let image = req.files ? req.files.image : null;
        if (image) {
            const imagePath = path.resolve(__dirname, 'public/img', image.name);
            image.mv(imagePath, async (err) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    return res.status(500).send('Error uploading image');
                }
                try {
                    const blogpost = await BlogPost.create({
                        ...req.body,
                        image: '/img/' + image.name
                    });
                    console.log('Blog post created successfully:', blogpost);
                    res.redirect('/');
                } catch (error) {
                    console.error('Error creating blog post:', error);
                    res.status(500).send('Error creating blog post');
                }
            });
        } else {
            // If no image is uploaded, just create the blog post
            const blogpost = await BlogPost.create(req.body);
            console.log('Blog post created successfully:', blogpost);
            res.redirect('/');
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error processing request');
    }
});

