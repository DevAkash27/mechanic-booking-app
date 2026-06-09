# Database Schema

## Collections Overview

### 1. Users
Stores customer information and booking history.

\`\`\`javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  phone: String (unique),
  email: String (unique, optional),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  vehicles: [ObjectId], // References to Vehicle collection
  bookings: [ObjectId], // References to Booking collection
  profileImage: String,
  isPhoneVerified: Boolean,
  totalSpent: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### 2. Vehicles
Stores vehicle information for each user.

\`\`\`javascript
{
  _id: ObjectId,
  user: ObjectId, // Reference to User
  brand: String,
  model: String,
  year: Number,
  fuelType: Enum["Petrol", "Diesel", "CNG", "Electric", "Hybrid"],
  registrationNumber: String,
  color: String,
  mileage: Number,
  lastServiceDate: Date,
  createdAt: Date
}
\`\`\`

### 3. Services
Maintains service catalog.

\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  category: Enum["Maintenance", "Repair", "Inspection", "Accessories"],
  basePrice: Number,
  duration: Number, // in minutes
  image: String,
  packages: [
    {
      name: String,
      description: String,
      price: Number,
      includes: [String]
    }
  ],
  isActive: Boolean,
  createdAt: Date
}
\`\`\`

### 4. Bookings
Core booking records.

\`\`\`javascript
{
  _id: ObjectId,
  bookingId: String (unique),
  user: ObjectId, // Reference to User
  vehicle: ObjectId, // Reference to Vehicle
  service: ObjectId, // Reference to Service
  selectedPackage: String,
  scheduledDate: Date,
  timeSlot: {
    startTime: String,
    endTime: String
  },
  serviceLocation: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  totalAmount: Number,
  discount: Number,
  status: Enum["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
  paymentStatus: Enum["Pending", "Completed", "Failed"],
  paymentId: String,
  invoiceUrl: String,
  notes: String,
  rating: Number (1-5),
  feedback: String,
  createdAt: Date,
  completedAt: Date
}
\`\`\`

### 5. Slots
Available time slots for bookings.

\`\`\`javascript
{
  _id: ObjectId,
  date: Date,
  startTime: String,
  endTime: String,
  isAvailable: Boolean,
  booking: ObjectId, // Reference to Booking (null if available)
  createdAt: Date
}
\`\`\`

### 6. Payments
Payment transaction records.

\`\`\`javascript
{
  _id: ObjectId,
  booking: ObjectId, // Reference to Booking
  user: ObjectId, // Reference to User
  amount: Number,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  paymentMethod: Enum["UPI", "Card", "NetBanking", "Wallet"],
  status: Enum["Pending", "Success", "Failed"],
  transactionDate: Date,
  failureReason: String
}
\`\`\`

## Indexes

\`\`\`javascript
// Users
db.users.createIndex({ phone: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })

// Bookings
db.bookings.createIndex({ user: 1 })
db.bookings.createIndex({ bookingId: 1 }, { unique: true })
db.bookings.createIndex({ status: 1 })
db.bookings.createIndex({ scheduledDate: 1 })

// Slots
db.slots.createIndex({ date: 1 })
db.slots.createIndex({ isAvailable: 1 })
\`\`\`
