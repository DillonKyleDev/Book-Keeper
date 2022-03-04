# The process

The idea for this app came to me after sadly looking at all of the unread books on my bookshelf and thinking I needed to find a way to hold myself accountable for reading more.

Once I had the smallest MVP in my head, it was time to start researching.

MVP: A book tracking/planning app that you tell how many books you want to read within a certain time frame and it gives you the exact number of pages you need to read each day to accomplish your goal.



## The Stack.

### React Native with Expo toolchain + Redux:

For this one, I had already had my eye on React Native for quite some time and knew what it could do in terms of app development.  After setting up my development environment and getting my simple "hello world" running on my Android device, it was go time. I also want to use Redux in this app for a different approach to state management.  I enjoyed using Redux in the last project I did and was excited to put it to use again in this one.

### TypeScript:

Since TypeScript is a superset of JavaScript that I have been wanting to get some solid experience with and a deeper understanding of, it was a no-brainer to include it in this project, especially since Expo supports an out of the box implementation of it!

### Node.js/Express:

Node.js is my backend for every project because I love writing JavaScript on the backend and if it isn't broken and it's fun to write, don't fix it!



## The Journey

Before I dove too deeply into the nitty gritty of the project and started coding, I wanted to make sure I could achieve the most important aspects of the application so they did not become huge roadblocks when it came time to implement them.

These aspects include:

-Barcode scanning using device camera.
-Looking up books based on returned barcode information as well as search by title/author.
-Making sure the API key(s) required could be safely stored and interacted with from afar.
-Storing data locally to device as there will be no login for users or use of a database, only locally stored data for project scope management.
-Notifications to device if desired by user.

After tinkering with each of these items individually, I ended up with:

-My fully hosted and separate Node.js server on Heroku which safely holds the API key(s) behind Heroku environment variables, easily accessable via my Android app front end, ready to search for books by ISBN or Author Name or Title.

-And the beginnings of some very useful components that I could integrate into my app when the time came.

