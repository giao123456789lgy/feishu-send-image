# feishu-send-image Skill

发送图片到飞书。

## 使用方法

```
feishu-send-image <图片路径> <接收者ID>
```

## 参数

- `图片路径`: 本地图片文件路径
- `接收者ID`: 飞书用户ID或群ID

## 示例

```
feishu-send-image /root/screenshot.png ou_xxxxx
```

## 实现原理

1. 上传图片到飞书 → 获取 image_key
   POST https://open.feishu.cn/open-apis/im/image/v1/upload
2. 发送图片消息
   POST https://open.feishu.cn/open-apis/im/message/v1/upload
