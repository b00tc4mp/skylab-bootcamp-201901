#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <elapsedMillis.h>

const char* ssid ="skylabCodersAcademy";    //SKYLAB SSID
const char* password = "skylabRocks";       //SKYLAB password

//const char* ssid ="Orange-E00C";            //bcn SSID
//const char* password = "kTpmgGXF";          //bcn password


//define send data interval
elapsedMillis timeElapsed;
unsigned int interval = 5000;
//create webserver

bool manage = false;

void setup()
{
    //inicializa el puerto serie
    Serial.begin(115200);
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
}

void loop()
{
    if (timeElapsed > interval)
    {
        HTTPClient http;
        //skylab
        http.begin("http://192.168.0.31:8080/api/wotcontrol/test");

        http.addHeader("Content-Type", "application/json");
        int httpCode = http.POST("{\"Testing\":\"client\"}");

        String payload = http.getString();
        Serial.print("POST payload: ");
        Serial.println(payload);

        Serial.println(httpCode);
        Serial.println(payload);
        http.end();
        timeElapsed = 0;
    }
}
