#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <elapsedMillis.h>
#include <Servo.h>

const char* ssid ="skylabCodersAcademy";     //SKYLAB
const char* password = "skylabRocks";        //SKYLAB
// const char* ssid ="bivid_307C";              //Lleida
// const char* password = "71AF092F875E";       //Lleida
String id = "newWOTDevice";

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

//define time interval
elapsedMillis timeElapsed;
unsigned int interval = 5000;
String intervalStr = String(interval);

//bit to activate and desactivate the device
bool active = false;
String activeStr = "OFF";

Servo servo1;
Servo servo2;
Servo servo3;

ESP8266WebServer server(80);

void setup()
{
   //inicializa los pines de entrada y salida
   pinMode(DOut1, OUTPUT);
   pinMode(DOut2, OUTPUT);
   pinMode(motor1, OUTPUT);
   pinMode(motor2, OUTPUT);
   pinMode(Din1, INPUT);
   pinMode(Din2, INPUT);
   servo1.attach(servo1Pin);
   servo2.attach(servo2Pin);
   servo3.attach(servo3Pin);
   //inicializa el puerto serie
   Serial.begin(115200);
   delay(10);

   //Inicializa el módulo wifi
   WiFi.mode(WIFI_STA); //Establece el módulo como cliente wifi
   WiFi.disconnect();   //Se desconecta de cualquier WiFi conectado previamente
   Serial.println();
   //conecta con la red wifi
   Serial.print("Connecting to ");
   Serial.println(ssid);
   WiFi.begin(ssid, password);
   while (WiFi.status() != WL_CONNECTED)
   { // Espera por una conexión WiFi
      delay(500);
      Serial.print(".");
   }
   Serial.println("");
   Serial.println("WiFi connected");
   Serial.print("IP address: ");
   Serial.println(WiFi.localIP());

   //definimos los paths
   server.on("/don", DOut_on);
   server.on("/doff", DOut_off);
   server.on("/servo1", handleServo1);
   server.on("/servo2", handleServo2);
   server.on("/servo3", handleServo3);
   server.on("/motor1", handleMotor1);
   server.on("/motor2", handleMotor2);
   server.on("/new", writeId);
   server.on("/info", info);
   server.on("/active", activateDevice);
   server.onNotFound(no_encontrado);
   //inicializa el servidor web
   server.begin();
   Serial.println("Servidor HTTP activo");
}

void loop()
{
   server.handleClient();
   if (active == true)
   {
      if (timeElapsed > interval)
      {
         String analogBody = Analog_state();
         String digitalBody = Din_state();

         httpSend("digital", digitalBody);
         httpSend("analog", analogBody);

         timeElapsed = 0;
      }
   }
}
void httpSend(String query, String body)
{
   HTTPClient http;
   //Skylab
   http.begin("http://192.168.0.31:8080/api/devices/"+ id +"/inputs/" + query);
   //Lleida
   // http.begin("http://192.168.1.202:8080/api/devices/"+ id +"/inputs/" + query);

   http.addHeader("Content-Type", "application/json");
   int httpCode = http.POST(body);

   Serial.println("http://192.168.1.202:8080/api/devices/"+ id +"/inputs/" + query);
   String payload = http.getString();
   Serial.print("POST payload: ");
   Serial.println(payload);

   Serial.println(httpCode);
   Serial.println(payload);
   http.end();
}

void info() {
 server.send(200, "text/plain", "{\"HELLO\": \"WORLD!\", \"deviceid\":\""+ id +"\", \"interval\":\"" + intervalStr +"\", \"status\":\""+ activeStr +"\"}");
}

void activateDevice()
{
   String status = server.arg("status");
   intervalStr = server.arg("interval");

   int intervalInt = intervalStr.toInt();

   if(intervalInt < 1000){
      interval = 1000;
   }
   else
   {
      interval = intervalInt;
   }

   intervalStr = String(interval);

   if(status == "on")
   {
      active = true;
      activeStr = "ON";
      server.send(200, "application/json", "{\"deviceid\":\"" + id + "\",\"status\":\""+ activeStr +"\",\"interval\":\"" + intervalStr + "\"}");
   }
   if(status == "off")
   {
      active = false;
      activeStr = "OFF";
      server.send(200, "application/json", "{\"deviceid\":\"" + id + "\",\"status\":\""+ activeStr +"\"}");
   }
   else{
      server.send(400, "application/json", "{\"deviceid\":\"" + id + "\",\"error\":\"BAD REQUEST\"}");
   }
}

