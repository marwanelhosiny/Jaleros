import prisma from "../../../DB/prisma.js";
import path from 'path';
import fs from 'fs';
import generateUniequeString from "../../utils/generateUniqueString.js";
import { clearFolder } from "../../utils/cleanupFolder.js";






//============================================== create card api ===========================================//

const generateFileUrl = (req, filePath) => {
    return `${req.protocol}://${req.get('host')}/uploads/${filePath}`;
};

export const createCard = async (req, res, next) => {
        // Destructure input fields from the request body
        const { name, country, city, location, about, phoneNumber, email ,role ,category , customFields} = req.body;
        const { facebook, instagram, youtube, X, tikTok, snapchat, linkedin, telegram, reddit, pinterest,storeLink, custom1, custom2, custom3 } = req.body;
        const { id: userId , username } = req.authUser;

        // Handle file uploads
        const profilePicDocFile = req.files['profilePic'] ? req.files['profilePic'][0] : null;
        const coverPicDocFile = req.files['coverPic'] ? req.files['coverPic'][0] : null;
        const cvDocFile = req.files['cv'] ? req.files['cv'][0] : null;
        const galleryDocFiles = req.files['gallery'] || [];

        // Create a new card in the database
        const card = await prisma.card.create({
            data: {
                username,
                userId,
                name,
                email,
                country,
                city,
                location,
                about,
                role,
                category,
                phoneNumber,
                rate: 0,
                profilePic: '',
                coverPic: '',
                gallery: [],
                customFields
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
                storeLink,
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
        const { name, country, city, location, about, phoneNumber, email ,role , category , customFields } = req.body;
        const { facebook, instagram, youtube, X, tikTok, snapchat, linkedin, telegram, reddit, pinterest,storeLink, custom1, custom2, custom3 } = req.body;
        const { id: userId , username } = req.authUser;
        let { removeGalleryPics } = req.body;
        removeGalleryPics= JSON.parse(removeGalleryPics)

        // Handle file uploads
        const profilePicDocFile = req.files['profilePic'] ? req.files['profilePic'][0] : null;
        const coverPicDocFile = req.files['coverPic'] ? req.files['coverPic'][0] : null;
        const cvDocFile = req.files['cv'] ? req.files['cv'][0] : null;
        const galleryDocFiles = req.files['gallery'] || [];

        // Find the card
        const card = await prisma.card.findFirst({ where: { username } });
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
            role: role || card.role,
            category: category || card.category,
            phoneNumber: phoneNumber || card.phoneNumber,
            customFields: customFields || card.customFields,
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
                storeLink,
                custom1,
                custom2,
                custom3,
            }
        });

        res.status(200).json({
            message: 'Card updated successfully',
            card: {
                id: updatedCard.id,
                username: updatedCard.username,
                userId: updatedCard.userId,
                name: updatedCard.name,
                email: updatedCard.email,
                phoneNumber: updatedCard.phoneNumber,
                country: updatedCard.country,
                city: updatedCard.city,
                location: updatedCard.location,
                about: updatedCard.about,
                role: updatedCard.role,
                category: updatedCard.category,
                profilePic: updatedCard.profilePic,
                coverPic: updatedCard.coverPic,
                gallery: updatedCard.gallery,
                customFields: updatedCard.customFields,
                cv: updatedCard.cv,
                updatedAt: updatedCard.updatedAt,
                social: updatedSocial
            }
        });


};




//============================================== delete card ==========================================//


export const deleteCard = async (req, res, next) => {
    const { id: userId, username } = req.authUser; // Get user info from auth
    const { cardId } = req.params; // Get cardId from the request parameters

    // Find the card
    const card = await prisma.card.findUnique({ where: { id: parseInt(cardId), username } });
    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }

    // Delete related social data
    await prisma.social.deleteMany({ where: { cardId: parseInt(cardId) } }); // Use deleteMany for safety

    // Define the card directory path
    const cardDirectory = path.join('uploads', 'users', userId.toString(), 'cards', cardId.toString());

    // Function to delete the directory and its contents
    const deleteDirectory = (directoryPath) => {
        if (fs.existsSync(directoryPath)) {
            fs.rmSync(directoryPath, { recursive: true, force: true }); // Delete the directory and all its contents
        }
    };

    // Delete the entire card directory
    deleteDirectory(cardDirectory);

    // Delete the card from the database
    await prisma.card.delete({ where: { id: parseInt(cardId) } });

    res.status(200).json({ message: 'Card deleted successfully', card });
};

//================================================ get cards ========================================//

