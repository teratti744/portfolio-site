// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ナビゲーションバーのスクロール時の背景色変更
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// フォーム送信のハンドリング
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // ここにフォーム送信の処理を追加
        alert('お問い合わせありがとうございます。\nメッセージを受け付けました。');
        contactForm.reset();
    });
}

// 画像モーダル機能
function createImageModal() {
    // モーダル要素の作成
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <div class="modal-content">
            <img src="" alt="拡大画像">
        </div>
    `;
    document.body.appendChild(modal);

    // 拡大ボタンを各画像に追加
    const projectImages = document.querySelectorAll('.project-image-before, .project-image-after');
    const modalImg = modal.querySelector('img');

    projectImages.forEach(container => {
        // 拡大ボタンを作成
        const zoomBtn = document.createElement('button');
        zoomBtn.className = 'zoom-button';
        zoomBtn.innerHTML = '<i class="fas fa-search-plus"></i>';
        
        // 既存のボタンを削除（重複を防ぐため）
        const existingBtn = container.querySelector('.zoom-button');
        if (existingBtn) {
            existingBtn.remove();
        }
        
        // 新しいボタンを追加
        container.appendChild(zoomBtn);

        const img = container.querySelector('img');
        zoomBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    // モーダルを閉じる
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // モーダルの外側をクリックしても閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ESCキーでも閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// プロジェクト詳細ページの場合のみモーダルを初期化
if (document.querySelector('.project-detail')) {
    // DOMが完全に読み込まれた後に実行
    document.addEventListener('DOMContentLoaded', () => {
        createImageModal();
    });
} 