#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 5  //D1

//const char* ssid ="skylabCodersAcademy";
//const char* password = "skylabRocks";
const char* ssid ="Orange-E00C";
const char* password = "kTpmgGXF";
const int LED = 16; //GPI16 - D0

// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature. 

DallasTemperature DS18B20(&oneWire);



ESP8266WebServer server(80);



//float getTemperature() {
//  float temp;
//  DS18B20.requestTemperatures();
//  temp = DS18B20.getTempCByIndex(0);
//  return temp;
//}

void getTemp(){
  float temp;
  DS18B20.requestTemperatures();
  temp = DS18B20.getTempCByIndex(0);
  String response = "temperature:" + String(temp);
  server.send(200, "text/plain", response);
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
 //inicializa el led
 pinMode(LED,OUTPUT);
 digitalWrite(LED,LOW);
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
 server.on("/temp",getTemp);
 server.onNotFound(no_encontrado);
 //inicializa el servidor web
 server.begin();
 Serial.println("Servidor HTTP activo");
}

void loop() {
 server.handleClient();
}
