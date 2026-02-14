# Feishu Send Image

飞书发送图片工具 - 使用 Node.js 将本地图片发送到飞书聊天窗口。

## 背景

OpenClaw 飞书插件目前不支持直接发送图片（GitHub Issue #14341），这个工具可以作为一个临时解决方案。

## 功能

- 上传图片到飞书
- 发送图片消息到指定用户或群组

## 环境要求

- Node.js 18+
- 飞书企业应用（需要已开通 `im:resource` 权限）

## 安装

```bash
git clone https://github.com/giao123456789lgy/feishu-send-image.git
cd feishu-send-image
```

## 配置

编辑 `feishu-send-image.js`，修改以下配置：

```javascript
const FEISHU_APP_ID = '你的飞书 App ID';
const FEISHU_APP_SECRET = '你的飞书 App Secret';
```

## 获取飞书凭据

1. 前往 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业自建应用
3. 获取 App ID 和 App Secret
4. 在"权限管理"中开通以下权限：
   - `im:resource` - 上传图片和文件

## 使用方法

```bash
node feishu-send-image.js <图片路径> <接收者ID>
```

### 参数说明

- `图片路径`：本地图片文件路径（支持 PNG、JPG、GIF 等）
- `接收者ID`：飞书用户 ID（open_id）或群 ID（chat_id）

### 示例

```bash
# 发送图片给用户
node feishu-send-image.js /root/screenshot.png ou_xxxxxxxxxxxxxx

# 发送图片到群聊
node feishu-send-image.js /root/screenshot.png oc_xxxxxxxxxxxxxx
```

## 获取用户 ID

在飞书中，用户 ID（open_id）获取方法：
1. 打开飞书客户端
2. 点击用户头像
3. 点击右上角"..." 
4. 点击"复制用户 ID"

## 工作原理

1. 使用飞书 SDK 获取 tenant_access_token
2. 调用 `/im/image/v1/images` 上传图片，获取 image_key
3. 调用 `/im/v1/messages` 发送图片消息

## 依赖

- @larksuiteoapi/node-sdk - 飞书官方 SDK

## 注意事项

- 图片大小限制：10MB
- 支持的图片格式：JPEG, PNG, WEBP, GIF, TIFF, BMP, ICO
- 需要飞书应用具有 `im:resource` 权限才能上传图片

## 相关链接

- [飞书开放平台文档](https://open.feishu.cn/document/)
- [OpenClaw Issue #14341](https://github.com/openclaw/openclaw/issues/14341)

## License

MIT
