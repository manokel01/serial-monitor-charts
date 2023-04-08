Arduino Communication Dashboard and Data Visualizer
====================================================

This project is a web application for communicating with serial ports. It is particularly useful for anyone working with microcontrollers like the Arduino. With the ability to connect to and read data from a serial port, it makes it easy to integrate your microcontroller with a web application or other software. Plus, the ability to visualize incoming data using a line chart can be very useful for monitoring and analyzing data in real-time. Users can select various serial port properties, such as baud rate, data bits, stop bits, and parity, and see incoming data on a line chart and a terminal window.

Getting Started
---------------

To get started with this project, you will need Node.js installed on your computer. You can download Node.js from the official website [here](https://nodejs.org/en/download/).

Once Node.js is installed, clone this repository and install the necessary dependencies by running the following command:

Copy code

`npm install`

Running the Application
-----------------------

To run the application, use the following command:

sqlCopy code

`npm start`

This will start the server on port 3000. You can access the application by opening a web browser and navigating to `http://localhost:3000`.

Usage
-----

When you first open the application, you will see a dropdown menu that allows you to select the serial port to connect to. Once you have selected a port, you can use the other dropdown menus to select the desired serial port properties, such as baud rate, data bits, stop bits, and parity.

After you have selected the desired serial port properties, click the "Open Port" button to connect to the serial port. Once connected, incoming data will be displayed on a line chart and a terminal window.

The line chart is created using the Chart.js module. It displays incoming data as a line chart with time on the X-axis and the received data on the Y-axis. The chart is updated in real time as new data is received.

The terminal window displays incoming data as plain text. It is useful for debugging purposes and for verifying that the correct data is being received.

To close the serial port connection, click the "Close Port" button.

Dependencies
------------

This project uses the following dependencies:

-   Express: A web framework for Node.js
-   Socket.IO: A library for real-time web applications
-   SerialPort: A library for serial port communication
-   Chart.js: A JavaScript library for creating charts and graphs

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.
