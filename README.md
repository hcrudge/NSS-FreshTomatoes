**Quick View of my Application:**

**Movie List Main Component:**
<img width="1439" alt="Main Movie List Page" src="https://user-images.githubusercontent.com/84142388/134083955-b655bc8f-060d-4e31-87f1-9a7c65383bdd.png">
Includes ability to filter movies by the friend who recommended, as well as select a random movie from the movie list and add a new movie to the movie list.

**Filtered Movie List by Friend**
<img width="1440" alt="Filtered Movie List" src="https://user-images.githubusercontent.com/84142388/134084256-b792bac8-a7ab-4efc-87cf-36ebfbfb47b4.png">

**Search For Movies from "The Movie Database API"**
<img width="1440" alt="MovieSearch" src="https://user-images.githubusercontent.com/84142388/134084371-b409ea52-efd3-4f27-b1bb-4b510bc737d2.png">
Select the desired movie from the search results.

**Add Movie Component:**
<img width="1435" alt="Add Movie - Select Friend   Add Comment" src="https://user-images.githubusercontent.com/84142388/134084381-9782e3b3-6dbc-4144-ae2f-c8b30839eb9c.png">

Includes ability to select the friend who recommended the film from a drop down, and add any comments.

**Movie Detail Component:
<img width="1440" alt="MovieDetail" src="https://user-images.githubusercontent.com/84142388/134084631-e8a992f3-fd98-4fad-96bb-b04f12813efa.png">

Includes the ability to update movie detail, rate selected movie, as well as delete movie from the movie list.

**Friends List**
<img width="1440" alt="FriendsList" src="https://user-images.githubusercontent.com/84142388/134108385-da107c89-c70e-4cdd-bc23-be18f0964403.png">

Includes the ability to add a new friend, update friend detail, delete a friend, and delete all movies recommended by selected friend.

**Setup: Follow the steps below:**

1. Use terminal to clone this repository - 
1. cd into the directory it creates
``git clone git@github.com:hcrudge/NSS-FreshTomatoes.git
cd fresh-tomatoes``

1. Create an api directory outside of the project directory.
2. You will need to request an API Key from The Movie Database (https://developers.themoviedb.org/3/getting-started/introduction)
3. In the api directory, create a copy of the database.json.example and remove the .example extension.
4. Run json-server -p 8088 -w database.json from the api directory.
5. Run npm install and wait for all dependencies to be installed.
6. Run npm start to verify that installation was successful.


>Note: Your database.json file is already in the .gitignore file for this project, so it will never be added to the repo or pushed to Github.


I decided to create Fresh Tomatoes because I love to spend time watching good movies, but there are so many options out there, and not all of them are worth my time to watch (for me). I have lovely friends and family who recommend films, but I have found that often I couldn't remember the name of a movie they recommended, or I would remember the name, but couldn't remember who recommended it to me, so I could tell if I really wanted to watch that or was in the mood for the type of film they generally enjoyed.

I was frustrated with available list applications and their lack of features for keeping track of these recommendations, so I built my app to keep track of a users list of movies recommended by friends, as well as their ratings of these movies once they had watched them. 

My goals for this app were to build a CRUD (Create, Read, Update, Delete) app to help solidify and expand my understanding and comfort with coding in React and Javascript as well as utilizing a third party API and dabbling in the Bulma CSS framework (and a few other plug-in components).  
I also utilized GitHub’s project board to help keep myself organized and on task.

This application is built for my Front-End/Client-Side Capstone project for Nashville Software School.

**Tech Stack:

The app is built with the ReactJS library and supplemented with The Movie DataBase API, react-star-rating npm, Fresh Tomatoes is designed as a CRUD app and is supported by a flat data-structure utilizing JSON Server along with being styled with Bulma framework and CSS.

API Resources:
The following are examples of how your JSON server should look once it is populated with data from the application.

Note: This version of Fresh Tomatoes has mock authentication and does not provide secure storage. Please do not store sensitive information in this database!

```users: [
{
      "id": 1,
      "name": "Holly Rudge",
      "email": "holly@rudge.com",
      "icon": "",
    
    }],
friends: [
{
      "id": 1,
      "friendName": "Joe Shepherd",
      "icon": "",
      "userId": 1
    }],
movies[
{
      "id": 5,
      "TMDBId": 329,
      "poster_path": "/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
      "title": "Jurassic Park",
      "runtime": 127,
      "genre": "Adventure",
      "overview": "A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors. However, the park is anything but amusing as the security systems go off-line and the dinosaurs escape.",
      "tagline": "An adventure 65 million years in the making.",
      "userId": 2,
      "friendId": 1,
      "userRating": 0,
      "comments": "Great Soundtrack!"
    }]

```
    
Capstone ERD (Entity Relationship Diagram):
Link: https://dbdiagram.io/d/60c38e4d0c1ff875fcd4773e

Capstone ERD
<img width="1089" alt="Screen Shot 2021-08-17 at 2 51 44 PM" src="https://user-images.githubusercontent.com/84142388/129791327-ed84216d-c6e1-4422-a47b-00055672ab34.png">

Capstone Wireframe:
Link: https://miro.com/app/board/o9J_l5IoLws=/


