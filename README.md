# U.S. States Quiz App

<br>

![us_states_quiz_start_small](https://user-images.githubusercontent.com/26934289/231088940-f532a33c-5045-46ef-9c5b-2fc04b872270.png)

<br>

Demo: https://youtu.be/4S2RDE2OxVE

<br>

U.S. States Quiz web application written using vanilla Javascript.

The app highlights each state one at a time and the user is quizzed on the name of the highlighted state.

## Run the App

To run the app, within the project directory, open "index.html" in your favorite web browser.


Alternatively, run the app in a docker container as follows:

## Deploy with Docker

Build the image:

>```$ docker build -t us-states-quiz .```

Run the container:

>```$ docker run -d -p 8080:80 us-states-quiz```

Then navigate to "http://localhost:8080" in your web browser to view the app.
