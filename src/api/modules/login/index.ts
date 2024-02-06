/**
 * @description: 登录相关API
*/

import Service from "@/api";

// 登录(获取token+路由+按钮权限)
interface loginRequestType {
  username: string;
  password: string;
}
export const loginRequest = (data: loginRequestType) => {
  // return Service({
  //     url: `/background/login`,
  //     method: 'post',
  //     data
  // })
  return {
    code: 200,
    data: {
      token:'qwertyuiopasdfghjklzxcvbnm',
      userInfo:{
        username:'admin'
      }
    },
    message:'success'
  };
};

// 退出登录
export const loginOutRequest = () => {
  // return Service({
  //   url: `/background/logout`,
  //   method: 'post',
  // });
  return {
    code: 200,
    data: null,
    message:'success'
  };
};