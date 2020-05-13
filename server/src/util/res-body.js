const body = {
  code: 404,
  msg: '',
  data: null,
};
/**
 * @description 返回一个规范的数据
 * @param {number} [code=404] 业务码
 * @param {object,array,string} [data=null] 数据
 * @returns {object} {code:number,msg:string,data?}
 */
function create(code = 404, data = null) {
  let msg = '';
  const result = body;
  result.data = data;
  if (data === null) delete result.data;

  switch (code) {
    case 200: msg = 'OK';
      break;
    case 201: msg = 'Created';
      break;
    case 204: msg = 'No Content';
      break;
    case 401: msg = 'Unauthorized';
      break;
    case 403: msg = 'Forbidden';
      break;
    case 404: msg = 'Not Found';
      break;
    default: msg = 'Server Error';
  }

  result.code = code;
  result.msg = msg;
  return result;
}

module.exports = create;
