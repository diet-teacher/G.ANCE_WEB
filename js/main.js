// 핵심 정보와 FAQ는 JavaScript 없이도 이용할 수 있습니다.
// 외부 문의 링크 클릭 시 발생하는 사용자 지정 이벤트. 개인정보는 수집하지 않습니다.
document.querySelectorAll('a[href^="https://www.instagram.com/"]').forEach(link => {
  link.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('gance:contact', { detail: { channel: 'instagram' } }));
  });
});
