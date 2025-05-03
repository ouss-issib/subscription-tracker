import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 })
        if (decision.isDenied()) {
            // Handle denied request
            if (decision.reason.isRateLimit) return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
            if (decision.reason.isShield) return res.status(403).json({ message: "Access denied by shield." });
            if (decision.reason.isBot) return res.status(403).json({ message: "Access denied for bots." });
        }

        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Handle any errors that occur during the middleware execution
        console.error("Error in arcjet middleware:", error);
        next(error);
    }
}

export default arcjetMiddleware;