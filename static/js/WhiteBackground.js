export default {
  whiteBg () {
    document.getElementById('white-background').style.height = document.body.clientHeight + 'px'
  },
  blackBg () {
    document.getElementById('black-background').style.height = document.body.clientHeight + 'px'
  },
  /*
   时间戳转时间
   */
  timeFn (value) {
    if (this.getY(new Date()) === this.getY(new Date(parseInt(value)))) {

      if (this.getD(new Date()) === this.getD(new Date(parseInt(value)))) {
        let time = new Date(parseInt(value)).toLocaleString().split('午')[1]
        return '今天 ' + time.substring(0, time.length - 3)
      } else {
        return this.getM(new Date(parseInt(value)))
      }
    } else {
      return this.getD(new Date(parseInt(value)))
    }
  },
  getD (date) {
    /*  return date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate()*/
    return date.getFullYear() + '.' + parseInt(date.getMonth() + 1) + '.' + date.getDate()
  },
  getM (date) {
    return parseInt(date.getMonth() + 1) + '.' + date.getDate()
  },
  getY (date) {
    return date.getFullYear()
  },
  /*
   string 字符串;
   str 指定字符;
   split(),用于把一个字符串分割成字符串数组;
   split(str)[0],读取数组中索引为0的值（第一个值）,所有数组索引默认从0开始;
   */
  // 截取指定字符串之前的字符
  getBeforStr (string, str) {
    var str_before = string.split(str)[0]
    return str_before
  },
  // 截取指定字符串之后的字符
  getAfterStr (string, str) {
    var str_after = string.split(str)[1]
    return str_after
  },
  // 数组去重
  unique (arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          arr.splice(j, 1)
          j--
        }
      }
    }
    return arr
  },
  // 截取指定字数的文字
  LimitText (txt, len) {
    if (txt.length > len){
      return txt.substr(0, len) + '...'
    } else {
      return txt.substr(0, len)
    }
  },
  imgError(image){
    image.style.display = "none"
  }
}

