Add-Type -AssemblyName System.Drawing

# 1. Crop PINTAR MMPI from media_1792131208132.png
$sheet = [System.Drawing.Bitmap]::new('C:\Users\user\.gemini\antigravity-ide\brain\b5f36d9a-2e2a-48f9-a824-c63632bdb4ca\.user_uploaded\media_1792131208132.png')
# PINTAR MMPI logo is at column 3, row 2: x=680, y=340, w=340, h=340
$rectMMPI = [System.Drawing.Rectangle]::new(660, 330, 360, 350)
$croppedMMPI = $sheet.Clone($rectMMPI, $sheet.PixelFormat)
$croppedMMPI.Save('d:\Aplikasi Antigravity\PINTARKITA\assets\images\pintar-mmpi-info.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$croppedMMPI.Dispose()
$sheet.Dispose()

# 2. Crop PT. Akademi Profesional Indonesia logo from Page 1 (extracted_img_1.jpg)
# Top-left logo is around x=80, y=140, w=480, h=80
$page1 = [System.Drawing.Bitmap]::new('d:\Aplikasi Antigravity\PINTARKITA\assets\images\extracted_img_1.jpg')
$rectLogo = [System.Drawing.Rectangle]::new(100, 140, 500, 80)
$croppedLogo = $page1.Clone($rectLogo, $page1.PixelFormat)
$croppedLogo.Save('d:\Aplikasi Antigravity\PINTARKITA\assets\icons\logo-pt-akademi.png', [System.Drawing.Imaging.ImageFormat]::Png)
$croppedLogo.Dispose()
$page1.Dispose()

Write-Host "CROPPED SUCCESS"
