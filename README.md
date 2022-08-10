# Vanilla webserial terminal
Reskinned UI and refactored the original Mike Molinari's serialTerminal.com code. Added ability to save CSV file and determine last full line, stored in "currentData".
### Instructions:
1. Select baud rate.
2. Choose buffer size for saving CSV (Optional).
3. Click connect and choose COM port.
4. Click save and enter file name to save (Optional).
Note: Choose a reasonable value for CSV buffer size: under 10^6.

# IMU webserial visualiser
IMU visualiser using quaternions, made using Three.js and the experimental Web Serial API.The program is created using Vite. This is specifically made to visualise the BNO080. The code for USB and wireless streaming of data can  be found in: https://github.com/MengLinCoding/ESP32-data-stream-comparisons. Using Three.js, which is a WebGL wrapper, the animation performance can be improved and could possibly be used for multiple IMUs simultaneously. Judge the performance for yourself:

<h3 align="center">Live Demo!<h3>

<div align="center">
  <img src="https://user-images.githubusercontent.com/39476147/164896534-4bb2da95-76af-4dce-a108-a90f1e6bf53a.gif" width="400"/>
</div>


# Credits
This code was modified from Mike Molinari's serialTerminal.com: https://github.com/mmiscool/serialTerminal.com

Access the original webserial terminal here: https://www.serialterminal.com
