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
 - From the main page you can also view and download from a list a list of pdfs you uploaded to the server

## Development Process
When I started this project, I began with what I know. Most of my experience is in React so I began building the frontend within in a React App. However, I aim to impress, so when Sherina got back to me that the preferred framework was Vue3, I knew I'd be switching frameworks. First I wanted to make sure I had something functioning to showcase. So I finished the simple functionality in a React framework, focusing on using tools and libraries that I could leverage similiarly in Vue3 like pdf-lib, Axios, Tailwind, Shadcn components, Lucide icons, and Vitest. I also created functionality in plain .ts files so they would framework agnostic, like the staticTemplates.ts file. I even got the pdf previewer up and running as a little bonus using an iframe component. Once I had predefined templates being generated, previewable, and downloadable, I worked on replicating the template style of the example you provided. Getting the styling off a pdf proved to be a little tricky, but I managed to used Adobe Acrobat to get the styling off the text fields and spacing of the margins and fields. You can find a pdf with measurements in the assets folder.
After fully replicating the example template successfully, it was time to switch to Vue3. Again I focused mainly on the frontend because the project prompt seemed almost entirely focused around it, and with a couple trips to the Vue3 documentation and back, I had my PDF generation logic duplicated in a Vue3 framework. My next step was validation of the form fields because without the fields being filled, the look of the provided example template fell apart. I decided to make some custom validation messages for aesthetics rather than use built in ones within form elements. After getting validation in, I wanted to go ahead and build in some testing for the page content, button events, and form validation, for which I used Vitest.
In the instructions there was mention of saving the pdf on the server. With that being somewhat of an open-ended prompt, I decided it meant build a Django server. From the first interview I remembered your tech stack including Django, so I decided to try to go above and beyond and build it. After going through a tutorial on setting up Django and the basics, I was lucky enough to find a wonderful article by Tom Dekan (https://tomdekan.com/articles/vue-auth) on hooking up a django app to a vue app including auth. This was immensely helpful and led to the successful integration of my Django and Vue application. With some trial and error I was then able to add the ability to upload pdfs to a local sqlite3 db in Django, view a list of downloaded pdfs, and download a selected pdf from the db.
This was very exciting and motivated me to tackle the TemplateEditor, where I would allow a user to create and modify templates. The structure of the editor was heavily influenced by the way pdf-lib generates elements in a pdf using functions like .drawText() and .drawRectangle(). Using these functions as inspiration, I created objects that could feed their properties via user inputs. Buttons in the footer would allow for the creation of new text and rectangle elements with an array and a button below each element could be used to remove it. This array of elements that could be fed to a templateBuilder function to generate the pdf, and these elements could be saved along with a name and id for later use or modification.
That rounds out the major points of development. I also wanted to list out a couple improvements I'd to make in the future:
 - broaden the TemplateEditor and templateBuilder so that it could take in more element types
 - have templates saved in server rather than session
 - beef up the validation in forms
 - improve component abstraction so theres no duplication of like elements
 - expand testing to other components
 - add toasts to successful actions

