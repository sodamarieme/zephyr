@echo off
set FFMPEG="C:\Users\SMB\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"

if not exist "public\video" mkdir "public\video"

echo Generating hero background video...

%FFMPEG% -y ^
  -f lavfi ^
  -i "color=c=#08080f:s=1920x1080:r=30" ^
  -vf "geq=r='clip(sin(2*PI*(X/800+T/8))*40+sin(2*PI*(Y/600+T/10))*30+sin(2*PI*((X+Y)/900+T/6))*25+8,0,120)':g='clip(sin(2*PI*(X/900+T/11))*12+sin(2*PI*(Y/700+T/12))*8+8,0,55)':b='clip(sin(2*PI*(X/700+T/7))*80+sin(2*PI*(Y/550+T/9))*65+sin(2*PI*((X-Y)/800+T/8))*55+130,0,241)',drawgrid=width=59:height=59:thickness=1:color=white@0.07" ^
  -t 12 ^
  -c:v libx264 ^
  -crf 22 ^
  -pix_fmt yuv420p ^
  -preset fast ^
  "public\video\hero.mp4"

if %errorlevel%==0 (
  echo Done! Video saved to public/video/hero.mp4
) else (
  echo Error generating video
)
