#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "WIFI_NAME";
const char* password = "WIFI_PASS";
const char* mqttServer = "broker.hivemq.com";
const int mqttPort = 1883;
const char* deviceId = "esp32_xxx";
const char* deviceToken = "generated_token";
WiFiClient wifiClient; PubSubClient mqtt(wifiClient);

void onMessage(char* topic, byte* payload, unsigned int len){ /* parse command JSON and toggle relays */ }

void reconnect(){ while(!mqtt.connected()){ if(mqtt.connect(deviceId, deviceId, deviceToken)){ mqtt.subscribe((String("devices/")+deviceId+"/commands").c_str()); } delay(2000);} }

void setup(){ Serial.begin(115200); WiFi.begin(ssid,password); while(WiFi.status()!=WL_CONNECTED){ delay(500);} mqtt.setServer(mqttServer,mqttPort); mqtt.setCallback(onMessage); }

void loop(){ if(!mqtt.connected()) reconnect(); mqtt.loop();
  static unsigned long last=0; if(millis()-last>5000){
    String t = String("{\"temperature\":26.4,\"humidity\":71,\"relay1\":true,\"voltage\":12.3,\"token\":\"")+deviceToken+"\"}";
    mqtt.publish((String("devices/")+deviceId+"/telemetry").c_str(), t.c_str());
    mqtt.publish((String("devices/")+deviceId+"/status").c_str(), "{\"online\":true}");
    last=millis();
  }
}
