# Vanilla webserial terminal
Reskinned UI and refactored the original Mike Molinari's serialTerminal.com code. Added ability to save CSV file and determine last full line, stored in "currentData".
### Instructions:
1. Select baud rate.
2. Choose buffer size for saving CSV (Optional).
3. Click connect and choose COM port.
4. Click save and enter file name to save (Optional).
Note: Choose a reasonable value for CSV buffer size: under 10^6.

# IMU webserial visualiser
IMU visualiser using quaternions. This is specifically made to visualise the BNO080. The code for USB and wireless streaming of data can  be found in: https://github.com/MengLinCoding/ESP32-data-stream-comparisons. Using Three.js, which is a WebGL wrapper, the animation performance can be improved and could possibly be used for multiple IMUs simultaneously. Judge the performance for yourself:
https://user-images.githubusercontent.com/39476147/164896006-c1daddb0-5d84-46b6-a7f2-d4d93df0bfb4.mp4

# Credits
This code was modified from Mike Molinari's serialTerminal.com: https://github.com/mmiscool/serialTerminal.com

Access the original webserial terminal here: https://www.serialterminal.com
