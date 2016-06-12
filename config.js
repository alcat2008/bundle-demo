var outLine = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://114.55.16.46:80/fas',   //dev
  ImHost:'114.55.16.46:3000'//dev
};

var developConfigDocker2 = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://192.168.64.152:8080/fas',   //dev
  ImHost:'192.168.64.152:3000'//dev
};

var developConfigDocker = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://192.168.64.152:8080/fas',   //dev
  ImHost:'192.168.61.84:4000'//dev
};

var developConfig = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://192.168.64.152:8080/fas',   //dev
  ImHost:'192.168.61.84:4000'//dev
};

var uncleConfig = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://192.168.64.245:9081',   //dev
  //Host: 'http://192.168.64.205:9102/fas',   //dev
  ImHost:'192.168.64.224:3000',//dev
  ImageHost: 'http://img.izirong.com/',
  ImageBkt: 'wuhan-fas-img',
  ImageAk: 'iCduUao0AIuRdTqd3_4oqwzU8doDU3vh0sMF1CzD',
  ImageSk: 'UtrtzaV8CAXgRkajynOnghX24NrS70Qs0RJozPcZ',
  ImageSize50:'?imageView2/1/w/50/h/50/interlace/1',
  ImageSize100:'?imageView2/1/w/100/h/100/interlace/1',
  ImageSizeOrigin:'?imageView2/1/interlace/1'
};

var shuaiConfig = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://192.168.64.209:9081/fas',   //dev
  //Host: 'http://192.168.64.205:9102/fas',   //dev
  ImHost:'192.168.99.100:3000'//dev
};

var qaConfig = {
  Dev: false,
  //Host: 'http://192.168.64.205:9101/fas',     //qa
  Host: 'http://192.168.64.205:9101/fas',     //qa
  ImHost:'192.168.61.84:4000'//qa
};

var productConfig = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://114.55.16.46:80',
  ImHost: '114.55.16.46:3000',
  ImageHost: 'http://img.izirong.com/',
  ImageBkt: 'wuhan-fas-img',
  ImageAk: 'iCduUao0AIuRdTqd3_4oqwzU8doDU3vh0sMF1CzD',
  ImageSk: 'UtrtzaV8CAXgRkajynOnghX24NrS70Qs0RJozPcZ',
  ImageSize50:'?imageView2/1/w/50/h/50/interlace/1',
  ImageSize100:'?imageView2/1/w/100/h/100/interlace/1',
  ImageSizeOrigin:'?imageView2/1/interlace/1'
};
var ppConfig = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://121.40.51.79:8081',
  ImHost: '121.40.51.79:3000',
  ImageHost: 'http://img.izirong.com/',
  ImageBkt: 'wuhan-fas-img',
  ImageAk: 'iCduUao0AIuRdTqd3_4oqwzU8doDU3vh0sMF1CzD',
  ImageSk: 'UtrtzaV8CAXgRkajynOnghX24NrS70Qs0RJozPcZ',
  ImageSize50:'?imageView2/1/w/50/h/50/interlace/1',
  ImageSize100:'?imageView2/1/w/100/h/100/interlace/1',
  ImageSizeOrigin:'?imageView2/1/interlace/1'
};

var lyuConfig = {
  Dev: true, // Switch for log. true means print.
  Host: 'http://192.168.64.171:9081/fas',
  ImHost: '192.168.64.205:6379'
};

var Config = ppConfig;

module.exports = Config;
//module.exports = function () {
//  //switch(process.env.NODE_ENV){
//  //  case 'develop':
//  //    return developConfig;
//  //  case 'product':
//  //    return productConfig;
//  //  default :
//  //    return productConfig;
//  //}
//  return {...developConfig};
//};

