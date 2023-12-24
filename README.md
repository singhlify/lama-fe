# LAMA Podcast

LAMA Podcast is a front-end application built with Next.js and Tailwind CSS. In this demo project, the user can login via their email and create multiple projects.
Then, in those projects, the user can add multiple files and keep updating the description of those files as per need or even delete them. They can also edit the project widget configurations and in them they can also upload a custom Bot Image. Finally, the user can also edit their name in Account Settings.

## Getting Started

### Prerequisites
Ensure you have Node.js and `pnpm` installed on your machine.

### Installation
1. Clone the repository: `git clone <repository-url>`
2. Change into the project directory: `cd lama-fe`
3. Install dependencies: `pnpm install`

### Development
- Run the development server: `pnpm run dev`
- Open your browser and visit [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
.
├── .eslintrc.json
├── .gitignore
├── README.md
├── jsconfig.json
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public/
│   └── assets/
│       ├── animations/
│       ├── images/
│       └── index.js
├── src/
│   ├── apis/
│   │   └── ...  # API utility functions
│   ├── app/
│   │   ├── projects/
│   │   │   ├── [projectId]/
│   │   │   │   ├── files/
│   │   │   │   │   ├── [fileId]/
│   │   │   │   │   │   └── page.js
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.js
│   │   │   │   ├── widget/
│   │   │   │   │   └── page.js
│   │   │   │   ├── layout.js
│   │   │   │   └── Sidebar.js
│   │   │   └── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   ├── providers/
│   └── utils/
└── tailwind.config.js
```

## Scripts

- `npm run dev`: Run the development server.
- `npm run build`: Build the application.
- `npm start`: Start the production server.
- `npm run lint`: Run ESLint for code linting.

## Dependencies

- `@hookform/resolvers`: ^3.3.2
- `@tanstack/react-query`: ^5.14.2
- `@tanstack/react-query-devtools`: ^5.14.5
- `axios`: ^1.6.2
- `lottie-react`: ^2.4.0
- `next`: 14.0.4
- `react`: ^18
- `react-dom`: ^18
- `react-hook-form`: ^7.49.2
- `react-toastify`: ^9.1.3
- `zod`: ^3.22.4

## Dev Dependencies

- `@tanstack/eslint-plugin-query`: ^5.12.1
- `autoprefixer`: ^10.0.1
- `daisyui`: ^4.4.20
- `eslint`: ^8
- `eslint-config-next`: 14.0.4
- `postcss`: ^8
- `tailwindcss`: ^3.3.0

## Linting

Linting is configured using ESLint with the @tanstack/eslint-plugin-query. Run `npm run lint` to ensure code quality.

## Customization

The app is built using Next.js and Tailwind CSS. Customize styles in the `tailwind.config.js` file.

## Contributing

Feel free to contribute by submitting issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
