import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        // Create subscription logic here
        // For example, save to database
        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}


export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({}).populate('user', 'name email');
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
}

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id).populate('user', 'name email');
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}


export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'name email');
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}


export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id).populate('user', 'name email');
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}
export const getUserSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ user: req.params.id }).populate('user', 'name email');
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true }).populate('user', 'name email');
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ renewalDate: { $gte: new Date() } }).populate('user', 'name email');
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
}