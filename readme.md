Here's a detailed README for the Gæðahandbók (Quality Manual) project:

# Gæðahandbók (Quality Manual)

## Project Overview

This project is a web-based Quality Manual (Gæðahandbók) for an organization, likely related to labor unions or worker's rights in Iceland. It provides a structured interface for accessing various sections of the manual, including handling labor disputes, confidentiality, debt collection, and more.

## Key Features

1. **Secure Login**: The application starts with a login page to ensure authorized access.
2. **Interactive Navigation**: A sidebar menu allows users to navigate between different sections of the manual.
3. **Dynamic Content Loading**: Content is loaded dynamically into the main area without page reloads.
4. **Responsive Design**: The layout adapts to different screen sizes, including a mobile-friendly version.
5. **External Links**: Direct links to SharePoint documents for each section are provided.
6. **Reference System**: A system for loading and displaying references is implemented.

## File Structure

- `index.html`: The login page
- `home.html`: The main page of the application after login
- `styles/style.css`: Main stylesheet for the application
- `kaflar/`: Directory containing HTML files for each section of the manual
- `ref_data/`: (Implied) Directory containing JSON files for references

## Setup and Installation

1. Clone the repository to your local machine or web server.
2. Ensure all files are in their correct directories as per the file structure.
3. No additional setup is required as this is a static website.

## Usage

1. Open `index.html` in a web browser.
2. Log in using the provided credentials (for development: username "Eining2024", password "Strandgata600!").
3. After successful login, you'll be redirected to `home.html`.
4. Use the sidebar to navigate between different sections of the manual.
5. Click on "Vinnuskjal á SharePoint" buttons to access editable documents on SharePoint.

## Key Components

### Login System

```9:34:index.html
        function login(event) {
            event.preventDefault(); // Prevent form submission
            
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
    
            if (username === "Eining2024" && password === "Strandgata600!") {
                saveLoginStatus(); // Save login status
                window.location.href = "home.html"; // Navigate to home.html
            } else {
                alert("Rangt notandanafn eða lykilorð.");
            }
        }
                <li><a href="kaflar/kjarasamningar.html" target="content-frame">5. Kjarasamningar</a></li>
        // Check if user is logged in
        window.onload = function() {
            const isLoggedIn = sessionStorage.getItem("isLoggedIn");
            if (isLoggedIn === "true") {
                window.location.href = "home.html"; // Redirect to home.html if already logged in
            }
        };
        <div class="main-content">
        // Save login status
        function saveLoginStatus() {
            sessionStorage.setItem("isLoggedIn", "true");
        }
```

The login system uses client-side JavaScript for authentication. In a production environment, this should be replaced with server-side authentication for security.

### Main Layout

```21:43:home.html
    <div id="main-container" class="container">
        <header class="header">
            <h1><a href="kaflar/intro.html" target="content-frame">Gæðahandbók</a></h1>
        </header>
    
        <div class="sidebar">
            <h2>Efnisyfirlit</h2>
            <ul>
                <li><a href="kaflar/mottaka-kjaramala.html" target="content-frame">1. Móttaka kjaramála</a></li>
                <li><a href="kaflar/urvinnsla-kjaramala.html" target="content-frame">2. Úrvinnsla kjaramála</a></li>
                <li><a href="kaflar/trunadur-og-personuvernd.html" target="content-frame">3. Trúnaður og persónuvernd</a></li>
                <li><a href="kaflar/innheimtumal.html" target="content-frame">4. Innheimtumál</a></li>
                <li><a href="kaflar/kjarasamningar.html" target="content-frame">5. Kjarasamningar</a></li>
                <li><a href="kaflar/vinnustadaeftirlit.html" target="content-frame">6. Vinnustaðaeftirlit</a></li>
                <li><a href="kaflar/veikindarettur.html" target="content-frame">7. Veikindaréttur</a></li>
                <li><a href="kaflar/utlendingamal.html" target="content-frame">8. Útlendingamál</a></li>
                <li><a href="kaflar/rettarheimildir.html" target="content-frame">9. Helstu réttarheimildir</a></li>
            </ul>
        </div>
        
        <div class="main-content">
            <iframe name="content-frame" src="kaflar/intro.html" target="content-frame" style="width: 100%; height: 100%; border: none;"></iframe>
        </div>
```

The main layout consists of a header, sidebar navigation, and main content area using an iframe for content display.

### Styling

```11:21:styles/style.css
.container {
    display: grid;
    grid-template-columns: 280px 1fr 300px;
    grid-template-rows: auto 1fr;
    height: 100vh;
    max-width: 1800px;
    margin: 0 auto;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
}
```

The CSS uses a grid layout for desktop views and includes responsive design for mobile devices.

### Dynamic Content Loading

```51:78:home.html
    <script>
        window.addEventListener('message', function(event) {
            if (event.data.type === 'loadReference') {
                loadReference(event.data.refId);
            }
                // Clear the reference content
                document.getElementById('reference-content').innerHTML = '';
            }
        });
                            ${data.description}
        function loadReference(refId) {
            // Clear previous reference content
            document.getElementById('reference-content').innerHTML = '';
                    document.getElementById('reference-content').innerHTML = content;
            fetch(`ref_data/${refId}.json`)
                .then(response => response.json())
                .then(data => {
                    const content = `
                        <p>
                            ${data.number}. <a href="${data.link}" target="_blank">${data.title}</a> - 
                            ${data.description}
                            [<a href="${data.pdfLink}" target="_blank">${data.pdfText}</a>]
                        </p>
                    `;
                    document.getElementById('reference-content').innerHTML = content;
                })
                .catch(error => console.error('Error loading reference:', error));
        }
```

JavaScript is used to handle dynamic loading of references and potentially other content.

## Development Notes

- The project is currently in development, as indicated by warning messages in content files.
- The login credentials are hardcoded in `index.html`. This should be changed for production use.
- The content is primarily in Icelandic, suggesting a localized application.

## Future Improvements

1. Implement server-side authentication for improved security.
2. Replace the use of iframes with AJAX content loading for better performance and SEO.
3. Enhance mobile responsiveness, possibly implementing a hamburger menu for mobile navigation.
4. Implement a proper backend for dynamic content management.
5. Add version control for document revisions.

## Contributors

- Magnús Smári (mentioned in footer, likely the primary developer)

## License

No specific license is mentioned in the provided code. It's recommended to add appropriate licensing information for the project.