import { MessageBox, Toast, Indicator } from 'mint-ui'
import { isContext } from 'vm';

export function getRedirectPath({type, avatar}) {
  // 根据用户信息 返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusInfo
  let url = (type === 'boss') ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function showIndicator(text) {
  return Indicator.open(text);;
}

export function showToast(text,isContext) {
  return Toast({
    message: text,
    iconClass: isContext,
    duration: 2000
  });
}

export function showConfirm(text) {
  return MessageBox.confirm(text);
}