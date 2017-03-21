/**
 * Created by osmeteor on 3/21/17.
 */
var os=require('os');
var address = require('address');
function secondsToTimeString(seconds) {
  var days   = Math.floor(seconds / 3600 / 24);
  var hours = Math.floor((seconds - (days * 24 * 3600)) / 3600);
  var minutes = Math.floor((seconds - (days * 24 * 3600) - (hours * 3600)) / 60);
  var sec = seconds - (days * 24 * 3600) - (hours * 3600) - (minutes * 60);

  sec = Math.round(sec);
  if (hours   < 10) {hours   = '0'+hours;}
  if (minutes < 10) {minutes = '0'+minutes;}
  if (sec < 10) {sec = '0'+sec;}
  return days + 'd ' + hours+':'+minutes+':'+sec;
}
var info = {
  osHostname: os.hostname(),
  osFreemem: Math.round(os.freemem()/1024/1024),
  osTotalmem: Math.round(os.totalmem()/1024/1024),
  osCpu:os.cpus(),
  osCpuArch:os.arch(),
  osCpuKernelNum:os.cpus().length,
  osCpuSpeed:os.cpus()[0].speed,//MHz
  osRelease:os.release(),
  osNetworkInterfaces:os.networkInterfaces(),
  osType:os.type(),
  osTmpDir:os.tmpDir(),
  osHomedir:os.homedir(),
  osEndianness:null,
  osPlatform:os.platform(),
  osLoadav1: os.loadavg()[0],
  osLoadav5: os.loadavg()[1],
  osLoadav15: os.loadavg()[2],
  osUptime: secondsToTimeString(os.uptime()),
  osIp: address.ip(),
  osIpV6: address.ipv6(),
  osMac:'00:00:00:00:00:00',
  procMemoryusageRss: Math.round(process.memoryUsage().rss/1024/1024),
  procMemoryusageHeaptotal: Math.round(process.memoryUsage().heapTotal/1024/1024),
  procMemoryusageHeapused: Math.round(process.memoryUsage().heapUsed/1024/1024),
  processVersions:process.versions,
  procVersionsNode: process.versions.node,
  procVersionsV8: process.versions.v8,
  procVersionsOpenssl: process.versions.openssl,
  procUptime: secondsToTimeString(process.uptime())

};
if(info.osPlatform!=="win32"){
  info.osEndianness=os.endianness()
}
module.exports=function (cb) {
  address.mac(function (err, mac) {
    if(err) cb(err)
    else{
      info.osMac=mac;
      cb(null,info)
    }
  });
};



