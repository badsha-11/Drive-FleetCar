# DriveFleet Car Rental Platform

A modern full-stack car rental platform where users can explore cars, view detailed information, book vehicles, manage their bookings, and maintain their own car listings with secure JWT-based authentication.

##  Live Website

**Live URL:** https://your-live-site.vercel.app

##  Repositories

* **Client Repository:** https://github.com/your-username/drivefleet-client
* **Server Repository:** https://github.com/your-username/drivefleet-server

---

##  Key Features

*  **Secure JWT Authentication** with HTTPOnly cookies and protected APIs.
*  **Explore Cars** with real-time search by car name using MongoDB `$regex`.
*  **Filter by Car Type** (SUV, Sedan, Luxury, Sports, etc.).
*  **Car Booking System** with booking history and booking management.
*  **Automatic Booking Count** using MongoDB `$inc` operator after each successful booking.
*  **My Added Cars Dashboard** to update and delete only the owner's cars.
*  **Modern Responsive UI** built with Next.js, Tailwind CSS, HeroUI, and Framer Motion animations.
*  **Protected Private Routes** that persist on page reload without redirecting authenticated users.

---

##  Tech Stack

### Frontend

* **Next.js 15**
* **React 19**
* **Tailwind CSS**
* **HeroUI**
* **Framer Motion**
* **React Hot Toast**
* **Lucide React**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **JOSE (JWT Verification)**
* **dotenv**
* **cors**

---

##  Project Structure

### Client

```
src/
├── app/
├── components/
├── lib/
├── provider/
└── styles/
```

### Server

```
server/
├── index.js
├── middleware/
├── routes/
└── .env
```

---

##  Environment Variables

### Client (`.env.local`)

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8080
```

### Server (`.env`)

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

---

##  Installation & Setup

### 1. Clone the repositories

```bash
git clone https://github.com/your-username/drivefleet-client.git
git clone https://github.com/your-username/drivefleet-server.git
```

### 2. Install dependencies

#### Client

```bash
cd drivefleet-client
npm install
```

#### Server

```bash
cd drivefleet-server
npm install
```

### 3. Run the development servers

#### Start Backend

```bash
npm run dev
```

#### Start Frontend

```bash
npm run dev
```

### 4. Open in browser

Visit:

```bash
http://localhost:3000
```

---

##  Security Implementation

* JWT token generation and verification.
* HTTPOnly cookie-based authentication.
* Protected API routes with middleware.
* Owner-based authorization for update and delete operations.
* Environment variables for sensitive credentials.

---

##  Responsive Design

The application is fully optimized for:

* Mobile devices
* Tablets
* Laptops
* Desktop screens

---

##  Animation & UX

* Smooth page transitions with **Framer Motion**.
* Animated car cards and sections.
* Loading spinners during data fetching.
* Custom 404 Not Found page.
* Toast-based success and error notifications.

---

##  API Highlights

### Cars

* `GET /cars`
* `GET /cars/:id`
* `POST /cars`
* `PATCH /cars/:id`
* `DELETE /cars/:id`

### Bookings

* `GET /bookings`
* `POST /bookings`
* `DELETE /bookings/:id`

### Features

* `GET /features`

---

## 👨‍💻 Author

**ISRAN KHAN**

Built as part of the **Programming Hero Assignment - CAT_05** using **Next.js, Express.js, MongoDB, and JWT Authentication**.
