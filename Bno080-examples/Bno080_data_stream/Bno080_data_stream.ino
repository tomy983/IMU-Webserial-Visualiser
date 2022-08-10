/*
  Name: BNO080 USB UART data streaming
  Purpose: Serial printing BNO080 IMU quaterions,acceleration and angular velocity on Esp32 at high frequencies.
  Credits: Modified BNO080 library based on Nathan Seidle: https://github.com/sparkfun/SparkFun_BNO080_Arduino_Library
  @author Meng Lin
  @version 1.0 18/04/22
*/

#include "src/TinyBNO080.h"
#include "src/IMUData.h"
//#include "SparkFun_BNO080_Arduino_Library.h"

BNO080 IMU_BNO080;
IMUdata IMU;

// Change data rate
const long frequency = 100;
const long ideal_period = round(1000000.0/frequency);

static SemaphoreHandle_t timer_sem;



void sample_timer_task(void *param)
{
  timer_sem = xSemaphoreCreateBinary();
  while (1) {
    xSemaphoreTake(timer_sem, portMAX_DELAY);
    
    IMU.update_BNO080(&IMU_BNO080, 6000);
    //IMU.printAll();
    //IMU.printQuat();
    char string_buff[128];
    sprintf(string_buff, "%f,%f,%f,%f", IMU.quat[0], IMU.quat[1], IMU.quat[2], IMU.quat[3]);
    //sprintf(string_buff, "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f", IMU.quat[0], IMU.quat[1], IMU.quat[2], IMU.quat[3],
    //IMU.acc[0], IMU.acc[1], IMU.acc[2], IMU.gyro[0], IMU.gyro[1], IMU.gyro[2]);
    Serial.println(string_buff);
    //Serial.println(timeStep());
  }
}

void IRAM_ATTR onTimer(){
  static BaseType_t xHigherPriorityTaskWoken = pdFALSE;
  xSemaphoreGiveFromISR(timer_sem, &xHigherPriorityTaskWoken);
  if( xHigherPriorityTaskWoken) {
    portYIELD_FROM_ISR(); // this wakes up sample_timer_task immediately
  }
}





void setup(){
  Serial.begin(2000000);
  
  // Define I2C_SDA and SCL pins
  Wire.begin(21, 22);
  Wire.setClock(400000);

  const unsigned char updateTime = ideal_period*0.0005;
  IMU_BNO080.begin();
  IMU_BNO080.enableRotationVector(updateTime);
  IMU_BNO080.enableAccelerometer(updateTime);
  IMU_BNO080.enableGyro(updateTime);

  // Create timer interrupt
  hw_timer_t *ticker = NULL;
  ticker = timerBegin(0, 2, true);
  timerAttachInterrupt(ticker, onTimer, true);
  timerAlarmWrite(ticker, 40*ideal_period, true);
  timerAlarmEnable(ticker);

  xTaskCreatePinnedToCore(sample_timer_task, "sample_timer", 4096, NULL, configMAX_PRIORITIES - 1, NULL, 1);
}

void loop(){
  /*
  Serial.println("\n\n");
  for(int i=0; i < 100; i++){Serial.println("Hello, my name is Bob, from Bob the builder!");}
  Serial.println("\n\n");
  vTaskDelay(50);
  //*/
}
