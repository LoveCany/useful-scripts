#!/bin/bash

# usage: qb_rclone.sh "%F" "%N"
src=$1
src=$src
dst=gdrive:/buyvm  
echo  {$src} >/root/test.log    
if [-d "$src"]; then
rclone -v copy --ignore-existing "$src" "$dst/$2" --log-file=/root/rclone.log
elif [-f "src"]; then
rclone -v copy --ignore-existing "$src" "$dst" --log-file=/root/rclone.log
fi