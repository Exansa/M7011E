# M7011E

The project for M7011E 2022 by the group gamla och bittra; with Elliot Huber, Magnus Stenfelt, Peter Panduro and Tovah Parnes.
Our porject is a blog style website where we will make it using the frameworks NextJS and Dart and
then compare the performance of the two different systems. They will have a shared
backend and database so we can see the difference in them without other factors.

We decided in the latter part of the project to focus on the development of nextjs and not flutter.
Therefore flutter is not using the backend solution but what we compared was a page without that factor.
Nextjs is the solution that fullfills the requirements of the project. 
Flutter is a controlled comparison for evaluation

# Setting up the project
1. Clone the repository
2. To setup the backend follow the `README.md` intructions found in the Backend folder 
3. To setup the nextJS frontend navigate to `Frontend/blog_next_frontend` and follow the `README.md` instructions
3.1. To setup the flutter frontend navigate to `Frontend/blog_flutter_frontend` and follow the `README.md` instructions

# Running the project
1. Start docker desktop
2. Navigate in a terminal to the backend folder and run docker using `docker compose up -d --build --no-deps`
3. For manual testing of the api calls to the server open swagger ui by going to `localhost:5001/docs` in your browser
4. Navigate to the frontend folder of your choice(next or flutter)
4.1. To run the next frontend type `yarn run` into the terminal and in the browser open `localhost:3000`
4.2. To run the flutter frontend type `flutter run -d chrome` or run it from your editor

# Testing frameworks
As seen in the tables below the Flutter implementation is slower to reaload the page. 
This is because it loads the entire application immedietly compared to next that only loads the page.
This can be seen when switching to the about page from the home page. Flutter has an immediate transition.
The drawback in this is that the total size of the load is very big especially when the user only want one page.
Signing in has for the both practically very little differences

Part of our performance report is also a more subjective opinion on how they are to work with.
We are of the opinion that for this course and generally making a web native project nextjs is the best choice.
Flutter is probably a better choice if we were creating an app that we want a web solution to aswell.
Flutter has less resources and little documentation for web development compared with nextjs. But way more for apps.


|     Refreshing page      |    Nextjs     |    Flutter    |
| ------------------------ | ------------- | ------------- |
| First Contentful Paint   | 0.3s          | 0.4s          |               
| Speed Index              | 1.5s          | 32.0s         |               
| Largest Contentful Paint | 3.5s          | 52.1s         |               
| Time to Interactive      | 3.6s          | 49.4s         |
| Total Blocking Time      | 750ms         | 1400ms        |             
| Cumulative Layout Shift  | 0             | 0.019         |
| Total size               | 3.066 KiB     | 51,180KiB     |

|     Switching pages      |    Nextjs     |    Flutter    |
| ------------------------ | ------------- | ------------- |
| Total blocking time      | 0ms           | 0ms           |
| interaction to next paint| 40ms          | --            |
| Cumulative Layout Shift  | 0.012         | 0             |

|       Signing in         |    Nextjs     |    Flutter    |
| ------------------------ | ------------- | ------------- |
| Total blocking time      | 560ms         | 890ms         |
| interaction to next paint| 130ms         | 80ms          |
| Cumulative Layout Shift  | 0.001         | 0.014         |
