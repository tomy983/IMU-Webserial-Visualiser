# IMU webserial visualiser
IMU visualiser using [quaternions](https://en.wikipedia.org/wiki/Quaternion) in [w, i, j, k] format. This arduino code for extracting BNO080 data can be found in the ["ESP32" folder](). The code for USB and wireless streaming of data can  be found in: https://github.com/MengLinCoding/ESP32-data-stream-comparisons.

Made using Three.js, which is a WebGL wrapper, and the experimental Web Serial API. The program is created using Vite. Overall the data streaming and animation performance is capable of supporting multiple IMUs simultaneously. Judge the performance for yourself:

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
