# M7011E

The project for M7011E 2022 by the group gamla och bittra; with Elliot Huber, Magnus Stenfelt, Peter Panduro and Tovah Parnes.
Our porject is a blog style website where we will make it using the frameworks NextJS and Dart and
then compare the performance of the two different systems. They will have a shared
backend and database so we can see the difference in them without other factors.



# Testing frameworks
As seen in the tables below the Flutter implementation is slower to reaload the page. 
This is because it loads the entire application immedietly compared to next that only loads the page.
This can be seen when switching to the about page from the home page. Flutter has an immediate transition.
The drawback in this is that the total size of the load is very big especially when the user only want one page.
Signing in has for the both practically very little differences

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
