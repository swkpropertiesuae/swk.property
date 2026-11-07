"""Render exact, fictional planning UI as a portable H.264 app walkthrough. No browser automation."""
from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import math,subprocess
OUT=Path('public/media');OUT.mkdir(parents=True,exist_ok=True)
W,H=780,1688;S=2
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def f(n,b=False):return ImageFont.truetype(bold if b else font,int(n*S))
navy='#081d37';teal='#007d78';muted='#6b7a86';mint='#c9f4e7'
def render(t):
 im=Image.new('RGB',(W,H),'#f5f8f8');d=ImageDraw.Draw(im)
 def box(x,y,w,h,fill,r=16):d.rounded_rectangle((x*S,y*S,(x+w)*S,(y+h)*S),radius=r*S,fill=fill)
 def text(x,y,s,n=12,fill=navy,b=False):d.text((x*S,y*S),s,font=f(n,b),fill=fill)
 text(25,20,'9:41',12,b=True);box(145,13,100,26,'#08131d',14);text(312,21,'•••  ▰',11)
 text(25,69,'betterway',27,b=True);box(294,72,70,23,'#e5eff0',11);text(306,77,'PREVIEW',8,teal,True)
 scene=int(t/4)%3;p=min(1,(t%4)/1.5);ease=1-(1-p)**3
 titles=['Your home. Your numbers.','Compare the whole cost.','Know your next step.'];text(25,126,titles[scene],18,b=True)
 text(25,157,'A clearer mortgage plan',11,muted)
 if scene==0:
  box(22,198,346,185,navy,25);text(43,220,'ESTIMATED MONTHLY PAYMENT',10,'#a8d2d3',True);text(43,251,'AED 8,437',38,'white',True);text(43,316,'3.99% p.a.   /   25 years',12,'#c1d4db');text(43,347,'Illustrative, not a lender offer',9,'#c1d4db')
  for i,(a,b) in enumerate([('Property value','AED 2,000,000'),('Your deposit','20%  ·  AED 400,000'),('Loan amount','AED 1,600,000')]):
   y=414+i*70;text(28,y,a,11,muted);text(28,y+24,b,16,b=True);d.line((28*S,(y+57)*S,360*S,(y+57)*S),fill='#dbe7e5',width=2)
  box(22,642,346,89,mint,18);text(40,658,'Upfront costs matter too.',14,teal,True);text(40,687,'Deposit + purchase fees: AED 534,220',10,teal)
 elif scene==1:
  box(22,198,346,80,'#e9e7fb',20);text(40,214,'The rate is just the start.',17,navy,True);text(40,244,'Review the fixed period, margin and fees.',10,muted)
  for i,(name,sub,col) in enumerate([('Fixed period','Know when your rate changes.','#c9f4e7'),('Revert margin','Check EIBOR + the lender margin.','#e9e7fb'),('Purchase fees','Budget before you commit.','#dceaff')]):
   y=305+i*130;box(22,y,346,111,'white',17);box(38,y+19,39,39,col,11);text(49,y+25,str(i+1),18,teal,True);text(92,y+19,name,16,b=True);text(92,y+48,sub,9,muted)
  for i in range(18):
   h=(21+math.sin(i*.5)*15+i*3)*ease;box(35+i*18,710-h,11,h,teal if i>10 else '#c3dcd9',3)
 else:
  box(22,198,346,66,mint,18);text(41,214,'Your application roadmap',15,teal,True);text(41,240,'A planning checklist, not an approval',9,teal)
  steps=[('Set your budget','Income, deposit and existing debt'),('Prepare documents','Ask for a secure submission channel'),('Bank assessment','Your lender makes the decision'),('Valuation & final offer','Review the written terms'),('Transfer & keys','Coordinate the final steps')]
  for i,(a,b) in enumerate(steps):
   y=298+i*82;box(25,y,32,32,teal if i<2 else '#e4eaea',16);text(35,y+6,str(i+1),13,'white' if i<2 else muted,True);text(75,y,a,14,b=True);text(75,y+24,b,9,muted)
 box(22,756,346,49,teal,14);text(108,771,'Plan a better way  ↗',13,'white',True)
 box(147,830,96,4,navy,2)
 return im
render(1.6).save(OUT/'app-ui-poster.webp',quality=93)
p=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','24','-i','-','-an','-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'app-ui-tour.mp4')],stdin=subprocess.PIPE)
for n in range(288):p.stdin.write(render(n/24).tobytes())
p.stdin.close();assert p.wait()==0
print('Rendered 12-second 780 × 1688 app UI film')
