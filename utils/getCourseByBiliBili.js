const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * 将秒数转换为分钟数（四舍五入）
 * @param {number} seconds 总秒数
 * @returns {number} 转换后的分钟数
 */
function convertToMinutes(seconds) {
    return Math.round(seconds / 60); // 四舍五入到分钟
}

/**
 * 下载封面图片
 * @param {string} url 图片链接
 * @param {string} filename 保存的文件名
 */
async function downloadCover(url, filename) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(filename, response.data);
        console.log(`封面已下载: ${filename}`);
    } catch (error) {
        console.error('封面下载失败:', error.message);
    }
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

        // 获取包含 `window.__INITIAL_STATE__` 的 `<script>` 代码
        const scriptData = $('script')
            .filter((i, el) => $(el).html().includes('window.__INITIAL_STATE__'))
            .html();

        if (!scriptData) {
            throw new Error('未找到 window.__INITIAL_STATE__ 数据');
        }

        // 提取 JSON 数据（去掉前面的 `window.__INITIAL_STATE__=`）
        const jsonMatch = scriptData.match(/window\.__INITIAL_STATE__=(\{.*?\});/);
        if (!jsonMatch) {
            throw new Error('未能提取 JSON 数据');
        }

        // 解析 JSON 获取 `duration`, `pic`, `desc`
        const jsonData = JSON.parse(jsonMatch[1]);
        const durationInSeconds = jsonData.videoData.duration || 0;
        const durationInMinutes = convertToMinutes(durationInSeconds);
        let coverUrl = jsonData.videoData.pic || '';
        let description = jsonData.videoData.desc || '无描述';

        // 修复封面 URL
        if (coverUrl) {
            coverUrl = coverUrl.replace(/^\/\//, 'https://');
        }

        console.log(`标题: ${title}`);
        console.log(`时长: ${durationInMinutes} 分钟`);
        console.log(`封面: ${coverUrl}`);
        console.log(`描述: ${description}`);
        return { title, duration: durationInMinutes, link: coverUrl, description };

    } catch (error) {
        console.error('获取数据失败:', error.message);
    }
}

// 示例调用
const bilibiliUrl = 'https://www.bilibili.com/video/BV1Kb411W75N';
// getBilibiliVideoInfo(bilibiliUrl);
