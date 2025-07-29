const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost') // Make sure this path is correct

// 1. Remove deprecated options from mongoose.connect
mongoose.connect('mongodb://localhost:27017/my_database')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// 2. Use async/await for BlogPost.create()
async function createBlogPost() {
    try {
        const blogpost = await BlogPost.create({
            title: 'How to save money on energy bills',
            body: 'Saving money on energy bills can be achieved through various methods such as using energy-efficient appliances, sealing leaks in your home, and being mindful of your energy consumption habits.'
        });
        console.log('Blog post created successfully:', blogpost);
    } catch (error) {
        console.error('Error creating blog post:', error);
    } finally {
        // Optional: Close the connection after operation
        mongoose.connection.close();
    }
}

//createBlogPost(); // Call the async function to execute it

// Find specific blog posts by title
async function findSpecificBlogPost() {
    try {
        const blogposts = await BlogPost.find({
            title: 'How to save money on energy bills'
        });
        console.log('Found blog posts with specific title:', blogposts);
    } catch (error) {
        console.error('Error finding blog posts:', error);
    }
}
//findSpecificBlogPost(); // Call the async function to execute it

// Update a blog post by id
async function updateBlogPostById() {
    try {
        const id = "6888db467bd43049e4758135"; // The ID of the document to update
        const updatedTitle = 'Updated title'; // The new title

        const updatedBlogPost = await BlogPost.findByIdAndUpdate(
            id,
            { title: updatedTitle },
            { new: true } // { new: true } returns the *updated* document
                          // By default, it returns the *original* document
        );

        if (updatedBlogPost) {
            console.log('Blog post updated successfully:', updatedBlogPost);
        } else {
            console.log('No blog post found with that ID to update.');
        }

    } catch (error) {
        console.error('Error updating blog post:', error);
    } finally {
        // Optional: Close the connection after operation
        mongoose.connection.close();
    }
}
//updateBlogPostById(); // Call the async function to execute it

// Delete a blog post by id
async function deleteBlogPostById() {
    try {
        const id = "6888db467bd43049e4758135"; // The ID of the document to delete

        const deletedBlogPost = await BlogPost.findByIdAndDelete(id);

        if (deletedBlogPost) {
            console.log('Blog post deleted successfully:', deletedBlogPost);
        } else {
            console.log('No blog post found with that ID to delete.');
        }

    } catch (error) {
        console.error('Error deleting blog post:', error);
    } finally {
        // Optional: Close the connection after operation
        mongoose.connection.close();
    }
}
deleteBlogPostById(); // Call the async function to execute it