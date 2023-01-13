# M7011E

The project for M7011E 2022 by the group gamla och bittra; with Elliot Huber, Magnus Stenfelt, Peter Panduro and Tovah Parnes.
Our porject is a blog style website where we will make it using the frameworks NextJS and Dart and
then compare the performance of the two different systems. They will have a shared
backend and database so we can see the difference in them without other factors.

|     Refreshing page      |    Nextjs     |    Flutter    |     Note      |
| ------------------------ | ------------- | ------------- | ------------- | 
| First Contentful Paint   | 0.3s          | 0.4s          |               |
| Speed Index              | 1.5s          | 32.0s         |               |
| Largest Contentful Paint | 1.5s          | 32.0s         |               |
| Time to Interactive      | 3.5s          | 0.4s          |               |
| Total Blocking Time      | 3.6s          | 32.0s         |               |
| Cumulative Layout Shift  | 0             | 0.4s          |               |
| Total size               | 1.5s          | 32.0s         |               |

|     Switching pages      |    Nextjs     |    Flutter    |     Note      |
| ------------------------ | ------------- | ------------- | ------------- | 
| Total blocking time      | 0ms           | 0ms           |               |
| interaction to next paint| 40ms          | --            |               |
| Cumulative Layout Shift  | 0.012         | 0             |               |

|       Signing in         |    Nextjs     |    Flutter    |     Note      |
| ------------------------ | ------------- | ------------- | ------------- | 
| Total blocking time      | 560ms         | 890ms         |               |
| interaction to next paint| 130ms         | 80ms          |               |
| Cumulative Layout Shift  | 0.001         | 0.014         |               |
