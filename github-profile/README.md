# Github Profile Viewer

A simple web application that allows users to search for a Github profile and view its basic information and top 5 repositories.

## Technologies

This project uses the following technologies:

-   HTML5
-   CSS3
-   JavaScript
-   Axios (for making HTTP requests)

## Setup

To set up this project locally, follow these steps:

1.  Clone the repository to your local machine using the command:
    
   
    
    `git clone https://github.com/<username>/github-profile-viewer.git` 
    
    Replace `<username>` with your Github username.
    
2.  Open the `index.html` file in your web browser to view the application.
    

## Usage

To use the application, simply enter a Github username in the search bar and click on the "Search" button. The application will display the basic information of the user, including their name, bio, number of followers, number of following, and number of public repositories. It will also display the top 5 repositories of the user, sorted by creation date.

If no profile is found for the entered username, the application will display an error message.

## Functionality

The application has the following functionality:

-   **getUser(username)**: This function makes an HTTP GET request to the Github API to retrieve the user data for the given username. It returns the user data if successful, or throws an error if the user is not found or if there is an issue with the HTTP request.
    
-   **getUserInfo(username)**: This function uses the `getUser` function to retrieve the user data and displays it on the page in a user card. It also returns the login username of the user.
    
-   **getRepos(username)**: This function makes an HTTP GET request to the Github API to retrieve the repository data for the given username. It caches the data using a Map to avoid redundant requests. It returns the repository data if successful, or throws an error if there is an issue with the HTTP request.
    
-   **addReposToCard(repos)**: This function receives the repository data and adds the top 5 repositories to the user card.
    
-   **createErrorCard(msg)**: This function receives an error message and displays it in an error card on the page.
    
-   **form event listener**: This event listener is added to the search form and listens for a submit event. It prevents the default form submission behavior, gets the entered username, calls `getUserInfo` and `getRepos`, and adds the repository data to the user card. If there is an error, it calls `createErrorCard` to display the error message.
