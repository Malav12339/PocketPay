📱 PocketPay
PocketPay is a Paytm-like payments application built with modern web technologies.
It allows users to securely sign up, sign in, check their balance, transfer money, update their profile, and more — all with a smooth and intuitive interface.

🛠 Features
✅ Signup and Signin

💰 Check balance

🔍 View all available users or search for a specific user

💸 Transfer money to other users

📝 Update profile information

🚪 Logout

🖼 Pages
Here’s a list of app pages with screenshots:

Home Page
Signup
Signin
Dashboard
Send
Update Profile
⚙️ Technologies Used
Technology

Symbol

TypeScript

🟦

React.js

⚛️

Next.js

⬛

Prisma

📜

PostgreSQL

🐘

Tailwind CSS

🎨

🚀 Getting Started
Follow these steps to run PocketPay locally:

1. Clone the repository and install dependencies
git clone [https://github.com/Malav12339/PocketPay.git](https://github.com/Malav12339/PocketPay.git)
cd pocketpay
npm install

2. Configure environment variables
First, create a copy of the .env.example file and name it .env.

cp .env.example .env

Then, open the .env file and add the necessary environment variables.

3. Run migrations
npx prisma migrate dev --name "init"

4. Start the development server
npm run dev

5. Open the app in your browser
Visit http://localhost:3000 to view the application.

📦 Deployment
PocketPay is deployed on Vercel. Push your changes to GitHub, and Vercel will automatically redeploy the project.

🔗 Links
Repository: https://github.com/MalavKansara/pocketpay

Live Site: https://quickpayz.vercel.app