//首页
import request from '@/utils/axios';

//轮播图
export function getSlider(params){
	return request({
		url: 'api/Banner',
		method: 'get',
		params: params
	});
};

//列表
export function getList(params){
	return request({
		url: 'api/Vote',
		method: 'get',
		params: params
	})
};

//投票按钮
export function castVote(params){
	return request({
		url: 'api/Vote/castVote',
		method: 'post',
		data: params
	})
};

//图片上传
export function upload(params){
  return request({
      url: 'api/Upload/upload',
      method: 'post',
      data: params
  })
};

//新增用户
export function store(params){
	return request({
		url: 'api/Vote',
		method: 'post',
		data: params
	})
};
