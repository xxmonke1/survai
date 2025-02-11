const express = require("express");
const cors = require("cors");
const request = require("request");
const path = require("path");

const app = express();
app.use(cors({
  origin: ['https://surv-ai.org', 'https://survai.pages.dev'],
  methods: ['GET', 'POST', 'OPTIONS']
}));

// Your existing camera feeds array
const cameraFeeds = [
"http://66.27.116.187/mjpg/video.mjpg",
"http://166.167.10.120/mjpg/video.mjpg",
"http://97.86.89.114:2222/mjpg/video.mjpg",
"http://128.91.138.17/mjpg/video.mjpg",
"http://73.186.108.119:1024/mjpg/video.mjpg",
"http://24.35.210.66:81/mjpg/video.mjpg",
"http://174.141.163.166:8080/mjpg/video.mjpg",
"http://204.93.117.45/mjpg/video.mjpg",
"http://23.226.88.253/mjpg/video.mjpg",
"http://23.30.50.78:8010/mjpg/video.mjpg",
"http://216.107.197.101:8086/mjpg/video.mjpg",
"http://45.21.253.117:8000/mjpg/video.mjpg",
"http://217.180.234.228/mjpg/video.mjpg",
"http://24.154.94.123/mjpg/video.mjpg",
"http://73.116.58.150/mjpg/video.mjpg",
"http://96.234.122.30:1025/mjpg/video.mjpg",
"http://70.172.179.183/mjpg/video.mjpg",
"http://166.156.253.4/mjpg/video.mjpg",
"http://50.96.119.243:8005/mjpg/video.mjpg",
"http://107.12.0.236:8082/mjpg/video.mjpg",
"http://67.140.42.69:8001/mjpg/video.mjpg",
"http://50.89.192.124:9090/mjpg/video.mjpg",
"http://69.27.189.102:8334/mjpg/video.mjpg",
"http://128.146.135.226/mjpg/video.mjpg",
"http://208.193.47.61/mjpg/video.mjpg",
"http://66.19.242.119/mjpg/video.mjpg",
"http://192.208.59.207:81/videostream.cgi?user=admin&pwd=",
"http://98.252.192.243/videostream.cgi?user=admin&pwd=",
"http://108.11.186.241:8080/videostream.cgi?user=admin&pwd=",
"http://76.189.43.216/videostream.cgi?user=admin&pwd=",
"http://71.9.90.43/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&COUNTER",
"http://96.236.135.84:5005/videostream.cgi?user=admin&pwd=",
"http://47.49.246.142/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&COUNTER",
"http://149.143.38.229/videostream.cgi?user=admin&pwd=",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&COUNTER",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&COUNTER",
"http://104.239.103.120:1025/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&COUNTER",
"http://208.53.198.105:85/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&COUNTER",
"http://61.115.115.49:8081/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://61.115.115.49:8082/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://118.243.25.164/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://220.254.72.200/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127481",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127482",
"http://220.254.72.200/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127482",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127484",
"http://220.254.72.200/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127485",
"http://220.254.72.200/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127487",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127488",
"http://220.254.72.200/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127489",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127490",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127491",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127492",
"http://220.254.72.200/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127494",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127494",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127495",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127496",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127497",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127500",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127500",
"http://210.128.188.40/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://203.135.192.190:8080/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://203.99.226.188/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127502",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127503",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127504",
"http://210.128.188.41/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://182.171.234.126/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://118.21.116.47/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127507",
"http://59.146.77.13/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://60.33.230.11/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://61.206.12.233/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://122.210.228.195/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://180.43.40.161/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://182.171.246.61:82/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://202.142.12.37/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://203.99.227.24/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://203.141.204.86/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.13/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.3/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.11/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.167.76.204/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.128.188.39/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.8/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.16/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.17/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://221.118.193.41:8080/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://219.103.63.52/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://122.212.193.171/mjpg/video.mjpg",
"http://222.151.227.102/mjpg/video.mjpg",
"http://220.254.170.14/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.15/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.9/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.155.201.15:81/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://150.42.59.1:8081/axis-cgi/mjpg/video.cgi?camera=&resolution=640x480",
"http://150.42.59.1:8082/axis-cgi/mjpg/video.cgi?camera=&resolution=640x480",
"http://211.129.182.75:50001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://219.101.88.67:60001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.136.200.86/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://219.101.88.114:60001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.190.104.3/oneshotimage1?0",
"http://210.190.104.4/oneshotimage1?0",
"http://202.87.238.166/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://110.4.252.203/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.144.208/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://221.189.116.218:60001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://118.21.101.221:81/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.7/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.190.104.6/oneshotimage1?0",
"http://202.142.10.248/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://118.21.97.251/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.12/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://118.21.109.45:50000/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.170.18/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://118.21.109.46:50000/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://202.229.224.102:84/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://203.141.204.87/mjpg/video.mjpg",
"http://61.194.34.89/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://219.117.218.85/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.157.141.232/mjpg/video.mjpg",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127508",
"http://218.219.228.113/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127506",
"http://61.44.104.86/mjpg/video.mjpg",
"http://203.141.198.244/oneshotimage1?0",
"http://210.146.59.233:50000/oneshotimage1?0",
"http://61.211.241.238/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://118.21.50.204/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.146.59.233:50000/oneshotimage1?1736127552",
"http://219.121.33.21/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://211.12.215.21/oneshotimage1?0",
"http://118.21.50.204/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1736127553",
"http://61.206.116.29:50000/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://126.127.14.35/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://202.142.12.41/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://124.247.184.20/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://61.211.241.238/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1736127556",
"http://124.247.184.19/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://210.167.113.225:50001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://203.141.205.184/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://124.247.184.19/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127557",
"http://124.247.184.20/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127558",
"http://203.141.205.183/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://203.79.59.84:81/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://210.167.113.225:50001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127559",
"http://61.194.31.179/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1736127559",
"http://203.141.205.183/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127560",
"http://203.141.205.184/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127560",
"http://153.142.88.81:50001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.142.88.80:50001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://221.118.193.67:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://210.185.132.57:8081/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.142.88.80:50001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127565",
"http://221.118.193.67:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127566",
"http://124.247.184.18/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://210.185.132.57:8081/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127567",
"http://153.142.88.79:50001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127567",
"http://220.96.208.216:8082/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://118.21.145.177/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.142.27.168/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://210.154.137.87:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://124.247.184.18/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127569",
"http://153.142.27.168/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127570",
"http://220.96.208.216:8082/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127570",
"http://118.21.145.177/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127572",
"http://153.234.167.49:81/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736127545",
"http://124.247.184.17/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://124.247.184.17/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127619",
"http://220.96.208.216:8082/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127620",
"http://210.154.137.87:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127621",
"http://118.21.145.177/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127622",
"http://153.142.27.168/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127625",
"http://210.154.137.87:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127625",
"http://210.154.137.87:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127627",
"http://210.154.137.87:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127632",
"http://219.117.218.85:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://210.185.132.57:8082/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://27.121.163.77:8001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://120.51.26.100:81/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.185.132.57:8083/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://183.77.127.87:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.142.126.114:60001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://202.231.70.120/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://118.21.109.43:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://221.118.193.49:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://124.219.171.54:10000/snap.jpg?JpegSize=M&JpegCam=1&r=0",
"http://115.179.110.55/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://211.0.135.133/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://61.126.185.251/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://218.45.197.72/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://222.230.107.76/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://222.230.107.78/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://121.83.134.101/oneshotimage1?0",
"http://210.161.174.122/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://219.127.113.142/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://183.77.121.171:8081/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://59.190.191.178:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://221.189.0.181/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://124.219.173.212/mjpg/video.mjpg",
"http://220.254.144.225/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.144.230:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://211.125.148.249:81/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://61.45.39.252:6001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://220.254.170.10/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://220.254.147.11/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://202.142.10.11/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://221.118.193.12:8080/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://180.148.146.13/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.156.224.16/mjpg/video.mjpg",
"http://210.248.127.20/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.248.127.19/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.155.217.20/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://210.248.127.21/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.248.127.18/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://219.121.8.22:50001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://203.99.224.26/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://58.94.98.44:8080/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://218.45.5.58/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://58.94.98.44/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://218.45.5.56/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.226.45.57:8081/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://61.194.31.178/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://203.112.62.227:8081/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://203.112.62.227:8083/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://210.185.132.57:8082/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127673",
"http://203.112.62.227:8082/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://210.146.59.240:50000/oneshotimage1?0",
"http://218.45.5.59/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://218.45.5.57/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.226.45.57:8082/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://202.213.110.84/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://202.245.13.81/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://202.213.110.83/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://114.179.205.142/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.156.184.20:81/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://153.156.184.20:82/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.149.154.239/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://61.115.127.35:6001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.124.168.61:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.156.184.20:81/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1736127684",
"http://153.124.168.62:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://183.76.170.60:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://153.124.168.61:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127685",
"http://202.174.60.121/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://61.213.89.122:8084/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://122.249.120.132/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://183.76.170.60:8080/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127687",
"http://210.225.2.134/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://180.62.168.143:8082/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://114.179.205.143/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://61.115.127.35:6001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736127691",
"http://61.214.230.147/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://121.117.161.147/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://14.160.87.118:82/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://202.245.13.81/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://50.248.1.46:8000/mjpg/video.mjpg",
"http://80.32.125.254:8080/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://91.192.168.58:8080/mjpg/video.mjpg",
"http://61.246.194.45:8080/cgi-bin/viewer/video.jpg?r=0",
"http://58.94.98.44/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://62.131.207.209:8080/cam_1.cgi",
"http://www.insecam.org/static/no.jpg",
"http://61.194.31.178/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://61.246.194.45:8080/cgi-bin/viewer/video.jpg?r=1736131726",
"http://178.151.205.191:81/IMAGE.JPG",
"http://190.210.250.149:91/mjpg/video.mjpg",
"http://114.179.205.142/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://158.58.130.148/mjpg/video.mjpg",
"http://120.51.16.164/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://181.57.169.89:8080/mjpg/video.mjpg",
"http://220.254.72.200/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://220.254.144.230:50000/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://85.220.149.7/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://202.56.51.237:8888/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://83.56.31.69/mjpg/video.mjpg",
"http://202.56.51.237:8888/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736131740",
"http://153.156.224.16/mjpg/video.mjpg",
"http://80.61.63.103:81/cam_1.cgi",
"http://73.219.243.108:85/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://195.223.180.50/cam_1.cgi",
"http://79.8.83.39/oneshotimage1?0",
"http://190.18.11.11:81/cgi-bin/viewer/video.jpg?r=0",
"http://187.237.251.183/snap.jpg?JpegSize=M&JpegCam=1&r=0",
"http://84.232.147.36:8080/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://190.8.136.209:8001/cgi-bin/viewer/video.jpg?r=0",
"http://61.246.194.45/cgi-bin/viewer/video.jpg?r=0",
"http://190.8.136.209:8001/cgi-bin/viewer/video.jpg?r=1736131746",
"http://203.181.0.118:6003/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://183.82.102.243:89/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://77.89.48.24:89/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://201.144.24.221/mjpg/video.mjpg",
"http://61.246.194.45/cgi-bin/viewer/video.jpg?r=1736131749",
"http://115.165.145.110:81/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.248.127.20/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://181.171.25.136/tmpfs/auto.jpg?COUNTER",
"http://75.149.26.30:1024/cam_1.cgi",
"http://79.120.134.229:8080/cam_1.cgi",
"http://109.233.191.130:8080/cam_1.cgi",
"http://201.174.12.243:1024/mjpg/video.mjpg",
"http://88.28.202.117:8084/cgi-bin/viewer/video.jpg?r=0",
"http://183.82.102.243:83/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://181.133.80.199:89/mjpg/video.mjpg",
"http://117.215.128.17:86/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://109.202.162.108:81/webcapture.jpg?command=snap&channel=1?0",
"http://45.13.210.86:8083/mjpg/video.mjpg",
"http://220.157.222.110:8001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://14.160.87.118:82/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736131759",
"http://107.220.19.6:8080/?action=stream",
"http://220.157.222.110:8001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1736131760",
"http://220.157.222.110:8001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1736131761",
"http://182.171.234.126/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://190.15.193.92:8083/img/video.mjpeg",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=0",
"http://118.243.25.164/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://198.71.120.207:8080/cam_1.cgi",
"http://212.107.227.117:8081/cam_1.cgi",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131772",
"http://200.54.42.126:8090/mjpg/video.mjpg",
"http://190.208.32.76:90/videostream.cgi?user=admin&pwd=",
"http://220.254.72.199/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://60.40.34.128:8084/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://117.215.128.17:88/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://87.139.9.247/mjpg/video.mjpg",
"http://213.144.145.239:8090/cam_1.cgi",
"http://217.63.79.153:8081/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://71.249.87.61/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://27.117.130.158:8000/webcapture.jpg?command=snap&channel=1?0",
"http://173.167.10.225/mjpg/video.mjpg",
"http://93.118.100.120/cgi-bin/viewer/video.jpg?r=0",
"http://89.104.109.62:8081/mjpg/video.mjpg",
"http://201.236.147.2:8080/cam_1.cgi",
"http://81.45.179.112:8080/video/mjpg.cgi",
"http://2.136.2.155:8080/cgi-bin/viewer/video.jpg?r=0",
"http://45.13.210.86:8082/mjpg/video.mjpg",
"http://85.193.230.144:81/webcapture.jpg?command=snap&channel=1?0",
"http://190.54.107.61:86/mjpg/video.mjpg",
"http://200.46.196.243/mjpg/video.mjpg",
"http://166.247.77.253:81/mjpg/video.mjpg",
"http://218.45.197.72/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://92.154.48.50:8083/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131788",
"http://114.179.94.41:81/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://210.167.113.225:50001/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://91.231.166.180:86/mjpg/video.mjpg",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131790",
"http://177.52.31.193:8081/webcapture.jpg?command=snap&channel=1?0",
"http://166.165.9.97:8082/snap.jpg?JpegSize=M&JpegCam=1&r=0",
"http://45.230.116.178:9000/webcapture.jpg?command=snap&channel=1?0",
"http://181.39.25.74:50001/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131793",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131796",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131799",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131802",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131806",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131810",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131813",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131816",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131819",
"http://185.98.0.130:8080/mjpg/video.mjpg",
"http://182.171.234.126/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1736131820",
"http://185.98.0.130/mjpg/video.mjpg",
"http://212.39.117.174:8080/mjpg/video.mjpg",
"http://212.39.117.154:8888/mjpg/video.mjpg",
"http://190.187.25.25:8001/cgi-bin/viewer/video.jpg?r=1736131822",
"http://195.222.51.206/mjpg/video.mjpg",
"http://212.39.117.174:8888/mjpg/video.mjpg",
"http://182.171.234.126/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;1736131824",
"http://107.12.0.236:8082/mjpg/video.mjpg",
"http://67.140.42.69:8001/mjpg/video.mjpg",
"http://69.27.189.102:8334/mjpg/video.mjpg",
"http://128.146.135.226/mjpg/video.mjpg",
"http://50.79.36.69:8333/mjpg/video.mjpg",
"http://66.19.242.119/mjpg/video.mjpg",
"http://208.193.47.61/mjpg/video.mjpg",
"http://38.51.68.47/videostream.cgi?user=admin&pwd=",
"http://98.252.192.243/videostream.cgi?user=admin&pwd=",
"http://108.11.186.241:8080/videostream.cgi?user=admin&pwd=",
"http://149.143.38.229/videostream.cgi?user=admin&pwd=",
"http://76.189.43.216/videostream.cgi?user=admin&pwd=",
"http://96.236.135.84:5005/videostream.cgi?user=admin&pwd=",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://65.76.100.63:85/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://208.53.198.105:85/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://98.224.96.138:70/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://97.69.209.16:9191/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://104.239.103.120:1025/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://99.33.196.220:2223/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://69.203.84.73:82/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&0",
"http://184.105.97.6/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://162.191.50.11:82/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://96.78.169.121:8001/webcapture.jpg?command=snap&channel=1?0",
"http://162.191.11.144:8000/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://162.191.50.11:81/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://96.47.119.174:82/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://98.174.113.46:82/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://72.234.42.184:50000/mjpg/video.mjpg",
"http://99.58.111.42/snap.jpg?JpegSize=M&JpegCam=1&r=0",
"http://216.99.126.110/mjpg/video.mjpg",
"http://173.164.213.201:8083/SnapshotJPEG?Resolution=640x480&amp;Quality=Clarity&amp;0",
"http://65.26.102.42:8081/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;0",
"http://166.144.239.128:81/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER",
"http://23.114.74.201:8001/webcapture.jpg?command=snap&channel=1?0",
"http://166.143.28.201:8081/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131913",
"http://50.251.230.5/jpg/image.jpg?0",
"http://67.61.139.162:8080/jpg/image.jpg?0",
"http://66.215.136.18:8001/webcapture.jpg?command=snap&channel=1?0",
"http://98.147.54.22:8001/webcapture.jpg?command=snap&channel=1?0",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131925",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131926",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131927",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131928",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131929",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131930",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131931",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131932",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131933",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131934",
"http://208.53.198.105:85/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131934",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131935",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131936",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131937",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131938",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131939",
"http://50.46.6.255:5000/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1736131940",
"http://96.47.119.174:82/cgi-bin/camera?resolution=640&amp;quality=1&amp;Language=0&amp;1736131954",
"http://75.112.36.194/mjpg/video.mjpg",
"http://61.98.42.78:5000/webcapture.jpg?command=snap&channel=1?0",
"http://91.247.124.105:8081/cgi-bin/snapshot.cgi?0",
"http://203.80.236.56:8080/?action=stream",
"http://24.23.252.90/jpg/image.jpg?0",
"http://91.247.124.105:8081/cgi-bin/snapshot.cgi?1736131963",
"http://87.248.168.168:8082/webcapture.jpg?command=snap&channel=1?0"
];

// Add this new proxy endpoint
app.get("/proxy/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const cameraUrl = cameraFeeds[id];
    if (!cameraUrl) {
        return res.status(404).send("Camera not found");
    }
    request(cameraUrl).pipe(res);
});

// Modified random camera endpoint
app.get("/random-camera", (req, res) => {
    const randomId = Math.floor(Math.random() * cameraFeeds.length);
    res.json({ 
        id: randomId,
        proxyUrl: `/proxy/${randomId}`
    });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});