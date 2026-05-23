const LAUNCH_CLICK_KEY = "chillout_launch_clicks_v1";

function readClicks() {
  try {
    return JSON.parse(localStorage.getItem(LAUNCH_CLICK_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeClick(campaign, href) {
  const clicks = readClicks();
  clicks.push({
    campaign,
    href,
    path: location.pathname,
    at: new Date().toISOString()
  });
  localStorage.setItem(LAUNCH_CLICK_KEY, JSON.stringify(clicks.slice(-200)));
}

document.querySelectorAll('a[href*="apps.apple.com"]').forEach((link) => {
  link.addEventListener("click", () => {
    const url = new URL(link.href);
    writeClick(link.dataset.campaign || url.searchParams.get("ct") || "app_store_click", link.href);
  });
});
