#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid ="skylabCodersAcademy";
const char* password = "skylabRocks";
const int LED = 16; //GPI16 - D0

ESP8266WebServer server(80);

void led_on(){
 digitalWrite(LED,HIGH);
 server.send(200, "text/plain", "LED encendido");
}

void led_off(){
 digitalWrite(LED,LOW);
 server.send(200, "text/plain", "LED apagado");
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
 server.on("/on",led_on);
 server.on("/off",led_off);
 server.onNotFound(no_encontrado);
 //inicializa el servidor web
 server.begin();
 Serial.println("Servidor HTTP activo");
}

void loop() {
 server.handleClient();
}
