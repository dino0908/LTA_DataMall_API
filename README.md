<h3 align="center">A web application that leverages data provided by DataMall LTA</h3>

<h2>Features</h2>
<h3 align="left">Bus Arrival Information</h3>
<p align="left">
  <ul>
    <li>Search for bus arrival timings by entering the bus stop code and, if needed, the bus service number.</li>
    <li>Real-time data from DataMall LTA ensures accurate and up-to-date information on bus arrivals.</li>
  </ul>
</p>
<h3 align="left">Carpark Availability</h3>
<p align="left">
  <ul>
    <li>Explore carpark availability based on location or search for a specific carpark.</li>
    <li>Get detailed information on the number of available parking spaces, helping users make informed decisions.</li>
  </ul>
</p>

## Technologies Used

- **React and Chakra UI:**
  - The frontend of the application is built using React, a JavaScript library for building user interfaces, and Chakra UI for a responsive and visually appealing design.

- **Django:**
  - The backend of the application is powered by Django, a high-level Python web framework that facilitates rapid development and clean, pragmatic design.

- **Python:** 
  - The programming language used for server-side logic, Django's backend, and interactions with the DataMall LTA API.

- **Requests:** 
  - Python library for making HTTP requests to the DataMall LTA API from the backend.

## How to Use

1. **Installation:**
   - Clone the repository: `git clone https://github.com/dino0908/LTA_DataMall_API.git`
   - Install dependencies:
     ```bash
     npm install     # Install React dependencies
     ```

2. **Configuration:**
   - https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html
   - Obtain an API key from DataMall LTA and set it as an environment variable in a `.env` file. 
   - LTA_API_KEY=your-api-key-here
   - Place this .env file in the 'app' folder.

4. **Run the Application:**
   - Start the Django backend:
     ```bash
     python manage.py runserver
     ```
   - Start the React frontend:
     ```bash
     npm run dev
     ```
   - Access the application at `http://localhost:{port}` in your web browser.



