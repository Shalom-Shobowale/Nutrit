Nutrit — Pastry & Bakery Website

Nutrit is a modern, responsive pastry website designed to showcase delicious pastries and make ordering simple and convenient. Customers can explore products, submit order details, request bulk orders, and send their orders directly through WhatsApp.

Features
Responsive Design — Optimized for desktop, tablet, and mobile devices.
Product Showcase — Display pastry products with photos, descriptions, prices, and minimum order quantities.
Order Form — Collect customer details, selected pastries, quantities, preferred dates, and delivery information.
Form Validation — Validate required fields, quantities, booking dates, and minimum order requirements.
Automatic Price Calculation — Calculate order subtotals based on product prices and quantities.
WhatsApp Ordering — Send order details to WhatsApp for confirmation.
Delivery Options — Display the delivery address field when delivery is selected.
Bulk Orders — Allow customers to request bulk orders directly from the website.
Contact Links — Provide easy access to email and Instagram.
Reusable Components — Keep the code organized and easier to maintain.
Tech Stack
React
Vite
React Router DOM
Tailwind CSS v4
JavaScript / JSX
Lucide React for icons

Additional packages may be used for form validation, notifications, animations, and UI components.

Getting Started
Prerequisites

Make sure you have installed:

Node.js (a current LTS version is recommended)
npm
A code editor such as Visual Studio Code
Installation
Clone the repository or open the project folder.
Open a terminal in the project directory.
Install the dependencies:
npm install

Start the development server:
npm run dev

Open the local URL displayed in your terminal, usually http://localhost:5173.
Available Scripts
Command	Description
npm run dev	Start the development server
npm run build	Build the production version
npm run preview	Preview the production build
npm run lint	Run ESLint, if configured
Project Structure

The exact structure may vary as the project develops.

nutrit/
├── public/              # Static public files
├── src/
│   ├── assets/          # Images and other assets
│   ├── components/      # Reusable UI components
│   ├── data/            # Product information and pricing
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.jsx           # Main application
│   ├── main.jsx          # React entry point
│   └── styles.css        # Global styles and Tailwind CSS
├── index.html
├── package.json
├── vite.config.js
└── README.md

Customization
Products and Prices

Update the relevant product data file inside src/data/ to manage product names, descriptions, images, prices, and minimum order quantities.

Check the existing data structure before changing field names so the product cards and order form continue to work.

Contact Information

Update the project's existing settings or configuration file to change contact information, social media links, and the WhatsApp number.

Ensure the WhatsApp number uses the international format required by WhatsApp, without spaces or the + symbol in the URL.

Styling

Global styles are defined in src/styles.css. The project uses Tailwind CSS v4 alongside custom CSS variables for colors, typography, spacing, and other design properties.

Navigation

React Router DOM can be used for page navigation. For a single-page website, links such as #products, #order, and #contact can navigate to sections of the page.

Order Flow
The customer selects a pastry.
The customer enters their contact information and quantity.
The website validates the order details.
The subtotal is calculated when the product has a defined price.
The customer chooses pickup or delivery and provides any required information.
The website opens WhatsApp with the order details prefilled.
The customer reviews the message and taps Send in WhatsApp.

Opening WhatsApp does not automatically send the message.

Important Notes
Confirm all product prices, minimum quantities, and advance-booking requirements before launching the website.
Verify that the WhatsApp number and contact links are correct.
Test the order form on mobile and desktop.
Test the production build before deployment.
Never store private API keys or credentials in frontend source code.
Deployment

To create a production build, run:

npm run build


Deploy the generated dist/ directory to a static hosting provider such as Vercel or Netlify.

If React Router is used for multiple pages, configure the hosting provider to serve index.html for application routes so direct page refreshes work correctly.

License

This project is currently intended for the Nutrit pastry business. Add a suitable license if you plan to distribute or reuse the code publicly.

Nutrit — Fresh pastries, simple ordering, and delightful experiences.
