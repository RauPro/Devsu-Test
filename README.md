# BancoPichincha

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.

## Software Design and Architecture
The Feature Module architecture is based on organizing and dividing the code into independent modules based on the system's features or functionalities, where each module encapsulates a specific function. These modules can consist of components, services, directives, and other elements specifically related to a given functionality. Adopting this architecture offers several benefits:

**Modularity**: It allows for breaking down a large application into smaller, manageable modules, making the code easier to read, maintain, and scale.

**Reusability**: Feature modules can be reused in different parts of the application or even across different applications.

**Lazy Loading**: By splitting the application into feature modules, it's possible to load modules only when they're needed, thus improving performance and the initial loading speed.

**Maintainability**: The modularity allows different teams to work on different modules without interfering with each other. It also facilitates error correction and the addition of new features.

**Separation of Responsibilities**: Each module handles a specific functionality, making it easier to locate and fix problems and preventing excessive coupling.

**Implementation in this Project:**

In this project, I adopted the Feature Module Architecture to leverage these benefits and to create a clear and coherent code structure. Even though this project only has one feature module (Product), it provides us with the scalability needed as more features are required in the future.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [jest](https://jestjs.io/).

## Product Feature

### 1. Product Display:
[!ProductDisplay](./src/assets/ListProduct.PNG 'Product Display')

   This module presents a detailed listing of products in a table format. This table is equipped with the following features:

Contextual Menu: Offers additional options for each product.
Pagination: Facilitates navigation through multiple products.
Search Bar: Allows users to filter and find specific products.
Addition Button: A dedicated button to add new products to the listing.
### 2. Product Creation:
[!ProductCreation](./src/assets/CreateProduct.PNG 'Product Creation')

   This section provides an interface for creating a new product:

Validations: All form fields have specific validations to ensure correct data entry.
Confirmation Modal: Before finalizing the creation, a modal pops up seeking user confirmation.
### 3. Product Editing:
[!ProductEditing](./src/assets/EditProduct.PNG 'Product Editing')

   Through the contextual menu, the option to edit a product is provided:

Editing Form: The same form used in creation is used here, but with certain fields, like the ID, disabled to ensure only permitted fields are modified.
### 4. Product Deletion:
[!ProductDeletion](./src/assets/ModalDelete.PNG 'Product Deletion')


   The deletion option is located in the contextual menu:

Confirmation Modal: Before proceeding with the deletion, a modal is displayed for the user to confirm or cancel the action.
**Important Note:**
The deletion function was not adequately tested due to a 404 error on the respective endpoint. Despite validating that it carries the proper header with tools like Postman and Insomnia, it couldn't be made to work correctly.


## Testing
[!Testing](./src/assets/TestCoverage.PNG 'Testing')

All files were tested. Application reach 100% code coverage. 100% of the code was tested using Jest. The tests are located in the same folder as the respective component/service. To run the tests, use the command `ng test` in the terminal.
