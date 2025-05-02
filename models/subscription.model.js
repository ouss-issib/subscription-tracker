import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, "Subscription Price is required"],
        min: [0, "Price cannot be negative"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD",
    },
    frequency: {
        type: String,
        enum: ["daily", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["entertainment", "utilities", "food", "transportation", "other"],
        required: [true, "Subscription Category is required"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment Method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "expired", "cancelled"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Start Date is required"],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Start date cannot be in the future",
        }
    },
    renewalDate: {
        type: Date,
        required: [true, "Renewal Date is required"],
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: "Renewal date cannot be before start date",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true
    }

}, { timestamps: true });


//Auto-calculate renewal date if missing
subscriptionSchema.pre("save", (next) => {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto update the status of the subscription

    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
    next();
})


const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;