# Password Manager

A simple web-based password manager built with Vue 3, Vite, Pinia, and Supabase.

## Features

- Add, store, and list passwords securely
- Modern Vue 3 Composition API structure
- Uses Supabase as a backend for storing password data
- Responsive and user-friendly interface
- Modular components for easy maintenance

## Project Structure

```
.
├── index.html
├── jsconfig.json
├── package.json
├── vite.config.js
├── public/
│   └── favicon.ico
└── src/
    ├── App.vue
    ├── main.js
    ├── assets/
    ├── components/
    │   ├── PasswordForm.vue
    │   └── PasswordTable.vue
    ├── router/
    │   └── index.js
    ├── store/
    │   └── index.js
    └── views/
        ├── AddPassword.vue
        └── ListPasswords.vue
```

## Setup

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd password-manager
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-supabase-url.supabase.co/rest/v1/your-table
   VITE_SUPABASE_API_KEY=your-supabase-api-key
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Build for production:**
   ```sh
   npm run build
   ```

## Usage

- **Add Password:** Use the form to add a new password entry. All fields are required.
- **View Passwords:** The password table lists all stored passwords fetched from Supabase.

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) (for state management)
- [Vue Router](https://router.vuejs.org/)
- [Supabase](https://supabase.com/) (backend)

## Security Note

This project is for educational/demo purposes. Do not use it to store real passwords without implementing proper encryption and security best practices.

## License

MIT
