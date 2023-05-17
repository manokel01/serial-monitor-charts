# SerialPort Communication Web App

This project is a web application for communicating with serial ports and displaying incoming data. It is particularly useful for anyone working with microcontrollers like the Arduino to read data from a serial port, visualize it using a line chart can be very useful for monitoring and analyzing data in real-time. Users can select various serial port properties, such as baud rate, data bits, stop bits, and parity, and see incoming data on a line chart and a terminal window.

## Features


![UI-imahe](serialport-manager-ui.png) alt="UI image" title="UI image">

- List available serial ports on the server.
- Open a serial port connection with configurable properties (baud rate, data bits, stop bits, parity).
- Receive and display real-time data from the serial port.
- Close the serial port connection.

## Prerequisites

Before running the application, make sure you have the following prerequisites installed on your system:

- Node.js (version 14 or above)
- NPM (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/manokel01/serial-monitor-node-ajax.git
    ```

2. CNavigate to the project directory:

   ```bash
   cd serial-monitor-node-ajax
    ```
3. Install the dependencies:
   ```bash
   npm install
    ```

## Dependencies

This project uses the following dependencies:

- Express: A web framework for Node.js
- Socket.IO: A library for real-time web applications
- erialPort: A library for serial port communication
- Chart.js: A JavaScript library for creating charts and graphs

## Usage

1. Start the application:
   ```bash
   node app.js
   ```
2. Open your web browser and visit http://localhost:3000.
3. Select the desired serial port from the dropdown menu.
4. Configure the serial port properties (baud rate, data bits, stop bits, parity).
5. Click the "Open Port" button to establish a connection with the selected serial port.
6. Once the port is opened, you will see the received data displayed in real-time on the webpage.
7. To close the port connection, click the "Close Port" button.

## Contributing

Contributions to the SerialPort Communication Web App are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Express - Fast, unopinionated, minimalist web framework for Node.js
- SerialPort - Node.js package for serial port communication
- Socket.IO - Real-time bidirectional event-based communication library