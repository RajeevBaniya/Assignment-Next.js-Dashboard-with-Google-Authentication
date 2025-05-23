# Assignment: Next.js Dashboard with Google Authentication

**Name:** Rajeev Baniya  
**Email:** rjbaniya.contact@gmail.com

A modern, responsive dashboard application built with Next.js, featuring Google OAuth authentication, protected routes, and a beautiful UI for managing pizza orders.

## Features

- 🔐 **Google OAuth Authentication**
  - Secure sign-in/sign-up with Google accounts
  - Protected routes for authenticated users
  - Automatic redirection to login page for unauthenticated users

- 📊 **Dashboard Pages**
  - Personalized welcome page with user's name
  - Pizza orders management page with detailed table view
  - Responsive design for all screen sizes

- 🍕 **Pizza Orders Table**
  - Sortable by Order ID and Order Date
  - Filterable by Order Status
  - Visual status indicators with color-coded badges
  - Responsive table design for mobile and desktop

- 🎨 **Modern UI/UX**
  - Clean and intuitive interface
  - Smooth animations and transitions
  - Mobile-first responsive design
  - Loading states and error handling

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.17 or later installed
- A Google Cloud Platform account
- Git installed on your machine

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd [project-name]
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Set up Google OAuth**
   - Go to the [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Configure the OAuth consent screen
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-domain.com/api/auth/callback/google` (for production)

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── auth/
│   │   │   └── signin/
│   │   ├── orders/
│   │   └── page.tsx
│   ├── components/
│   │   └── Navbar.tsx
│   └── lib/
│       └── auth.ts
├── public/
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Deployment

1. **Vercel (Recommended)**
   - Push your code to GitHub
   - Import your repository on Vercel
   - Add your environment variables
   - Deploy


## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_URL` | Your application's base URL |
| `NEXTAUTH_SECRET` | A random string for NextAuth.js encryption |
| `GOOGLE_CLIENT_ID` | Your Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret |

## Assumptions & Challenges

- **Mock Data:** The application uses mock data for pizza orders. In a production environment, this would be replaced with a real database.
- **Authentication:** Google OAuth is used for simplicity and security. The implementation follows NextAuth.js best practices.
- **Responsive Design:** The application is designed to work seamlessly across all device sizes, with special attention to mobile usability.

## Third-Party Libraries

- **next-auth:** Authentication library
- **tailwindcss:** Utility-first CSS framework
- **typescript:** Type safety and better developer experience
- **@types/node:** TypeScript definitions for Node.js
- **@types/react:** TypeScript definitions for React
- **@types/react-dom:** TypeScript definitions for React DOM

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

 