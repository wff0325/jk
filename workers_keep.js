addEventListener('scheduled', event => event.waitUntil(handleScheduled()));
// 每个保活网页之间用空格或者，或者,间隔开，网页前带https://
const urlString = 'https://fl.opb.dpdns.org/65abc702-dde4-4e84-8244-e79273981297';
const urls = urlString.split(/[\s,，]+/);
const TIMEOUT = 5000;
async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    await fetch(url, { signal: controller.signal });
    console.log(`✅ 成功: ${url}`);
  } catch (error) {
    console.warn(`❌ 访问失败: ${url}, 错误: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}
async function handleScheduled() {
  console.log('⏳ 任务开始');
  await Promise.all(urls.map(fetchWithTimeout));
  console.log('📊 任务结束');
}
