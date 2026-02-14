# Feishu Send Image

A Node.js tool to send local images to Feishu (Lark) chat.

## Background

OpenClaw's Feishu plugin doesn't support sending images directly (GitHub Issue #14341). This tool provides a temporary solution.

## Features

- Upload images to Feishu
- Send image messages to users or groups

## Requirements

- Node.js 18+
- Feishu Enterprise App (with `im:resource` permission enabled)

## Installation

```bash
git clone https://github.com/giao123456789lgy/feishu-send-image.git
cd feishu-send-image
```

## Configuration

Edit `feishu-send-image.js` and update:

```javascript
const FEISHU_APP_ID = 'your_feishu_app_id';
const FEISHU_APP_SECRET = 'your_feishu_app_secret';
```

## Get Feishu Credentials

1. Go to [Feishu Open Platform](https://open.feishu.cn/)
2. Create an Enterprise Self-Built App
3. Get App ID and App Secret
4. Enable the following permission in "Permission Management":
   - `im:resource` - Upload images and files

## Usage

```bash
node feishu-send-image.js <image_path> <receiver_id>
```

### Parameters

- `image_path`: Local image file path (PNG, JPG, GIF, etc.)
- `receiver_id`: Feishu user ID (open_id) or group ID (chat_id)

### Examples

```bash
# Send image to user
node feishu-send-image.js /root/screenshot.png ou_xxxxxxxxxxxxxx

# Send image to group
node feishu-send-image.js /root/screenshot.png oc_xxxxxxxxxxxxxx
```

## Get User ID

To get user's open_id in Feishu:
1. Open Feishu client
2. Click user avatar
3. Click "..." in top right
4. Click "Copy User ID"

## How It Works

1. Get tenant_access_token using Feishu SDK
2. Upload image via `/im/image/v1/images` to get image_key
3. Send image message via `/im/v1/messages`

## Dependencies

- @larksuiteoapi/node-sdk - Official Feishu SDK

## Notes

- Max image size: 10MB
- Supported formats: JPEG, PNG, WEBP, GIF, TIFF, BMP, ICO
- Requires `im:resource` permission to upload images

## Related Links

- [Feishu Open Platform Docs](https://open.feishu.cn/document/)
- [OpenClaw Issue #14341](https://github.com/openclaw/openclaw/issues/14341)

## License

MIT
