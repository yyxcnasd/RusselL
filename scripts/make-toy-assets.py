from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

root = Path(__file__).resolve().parent.parent
release = root / 'release'
release.mkdir(exist_ok=True)

CREAM = (247, 242, 231)
INK = (43, 39, 33)
MUTED = (126, 117, 103)
ORANGE = (230, 111, 63)
LINE = (220, 207, 188)

def font(path, size):
    return ImageFont.truetype(path, size)

LATIN = 'C:/Windows/Fonts/segoeuib.ttf'
CJK_BOLD = 'C:/Windows/Fonts/msyhbd.ttc'
CJK = 'C:/Windows/Fonts/msyh.ttc'

def rounded_mask(size, radius):
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius, fill=255)
    return mask

# ---------- poster 1200x900, 4:3 ----------
poster = Image.new('RGB', (1200, 900), CREAM)
d = ImageDraw.Draw(poster)
for x in range(0, 1200, 40):
    d.line([(x, 0), (x, 900)], fill=(242, 235, 224), width=1)
for y in range(0, 900, 40):
    d.line([(0, y), (1200, y)], fill=(242, 235, 224), width=1)

# brand mark
d.line([(84, 66), (84, 132)], fill=ORANGE, width=11)
d.line([(84, 100), (148, 100)], fill=ORANGE, width=11)

# RussuelL — last L in orange
word = 'RussuelL'
f_word = font(LATIN, 142)
x = 84
baseline = 270
for i, ch in enumerate(word):
    color = ORANGE if i == len(word) - 1 else INK
    d.text((x, baseline), ch, font=f_word, fill=color, anchor='ls')
    x += d.textlength(ch, font=f_word)

# Chinese lockup
d.text((88, 286), '公理板', font=font(CJK_BOLD, 62), fill=INK)
d.line([(88, 370), (330, 370)], fill=ORANGE, width=7)
d.text((88, 386), '一屏接线证明游戏', font=font(CJK, 25), fill=MUTED)
d.text((88, 424), 'A WIRING PROOF GAME', font=font(LATIN, 15), fill=MUTED)

d.text((1116, 68), '114 LEVELS', font=font(LATIN, 16), fill=MUTED, anchor='ra')
d.text((1116, 94), 'PROPOSITIONAL · PREDICATE · SET', font=font(LATIN, 12), fill=MUTED, anchor='ra')

# game screenshot card
shot = Image.open(root / 'screenshots' / 'tutorial.png').convert('RGB')
tw, th = 800, 420
scale = max(tw / shot.width, th / shot.height)
shot = shot.resize((int(shot.width * scale) + 1, int(shot.height * scale) + 1), Image.LANCZOS)
left = (shot.width - tw) // 2
top = 0
shot = shot.crop((left, top, left + tw, top + th))
mask = rounded_mask((tw, th), 24)

shadow = Image.new('RGBA', (tw + 46, th + 46), (0, 0, 0, 0))
shadow.paste(Image.new('RGBA', (tw, th), (43, 39, 33, 58)), (23, 27), mask)
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
poster.paste(shadow, (176, 466), shadow)
poster.paste(shot, (200, 460), mask)
d.rounded_rectangle([200, 460, 200 + tw, 460 + th], radius=24, outline=INK, width=4)

poster.save(release / 'toy-poster.png', optimize=True)

# ---------- icon 512x512 ----------
icon = Image.new('RGB', (512, 512), CREAM)
di = ImageDraw.Draw(icon)
di.rounded_rectangle([24, 24, 488, 488], radius=112, fill=CREAM, outline=INK, width=18)
di.line([(152, 136), (152, 376)], fill=ORANGE, width=48)
di.line([(152, 256), (376, 256)], fill=ORANGE, width=48)
icon.save(release / 'toy-icon.png', optimize=True)

print('poster', (release / 'toy-poster.png').stat().st_size)
print('icon', (release / 'toy-icon.png').stat().st_size)
