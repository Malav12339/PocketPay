# 📱 PocketPay

PocketPay is a Paytm-like payments application built with modern web technologies. It provides a secure and intuitive interface for users to sign up, sign in, check their balance, transfer money, update their profile, and more.

---

## 🛠 Features

- ✅ User authentication (Signup and Signin)
- 💰 Check account balance
- 🔍 View all users or search for specific users
- 💸 Transfer money to other users
- 📝 Update profile information
- 🚪 Logout functionality

---

## 🖼 Pages

Below are the key pages of the PocketPay application with screenshots:

### Home Page
![Home Page 1](public/ss/home-page-1.png)  
![Home Page 2](public/ss/home-page-2.png)  
![Home Page 3](public/ss/home-page-3.png)  

### Signup
![Signup Page](public/ss/signup.png)  

### Signin
![Signin Page](public/ss/signin.png)  

### Dashboard
![Dashboard Page](public/ss/dashboard.png)  

### Send Money
![Send Money Page](public/ss/send.png)  

### Update Profile
![Update Profile Page](public/ss/update.png)  

---

## ⚙️ Technologies Used

- ![TypeScript](https://www.typescriptlang.org/assets/images/icons/favicon-32x32.png) [TypeScript](https://www.typescriptlang.org/)
- ![React.js](https://react.dev/favicon.ico) [React.js](https://react.dev/)
- ![Next.js](https://nextjs.org/favicon.ico) [Next.js](https://nextjs.org/)
- ![Prisma](https://www.prisma.io/favicon.ico) [Prisma](https://www.prisma.io/)
- ![PostgreSQL](https://www.postgresql.org/favicon.ico) [PostgreSQL](https://www.postgresql.org/)
- ![Tailwind CSS](https://tailwindcss.com/favicon.ico) [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 Getting Started

Follow these steps to set up and run PocketPay locally:

### Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **Git** (for cloning the repository)

### Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/Malav12339/PocketPay.git
   cd PocketPay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy the `.env.example` file to create a `.env` file in the root directory:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your specific configuration. Example:

   - Replace `your_postgresql_database_url` with your PostgreSQL connection string (e.g., `postgresql://user:password@localhost:5432/pocketpay?schema=public`) and `your_nextauth_secret` with a secure random string.

4. **Set up the database**
   - Run Prisma migrations to set up the database schema:
     ```bash
     npx prisma migrate dev
     ```

5. **Start the development server**
   ```bash
     npm run dev
     ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`.

---

## 🔗 Links

- **Repository**: [https://github.com/Malav12339/PocketPay](https://github.com/Malav12339/PocketPay)
- **Live Site**: [https://quickpayz.vercel.app](https://quickpayz.vercel.app)