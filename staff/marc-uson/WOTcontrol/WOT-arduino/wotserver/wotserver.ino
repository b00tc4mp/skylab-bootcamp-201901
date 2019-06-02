#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Servo.h>

const char* ssid ="skylabCodersAcademy";
const char* password = "skylabRocks";
String id = "newArduino";

const int DOut1 = 16; //GPIO16 - D0
const int DOut2 = 05; //GPIO05 - D1
const int servo1Pin = 04; //GPIO04 - D2
const int servo2Pin = 00; //GPIO00 - D3
const int servo3Pin = 02; //GPIO02 - D4
const int Din1 = 14; //GPIO14 - D5
const int Din2 = 12; //GPIO12 - D6
const int motor1 = 13; //GPIO13 - D7
const int motor2 = 15; //GPIO15 - D8
const int analog = A0;

Servo servo1;
Servo servo2;
Servo servo3;

ESP8266WebServer server(80);

void setup() {
 //inicializa los pines de entrada y salida
 pinMode (DOut1,OUTPUT);
 pinMode (DOut2,OUTPUT);
 pinMode (motor1,OUTPUT);
 pinMode (motor2,OUTPUT);
 pinMode (Din1,INPUT);
 pinMode (Din2,INPUT);
 //inicializa el puerto serie
 Serial.begin(115200);
 delay(10);
 
 //Inicializa el módulo wifi
 WiFi.mode(WIFI_STA); //Establece el módulo como cliente wifi
 WiFi.disconnect(); //Se desconecta de cualquier WiFi conectado previamente
 Serial.println();
 //conecta con la red wifi
 Serial.print("Connecting to ");
 Serial.println(ssid);
 WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED) {   // Espera por una conexión WiFi
    delay(500);
    Serial.print(".");
 }
 Serial.println("");
 Serial.println("WiFi connected");
 Serial.print("IP address: ");
 Serial.println(WiFi.localIP());

 //definimos los paths
 server.on("/don",DOut_on);
 server.on("/doff",DOut_off);
 server.on("/servo1",handleServo1);
 server.on("/servo2",handleServo2);
 server.on("/servo3",handleServo3);
 server.on("/motor1",handleMotor1);
 server.on("/motor2",handleMotor2);
 server.on("/new",writeId);
 server.onNotFound(no_encontrado);
 //inicializa el servidor web
 server.begin();
 Serial.println("Servidor HTTP activo");
}

void loop() {
 server.handleClient();
}

void writeId()
{
   id = server.arg("deviceid");
   server.send(200, "application/json", "{\"status\":\"ok\",\"deviceid\":\"" + id + "\"}");
}

void DOut_on(){
   String NUM = server.arg("pin");
   int num = NUM.toInt();
   switch (num)
   {
   case 1:
      digitalWrite(DOut1, HIGH);
      server.send(200, "application/json", "{\"deviceid\":\"" + id + ",\"DOut1\":\"ON\"}");
      break;
   case 2:
      digitalWrite(DOut2, HIGH);
      server.send(200, "application/json", "{\"deviceid\":\"" + id + ",\"DOut2\":\"ON\"}");
      break;
   default:
      server.send(400, "application/json", "{\"deviceid\":\"" + id + ",\"error\":\"BAD DOUT REQUEST\"}");
   }
}

void DOut_off(){
 String NUM = server.arg("pin");
   int num = NUM.toInt();
   switch (num)
   {
   case 1:
      digitalWrite(DOut1, LOW);
      server.send(200, "text/plain", "{\"deviceid\":\"" + id + ",\"DOut1\":\"OFF\"}");
      break;
   case 2:
      digitalWrite(DOut2, LOW);
      server.send(200, "text/plain", "{\"deviceid\":\"" + id + ",\"DOut2\":\"OFF\"}");
      break;
   default:
      server.send(400, "text/plain", "{\"deviceid\":\"" + id + ",\"error\":\"BAD DOUT REQUEST\"}");
   }
}

void handleServo1(){
  String val = server.arg("val");
  int pos = val.toInt();
  if(pos<5){
    pos=5;
  }
  if(pos>175){
    pos=175;
  }
  servo1.write(pos);   // tell servo to go to position
  delay(15);
  Serial.print("Servo1 Angle:");
  Serial.println(pos);
  String position = String(pos);
  server.send(200, "application/json","{\"deviceid\":\"" + id + ",\"servo1\":\"" + position + "\"}");
}

void handleServo2(){
  String val = server.arg("val");
  int pos = val.toInt();
  if(pos<5){
    pos=5;
  }
  if(pos>175){
    pos=175;
  }
  servo2.write(pos);   // tell servo to go to position
  delay(15);
  Serial.print("Servo2 Angle:");
  Serial.println(pos);
  String position = String(pos);
  server.send(200, "application/json","{\"deviceid\":\"" + id + ",\"servo2\":\"" + position + "\"}");
}

void handleServo3(){

  String val = server.arg("val");
  int pos = val.toInt();
  if(pos<5){
    pos=5;
  }
  if(pos>175){
    pos=175;
  }
  servo3.write(pos);   // tell servo to go to position
  delay(15);
  Serial.print("Servo3 Angle:");
  Serial.println(pos);
  String position = String(pos);
  server.send(200, "application/json","{\"deviceid\":\"" + id + ",\"servo3\":\"" + position + "\"}");
}

void handleMotor1()
{
   String val = server.arg("val");
   int percent = val.toInt();
   int vel = 255 / percent;
   if (vel < 0)
   {
      vel = 0;
   }
   if (vel > 255)
   {
      vel = 255;
   }
   analogWrite(motor1, vel); // PWM to motor1 (from 0 to 255)
   velocity = String(vel);
   server.send(200, "application/json","{\"deviceid\":\"" + id + ",\"motor1\":\"" + velocity + "\"}");
}

void handleMotor2()
{
   String val = server.arg("val");
   int percent = val.toInt();
   int vel = 255 / percent;
   if (vel < 0)
   {
      vel = 0;
   }
   if (vel > 255)
   {
      vel = 255;
   }
   analogWrite(motor2, vel); // PWM to motor2 (from 0 to 255)
   velocity = String(vel);
   server.send(200, "application/json","{\"deviceid\":\"" + id + ",\"motor2\":\"" + velocity + "\"}");
}

void Analog_state(){
   inputVal = analogRead(analog); // Analog Values 0 to 1023
   analogValue = String(inputVal);
   String result = "{\"deviceid\":\"" + id + ",\"analog\":" + analogValue + "}";
   Serial.println(result);
}

void Din_state()
{
   String dIn1Val = digitalRead(Din1);
   String dIn2Val = digitalRead(Din2);

   String result = "{\"deviceid\":\"" + id + ",\"din1\":" + dIn1Val + ",\"din2\":" + dIn2Val + "}";
   Serial.println(result);
}

void info() {
 server.send(200, "text/plain", "{\"HELLO\": \"WORLD!\"}");
}

void no_encontrado() {
 server.send(404,"text/plain","{\"error\":\"NOT FOUND");
}