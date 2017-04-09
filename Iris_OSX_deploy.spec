# -*- mode: python -*-

block_cipher = None


a = Analysis(['src/backend/main.py'],
             pathex=['/Users/fzxt/Documents/School/COSC4F00/Picassos-Iris'],
             binaries=[],
             datas=[('gui', 'gui'), ('styles', 'styles'), ('stylize', 'stylize')],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          name='Iris',
          debug=False,
          strip=False,
          upx=True,
          console=False , icon='icon.icns')
app = BUNDLE(exe,
             name='Iris.app',
             icon='icon.icns',
             info_plist={
               'NSHighResolutionCapable': 'True'
             },
             bundle_identifier=None)
