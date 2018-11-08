# Send IT
[![Build Status](https://travis-ci.org/jsamchineme/send-it.svg?branch=develop)](https://travis-ci.org/jsamchineme/send-it)
[![Coverage Status](https://coveralls.io/repos/github/jsamchineme/send-it/badge.svg)](https://coveralls.io/github/jsamchineme/send-it)
[![Maintainability](https://api.codeclimate.com/v1/badges/fb9ed5da54bcd9bf509e/maintainability)](https://codeclimate.com/github/jsamchineme/send-it/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fb9ed5da54bcd9bf509e/test_coverage)](https://codeclimate.com/github/jsamchineme/send-it/test_coverage)

## Description
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

# Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [Installation](#installation)

## Technologies
* HyperText Mark-up Language (HTML)
* Cascade Style Sheet (CSS)
* Javascript
* Nodejs (Express framework)
* Mocha (Test Framework)
* Chai (Assertion Library)

### Pivotal Tracker
SendIT can be found on pivotal tracker with the link below.
(https://www.pivotaltracker.com/n/projects/2218905)

### API Enpoint
The API is hosted at (https://johnnysam-sendit.herokuapp.com/api/v1)

### UI Templates
The ui templates are currently hosted on gh-pages 
(https://jsamchineme.github.io/send-it/UI/)


## Features
- Fetch all parcel delivery orders
- Fetch a specific parcel delivery order
- Fetch all parcel delivery orders by a specific user
- Cancel the specific parcel delivery order
- Create a parcel delivery order
- User Signup
- User Login


## Getting Started
### Installation
- run npm install
- You can test routes with POSTMAN
- run `npm run start` to start the server
- You can also run `npm run start:dev` to start the server in development mode 
- run `npm run test` to test the api


### API Endpoint Route 
<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>TASK</th></tr>

<tr><td>GET</td> <td>api/v1/parcel</td> <td> Fetch all parcel delivery orders</td></tr>

<tr><td>GET</td> <td>api/v1/parcel/:parcelId</td> <td> Fetch a specific parcel delivery order</td></tr>

<tr><td>GET</td> <td>api/v1/users/:userId/parcels</td> <td> Fetch all parcel delivery orders by a specific user </td></tr>

<tr><td>DELETE</td> <td>api/v1/parcel/:parcelId</td> <td> Cancel the specific parcel delivery order</td></tr> 

<tr><td>POST</td> <td>api/v1/parcel</td> <td> Create a parcel delivery order </td></tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td> <td> User Signup </td></tr>

<tr><td>POST</td> <td>api/v1/auth/login</td> <td> User Login </td></tr>


</table>

## Author
**Samuel Osuh** 
