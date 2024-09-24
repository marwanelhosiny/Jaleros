import prisma from "../../../DB/prisma.js";
import { cloudinaryConnection } from "../../utils/cloudinary.js";
import { extractPublicId } from "../../utils/cloudinary.js";
import path from 'path';
import fs from 'fs';
import generateUniequeString from "../../utils/generateUniqueString.js";
import { clearFolder } from "../../utils/cleanupFolder.js";
import { promisify } from 'util';






//============================================== create card api ===========================================//

const generateFileUrl = (req, filePath) => {
    return `${req.protocol}://${req.get('host')}/uploads/${filePath}`;
};

export const createCard = async (req, res, next) => {
        // Destructure input fields from the request body
        const { name, country, city, location, about, phoneNumber, email } = req.body;
        const { facebook, instagram, youtube, X, tikTok, snapchat, linkedin, telegram, reddit, pinterest, custom1, custom2, custom3 } = req.body;
        const { id: userId } = req.authUser;

        // Handle file uploads
        const profilePicDocFile = req.files['profilePic'] ? req.files['profilePic'][0] : null;
        const coverPicDocFile = req.files['coverPic'] ? req.files['coverPic'][0] : null;
        const cvDocFile = req.files['cv'] ? req.files['cv'][0] : null;
        const galleryDocFiles = req.files['gallery'] || [];

        // Create a new card in the database
        const card = await prisma.card.create({
            data: {
                userId,
                name,
                email,
                country,
                city,
                location,
                about,
                phoneNumber,
                rate: 0,
                profilePic: '',
                coverPic: '',
                gallery: [],
            },
        });

        if (!card) {
            return res.status(500).json({ message: 'Failed to create card' });
        }

        // Create associated social card
        const social = await prisma.social.create({
            data: {
                cardId: card.id,
                facebook,
                instagram,
                youtube,
                X,
                tikTok,
                snapchat,
                linkedin,
                telegram,
                reddit,
                pinterest,
                custom1,
                custom2,
                custom3,
            },
        });

        if (!social) {
            return res.status(500).json({ message: 'Failed to create social card' });
        }

        
        // Upload profile picture locally if present
        let profilePicUrl = '';
        if (profilePicDocFile) {
            const profilePicPath = `users/${userId}/cards/${card.id}/ProfilePic.png`;
            const profilePicDestination = path.join('uploads', profilePicPath);
            
            fs.mkdirSync(path.dirname(profilePicDestination), { recursive: true });
            fs.writeFileSync(profilePicDestination, fs.readFileSync(profilePicDocFile.path));

            profilePicUrl = generateFileUrl(req, profilePicPath);
        }

        // Upload cover picture locally if present
        let coverPicUrl = '';
        if (coverPicDocFile) {
            const coverPicPath = `users/${userId}/cards/${card.id}/CoverPic.png`;
            const coverPicDestination = path.join('uploads', coverPicPath);

            fs.mkdirSync(path.dirname(coverPicDestination), { recursive: true });
            fs.writeFileSync(coverPicDestination, fs.readFileSync(coverPicDocFile.path));

            coverPicUrl = generateFileUrl(req, coverPicPath);
        }

        // Upload CV locally if present
        let cvUrl = '';
        if (cvDocFile) {
            const cvPath = `users/${userId}/cards/${card.id}/CV.pdf`;
            const cvDestination = path.join('uploads', cvPath);

            fs.mkdirSync(path.dirname(cvDestination), { recursive: true });
            fs.writeFileSync(cvDestination, fs.readFileSync(cvDocFile.path));

            cvUrl = generateFileUrl(req, cvPath);
        }

        // Upload gallery pictures locally if present
        const galleryPicsUrls = [];
        if (galleryDocFiles.length > 0) {
            for (const file of galleryDocFiles) {
                const galleryPicPath = `users/${userId}/cards/${card.id}/Gallery/${generateUniequeString(3)}.png`;
                const galleryPicDestination = path.join('uploads', galleryPicPath);

                fs.mkdirSync(path.dirname(galleryPicDestination), { recursive: true });
                fs.writeFileSync(galleryPicDestination, fs.readFileSync(file.path));

                const galleryPicUrl = generateFileUrl(req, galleryPicPath);
                galleryPicsUrls.push(galleryPicUrl);
            }
        }

        // Update card with uploaded file URLs
        const updatedCard = await prisma.card.update({
            where: { id: card.id },
            data: {
                profilePic: profilePicUrl,
                coverPic: coverPicUrl,
                cv: cvUrl,
                gallery: galleryPicsUrls,
            },
            include: {
                social: true, // Include social data in the response
            },
        });



         clearFolder(path.join('uploads', 'general'));

        // Send response with the full card details, including social data
        res.status(201).json({
            message: 'Card created successfully',
            card: updatedCard
        });

};


