#!/usr/bin/env python3
"""Build the official Poly-Glot LinkedIn/social preview PNG for GitHub Pages."""
from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
root=Path(__file__).resolve().parents[1]
out=root/"assets/img/polyglot-linkedin-mcp-parrot-2026-v4.png"
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
icon=Image.open(logo).convert("RGBA").resize((71,71),Image.Resampling.LANCZOS)
mask=Image.new("L",(71,71))
ImageDraw.Draw(mask).rounded_rectangle((0,0,70,70),radius=14,fill=255)
im.paste(icon,(58,56),mask)
d=ImageDraw.Draw(im)
d.rounded_rectangle((58,56,129,127),radius=14,outline=(86,179,255,180),width=2)
d.text((147,62),"Poly-Glot",font=font(52,True),fill=(252,253,255,255))
grad_text(57,154,"AI Workspace",76)
prefix="Compare answers from "
d.text((60,282),prefix,font=font(40,True),fill=(248,249,255,255))
grad_text(60+int(d.textlength(prefix,font=font(40,True))),282,"9 AIs",40)
d.text((60,352),"One prompt. Multiple perspectives. Better decisions.",font=font(25),fill=(192,198,218,255))
grad_text(60,469,"38 languages",25)
d.text((267,468),"·",font=font(27,True),fill=(170,177,204,255))
grad_text(297,469,"1,000+ templates",25,start=(84,198,253),end=(74,149,255))
d.text((539,468),"·",font=font(27,True),fill=(170,177,204,255))
d.text((569,469),"iPhone, iPad, Mac & MCP",font=font(23,True),fill=(248,248,255,255))
out.parent.mkdir(parents=True,exist_ok=True)
im.convert("RGB").save(out,optimize=True,compress_level=8)
print("Rendered",out,"with official app icon")
