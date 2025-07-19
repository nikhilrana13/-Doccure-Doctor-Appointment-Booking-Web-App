🩺 Doccure – Doctor Appointment Booking App

Doccure is a full-stack doctor appointment booking web application where patients can book consultations and doctors can manage their availability, appointments, and conduct real-time video calls. The platform is built using React, Redux, Node.js, MongoDB, and styled with ShadCN UI. It features secure authentication, image uploads, role-based access, and video consultation using Jitsi Meet.

🚀 Tech Stack
Frontend: React, Redux Toolkit, React Router, ShadCN UI
Backend: Node.js, Express.js, MongoDB
Video Call: Jitsi Meet API
Image Uploads: Multer + Cloudinary
Authentication: JWT with Protected Routes

✨ Features

👨‍⚕️ For Doctors:

Create & update profile (with Cloudinary image upload)

Set and manage available appointment slots

View patient bookings and update appointment status (confirm, cancel, etc.)

Start secure Jitsi video consultations

Role-based access control (only doctors can access doctor dashboard)

👤 For Patients:

Browse list of doctors and book appointments

See appointment status (pending, confirmed, cancelled)

Join video call only after the doctor confirms

View personal appointment history

JWT-based login and protected patient dashboard

💡 General:

Role-based Protected Routes (Doctor / Patient)

Responsive and modern UI with ShadCN components

Dark Mode / Light Mode toggle with local storage support

Real-time updates with toast notifications

Secure data handling with JWT, Multer, and Cloudinary

Organized folder structure with modular controllers, models, and routes

📹 Video Call Flow

Doctor confirms the appointment.

Patient sees a "Join Video Call" button in their appointment list.

Both join a secure Jitsi room for the consultation.

🔐 Protected Routes

Pages are secured using role-based JWT authorization.

Unauthorized access is prevented on both client and server sides.

🖼 Image Uploads

Handled using Multer (backend) and Cloudinary (storage).

Doctors can upload profile pictures easily during profile creation/edit.

📈 Possible Future Improvements

Payment integration (Stripe / Razorpay)

Email/SMS notifications

Chat feature between doctor and patient

Ratings & Reviews system for doctors

Admin dashboard to manage users and reports
Project live link :[https://doccure-doctor-appointment-booking-web-3a4g.onrender.com]
🧑‍💻 Made with ❤️ by Nikhil Rana

