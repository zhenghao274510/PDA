export default {
  split (data) {
    let result = {}
    if (data.indexOf('?') !== -1) {
      let splitData = data.split('?')
      result.message = splitData[0]

      let params = splitData[1]
      let arr = params.split('&')
      let param = {}

      // 将每一个数组元素以=分隔并赋给obj对象
      for (let i = 0; i < arr.length; i++) {
        let tmpArr = arr[i].split('=')
        param[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1])
      }
      result.param = param
    } else {
      result.message = data
    }
    return result
  }
}
