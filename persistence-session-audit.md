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

Yedi Vitest dosyasında sekiz test başarıyla geçti; TypeScript denetimi ve Vercel-uyumlu production build başarılı. Son canlı denetimde hatalı parola HTTP 401 döndürdü; hemen sonraki doğru giriş HTTP 200 ile kabul edildi. Oturum çerezi HTTP-only, Secure ve `SameSite=Lax` özellikleriyle oluşturuldu. Logout HTTP 200 döndürerek bu çerezi temizledi.

Public içerik okuması da HTTP 200 ile çalıştı. Aynı içerik değişmeden tekrar yayımlanmak istendiğinde `glory.save` HTTP 500 döndürdü ve nedenin yalnızca eksik Vercel Blob yazma belirteci olduğu doğrulandı. Bu, yönetici değişikliklerinin sessizce kaybolmasını engeller; `BLOB_READ_WRITE_TOKEN` eklendiğinde aynı uçtan uca test yeniden çalıştırılmalıdır.

Canlı route karşılaştırmasında `glory.get` API’sinin döndürdüğü varsayılan marka tagline’ı (**BUILD. EARN. BELONG.**), hero metni ve ekosistem açıklaması hem homepage’te hem de `/whitepaper` rotasında göründü. Başarısız publish isteğinden sonra iki rota da aynı varsayılan managed content’i göstermeye devam ediyor; bu nedenle mevcut hata bir render/cache hatası değil, salt yazma kalıcılığı eksikliğidir.

Whitepaper eşleştirmesi canlı API’den bölüm alanları seçilerek ayrıca tamamlandı: API’deki **01 Executive Summary**, **02 The GLORY Vision** ve **05 Tokenomics** başlık/gövde metinleri canlı `/whitepaper` rotasındaki aynı bölümlerle birebir örtüşüyor. Böylece homepage ve whitepaper’ın public render’ının tek bir `glory.get` managed-content payload’ından beslendiği ve başarısız kaydın bu payload’ı değiştirmediği doğrulandı.


## Manus Production Kalıcılık Doğrulaması

Yönetilen Manus Production alanında mevcut public içerik alındı, yetkili administrator session ile hero açıklamasına yalnızca denetim amacı taşıyan geçici ve geri alınabilir bir marker yazıldı, ardından `glory.get` üzerinden aynı marker geri okundu. Orijinal içerik hemen yeniden kaydedildi ve son okuma ile restore doğrulandı. Test sonucu `MANUS_PUBLISH_PERSISTENCE_PROOF_OK` oldu; managed database kaydı da `glory_site_content` içinde mevcut olduğu doğrulandı.

Bu sonuç Manus’un yönetilen production yüzeyinde gerçek admin yayın kalıcılığının çalıştığını kanıtlar. Ayrı Vercel Production projesinde ise `DATABASE_URL` ve `BLOB_READ_WRITE_TOKEN` bulunmadığı için Vercel üzerinden aynı yayın akışı hâlâ güvenli biçimde reddedilir. Bu iki deployment’ın veritabanı ortamları otomatik olarak ortak değildir; Vercel canonical alanında kalıcılık için Blob write token veya Vercel’e bağlı bir database URL’si ayrıca yapılandırılmalıdır.


Geçici marker ile yapılan canlı render kanıtında Manus Production homepage’i 1440 × 900 ve 390 × 844 ölçülerinde marker’lı hero açıklamasını gösterdi; resmi logo, hero prism görseli, CTA’lar ve mobil menü görünürlüğü korundu. `/whitepaper` aynı yayın payload’ından beslendiği için marker’ın homepage API/public içeriğiyle eşleştiği önceki route eşleştirmesiyle birlikte doğrulandı. Marker testin hemen ardından orijinal içerik geri yüklendi ve `MANUS_PUBLISH_PERSISTENCE_PROOF_OK` sonucu yeniden alındı.


Geçici publish marker ile alınan Manus Production screenshot’ları, hero açıklamasındaki yönetici değişikliğinin `/whitepaper` rotasında da desktop (1440 × 900) ve mobil (390 × 844) render’larında aynı canlı payload üzerinden göründüğünü doğruladı. Logo, başlık, metin akışı ve contract CTA’ları korunurken marker’ın metin satırlarına kontrollü biçimde işlendiği görüldü. Test sonrasında orijinal içerik başarıyla restore edildi.

## Vercel Production Sonuç Güncellemesi

**Güncelleme zamanı:** 25 Ağustos 2026 (GMT+3)

Vercel `glorytoken` Production projesinde `BLOB_READ_WRITE_TOKEN` etkinleştirildikten sonra Blob fallback’in singleton kaydı için `allowOverwrite: true` eklendi. Böylece `glory/site-content.json` aynı sabit anahtarla güvenli biçimde güncellenebiliyor; önceki HTTP 500 yazma hatasının nedeni giderildi.

Yetkili Control Room oturumu ile `SAVE & PUBLISH` kullanılarak önce `GLORY WHITEPAPER CHECK` marker’ı yayımlandı. Taze Production isteklerinde marker hem ana sayfada hem de `/whitepaper` rotasında geri okundu. Ardından varsayılan GLORY taslağı geri yüklenip yeniden yayımlandı; taze isteklerde iki rotada da resmi **GLORY** marka adı ve **GLRY** bilgisi göründü, marker kaldırıldı. Bu sonuç `VERCEL_BLOB_PERSISTENCE_PROOF_OK` olarak kayda geçirildi.

Manus Production’daki MySQL/Drizzle kalıcılığı ile Vercel Production’daki Blob fallback birbirinden bağımsız persistence yüzeyleridir. Vercel artık kendi Blob token’ı üzerinden kalıcı yayın yapmaktadır; Manus veritabanı otomatik olarak Vercel’e taşınmamış, iki ortamın veri sahipliği ayrımı korunmuştur.
