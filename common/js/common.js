import $axios from '../components/axios.js'
const upmsPrefix = window.config.upms

export default {
  login (data) {
    const service = {
      method: 'post',
      url: `${upmsPrefix}/user/login`
    }
    return $axios(service, data)
  },
  changePassword (data) {
    const service = {
      method: 'post',
      url: `${upmsPrefix}/user/changePassword`
    }
    return $axios(service, data)
  },
  initPwdRule (data) {
    const service = {
      method: 'post',
      url: `${upmsPrefix}/user/initPwdRule`
    }
    return $axios(service, data)
  },
  logout (data) {
    const service = {
      method: 'post',
      url: `${upmsPrefix}/user/logout`
    }
    return $axios(service, data)
  },
  getPrmList (data) {
    const service = {
      method: 'post',
      url: `${upmsPrefix}/prm/getPrmCodeList`
    }
    return $axios(service, data)
  },
  isLogon (data) {
    const service = {
      method: 'get',
      url: `${upmsPrefix}/user/isLogon`
    }
    return $axios(service, data)
  },
  // _getDropDownList (data) {
  //   // 登录页获取下拉区域道号
  //   const service = {
  //     method: `get`,
  //     url: `${URLPREFIX}/api/whiteList/initData/initSiteLaneNumber`
  //   }
  //   return $axios(service, data)
  // },
  _getKaptcha (data) {
    const service = {
      method: 'get',
      url: `${upmsPrefix}/kaptcha/captcha`
    }
    return $axios(service, data)
  },
  _getLang (data) {
    const service = {
      method: 'post',
      url: `${upmsPrefix}/i18n/vueJsonByLang`
    }
    return $axios(service, data)
  }
  // _getDeviceStatus (data, uri) {
  //   // 初始化设备状态
  //   const service = {
  //     method: 'get',
  //     url: `${URLPREFIX}/deviceStatus/${uri}`
  //   }
  //   return $axios(service, data)
  // }
}
