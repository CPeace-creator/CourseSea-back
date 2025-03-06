const axios = require('axios');
const cheerio = require('cheerio');

/**
 * 将秒数转换为 hh:mm:ss 格式
 * @param {number} seconds 总秒数
 * @returns {string} 格式化后的时间
 */
function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

async function getBilibiliVideoInfo(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);

        // 获取标题
        const title = $('title').text().replace('_哔哩哔哩_bilibili', '').trim();

        // 获取视频时长
        const scriptData = $('script').filter((i, el) => $(el).html().includes('window.__INITIAL_STATE__')).html();
        const durationMatch = scriptData.match(/"duration":(\d+)/);
        const durationInSeconds = durationMatch ? parseInt(durationMatch[1]) : 0;
        const formattedDuration = durationInSeconds ? formatDuration(durationInSeconds) : '未知';

        console.log(`标题: ${title}`);
        console.log(`时长: ${formattedDuration}`);
        return { title, duration: formattedDuration };

    } catch (error) {
        console.error('获取数据失败:', error.message);
    }
}

// 示例调用
const bilibiliUrl = 'https://www.bilibili.com/video/BV1Kb411W75N';
getBilibiliVideoInfo(bilibiliUrl);
