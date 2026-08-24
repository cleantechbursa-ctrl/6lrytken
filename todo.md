# GLORY — Aşamalı Geliştirme Listesi

- [x] Sağlanan resmi GLORY logosunu yayın varlığı olarak hazırlamak ve üst sol marka alanına eklemek.
- [x] Ana sayfa, whitepaper, 6lory ve admin deneyimlerini masaüstü ve mobilde görsel olarak denetlemek.
- [x] Tespit edilen marka, içerik, hiyerarşi ve etkileşim eksiklerini mevcut tasarım sistemini koruyarak gidermek.
- [x] Logo yerleşimi ve genel tasarım iyileştirmelerini responsive ve production build ile doğrulamak.
- [x] Tamamlanan GLORY tasarım güncellemesini GitHub `main` branch’ine aktararak Vercel kaynak ağacını yenilemek.
- [x] Canlı ana sayfadaki üst-sol marka alanı kırpılmasını masaüstü ve mobilde yeniden üretip kök nedenini belirlemek.
- [x] Üst-sol resmi GLORY logosunu kırpmasız, erişilebilir ve tüm header genişliklerinde sabit bir yerleşimle düzeltmek.
- [x] Ana sayfa hero/header bileşenlerini masaüstü ve mobilde taşma, kontrast ve hiyerarşi açısından yeniden doğrulamak.
- [x] Düzeltmeleri production build, canlı Vercel görünümü ve GitHub `main` senkronizasyonu ile tamamlamak.
- [x] GitHub token’ının bağlı olduğu hesabı depo sahibiyle karşılaştırmak ve yazma yetkisi uyuşmazlığını gidermek.
- [x] Kullanıcı için güvenli GitHub yetkilendirme akışını başlatmak ve bağlantı sonucunu doğrulamak.
- [x] Bağlı GitHub deposunu, hedef branch’i ve mevcut dosya durumunu doğrulamak.
- [x] `cleantechbursa-ctrl/6lrytken` deposunun varsayılan branch’ini ve GLORY ile birleşme durumunu doğrulamak.
- [x] GLORY’nin Vercel serverless girişini, SPA fallback’ini ve dağıtım yapılandırmasını eklemek.
- [x] Vercel uyumlu production build’i çalıştırmak ve gerekli ortam değişkenlerini belgelemek.
- [x] Doğrulanmış Vercel yapılandırmasıyla GitHub deposunu senkronize etmek.
- [x] Bağlı Vercel alan adının senkronize edilen GLORY ana sayfasını başarıyla sunduğunu doğrulamak.
- [x] Vercel SPA fallback’inin `/whitepaper` ve `/admin` derin bağlantılarını doğru sunduğunu doğrulamak.

- [x] GitHub dışa aktarımındaki kaynak dosyaları, giriş dosyasını ve production build çıktısını denetlemek.
- [x] Vercel’in build, start, route fallback ve ortam değişkeni gereksinimlerini GLORY projesiyle karşılaştırmak.
- [x] Tespit edilen Vercel uyumluluk sorununu gidermek ve yeniden build doğrulaması yapmak.

- [x] Yönetim panelinin düzenleyebileceği GLORY içerik alanlarını ve izin modelini tanımlamak.
- [x] Kullanıcı doğrulama ve kalıcı veri altyapısını etkinleştirmek.
- [x] Güvenli giriş, yalnızca yönetici erişimi ve yönetim rotasını uygulamak.
- [x] Kullanıcının verdiği e-posta/parolayı sunucu tarafı gizli yapılandırma ile korunan bir yönetici oturumuna dönüştürmek.
- [x] E-posta/parola oturumunu yönetim kontrol odası ve admin yayın API’siyle bağlamak.
- [x] Oturum açma, yetkisiz erişim, yayınlama ve public-site yansıması için uçtan uca test yapmak.
- [x] Genel içerik, kontrat bilgisi, tokenomics, roadmap, whitepaper ve kanal URL’leri için düzenleme ekranları oluşturmak.
- [x] Yetkili admin ile içerik kaydının homepage, whitepaper ve public alanlara canlı yansıdığını uçtan uca doğrulamak.
- [x] Yetkili GLORY yöneticisinin yayımlanan `/admin` rotasında ilk uygulama oturumunu açarak yönetici erişimini doğrulaması.

- [x] Whitepaper bölümlerini ve doğrulama CTA’sını denetlemek.
- [x] Tokenomics, teknik veri, contract ve fake-data durumlarını denetlemek.
- [x] Navbar, CTA, footer ve BscScan yönlendirmelerini denetlemek.
- [x] İstenen mobil breakpoint’lerde taşma ve erişilebilirlik denetimi yapmak.
- [x] Yalnızca tespit edilen eksikleri patch etmek ve production build’i yeniden doğrulamak.

- [x] GLORY için daha ayırt edici display, body ve mono font eşleşmesini seçmek ve uygulamak.
- [x] Yeni tipografiyi desktop ve mobil ekranlarda kontrast, hiyerarşi ve okunabilirlik açısından doğrulamak.
- [x] Resmî X, Telegram ve Discord bağlantıları sağlandığında community alanındaki placeholder’ları güncellemek; yönetim panelinden güvenli URL ekleme desteği sağlandı.
- [x] Doğrulanmış whitepaper PDF sağlandığında güvenli indirme akışını eklemek; yönetim panelinden isteğe bağlı doğrulanmış PDF URL ekleme desteği sağlandı.
- [x] Yayın öncesi tüm bağlantıları, metadata’yı ve production build’i tekrar kontrol etmek.
- [x] Admin ve giriş güncellemelerinden sonra doküman ve rota metadata’larını yeniden doğrulamak.
- [x] Final yayın öncesi ana navigasyon, footer, BscScan, whitepaper, community durumları ve `/admin` erişimini son kez doğrulamak.
- [x] Ana navbar ve footer’daki tüm birincil bağlantıların hedef davranışlarını tek tek doğrulamak.
- [x] BscScan doğrulamasını tarayıcı ve kod kaynaklarıyla birlikte kesinleştirip kayda geçirmek.
- [x] Ana navbar ve footer’daki tüm birincil linkleri tarayıcıda tek tek tetikleyip ulaşılan hedef veya scroll davranışını kaydetmek.
- [x] Navbar ve footer’daki tüm birincil linkleri tek final turda link bazında route/hash sonucu ile kaydetmek; iki Whitepaper bağlantısını açıkça doğrulamak.
- [x] `/`, `/whitepaper` ve `/admin` rotalarında görünen title/meta davranışını doğrulamak ve notlara kaydetmek.
- [x] Mevcut uygulamanın route-bazlı metadata yaklaşımını koddan doğrulamak; gerekli route-meta çözümü eklendi ve test edildi.
