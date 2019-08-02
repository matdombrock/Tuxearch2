# Tuxearch v2
***Pronounced: (tux-search)***

## About
Tuxearch is a tool made to help developers, system admins and command-line enthusiasts store and retrieve their most commonly used commands in a quick and easy way. 

This software is built with VueJS and runs 100% client side. You commands are saved and retrieved from a simple JSON "database". 

This is a total re-write of my original [Tuxearch Project](https://github.com/matdombrock/Tuxearch/blob/master/README.md). However, it is fully backwards compatible with original Tuxearch databases. 

Tuxearch has no external dependencies outside of VueJS. 

## Install
This is 100% front-end Javascript and HTML. There is no need to configure a database, but this does need to run on some kind of web server. 

Simply clone these project files to a working web server and you should be good to go!

## Usage
To use the software simply start typing your search query into the search bar and the available commands will automatically filter down to show just the ones that are most relevant to your search criteria. 

## Working With The Database
Adding to the database is actually really easy. Just edit "db/database.json" and append the new data to the bottom of the file as follows:
```json
{
    "INFO" : "info about your command",
    "COMMAND" : "actual command #1",
    "TAGS" : "tags split by space not commas"
},
{
    "INFO" : "info about another command",
    "COMMAND" : "actual command #2",
    "TAGS" : "tags split by space not commas"
}
```
**Notes:**
* Make sure you are adding valid JSON and that you do not break the JSON formatting. 
* If you need yo check your JSON for validity you can use a tool like [JSON Lint](https://jsonlint.com/).
* A search is preformed against all elements of a database item, so you don't need to add words as tags if they are already mentioned in the command or info elements. 

## Configuration
You can edit the file ```config/config.js``` to easily make some changes to the software as needed. 

Here is a copy of the default configuration settings:
```js
const config = [];

// What is the name of our database file in the 'db' directory?
config.databaseName = "db.json";

// Do we want to display all database items if the search bar is empty?
config.displayAllResultsOnEmptySearch = true;

// Do we want to display how many points an item was given according to the search criteria?
config.displayItemPoints = false;

// Do we want to display the items tags?
config.displayItemTags = false;

// Do you want to take all of the credit for making this?
config.hideCredits = false;
```
**Notes:**
* databaseName, can be changed to match the name of a custom database file that you put into the ```db/``` directory. Make sure to include ```.json``` as the filetype.  
* displayItemPoints, displays the amount of "points" that a database item received when being checked by the search/ranking algorithm. The more points and item gets, the higher it is in the search rank. Each element of the database item is checked against each term in your search adn assigned one point for a match, so the more search terms you use the more possible points that can be awarded. 
* displayItemTags, displays that tags that each search item has. This is mainly useful for troubleshooting.  

## FAQs

### Why Is This Software Named Tuxearch?
The name "Tuxearch" is a portmanteau of "Tux" (the Linux mascot) and the word "search". Of of the software names I could think of that did NOT abuse the English language were taken. 

### Why The Rewrite?
The old code was very cumbersome and required NodeJS + Electron just to run. This was not necessary to the do what this does so I decided to remove it. There is just no reason this software can't be 100% client side code. However, the old code was coupled too tightly with the idea of having a back-end, so I decided it would be faster to just re-write it.  

### Why VueJS?
I was able to re-write this app in an afternoon because of how easy Vue is to use. Before, the rendering logic was all custom javascript, but now Vue is handling all of that for me, and doing a much better job. 

### Why No "Formal" Database?:
A database requires a back-end and an API. Both of those things add complexity to the software and don't really offer anything in return in this case. Since the software never writes to the database, as far as it's concerned, the data is read-only. This helps offer much easier deployment and opens up hosting options like GitHub pages. 

### Is This Backwards Compatible With The Old Code Base?
Yes! The JSON files that you were using on with the original version of Tuxearch will work here too without any modification at all. You can just place them in the ```db/``` directory and change the configuration setting. 