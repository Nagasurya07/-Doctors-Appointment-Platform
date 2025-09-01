# API Documentation

This document describes the API endpoints and server actions available in the Doctors Appointment Platform.

## Authentication

All API endpoints use Clerk for authentication. Include the user session in requests.

### User Types
- **Patient**: Can book appointments and view their bookings
- **Doctor**: Can manage availability, view appointments, and earnings
- **Admin**: Can verify doctors and manage platform

## Server Actions

### Authentication Actions (`lib/checkUser.js`)

#### `getCurrentUser()`
Gets the current authenticated user with profile information.

**Returns:**
```javascript
{
  id: string,
  email: string,
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN',
  profile: UserProfile
}
```

### Patient Actions (`actions/patient.js`)

#### `updatePatientProfile(data)`
Updates patient profile information.

**Parameters:**
```javascript
{
  firstName: string,
  lastName: string,
  phone: string,
  dateOfBirth: Date,
  address: string
}
```

### Doctor Actions (`actions/doctor.js`)

#### `getDoctorProfile(doctorId)`
Retrieves complete doctor profile.

**Parameters:**
- `doctorId`: string

**Returns:**
```javascript
{
  id: string,
  specialization: string,
  experience: number,
  qualifications: string,
  consultationFee: number,
  availability: Availability[],
  isVerified: boolean
}
```

#### `updateDoctorProfile(data)`
Updates doctor profile information.

#### `setAvailability(availabilityData)`
Sets doctor's available time slots.

**Parameters:**
```javascript
{
  dayOfWeek: number, // 0-6 (Sunday-Saturday)
  startTime: string, // "HH:MM"
  endTime: string,   // "HH:MM"
  isAvailable: boolean
}
```

### Appointment Actions (`actions/appointments.js`)

#### `getAvailableTimeSlots(doctorId, date)`
Gets available appointment slots for a doctor on a specific date.

**Parameters:**
- `doctorId`: string
- `date`: Date

**Returns:**
```javascript
[
  {
    time: string,
    isBooked: boolean
  }
]
```

#### `bookAppointment(appointmentData)`
Books a new appointment.

**Parameters:**
```javascript
{
  doctorId: string,
  patientId: string,
  appointmentDate: Date,
  appointmentTime: string,
  reason: string,
  consultationType: 'VIDEO' | 'PHONE'
}
```

#### `getPatientAppointments(patientId)`
Gets all appointments for a patient.

#### `getDoctorAppointments(doctorId)`
Gets all appointments for a doctor.

#### `updateAppointmentStatus(appointmentId, status)`
Updates appointment status.

**Parameters:**
- `appointmentId`: string
- `status`: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

### Admin Actions (`actions/admin.js`)

#### `getPendingDoctors()`
Gets list of doctors pending verification.

**Returns:**
```javascript
[
  {
    id: string,
    name: string,
    email: string,
    specialization: string,
    qualifications: string,
    submittedAt: Date
  }
]
```

#### `verifyDoctor(doctorId, isApproved)`
Approves or rejects doctor verification.

**Parameters:**
- `doctorId`: string
- `isApproved`: boolean

#### `getPendingPayouts()`
Gets pending payout requests from doctors.

#### `processPayouts(payoutIds)`
Processes multiple payout requests.

### Credits Actions (`actions/credits.js`)

#### `purchaseCredits(amount)`
Allows patients to purchase consultation credits.

#### `getCreditsBalance(userId)`
Gets current credits balance for a user.

### Payout Actions (`actions/payout.js`)

#### `requestPayout(amount)`
Doctor requests payout of earnings.

#### `getPayoutHistory(doctorId)`
Gets payout history for a doctor.

## Database Schema

### User
```prisma
model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  role      Role     @default(PATIENT)
  firstName String?
  lastName  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Doctor
```prisma
model Doctor {
  id               String   @id @default(cuid())
  userId           String   @unique
  specialization   String
  experience       Int
  qualifications   String
  consultationFee  Float
  isVerified       Boolean  @default(false)
  licenseNumber    String?
  availabilities   Availability[]
  appointments     Appointment[]
}
```

### Appointment
```prisma
model Appointment {
  id              String   @id @default(cuid())
  doctorId        String
  patientId       String
  appointmentDate DateTime
  appointmentTime String
  status          AppointmentStatus @default(SCHEDULED)
  reason          String?
  consultationType ConsultationType
  createdAt       DateTime @default(now())
}
```

## Error Handling

All server actions return either:
- Success: `{ success: true, data: any }`
- Error: `{ success: false, error: string }`

### Common Error Codes
- `UNAUTHORIZED`: User not authenticated
- `FORBIDDEN`: User lacks permission
- `NOT_FOUND`: Resource doesn't exist
- `VALIDATION_ERROR`: Invalid input data
- `DATABASE_ERROR`: Database operation failed

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests/minute
- Booking endpoints: 10 requests/minute
- General endpoints: 100 requests/minute

## Webhooks

### Clerk Webhooks
The platform handles Clerk webhooks for:
- User creation
- User updates
- User deletion

Configure webhook endpoint: `/api/webhooks/clerk`

## Video Calling Integration

### Vonage Integration
Video calls use Vonage Video API:

1. Generate session token for appointment
2. Create video room
3. Share session with doctor and patient
4. Handle call events (start, end, disconnect)

### Video Call Endpoints
- `POST /api/video/create-session` - Create video session
- `POST /api/video/generate-token` - Generate user token
- `GET /api/video/session/:id` - Get session details

## Security Considerations

- All endpoints require authentication
- Role-based access control implemented
- Input validation on all parameters
- SQL injection prevention via Prisma
- XSS protection through sanitization

## Testing

Use the following test endpoints in development:

```bash
# Health check
GET /api/health

# Test authentication
GET /api/auth/test

# Database connection test
GET /api/db/test
```
