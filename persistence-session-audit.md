# GLORY Kalıcılık ve Yönetici Oturumu Denetimi

**Denetim zamanı:** 25 Ağustos 2026 (GMT+3)

## Özet

| Kontrol alanı | Sonuç | Kanıt / durum |
|---|---|---|
| Yönetilen MySQL bağlantısı | Geçti | Proje veritabanında bağlantı sorgusu başarılı; `glory_site_content` tablosunda mevcut bir kayıt bulundu. |
| Yerel gizli yapılandırma | Geçti | `DATABASE_URL`, `JWT_SECRET`, yönetici e-postası ve yönetici parolası tanımlı. |
| Vercel yönetici girişi | Geçti | `adminAuth.login` canlıda HTTP 200 dönüyor. |
| Oturum çerezi | Geçti | `glory_admin_session` HTTP-only, Secure, `SameSite=Lax`, kök path ve 12 saatlik süreyle oluşturuluyor. |
| Yetki kontrolü | Geçti | `glory.save` yalnızca admin rolündeki oturumla çalışıyor. |
| Logout | Geçti | Canlı `auth.logout` yanıtı HTTP 200 ve yönetici oturum çerezini temizliyor. |
| Brute-force koruması | Güçlendirildi | Başarısız girişler için 15 dakikada 5 denemelik, çalışma zamanı örneği bazlı sınır eklendi. |
| Vercel’de içerik kaydı | Bloke | `DATABASE_URL` ve `BLOB_READ_WRITE_TOKEN` Production ortamında yok; canlı `glory.save` HTTP 500 ile güvenli biçimde reddediliyor. |

## Kalıcılık Bulgu ve Düzeltmesi

Yerel MySQL/Drizzle katmanı sağlıklı; ancak Manus projesinin `DATABASE_URL` değeri Vercel’e otomatik aktarılmadığı için canlı fonksiyon bunu kullanamıyor. Bu nedenle bir içerik kaydı yalnızca varsayılan/public content döndürebiliyor; yönetici kaydı kalıcılaşmıyor.

Vercel üzerinde özel `glorytoken-blob` deposu oluşturuldu ve uygulamaya, MySQL yoksa bu depodaki tekil `glory/site-content.json` kaydını kullanacak güvenli bir fallback eklendi. Fallback yalnızca sunucu tarafı `BLOB_READ_WRITE_TOKEN` varsa yazma işlemini başlatır; token yoksa yayın işlemini kabul ediyormuş gibi yapmaz.

> Mevcut üretim engeli: Vercel projesine `BLOB_READ_WRITE_TOKEN` henüz eklenmedi. Bu değer olmadan kayıt yapmamak, içerik değişikliği kaybı veya sahte başarı durumu üretmekten daha güvenlidir.

## Oturum Güvenliği Bulguları

Yönetici e-postası normalize edilerek karşılaştırılıyor; parola karşılaştırması uzunluk denetimi ve zaman-sabit karşılaştırma ile yapılıyor. Oturum JWT’si yalnızca sunucu tarafında bulunan `JWT_SECRET` üzerinden, GLORY’ye özgü ayrı bir imzalama anahtarıyla üretiliyor. Session çerezi JavaScript’e kapalıdır; `Secure` ve `SameSite=Lax` ile yalnızca HTTPS bağlamında taşınır.

Ek olarak, aynı istemci tanımlayıcısından beş başarısız giriş denemesi sonrası kısa süreli sınırlama uygulanır ve başarılı giriş ilgili başarısız deneme sayacını temizler. Bu koruma Vercel’in bağımsız sunucusuz örneklerinde yerel bellek tabanlıdır; daha yüksek ölçekli global saldırı koruması gerekiyorsa Vercel WAF veya paylaşımlı bir rate-limit depolama hizmeti eklenmelidir.

## Doğrulama

Yedi Vitest dosyasında sekiz test başarıyla geçti; TypeScript denetimi ve Vercel-uyumlu production build başarılı. Canlı üretim denetiminde giriş, public content okuması ve logout çalıştı; publish isteği ise beklenen biçimde depolama yapılandırması eksik hatası döndürdü.