export const getCards = async (req, res, next) => {

        const { page = 1, limit = 6 } = req.query; // Default pagination values
        const { name, country, city , category } = req.body;


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
                category: {
                    contains: category,  // Filter only for web development category
                    mode: 'insensitive',
                }
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
    // Extract and attempt to convert authenticatedId to an integer
    let authenticatedId = req.query.authenticatedId ? parseInt(req.query.authenticatedId) : null;

    // If authenticatedId is not a valid integer, set it to null
    if (!Number.isInteger(authenticatedId)) {
        authenticatedId = null;
    }

    // Find sponsored cards
    const cards = await prisma.card.findMany({
        where: { sponsored: true },
        include: { social: true }
    });

    // Prepare an array to store cards with follower and following counts, plus the isFollowed flag
    const cardsWithCounts = await Promise.all(cards.map(async (card) => {
        // Get user info using the username in the card
        const user = await prisma.user.findUnique({ where: { username: card.username } });
        if (!user) {
            // If user not found, return the card without follower/following counts and isFollowed as false
            return { ...card, Followers: 0, Following: 0, isFollowed: false };
        }

        // Get followers and following counts
        const [theFollowers, theFollowing] = await Promise.all([
            prisma.follow.findMany({ where: { followingId: user.id }, select: { followerId: true } }),
            prisma.follow.findMany({ where: { followerId: user.id }, select: { followingId: true } })
        ]);

        const Followers = theFollowers.length;
        const Following = theFollowing.length;

        // Check if the authenticated user is following the card's user, if authenticatedId is valid
        let isFollowed = false;
        if (authenticatedId) {
            const isFollowedByAuthenticatedUser = await prisma.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId: authenticatedId,
                        followingId: user.id,
                    }
                }
            });
            isFollowed = !!isFollowedByAuthenticatedUser; // True if the authenticated user is following
        }

        // Return card with followers, following counts, and isFollowed flag
        return {
            ...card,
            Followers,
            Following,
            isFollowed
        };
    }));

    res.status(200).json({ message: 'Cards fetched successfully', cards: cardsWithCounts });
};




//================================================ get one card =================================================//

export const getCardById = async (req, res, next) => {
    const { username } = req.params;
    let { authenticatedId } = req.query;

    // Convert authenticatedId to an integer and validate it
    authenticatedId = authenticatedId ? parseInt(authenticatedId) : null;
    if (!Number.isInteger(authenticatedId)) {
        authenticatedId = null;
    }

    // Get user info by username
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if authenticated user follows the target user
    let isFollowed = false;
    if (authenticatedId) {
        const followRecord = await prisma.follow.findFirst({
            where: { followerId: authenticatedId, followingId: user.id }
        });
        isFollowed = !!followRecord;  // True if the authenticated user is following
    }

    // Get followers and following counts
    const [theFollowers, theFollowing] = await Promise.all([
        prisma.follow.findMany({ where: { followingId: user.id }, select: { followerId: true } }),
        prisma.follow.findMany({ where: { followerId: user.id }, select: { followingId: true } })
    ]);

    const Followers = theFollowers.length;
    const Following = theFollowing.length;

    // Find card by username
    const card = await prisma.card.findUnique({ where: { username }, include: { social: true } });
    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }

    // Return card details along with followers, following, and isFollowed flag
    res.status(200).json({
        message: 'Card fetched successfully',
        card: { ...card, Followers, Following, isFollowed }
    });
};


//================================================ getMyCards ==========================================//

export const getMyCards = async (req, res, next) => {
    
    const { username , id } = req.authUser


    //get followers

    const [theFollowers, theFollowing] = await Promise.all([
        prisma.follow.findMany({ where: { followingId: id }, select: { followerId: true } }),
        prisma.follow.findMany({ where: { followerId: id }, select: { followingId: true } })
    ]);

    const Followers = theFollowers.length
    const Following = theFollowing.length


    // find cards
    const card = await prisma.card.findFirst({ where: { username } , include:{social:true }});
    
    res.status(200).json({ message: 'Cards fetched successfully', card:{...card , Followers , Following} });

}

//====================================== rate =============================//

export const rateCard = async (req, res, next) => {
    const { id: userId } = req.authUser;
    let { cardId } = req.params;
    let {  rate } = req.body;
    cardId = parseInt(cardId)
    rate = parseInt(rate)

    // check if card is exists
    const card = await prisma.card.findUnique({
        where: {
            id: cardId
        }
    })

    if (!card) {
        return res.status(404).json({ error: "Card not found" })
    }


    // check if the user has already rated

    const existingRate = await prisma.rate.findUnique({
        where: {
            userId_cardId: {
                userId,
                cardId,
            },
        }
    })

    if (existingRate) {
        const updateRate = await prisma.rate.update({
            where: {
                userId_cardId: {
                    userId,
                    cardId,
                },
            },
            data: {
                rate,
            },
        })
    }
    else {
        const rateCard = await prisma.rate.create({ data: { userId, cardId, rate } })
    }

    let ratedTimes = card.ratedTimes + 1
    let rating = (card.rate * card.ratedTimes + rate) / ratedTimes
    rating = parseFloat(rating.toFixed(1));

    const updateCard = await prisma.card.update({
        where: {
            id: cardId,
        },
        data: {
            ratedTimes,
            rate: rating
        }
    })

    return res.status(200).json({ message: "Rated" })
    
}