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

OPTSTRING="i:o:k:h"
while getopts "$OPTSTRING" opt; do
    case "$opt" in
        i) INPUT_PATH=${OPTARG};;
        o) OUTPUT_NAME=${OPTARG};;
        k) DECRYPT_KEY=${OPTARG};;
        h) usage; exit 0;;
    esac
done

if [ -z "$INPUT_PATH" ]; then
    echo "Error: URL is required"
    usage;
    exit 1
fi

EXECUTE_CMD="N_m3u8DL-RE '${INPUT_PATH}'"
if [ -n "${OUTPUT_NAME}" ]; then
    EXECUTE_CMD="${EXECUTE_CMD} --save-name '${OUTPUT_NAME}'"
fi
if [ -n "${DECRYPT_KEY}" ]; then
    EXECUTE_CMD="${EXECUTE_CMD} --decryption-engine ${DECRYPTION_ENGINE} --key ${DECRYPT_KEY}"
fi

EXECUTE_CMD="${EXECUTE_CMD} --binary-merge --no-date-info"

eval $EXECUTE_CMD