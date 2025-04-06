Bahir Dar Market Place Navigator
Overview
Bahir Dar Market Place Navigator is a dynamic and intuitive web application designed to help customers easily find products within a market complex, reducing the frustration of wandering around to locate the intended product. The platform is built with a hierarchical structure that organizes products based on their location within buildings, floors, and rooms. By using this system, customers can efficiently navigate to the exact product they’re looking for, saving time and effort.

The motivation behind this project stemmed from the common pain point faced by many shoppers—difficulty in locating specific products within large, multi-story market complexes. The aim is to provide a seamless and user-friendly experience that enables users to navigate through different buildings, floors, and rooms, and quickly locate the products they desire.

Features
Customer View:
Building and Floor Navigation: Users can select a building and floor to narrow down their search. This hierarchical structure helps to manage complex, multi-story market centers.

Product Listing: Once the user selects a room within a floor, the system dynamically displays the products available in that room, making it easier for customers to find exactly what they're looking for.

Device Storage: The system allows customers to save their username and password on their devices for quicker access during subsequent visits.

Admin View:
Expandable Hierarchy View: The admin interface presents an expandable view of the entire market structure, showing the different buildings, floors, and rooms.

Management Icons: On hovering over any building, floor, or room, management icons are displayed, providing administrators with tools to manage and organize products efficiently within the marketplace.

Technologies Used:
React.js: A JavaScript library used to build the user interface. React provides a fast, interactive, and dynamic user experience by updating only the parts of the page that need to change.

Redux: A state management library for React, which allows for predictable state management across the entire application.

Tailwind CSS: A utility-first CSS framework that helps in designing the layout and styling of the application quickly and efficiently. Tailwind's pre-defined utility classes provide flexibility and speed in development.

JSON Server: A lightweight and easy-to-set-up backend solution that simulates a real database for the project, allowing for the storage and retrieval of product and building hierarchy data.

Device Storage: The use of local storage or session storage to save the user's login credentials for convenience, enabling faster access during future sessions.

Project Structure
The project follows a clean and modular architecture, with the following structure:

Components:

Customer Components: Components for the customer interface, including navigation, product listing, and building/floor selection.

Admin Components: Components for the admin interface, including the expandable hierarchy view and management icons.

State Management (Redux):

Store: The central place for managing the state of buildings, floors, rooms, and products.

Actions & Reducers: Actions and reducers define the business logic and the updates made to the state in response to user interactions.

Backend (JSON Server):

The JSON Server is used to simulate a backend for fetching and storing data about buildings, floors, rooms, and products.

Styles (Tailwind CSS):

Tailwind CSS is used throughout the project to style both the customer and admin views. It allows for rapid styling while maintaining a clean, responsive design.