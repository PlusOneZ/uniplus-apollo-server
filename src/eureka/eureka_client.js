// Or, if you're not using a transpiler:
const Eureka = require('eureka-js-client').Eureka;
const ip = require("ip");

const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '112.124.59.163');
const eurekaPort = 31011;
const hostName = (process.env.HOSTNAME || 'localhost')
const ipAddr = ip.address();

registerWithEureka = function (appName, PORT) {
    const client = new Eureka({
        instance: {
            app: appName,
            hostName: hostName,
            ipAddr: ipAddr,
            port: {
                '$': PORT,
                '@enabled': 'true',
            },
            vipAddress: appName,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        //retry 10 time for 3 minute 20 seconds.
        eureka: {
            host: eurekaHost,
            port: eurekaPort,
            servicePath: '/eureka/apps/',
            maxRetries: 10,
            requestRetryDelay: 2000,
        },
    })

    client.logger.level('debug')

    client.start(error => {
        console.log(error || "service registered")
    });

    function exitHandler(options, exitCode) {
        if (options.cleanup) {
        }
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) {
            client.stop();
        }
    }

    client.on('deregistered', () => {
        process.exit();
        console.log('after deregistered');
    })

    client.on('started', () => {
        console.log("eureka host  " + eurekaHost);
    })

    process.on('SIGINT', exitHandler.bind(null, {exit: true}));
    return client
};

exports.registerWithEureka = registerWithEureka

const client = registerWithEureka("apollo-server", 4000)

exports.eurekaClient = client

let gateway = {ip: null, observers: [] }
let ownIp = "http://" + "112.124.59.163" + ":31012/"

Object.defineProperty(gateway, "ip", {
        configurable: false,
        get: function () {
            return ownIp;
        },
        set: function (value) {
            // console.log("调用回调")
            if (value) {
                ownIp = value
                for (let i = 0; i < gateway.observers.length; i++) {
                    gateway.observers[i].setUrl(ownIp)
                }
            }
        }
    }
);

// setInterval(() => {
//     let gatewayService = client.getInstancesByAppId('GATEWAY');
//     if (gatewayService[0].ipAddr) {
//         gateway.ip = "http://" + /*gatewayService[0].ipAddr*/ "112.124.59.163" + ":31012/"
//         // console.log("成功获取ip: ", gateway.ip)
//     } else {
//         console.log("Didn't get gateway's ip address");
//     }
// }, 5000)

exports.gateway = gateway