void writeId()
{
   id = server.arg("deviceid");
   server.send(200, "application/json", "{\"deviceid\":\"" + id + "\",\"status\":\"OK\"}");
}

void DOut_on(){
   String NUM = server.arg("pin");
   int num = NUM.toInt();
   switch (num)
   {
   case 1:
      digitalWrite(DOut1, HIGH);
      server.send(200, "application/json", "{\"deviceid\":\"" + id + "\",\"status\":\"ON\"}");
      break;
   case 2:
      digitalWrite(DOut2, HIGH);
      server.send(200, "application/json", "{\"deviceid\":\"" + id + "\",\"status\":\"ON\"}");
      break;
   default:
      server.send(400, "application/json", "{\"deviceid\":\"" + id + "\",\"error\":\"BAD DOUT REQUEST\"}");
   }
}

void DOut_off(){
 String NUM = server.arg("pin");
   int num = NUM.toInt();
   switch (num)
   {
   case 1:
      digitalWrite(DOut1, LOW);
      server.send(200, "text/plain", "{\"deviceid\":\"" + id + "\",\"status\":\"OFF\"}");
      break;
   case 2:
      digitalWrite(DOut2, LOW);
      server.send(200, "text/plain", "{\"deviceid\":\"" + id + "\",\"status\":\"OFF\"}");
      break;
   default:
      server.send(400, "text/plain", "{\"deviceid\":\"" + id + "\",\"error\":\"BAD DOUT REQUEST\"}");
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
  server.send(200, "application/json","{\"deviceid\":\"" + id + "\",\"status\":\"" + position + "\"}");
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
  server.send(200, "application/json","{\"deviceid\":\"" + id + "\",\"status\":\"" + position + "\"}");
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
  server.send(200, "application/json","{\"deviceid\":\"" + id + "\",\"status\":\"" + position + "\"}");
}

void handleMotor1()
{
   String val = server.arg("val");
   int percent = val.toInt();
   int vel = 2.55 * percent;
   if (vel < 0)
   {
      vel = 0;
   }
   if (vel > 255)
   {
      vel = 255;
   }
   analogWrite(motor1, vel); // PWM to motor1 (from 0 to 255)
   String velocity = String(vel);
   server.send(200, "application/json","{\"deviceid\":\"" + id + "\",\"status\":\"" + velocity + "\"}");
}

void handleMotor2()
{
   String val = server.arg("val");
   int percent = val.toInt();
   int vel = 2.55 * percent;
   if (vel < 0)
   {
      vel = 0;
   }
   if (vel > 255)
   {
      vel = 255;
   }
   analogWrite(motor2, vel); // PWM to motor2 (from 0 to 255)
   String velocity = String(vel);
   server.send(200, "application/json","{\"deviceid\":\"" + id + "\",\"status\":\"" + velocity + "\"}");
}

String Analog_state(){
   int inputVal = analogRead(analog); // Analog Values 0 to 1023
   String analogValue = String(inputVal);
   String result = "{\"deviceid\":\"" + id + "\",\"value\":\"" + analogValue + "\"}";
   Serial.println(result);
   return result;
}

String Din_state()
{
   int val1 = digitalRead(Din1);
   int val2 = digitalRead(Din2);
   String dIn2Val  = String(val1);
   String dIn1Val = String(val2);

   String result = "{\"deviceid\":\"" + id + "\",\"din1\":\"" + dIn1Val + "\",\"din2\":\"" + dIn2Val + "\"}";
   Serial.println(result);

   return result;
}

void no_encontrado() {
 server.send(404,"text/plain","{\"error\":\"NOT FOUND\"}");
}
