# PDF Generator

This is a PDF generator application that allows the user to preview, download, or upload a PDF of their making.
The user can use one of the provided templates to format and style their PDF along with some required fields including:
 - Name
 - Company
 - Title
 - Template

## Getting Started
 - Clone the repository using your preferred method
 - Refer to first party documentation to download any necessary tools, libraries, languages: Python, Django, pnpm, etc.
 - In the terminal of your choice, from the parent folder you can run the Django server locally using `python manage.py runserver`
 - In a separate terminal window, from the parent folder, cd into frontend repo with `cd frontend`
 - Download the packages using `pnpm install`
 - Run the frontend locally with `pnpm run dev`
 - Once running locally, login or register with your email and password
 - After logging in, you should see the main PDF Generator page to generate your pdfs
 - Fill the required fields of Name, Company, Title, and Template
 - Choose what to do with your newly generated PDF using the Preview, Download, and Upload buttons
 - You can also modify and create new templates in the Template Editor, which you can navigate to using the button in the navigation header
 - In the Template Editor you can modify existing templates by selecting one from the first dropdown or make a new one
 - In the current functionality, when a template is saved, if the id already exists in the template list, it will overwrite it. If the id does not exist it will create a new template
 - Input variables can be embedded in text fields using template literals. Ex. "This is my name, {name}". This functionality is available for {name} {Company} and {Title}
 - Template elements can be added via the buttons in the form footer. This is currently limited to Text and Rectangles
 - Template elements can be removed from the template with the Remove button below each element in the editor
 - In both the PDF Generator page and Template Editor page, the current template configuration can be viewed by clicking the Preview button.
