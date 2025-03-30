#!/bin/sh
# -*- coding: utf-8 -*-
# A script to wrap N_m3u8DL-RE to download videos from given path
# Author: MEMORiA
INPUT_PATH=""
OUTPUT_NAME=""
DECRYPTION_ENGINE="SHAKA_PACKAGER"
DECRYPT_KEY=""

usage() {
    USAGE="Usage: 
    $0 -i <URL> [options]

Options:
    -o, --output <output_name>  output file name (without extension)
    -k, --key <decryption key>      format: --key KID:KEY 
    -h, --help                  show help message
    "
    echo "$USAGE"
}

# For MacOS users, you may need to install gnu-getopt as original getopt is based on BSD rather than GNU
# brew install gnu-getopt
# export PATH="/opt/homebrew/opt/gnu-getopt/bin:$PATH"
ARGS=$(getopt -o i:o:k:h --long input:,output:,key:,help -- "$@")
VALID_ARGS=$?
if [ $VALID_ARGS != "0" ]; then
    usage;
    exit 1
fi

eval set -- "$ARGS"
while true; do
    case "$1" in
        -i|--input) INPUT_PATH="$2"; shift 2;;
        -o|--output) OUTPUT_NAME="$2"; shift 2;;
        -k|--key) DECRYPT_KEY="$2"; shift 2;;
        -h|--help) usage; exit 0;;
        --) shift; break;;
        *) echo "Invalid option: ${2}"; usage; exit 1;;
    esac
done

if [ -z "$INPUT_PATH" ]; then
    echo "Error: URL is required"
    usage;
    exit 1
fi

EXECUTE_CMD="N_m3u8DL-RE ${INPUT_PATH}"
if [ -n "$OUTPUT_NAME" ]; then
    EXECUTE_CMD="${EXECUTE_CMD} --save-name ${OUTPUT_NAME}"
fi
if [ -n "$DECRYPT_KEY" ]; then
    EXECUTE_CMD="${EXECUTE_CMD} --decryption-engine ${DECRYPTION_ENGINE} --key ${DECRYPT_KEY}"
fi

EXECUTE_CMD="${EXECUTE_CMD} --binary-merge --no-date-info"

eval $EXECUTE_CMD