<img src=https://user-images.githubusercontent.com/1423657/62418287-ca177d80-b665-11e9-9dcb-3e4afcf741ab.png width=250>

Response Aggregating Hash-Ring HTTP Proxy for InfluxDB & Friends

### Motivation
Most InfluxDB "clustering" proxies actually *"shard"* and distribute or clone data and queries between nodes. Aggress-IO expects each server to have its own data, and just distributes queries across aggregating results into a unique response. 

### Usage
```
SERVERS=http://influxdb1:8086,http://influxdb2:8086 PORT=9999 npm start
```


### Status

* Experimental


