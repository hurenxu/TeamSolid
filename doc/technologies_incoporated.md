# Technologies Incorporated

The following document will layout the technologies adapted to make this project successful.

## Component Libraries <a name="compLib"></a> 

The JavaScript Framework we used is React.JS 

React is pretty popular in recent years, it uses a revolutionary technique to combine HTML, CSS, and JavaScript using 
JSX file format and also creates the Virtual DOM using JSX. It uses declarative views to make code more predictable 
and easily update/render. 

It’s faster than other frameworks since it uses Virtual DOM such that it will only update the DOM when necessary. 
Also since it will update the Virtual DOM before updating the actual DOM, it will has less components to be updated
and update less frequently. Based on React, we can also use React Native which is super powerful for mobile web app 
development.

## Authentication Services <a name="auSev"></a> 

The API that we used is called Passport.

Passport is a simple, unobtrusive authentication for Node.js.

Here is the link for the API: `http://www.passportjs.org/`

Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively 
dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a 
username and password, Facebook, Twitter, and more.

Passport essentially stores the credentials inside the Passport API, and make authentication based on the credentials 
it stores. It supports different kind of strategies including Username & Password, OpenID, OAuth, User Profile, 
Facebook, Twitter, etc. (different kind of APIs and different kind of providers).

## Encryption Services <a name="enSev"></a> 

The encryption service we used is Google KMS.

Cloud KMS is a cloud-hosted key management service that lets you manage encryption for your cloud services the same way you do 
on-premises. You can generate, use, rotate and destroy AES256 encryption keys. Cloud KMS is integrated with IAM and Cloud 
Audit Logging so that you can manage permissions on individual keys, and monitor how these are used. Use Cloud KMS to protect 
secrets and other sensitive data which you need to store in Google Cloud Platform.

## Chat Services <a name="chSev"></a> 

For this project we didn't adapt chat services.

We didn't see it efficient to adapt any API's into our platform, so instead we designed a User Interface for chatting
and then we stored the messages in the database. We saw this a better opportunity to invent a functional chat service 
idea rather than adapting one that was already build. This allowed us to practice resourcefullness without having to
incorporate more API's than needed.

## AD Services <a name="adServ"></a> 

The AD Service we use is Google AdSense

AdSense is an advertising placement service by Google. The program is designed for website publishers who want to 
display targeted text, video or image advertisements on website pages and earn money when site visitors view or click
the ads.

The advertisements are controlled and managed by Google and Web publishers simply need to create a free AdSense account 
and copy and paste provided code to display the ads. Revenue using AdSense is generated on a per-click or per-impression 
basis. It is free to become a verified website publisher in the Google AdSense program.
