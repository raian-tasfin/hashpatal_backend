#!/usr/bin/env fish

emacs (find . \
  -type d \( -name node_modules -o -name dist -o -name .git \) -prune -o \
  -type d -print)

