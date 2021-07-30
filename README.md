<img src=https://user-images.githubusercontent.com/1423657/62418287-ca177d80-b665-11e9-9dcb-3e4afcf741ab.png width=250>

Response Aggregating Hash-Ring HTTP Proxy for InfluxDB & Friends

### Motivation
Aggress-IO distributes queries across multiple API targets, aggregating results into a unique response.<br>
It has been tested with `InfluxDB`, `Clickhouse` and `Loki`.

#### Options
Aggress-IO can use either of the following modes to accomodate the preferred response aggregation method:
* `concat`
* `combine`
* `replace`


### Usage
##### npm
To start manually, populate the ENV variables as per example and run:
```
SERVERS=http://influxdb1:8086,http://influxdb2:8086 PORT=9999 MODE=concat npm start
```

##### pm2
To manage the service using PM2, edit the `aggressio.config.js` file with the ENV variables and run:
```
pm2 [start|restart|stop|delete] aggressio.config.js
```

##### docker
To start using Docker, populate the ENV variables as per example and run:
```
sudo docker run \ 
-e SERVERS=http://influxdb1:8086,http://infludb2:8086 \
-e PORT=8089 \
-e MODE=concat \
-p 8089
--rm  hepic/aggressio:latest
```

### Diagram

<img src=https://user-images.githubusercontent.com/1423657/62422429-f60d2000-b6b2-11e9-9a61-23ccbef4875c.png width=800>

### Status

* Experimental

### ToDo

* De-Duplicate `databases` and `retention` results in responses