//============================================== update card ==========================================//
export const updateCard = async (req, res, next) => {

    // Destructuring entries from the request body
        const { name, country, city, location, about, phoneNumber, email, removeGalleryPics = [] } = req.body;
        const { facebook, instagram, youtube, X, tikTok, snapchat, linkedin, telegram, reddit, pinterest, custom1, custom2, custom3 } = req.body;
        const { id: userId } = req.authUser;
        const { cardId } = req.params;

        // Handle file uploads
        const profilePicDocFile = req.files['profilePic'] ? req.files['profilePic'][0] : null;
        const coverPicDocFile = req.files['coverPic'] ? req.files['coverPic'][0] : null;
        const cvDocFile = req.files['cv'] ? req.files['cv'][0] : null;
        const galleryDocFiles = req.files['gallery'] || [];

        // Find the card
        const card = await prisma.card.findUnique({ where: { id: parseInt(cardId), userId } });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Remove specific gallery images if requested
        let updatedGallery = [...card.gallery];
        if (removeGalleryPics.length > 0) {
            updatedGallery = updatedGallery.filter((url) => !removeGalleryPics.includes(url));

            if (updatedGallery.length !== card.gallery.length) {
                await prisma.card.update({
                    where: { id: card.id },
                    data: { gallery: updatedGallery }
                });
            }

            // Remove local files
            await Promise.all(
                removeGalleryPics.map(async (imageUrl) => {
                    const filePath = path.join('uploads', 'users', userId.toString(), 'cards', card.id.toString(), 'Gallery', path.basename(imageUrl));
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                })
            );
        }

        // Handle profile picture
        let profilePicUrl = card.profilePic;
        if (profilePicDocFile) {
            const profilePicPath = `users/${userId}/cards/${card.id}/ProfilePic.png`;
            const profilePicDestination = path.join('uploads', profilePicPath);

            fs.mkdirSync(path.dirname(profilePicDestination), { recursive: true });
            fs.copyFileSync(profilePicDocFile.path, profilePicDestination);

            profilePicUrl = generateFileUrl(req, profilePicPath);
        }

        // Handle cover picture
        let coverPicUrl = card.coverPic;
        if (coverPicDocFile) {
            const coverPicPath = `users/${userId}/cards/${card.id}/CoverPic.png`;
            const coverPicDestination = path.join('uploads', coverPicPath);

            fs.mkdirSync(path.dirname(coverPicDestination), { recursive: true });
            fs.copyFileSync(coverPicDocFile.path, coverPicDestination);

            coverPicUrl = generateFileUrl(req, coverPicPath);
        }

        // Handle CV file
        let cvUrl = card.cv;
        if (cvDocFile) {
            const cvPath = `users/${userId}/cards/${card.id}/CV.pdf`;
            const cvDestination = path.join('uploads', cvPath);

            fs.mkdirSync(path.dirname(cvDestination), { recursive: true });
            fs.copyFileSync(cvDocFile.path, cvDestination);

            cvUrl = generateFileUrl(req, cvPath);
        }

        // Handle gallery pictures
        const galleryPicsUrls = [];
        if (galleryDocFiles.length > 0) {
            for (const file of galleryDocFiles) {
                const galleryPicPath = `users/${userId}/cards/${card.id}/Gallery/${generateUniequeString(3)}.png`;
                const galleryPicDestination = path.join('uploads', galleryPicPath);

                fs.mkdirSync(path.dirname(galleryPicDestination), { recursive: true });
                fs.copyFileSync(file.path, galleryPicDestination);

                const galleryPicUrl = generateFileUrl(req, galleryPicPath);
                galleryPicsUrls.push(galleryPicUrl);
            }

            updatedGallery = [...updatedGallery, ...galleryPicsUrls];
            await prisma.card.update({
                where: { id: card.id },
                data: { gallery: updatedGallery }
            });
        }

        // Update the rest of the card data if provided
        const updateData = {
            name: name || card.name,
            email: email || card.email,
            country: country || card.country,
            city: city || card.city,
            location: location || card.location,
            about: about || card.about,
            phoneNumber: phoneNumber || card.phoneNumber,
            profilePic: profilePicUrl,
            coverPic: coverPicUrl,
            cv: cvUrl,
            updatedAt: new Date(),
        };

        const updatedCard = await prisma.card.update({
            where: { id: card.id },
            data: updateData,
        });

        const updatedSocial = await prisma.social.update({
            where: { cardId: card.id },
            data: {
                facebook,
                instagram,
                youtube,
                X,
                tikTok,
                snapchat,
                linkedin,
                telegram,
                reddit,
                pinterest,
                custom1,
                custom2,
                custom3,
            }
        });

        res.status(200).json({
            message: 'Card updated successfully',
            card: {
                id: updatedCard.id,
                userId: updatedCard.userId,
                name: updatedCard.name,
                email: updatedCard.email,
                phoneNumber: updatedCard.phoneNumber,
                country: updatedCard.country,
                city: updatedCard.city,
                location: updatedCard.location,
                about: updatedCard.about,
                profilePic: updatedCard.profilePic,
                coverPic: updatedCard.coverPic,
                gallery: updatedCard.gallery,
                cv: cvUrl,
                updatedAt: updatedCard.updatedAt,
                social: updatedSocial
            }
        });


};




