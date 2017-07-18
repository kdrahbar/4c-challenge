#FB post monitor

###Introduction
This application should give you a taste of the tools and methodologies that we commonly work with. It is a contrived app that allows you to view and delete comments that have been made upon your Facebook wall posts.

###Scope
It touches upon the following key topics and frameworks:

* Javascript SPA development  
  * Ember.js
* 3rd party API integration
  * Facebook javascript SDK
  * breeze.js (client-side data management)
* AMD
  * require.js

###Setup
We have taken care of the basics, including

  * configuring the require.js environment
  * instantiating the Ember application
  * defining the app's routes
  * integrating the Facebook javascript SDK
  * creating the breeze.js data context
  * creating the post browser UI

So all you have to do to get things setup is to

* install [node.js](http://nodejs.org)
* alias the test.local domain to localhost, so that your browser resolves test.local to localhost.
* run the following commands in the project's directory:  
`npm install`  
`node server.js`
* point your browser to [http://test.local:3000](http://test.local:3000)

You should be able to click the Facebook login button at the top right of the screen, authorize the "Voxsup test" app to read and publish your stream, and see a list of your recent Facebook posts.

###Goal

What's left to do is to flesh out the post comments route. When you click on a particular post, you should be shown a list of recent comments for that post, and have the option to delete a comment with the click of a button.

When you are done, just run
tar czvf /path/to/project --exclude node_modules voxsup_starter.tgz

and email the resulting tarball to careers@voxsupinc.com
