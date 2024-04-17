# README

## Installation Guide for "vite-react-gestionArticulosPedidos" Project

This project is designed to facilitate the management of articles and orders using Vite, React, Node.js, Material-UI, Material Icons, JSON-Server, and Tailwind CSS. Below are the steps required to set up and run the project on your local machine.

### Prerequisites
- Node.js (version 14.x or later)
- npm (Node Package Manager) or yarn

### Installation Steps

1. **Clone the Repository:** ensure to have git installed by bash
Navitage to wwww 

```
git clone https://github.com/ivanarganda/gestionarticulospedidos.git
// or by SSH
git clone git@github.com:ivanarganda/gestionarticulospedidos.git
```

2. **Navigate to Project Directory:**


3. **Install Dependencies: All dependencies are alocated in package.json only install them**

```
    npm install 
    // or 
    yarn add
```


4. **Start JSON-Server:**
- Ensure you have `json-server` installed globally.

- Start JSON-Server with the provided `db.json` file located in the `server` folder:
  ``` 
  Cotent JSON:

  {
  "articulos": [
    {
      "id": 1,
      "referencia": "001",
      "nombre": "Producto A",
      "descripcion": "Descripción del Producto A",
      "precioSinImpuestos": 2,
      "impuestoAplicable": 0.21
    },
    {
      "id": 2,
      "referencia": "002",
      "nombre": "Producto B",
      "descripcion": "Descripción del Producto B",
      "precioSinImpuestos": 15,
      "impuestoAplicable": 0.21
    }
  ],
  "pedidos": [
    {
      "id": 1,
      "items": [
        {
          "referencia": "001",
          "cantidad": 2,
          "precioUnitarioSinImpuestos": 2,
          "impuestoPorcentaje": 21,
          "precioTotalSinImpuestos": 4,
          "precioTotalConImpuestos": 4.84
        },
        {
          "referencia": "002",
          "cantidad": 8,
          "precioUnitarioSinImpuestos": 15,
          "impuestoPorcentaje": 21,
          "precioTotalSinImpuestos": 120,
          "precioTotalConImpuestos": 145.2
        }
      ],
      "precioTotalSinImpuestos": 109,
      "precioTotalConImpuestos": 113.74000000000001
    },
    {
      "id": 2,
      "items": [
        {
          "referencia": "001",
          "cantidad": 1,
          "precioUnitarioSinImpuestos": 2,
          "impuestoPorcentaje": 21,
          "precioTotalSinImpuestos": 2,
          "precioTotalConImpuestos": 2.1
        }
      ],
      "precioTotalSinImpuestos": 2,
      "precioTotalConImpuestos": 2.1
    },
    {
      "id": 3,
      "items": [
        {
          "referencia": "001",
          "cantidad": 2,
          "precioUnitarioSinImpuestos": 2,
          "impuestoPorcentaje": 21,
          "precioTotalSinImpuestos": 4,
          "precioTotalConImpuestos": 4.0042
        },
        {
          "referencia": "002",
          "cantidad": 2,
          "precioUnitarioSinImpuestos": 15,
          "impuestoPorcentaje": 21,
          "precioTotalSinImpuestos": 30,
          "precioTotalConImpuestos": 30.0315
        }
      ],
      "precioTotalSinImpuestos": 34,
      "precioTotalConImpuestos": 34.0357
    }
  ]
}

  ```
  ```
  json-server --watch server/db.json --port 3000 --static .\public\ 
  ```

5. **Configure Tailwind CSS: ( In case not installed )**
- If you haven't already, generate a `tailwind.config.js` file using Tailwind CLI:
  ```
  npx tailwindcss init
  ```
- Customize Tailwind CSS according to your preferences in the generated `tailwind.config.js` file:

    ```
    /** @type {import('tailwindcss').Config} */
    export default {
        content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
        extend: {},
        },
        plugins: [],
    }
    
    ```
- Replace all code in the main file index.css in src path file by:
    ```
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
    
    ```
6. **Start the Development Server:**
    In your VSCode cmd on your project root

    ```
        npm run dev
        // or
        yarn dev
    
    ```

7. **Open the Application:**
Once the development server has started successfully, you can access the application by navigating to `http://localhost:3000` in your web browser.

### Additional Information

- **Material-UI:** This project utilizes Material-UI for building React components with Material Design.
- **Material Icons:** Material Icons are used for providing icons in the user interface.
- **JSON-Server:** JSON-Server is used to simulate a REST API based on a JSON file. The `db.json` file in the `server` folder acts as the database for this simulation.
- **Tailwind CSS:** Tailwind CSS is used for styling the application. You can customize Tailwind CSS according to your project requirements by modifying the `tailwind.config.js` file.

### Contributing

Contributions to this project are welcome. Feel free to open issues for suggestions or bug reports, or submit pull requests with improvements.

### License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

### Author

This project is authored and maintained by Iván González Valles. For any inquiries or support, you can get me in touch with [ivanartista96@gmail.com](mailto:ivanartista96@gmail.com).
