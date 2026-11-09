from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

root = Path(__file__).resolve().parent.parent
release = root / 'release'
release.mkdir(exist_ok=True)

CREAM = (247, 242, 231)
INK = (43, 39, 33)
MUTED = (126, 117, 103)
ORANGE = (230, 111, 63)
SOFT = (238, 229, 214)
LINE = (211, 197, 177)


def font(path, size):
    return ImageFont.truetype(path, size)


YAHEI_BOLD = 'C:/Windows/Fonts/msyhbd.ttc'
YAHEI = 'C:/Windows/Fonts/msyh.ttc'


def rounded_mask(size, radius):
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius, fill=255)
    return mask


# ---------- poster 1200x900 ----------
poster = Image.new('RGB', (1200, 900), CREAM)
d = ImageDraw.Draw(poster)

# subtle paper grid
for x in range(0, 1200, 40):
    d.line([(x, 0), (x, 900)], fill=(242, 235, 224), width=1)
for y in range(0, 900, 40):
    d.line([(0, y), (1200, y)], fill=(242, 235, 224), width=1)

# brand mark
d.rounded_rectangle([72, 66, 142, 136], radius=18, fill=CREAM, outline=INK, width=5)
d.line([(90, 83), (90, 119)], fill=ORANGE, width=9)
d.line([(90, 101), (122, 101)], fill=ORANGE, width=9)

d.text((166, 62), '公理板', font=font(YAHEI_BOLD, 82), fill=INK)
d.text((170, 158), '一屏接线证明游戏', font=font(YAHEI, 30), fill=MUTED)
d.text((172, 208), '114 关  ·  96 主线 + 18 教学', font=font(YAHEI, 22), fill=ORANGE)

# screenshot card
shot = Image.open(root / 'screenshots' / 'tutorial.png').convert('RGB')
tw, th = 1040, 594
scale = max(tw / shot.width, th / shot.height)
shot = shot.resize((int(shot.width * scale) + 1, int(shot.height * scale) + 1), Image.LANCZOS)
left = (shot.width - tw) // 2
top = (shot.height - th) // 2
shot = shot.crop((left, top, left + tw, top + th))
mask = rounded_mask((tw, th), 28)

shadow = Image.new('RGBA', (tw + 40, th + 40), (0, 0, 0, 0))
shadow.paste(Image.new('RGBA', (tw, th), (43, 39, 33, 60)), (20, 24), mask)
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
poster.paste(shadow, (60, 300), shadow)
poster.paste(shot, (80, 292), mask)
d.rounded_rectangle([80, 292, 80 + tw, 292 + th], radius=28, outline=INK, width=4)

# footer (top right, clear of the screenshot card)
d.text((1120, 70), 'AXIOM BOARD', font=font(YAHEI, 18), fill=MUTED, anchor='ra')
d.text((1120, 104), 'P → P   ·   A1 / A2 / A3 / MP', font=font(YAHEI, 18), fill=MUTED, anchor='ra')

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
