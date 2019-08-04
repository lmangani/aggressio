<img src=https://user-images.githubusercontent.com/1423657/62418287-ca177d80-b665-11e9-9dcb-3e4afcf741ab.png width=250>

Response Aggregating Hash-Ring HTTP Proxy for InfluxDB & Friends

### Motivation
Most InfluxDB "clustering" proxies actually *"shard"* and distribute or clone data and queries between nodes. Aggress-IO expects each server to have its own data, and just distributes queries across aggregating results into a unique response. 

### Usage
##### npm
```
SERVERS=http://influxdb1:8086,http://influxdb2:8086 PORT=9999 npm start
```

##### docker
```
sudo docker run \ 
-e SERVERS=http://influxdb1:8086,http://infludb2:8086 \
-e PORT=8089 \
-p 8089
--rm  hepic/aggressio:latest
```

### Diagram

![image](https://user-images.githubusercontent.com/1423657/62422351-7a5ea380-b6b1-11e9-9dda-6859aaed98d0.png)

### Status

* Experimental


