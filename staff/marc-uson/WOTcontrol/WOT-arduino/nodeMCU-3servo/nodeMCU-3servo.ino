#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Servo.h>

#define Servo1Pin 14  //D5
#define Servo2Pin 12  //D6
#define Servo3Pin 13  //D7
#define LED 16        //D0 and onboard led

//const char* ssid ="skylabCodersAcademy";    //SKYLAB SSID
//const char* password = "skylabRocks";       //SKYLAB password

const char* ssid ="Orange-E00C";    //bcn SSID
const char* password = "kTpmgGXF";       //bcn password

Servo servo1;
Servo servo2;
Servo servo3;

ESP8266WebServer server(80);

void handleServo1(){
  digitalWrite(LED,LOW);
  String POS = server.arg("POS");
  int pos = POS.toInt();
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
  digitalWrite(LED,HIGH);
  server.send(200, "text/plane","servo1 ok");
}

void handleServo2(){

  digitalWrite(LED,LOW);
  String POS = server.arg("POS");
  int pos = POS.toInt();
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
  digitalWrite(LED,HIGH);
  server.send(200, "text/plane","servo2 ok");
}

void handleServo3(){
  digitalWrite(LED,LOW);
  String POS = server.arg("POS");
  int pos = POS.toInt();
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
  digitalWrite(LED,HIGH);
  server.send(200, "text/plane","servo3 ok");
}

void info() {
 server.send(200, "text/plain", "Hola mundo!");
}

void no_encontrado() {
 server.send(404,"text/plain","Error en la petición");
}

void setup() {
  //inicializa el puerto serie
  Serial.begin(115200);
  delay(10);
  pinMode(LED,OUTPUT);
  digitalWrite(LED,LOW);
  //inicializa el led
  servo1.attach(Servo1Pin);
  servo2.attach(Servo2Pin);
  servo3.attach(Servo3Pin);
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
  digitalWrite(LED,HIGH);
  //definimos los paths
  server.on("/srv1",handleServo1);    //al recivir /srv1 a traves de GET ejecuta handleServo
  server.on("/srv2",handleServo2);    //al recivir /srv1 a traves de GET ejecuta handleServo
  server.on("/srv3",handleServo3);    //al recivir /srv1 a traves de GET ejecuta handleServo

  server.onNotFound(no_encontrado);
  //inicializa el servidor web
  server.begin();
  Serial.println("Servidor HTTP activo");
}

void loop() {
  server.handleClient();
}
