"""
This is a py2applet setup.py script for freezing
Picasso's Iris pywebview application.

Usage: python3 py2app_setup.py py2app -A

Note: This script can only be run from an OSX environment.
"""

import sys
import os
from setuptools import setup


def tree(src):
    return [(root, map(lambda f: os.path.join(root, f), files))
            for (root, dirs, files) in os.walk(os.path.normpath(src))]


ENTRY_POINT = ['src/UI/backend/main.py']

DATA_FILES = tree('src/UI/backend') + tree('src/UI/frontend')
OPTIONS = {'argv_emulation': False,
           'strip': True,
           'iconfile': 'icon.icns',
           'includes': ['WebKit', 'Foundation', 'webview']}

setup(
    app=ENTRY_POINT,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
