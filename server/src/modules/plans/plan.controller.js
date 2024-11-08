import prisma from "../../../DB/prisma.js"
import path from 'path';
import fs from 'fs';
import { connect } from "http2";










//============================================== create plan  ==========================//
export const createPlan = async(req, res , next) =>{

    const { name, description, price } = req.body;

    const plan = await prisma.plan.create({data: {plan:name, description, price}})
    if(!plan){
        return res.status(400).json({ message: "Failed to create plan"})
    }
    res.status(201).json(plan)
}

//============================================== update plan  ==========================//

export const updatePlan = async(req, res , next) =>{

    const { id } = req.params;
    const {  description, price } = req.body;

    const plan = await prisma.plan.update({
        where: { id:parseInt(id)  },
        data: {  description, price }
    })
    if(!plan){
        return res.status(404).json({ message: "Plan not found"})
    }
    res.status(200).json(plan)
}

//============================================== delete plan  ==========================//

export const deletePlan = async(req, res , next) =>{

    const { id } = req.params;

    const plan = await prisma.plan.delete({
        where: { id: parseInt(id) }
    })
    if(!plan){
        return res.status(404).json({ message: "Plan not found"})
    }
    res.status(200).json({ message: "Plan deleted"})
}

//============================================== get all plans  ==========================//

export const getAllPlans = async(req, res , next) =>{

    const plans = await prisma.plan.findMany()
    res.status(200).json(plans)
}

//============================================== get plan by id  ==========================//

export const getPlanById = async(req, res , next) =>{

    const { id } = req.params;

    const plan = await prisma.plan.findUnique({
        where: { id: parseInt(id) }
    })
    if(!plan){
        return res.status(404).json({ message: "Plan not found"})
    }
    res.status(200).json(plan)
}


//============================================ subscribe plan ==============================//

export const subscribePlan = async(req, res , next) =>{

    let { userId, planId , promo } = req.body;

    if(promo){
        // Validate promo code
        const getpromoCode = await prisma.promoCode.findFirst({
            where: { code: promo }
        })
        if(!getpromoCode || getpromoCode.isActive==false){
            return res.status(400).json({ message: "Invalid or expired promo code"})
        }
        const promo = await prisma.promoCode.update({
            where: { code: promo },
            data: { timesUsed: promoCode.timesUsed+1 }
        })
        
        if (promo.timesUsed >= promo.maxUsage ){
            await prisma.promoCode.update({
                where: { code: promo },
                data: { isActive: false }
            })
        }
    }

    const paymentDocFile = req.file
    if(!paymentDocFile){
        return res.status(400).json({ message: "Payment document is required"})
    }

    userId = parseInt(userId)
    planId = parseInt(planId)


    // Check if user already has a subscription to the same plan
    const existingSubscription = await prisma.subscription.findFirst({
        where: {
            user: { id: userId },
            plan: { id: planId }
        }
    })
    if(existingSubscription){
        return res.status(400).json({ message: "User already has a subscription to this plan"})
    }

    const subscription = await prisma.subscription.create({
        data: {
            user: { connect: { id: userId } },
            plan: { connect: { id: planId } },
            subscribeEnd: new Date('2025-10-01'), // Set subscription end date
            subscriptionStatus: 'pending',
            promocode: promo ? { connect: { code: promo } } : undefined // Use lowercase "promocode" here
        },
        include: {
            user: true,
            plan: true
        }
    });
    if(!subscription){
        return res.status(400).json({ message: "Failed to subscribe plan"})
    }

    // Upload payment  locally if present
        const paymentPath = `payments/${subscription.id}/payment.png`;
        const paymentPicDestination = path.join('uploads', paymentPath);

        fs.mkdirSync(path.dirname(paymentPicDestination), { recursive: true });
        fs.writeFileSync(paymentPicDestination, fs.readFileSync(paymentDocFile.path));

    res.status(201).json(subscription)
}

//============================================ accept or reject subscription =================================//

export const acceptOrRejectSubscription = async(req, res , next) =>{

    const { id, accepted } = req.body;

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    const subscription = await prisma.subscription.update({
        where: { id },
        data: { subscriptionStatus: accepted ? 'paid' : 'failed', subscribeEnd: futureDate },
        include: {
        plan: true   // Include full plan details
        }
    })
    if(!subscription){
        return res.status(404).json({ message: "Subscription not found"})
    }
    if(accepted){
        const updateUser = await prisma.user.update({
            where: { id: subscription.userId },
            data: { plan: subscription.plan.plan }
            
    })
    }
    if(subscription.plan.plan == 'professional'){
        const updateUser = await prisma.card.update({
            where: { userId: subscription.userId },
            data: { sponsored: true }
    })
}
    let directoryPath = path.join( `uploads` , `payments/${id}` )

    if (fs.existsSync(directoryPath)) {
        fs.rmSync(directoryPath, { recursive: true, force: true }); // Delete the directory and all its contents
    }
    res.status(200).json(subscription)
}

//===============================================get subscription requests ===================================//

export const getSubscriptionRequests = async(req, res , next) =>{


    const subscriptions = await prisma.subscription.findMany({
        where: {
            subscriptionStatus: 'pending'
        },
        include: {
        user: true,  // Include full user details
        plan: true   // Include full plan details
    }
    })

    if(!subscriptions.length){
        return res.status(404).json({ message: "No subscription requests found"})
    }

    let newSubscriptions = subscriptions.map((subscription)=>{
        const payment = `https://jaleros.com/uploads/payments/${subscription.id}/payment.png`
        return {...subscription, payment }
    })

    res.status(200).json(newSubscriptions)

}

//============================================ get subscription by user id ==============================//

export const getSubscriptionById = async(req, res , next) =>{

    const { subscriptionId } = req.params;

    const subscription = await prisma.subscription.findUnique({
        where: {
            id:  parseInt(subscriptionId) 
        }
    })
    if(!subscription){
        return res.status(404).json({ message: "No subscriptions found for this user"})
    }
    const payment = `https://jaleros.com/uploads/payments/${subscription.id}/payment.png`
    res.status(200).json({ subscription, payment })

}
