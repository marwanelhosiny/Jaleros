import prisma from "../../../DB/prisma.js";
import path from 'path';
import fs from 'fs';











//================================================ add blog ===========================================//
export const addBlog = async(req, res, next) => {

        const { title, content } = req.body;

    const blogDocFile = req.file

    // Create blog in database
    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            pic: '',
        },
    })
    
    // Upload blog picture locally if present
    if (blogDocFile) {
        const blogPath = `blogs/${blog.id}/blog.png`;
        const blogFilePicDestination = path.join('uploads', blogPath);

        fs.mkdirSync(path.dirname(blogFilePicDestination), { recursive: true });
        fs.writeFileSync(blogFilePicDestination, fs.readFileSync(blogDocFile.path));

    }

    const blogPic = `https://jaleros.com/uploads/blogs/${blog.id}/blog.png`;

    const updatedBlog = await prisma.blog.update({
        where: { id: blog.id },
        data: { pic: blogPic },
    });


    res.status(201).json(updatedBlog);

}

//================================================ get all blogs ===========================================//

export const getAllBlogs = async(req, res, next) => {
    let { page, limit } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

        const blogs = await prisma.blog.findMany({
            skip: (page - 1) * limit,  // For pagination
            take: parseInt(limit),  // Limit number of results
        });
        let total = blogs.length
        res.json({
            message: 'Blogs fetched successfully',
            items: blogs,
            page,
            limit,
            total
        });

}

//================================================ get single blog by id ===========================================//

export const getBlogById = async(req, res, next) => {

        let { id } = req.params;

        id = parseInt(id);

        const blog = await prisma.blog.findUnique({
            where: { id },
        });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);

}

//================================================ update blog by id ===========================================//

export const updateBlogById = async(req, res, next) => {


        let { id } = req.params;
        const { title, content } = req.body;

        id = parseInt(id);

        const blogDocFile = req.file
        
        // Update blog in database
        let blogPic = '';
        
        // Upload blog picture locally if present
        if (blogDocFile) {
            const blogPath = `blogs/${id}/blog.png`;
            const profilePicDestination = path.join('uploads', blogPath);
            fs.mkdirSync(path.dirname(profilePicDestination), { recursive: true });
            fs.writeFileSync(profilePicDestination, fs.readFileSync(blogDocFile.path));
            blogPic = `https://jaleros.com/uploads/blogs/${id}/blog.png`;
        }

        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: { title, content , pic : blogPic },
        });

        res.json(updatedBlog);

}

//================================================ delete blog by id ===========================================//

export const deleteBlogById = async(req, res, next) => {


        let { id } = req.params;
        id = parseInt(id);

        const deletedBlog = await prisma.blog.delete({
            where: { id },
        });

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        // Delete blog picture locally if present
        let directoryPath = path.join(`uploads`, `blogs/${id}`)

        if (fs.existsSync(directoryPath)) {
            fs.rmSync(directoryPath, { recursive: true, force: true }); // Delete the directory and all its contents
        }

        

        res.status(200).json({message: 'Blog deleted successfully'});

}