//============================================== delete card ==========================================//

export const deleteCard = async (req, res, next) => {
        const { id: userId } = req.authUser;
        const { cardId } = req.params;

        // Find the card
        const card = await prisma.card.findUnique({ where: { id: parseInt(cardId), userId } });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Delete related social data
        await prisma.social.delete({ where: { cardId: parseInt(cardId) } });

        // Delete local media files
        const mediaPaths = [
            card.profilePic,
            card.coverPic,
            card.cv,
            ...card.gallery
        ];

        // Function to delete a file
        const deleteFile = (filePath) => {
            const fullPath = path.join('uploads', filePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        };

        // Delete each media file
        mediaPaths.forEach(file => {
            const filePath = file.replace(`${req.protocol}://${req.get('host')}/`, '');
            deleteFile(filePath);
        });

        // Delete the card
        await prisma.card.delete({ where: { id: parseInt(cardId) } });

        // Optionally, remove the empty directories if needed
        const cardDirectory = path.join('uploads', 'users', userId.toString(), 'cards', cardId.toString());
        if (fs.existsSync(cardDirectory)) {
            fs.rmdirSync(cardDirectory, { recursive: true });
        }

        res.status(200).json({ message: 'Card deleted successfully', card });

};

//================================================ get cards ========================================//

export const getCards = async (req, res, next) => {

        const { page = 1, limit = 6 } = req.query; // Default pagination values
        const { name, country, city } = req.body;

        console.log(country);

        // find cards with case-insensitive filtering for country, city, and name, sorted by rate
        const cards = await prisma.card.findMany({
            where: {
                country: {
                    contains: country,  // Case-insensitive partial match for country
                    mode: 'insensitive',
                },
                city: {
                    contains: city,  // Case-insensitive partial match for city
                    mode: 'insensitive',
                },
                name: {
                    contains: name,  // Case-insensitive partial match for name
                    mode: 'insensitive',
                },
            },
            include: {
                social: true,  // Include the related 'social' data
            },
            orderBy: {
                rate: 'desc',  // Sort by rate in descending order (higher rates first)
            },
            skip: (page - 1) * limit,  // For pagination
            take: parseInt(limit),  // Limit number of results
        });

        res.status(200).json({
            message: 'Cards fetched successfully',
            cards,
            page,
            limit,
        });

};
//================================================ get sponsored cards ========================================//

export const sponsoredCards = async (req, res, next) => {
    

    // find cards
    const cards = await prisma.card.findMany(
        {
            where:{sponsored: true},
            include:{
                social: true
            }
    }
    );
    
    res.status(200).json({ message: 'Cards fetched successfully', cards });

}


//================================================ get one card =================================================//

export const getCardById = async (req, res, next) => {
    
    const { username } = req.params

    //find user
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // find card
    const card = await prisma.card.findUnique({ where: { userId : user.id }  , include:{social:true}});
    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }
    
    res.status(200).json({ message: 'Card fetched successfully', card });

}

//================================================ getMyCards ==========================================//

export const getMyCards = async (req, res, next) => {
    
    const { id :userId } = req.authUser

    // find cards
    const cards = await prisma.card.findMany({ where: { userId } , include:{social:true }});
    
    res.status(200).json({ message: 'Cards fetched successfully', cards });

}

