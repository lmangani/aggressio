module.exports = {
  apps : [
      {
        name: "AggressIO",
        script: "index.js",
        watch: true,
        env: {
            "PORT": 3100,
            "DEBUG": false,
            "MODE": "concat",
            "SERVERS": "http://localhost:8086"
        }
      }
  ]
}
