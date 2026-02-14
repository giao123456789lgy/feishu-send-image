#!/usr/bin/env node

/**
 * 飞书发送图片工具 (使用飞书 SDK)
 * 
 * 使用方法: node feishu-send-image.js <图片路径> <接收者ID>
 */

const lark = require('/usr/lib/node_modules/openclaw/node_modules/@larksuiteoapi/node-sdk/lib/index.js');
const Client = lark.Client;
const AppType = lark.AppType;

const FEISHU_APP_ID = 'cli_a90141262be15cb2';
const FEISHU_APP_SECRET = 'B6JDpFNC2A5Mod7fFGIU0cdLXbk04XhQ';

const client = new Client({
  appId: FEISHU_APP_ID,
  appSecret: FEISHU_APP_SECRET,
  appType: AppType.SelfBuild,
});

const fs = require('fs');
const path = require('path');

// 上传图片
async function uploadImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  
  const result = await client.im.image.create({
    data: {
      image_type: 'message',
      image: imageBuffer,
    },
  });
  
  return result.image_key;
}

// 发送图片消息
async function sendImageMessage(receiveId, imageKey) {
  const result = await client.im.message.create({
    params: {
      receive_id_type: 'open_id',
    },
    data: {
      receive_id: receiveId,
      msg_type: 'image',
      content: JSON.stringify({ image_key: imageKey }),
    },
  });
  
  return result.data?.message_id;
}

// 主函数
async function main() {
  const imagePath = process.argv[2];
  const receiveId = process.argv[3];

  if (!imagePath || !receiveId) {
    console.error('用法: node feishu-send-image.js <图片路径> <接收者ID>');
    console.error('示例: node feishu-send-image.js /root/screenshot.png ou_xxxxx');
    process.exit(1);
  }

  if (!fs.existsSync(imagePath)) {
    console.error(`图片文件不存在: ${imagePath}`);
    process.exit(1);
  }

  try {
    console.log('1. 上传图片...');
    const imageKey = await uploadImage(imagePath);
    console.log(`   image_key: ${imageKey}`);

    console.log('2. 发送图片消息...');
    const messageId = await sendImageMessage(receiveId, imageKey);
    console.log(`   发送成功! message_id: ${messageId}`);
    
    console.log('\n✅ 完成!');
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
