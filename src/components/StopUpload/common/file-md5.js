'use strict';

export default function (fileObj, callback) {
  let file = fileObj.file
  let time = new Date().getTime();
  let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  let currentChunk = 0;
  const chunkSize = 2 * 1024 * 1024;
  let chunks = Math.ceil(file.size / chunkSize);
  let spark = new SparkMD5.ArrayBuffer();
  let fileReader = new FileReader();
  loadNext();
  fileReader.onload = function (e) {
    console.log('read chunk nr', currentChunk + 1, 'of', chunks);
    spark.append(e.target.result);
    currentChunk++;
    if (currentChunk < chunks) {
        loadNext();
    } else {
        let md5 = spark.end();
        callback(fileObj, md5);
        console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
    }
  };

  fileReader.onerror = function () {
    file.cancel();
    callback('oops, something went wrong.');
  };

  function loadNext() {
    let start = currentChunk * chunkSize;
    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }

};