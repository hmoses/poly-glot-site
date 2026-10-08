#!/usr/bin/env python3
"""Build the official Poly-Glot LinkedIn/social preview PNG for GitHub Pages."""
from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
root=Path(__file__).resolve().parents[1]
out=root/"assets/img/polyglot-linkedin-mcp-parrot-2026-v6.png"
logo=root/"assets/img/icon-256.png"
W,H=1200,630
im=Image.new("RGB",(W,H)); p=im.load()
for y in range(H):
    for x in range(W):
        purple=max(0,1-math.hypot((x-730)/870,(y+100)/700))
        violet=max(0,1-math.hypot((x-1000)/580,(y-70)/720))
        cyan=max(0,1-math.hypot((x-630)/700,(y-590)/390))
        p[x,y]=(int(4+15*purple+12*violet),int(8+9*purple+7*cyan),int(25+45*purple+40*violet+35*cyan))
def orb(cx,cy,r,inner,outer):
    pix=im.load()
    for yy in range(max(0,cy-r),min(H,cy+r)):
        for xx in range(max(0,cx-r),min(W,cx+r)):
            dist=math.hypot(xx-cx,yy-cy)
            if dist>=r:continue
            t=dist/r
            shine=max(0,1-math.hypot(xx-(cx-r*.66),yy-(cy-r*.61))/(r*1.45))
            rgb=[int(inner[i]*(1-t)+outer[i]*t+35*shine) for i in range(3)]
            pix[xx,yy]=tuple(min(255,c) for c in rgb)
    dr=ImageDraw.Draw(im)
    dr.arc((cx-r,cy-r,cx+r,cy+r),170,345,fill=(148,113,255),width=3)
    dr.arc((cx-r+6,cy-r+6,cx+r-6,cy+r-6),170,335,fill=(85,151,255),width=2)
orb(1115,135,325,(81,27,197),(5,72,175))
orb(1220,405,240,(147,71,218),(15,47,168))
glow=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(glow)
d.arc((-380,580,1000,1075),185,351,fill=(197,60,248,165),width=13)
d.arc((-350,573,1040,1045),190,349,fill=(70,140,255,130),width=12)
d.arc((40,585,1450,1015),181,359,fill=(45,171,255,165),width=13)
im=Image.alpha_composite(im.convert("RGBA"),glow.filter(ImageFilter.GaussianBlur(13)))
d=ImageDraw.Draw(im)
d.arc((-380,580,1000,1075),185,351,fill=(189,86,255,200),width=2)
d.arc((40,585,1450,1015),181,359,fill=(72,170,255,190),width=2)
base=Path("/usr/share/fonts/truetype/dejavu")
regular=str(base/"DejaVuSans.ttf")
bold=str(base/"DejaVuSans-Bold.ttf")
def font(px,heavy=False):
    return ImageFont.truetype(bold if heavy else regular,px)
def grad_text(x,y,label,size,start=(217,137,245),end=(66,172,255),heavy=True):
    f=font(size,heavy); bbox=d.textbbox((0,0),label,font=f)
    ww=bbox[2]-bbox[0]; hh=bbox[3]-bbox[1]
    mask=Image.new("L",(ww+8,hh+8))
    ImageDraw.Draw(mask).text((4-bbox[0],4-bbox[1]),label,font=f,fill=255)
    gr=Image.new("RGBA",mask.size); pix=gr.load()
    for xx in range(gr.width):
        q=xx/max(1,gr.width-1)
        color=tuple(int(start[i]*(1-q)+end[i]*q) for i in range(3))
        for yy in range(gr.height):
            pix[xx,yy]=(*color,255)
    im.paste(gr,(x,y),mask)
# Social card layout follows the supplied banner, using the canonical parrot app icon.
icon=Image.open(logo).convert("RGBA").resize((162,162),Image.Resampling.LANCZOS)
mask=Image.new("L",(162,162))
ImageDraw.Draw(mask).rounded_rectangle((0,0,161,161),radius=30,fill=255)
im.paste(icon,(70,88),mask)
d=ImageDraw.Draw(im)
d.rounded_rectangle((70,88,232,250),radius=30,outline=(102,87,255,220),width=4)
d.rounded_rectangle((73,91,229,247),radius=28,outline=(40,170,255,170),width=2)
d.text((252,98),"Poly-Glot",font=font(78,True),fill=(255,255,255,255))
grad_text(251,193,"AI Workspace",67)
prefix="Compare answers from "
d.text((73,286),prefix,font=font(38,True),fill=(255,255,255,255))
grad_text(73+int(d.textlength(prefix,font=font(38,True))),286,"9 AIs.",38)
d.text((75,354),"One prompt. Multiple perspectives. Better decisions.",font=font(24),fill=(187,193,211,255))
# Feature row with icon-led labels.
grad_text(76,428,"38 languages",23)
d.text((308,428),"|",font=font(25),fill=(127,133,164,255))
grad_text(333,428,"1,000+ templates",23,start=(75,200,255),end=(77,150,255))
d.text((587,428),"|",font=font(25),fill=(127,133,164,255))
grad_text(620,428,"MCP",23,start=(206,131,245),end=(138,115,255))
# Apple device availability: symbols are graphic indicators, not hyperlinks.
d.rounded_rectangle((79,495,103,534),radius=5,outline=(251,252,255,255),width=3)
d.ellipse((88,529,94,532),fill=(250,250,255,255))
d.rounded_rectangle((124,496,171,531),radius=4,outline=(251,252,255,255),width=3)
d.rounded_rectangle((189,500,248,532),radius=3,outline=(251,252,255,255),width=3)
d.line((184,535,254,535),fill=(251,252,255,255),width=3)
d.line((286,492,286,541),fill=(114,116,153,255),width=2)
d.text((313,486),"iPhone, iPad & Mac",font=font(22,True),fill=(251,251,255,255))
d.text((313,519),"with MCP",font=font(20,True),fill=(251,251,255,255))
out.parent.mkdir(parents=True,exist_ok=True)
im.convert("RGB").save(out,optimize=True,compress_level=8)
print("Rendered",out,"with official app icon")
