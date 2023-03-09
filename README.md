# IMU webserial visualiser
IMU visualiser using [quaternions](https://en.wikipedia.org/wiki/Quaternion) in [w, i, j, k] format. The ESP32 code for extracting BNO080 data can be found in the ["Bno080-examples" folder](https://github.com/MengLinMaker/IMU-webserial-visualiser/tree/main/Bno080-examples).

Made using [Three.js](https://threejs.org/), which is a WebGL wrapper, and the experimental Web Serial API. An ESP32 microctontroller interfaces with [BNO080](https://www.sparkfun.com/products/14686) IMU and streams data to the website. Data streaming test codes can be found [here](https://github.com/MengLinCoding/ESP32-data-stream-comparisons). Finally, the website is built using [Vite](https://vitejs.dev/) and uploaded to [Netlify](https://www.netlify.com/). Overall the data streaming and animation performance is capable of supporting multiple IMUs simultaneously. Judge the performance for yourself:

<h3 align="center"><a href="https://menglinmaker-imu-webserial-visualiser.netlify.app/">Live Demo!</a></h3>

<div align="center">
  <img src="https://user-images.githubusercontent.com/39476147/164896534-4bb2da95-76af-4dce-a108-a90f1e6bf53a.gif" width="400"/>
</div>

### Instructions:
**Live Visualisation Streaming**
1. Select baud rate.
2. Click connect and choose COM port.
**Recording Serial Data**
3. Choose buffer size for saving CSV (Optional).
4. Click save and enter file name to save (Optional).
Note: Choose a reasonable value for CSV buffer size: under 10^6.

# Credits
This code was modified from Mike Molinari's serialTerminal.com: https://github.com/mmiscool/serialTerminal.com
Reskinned UI and refactored the original code. Added ability to save CSV file and determine last full line, stored in "currentData".
Access the original webserial terminal here: https://www.serialterminal.com

<img src="https://img.shields.io/github/forks/menglinmaker/IMU-Webserial-Visualiser?label=forks&style=flat-square">
