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

After deciding that I could indeed successfully create this app using the given tools, I got started planning the flow of the app.

### The Flow

For this aspect of the project, I got help from an amazing up and coming UX/UI Designer.  She helped me with the colors, logo, and design of some of the major components in the app.  With her designs in hand and my plan written out, it was only a matter of putting my nose to the grindstone.

Users open the app and are greeted by their Daily tab.

## Daily Tab

The Daily Tab is the default tab when opening the app and it shows all of the users current goals using 3 different filters.  There is also a button that is used to create new goals. More on that later.

### Today
It defaults to the "Today" filter which shows the user all of the reading they need to do for that day and nothing else. Once completed, these goals stay in the "Today" tab until the following day, where they are then replaced appropriately.
### All
The "All" tab shows all goals the user has made that are not yet complete.
### Late
The "Late" tab shows the user all reading goals that have past due reading.  Once the user marks the reading in "Late" as complete, it moves over to the "All" tab or the "Today" tab if there was reading to do that day.
### Flag tab
The last tab is a tab that just shows the user all of the goals they have completed.  This is accessable after a user completes their first goal.

## Library Tab

The Library tab shows all of the books the user has scanned in, searched for, or created by pressing the plus button on the section header.  Here, they can tap a book to open it and find more detailed information about the book, such as:
-Title
-Author
-Page count
-Description
-Genre
-As well as a link to the Google Books book itself.

From this larger view, users may create a goal for this particular book.  If they do, they'll be led through the process of creating a goal:

## Creating a new goal from Library or Daily tab

To create a new goal from library, the user just taps the book they want to add a goal for, (after adding the book to library), and they are brought to the Daily tab for the remainder of the process.

### 1. Select finish date
The user is prompted to select the date they wish to finish the book on via a full calendar.
### 2. Select reading days
The user is then prompted to select individual reading days (Sunday-Saturday) on which they would like to do the reading for this goal.
### 3. Goal overview
They are then shown a complete preview of their goal, displaying how many pages per day they will have to read in order to achieve the reading goal with the given deadline and reading days.
### 4. Goal Created
After previewing the goal and finalizing it, the goal then populates the Daily tab in the corresponding Daily tab filter and will show up on the "Today" filter when the first day of reading is due.

From the Daily tab, the process is very similar. Users tap the plus button in the Daily tab and are prompted to:

-Use book from library
-Scan a new book
-Enter a book manually

After deciding which path to take to choose a book, the process for creating a goal from the Daily tab continues just as it did from the Library tab, taking the user then through steps 1-4 above.

## Achievements Tab

The Achievements tab saves and logs all of the users reading data in one spot.  Here they can see a number of data points, including:

-Number of books read
-Number of pages read
-Most pages read in one day
-First book read
-Longest book read
-A list of books read that includes thumbnails of each book
-And more!

The user may reset their achievements by tapping the gears icon on the top right of this tab.

## Things Learned

This project was a whole heck of a lot of fun to build.  It was just the right mix of new things and familiar things.  Bringing this project to completion I'm so happy that I got to work with TypeScript and Redux in a larger capacity and try my hand at React Native.  For this project I used the Expo toolchain, but in the future I'd like to try my hand at writing some Java on my own.

### TypeScript
This was a great opportunity to put all of my TypeScript learning into serious practice.  I still have a few blind spots when it comes to TypeScript, but I have a strong understanding of the basic usage of it now and it's benefits! It really made coding this project so much easier especially with the added intellicense if provides on components.

### Redux
I've worked on a project in the past that used Redux but this was the first project I built completely on my own using it and I can't imagine not using it in the future for larger apps.  The idea of prop drilling or even using useContext for my state management seems like a step backward now that I've tried Redux.  It does require a lot of configuration at first, and since you only have to set it up in a project once, I feel like that is the part of Redux I'll have to spend some more time solidifying my understanding of.  Once it is set up in a project though, it is a breeze to use.

## React Native / Expo
I've been wanting to build an Android app for a while now and I know React Native is a popular choice for not only mobile apps but also desktop apps, so I'm really happy I got to try it out and learn the ins and outs of it.  The navigation system was a little daunting at first because of the nested Tab navigators within the Navigator, but once I had spent a bit of time with it, it became more than natural.  I'm excited to work with React Native in the future, but I'll have to figure out how to get Android Studio working because I did not enjoy the experience of developing directly on my personal Android phone through the Expo Go app. My back and neck have not forgiven me for constantly looking down at my phone during development.

## Overall
Overall, I really enjoyed this experience and I'm so excited to release my first Android app on the Google Play store! I can't wait for people to use this and enjoy it and I hope it really helps some people do more reading! I know I can't wait to use it!

Thanks for tuning in!