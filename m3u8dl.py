import argparse
from subprocess import run

DECRYPTION_ENGINE = 'SHAKA_PACKAGER'

def gen_cmd(input_path, output_name, headers, key, mux_format):
    cmd = ["N_m3u8DL-RE", input_path]
    if output_name:
        cmd.extend(["--save-name", output_name])
    if headers:
        for header in headers:
            cmd.extend(["--header", header])
    if key:
        cmd.extend(["--decryption-engine", DECRYPTION_ENGINE, "--key", key])
    if mux_format:
        cmd.extend(["--mux-format", mux_format])
    cmd.extend(["--binary-merge", "--no-date-info"])
    return cmd

def main():
    parser = argparse.ArgumentParser(description='Download M3U8 videos using N_m3u8DL-RE')
    parser.add_argument('-i', '--input', required=True, help='Input URL')
    parser.add_argument('-o', '--output', help='Output file name (without extension)')
    parser.add_argument('-H', '--header', action='append', help='Add header to the request, format: <key:value>')
    parser.add_argument('-k', '--key', help='Decryption key, format: --key <KID:KEY>')
    parser.add_argument('-M', '--mux-format', help='Mux video and audio after download, format: -M <mux format>')
    
    args = parser.parse_args()
    
    cmd = gen_cmd(args.input, args.output, args.header, args.key, args.mux_format)
    run(cmd)

if __name__ == "__main__":
    main() 