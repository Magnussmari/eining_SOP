import os
import argparse
from pathlib import Path
import io

def generate_tree(directory, ignore_dirs=None, ignore_files=None, prefix=''):
    if ignore_dirs is None:
        ignore_dirs = ['.git', '__pycache__', 'venv', 'node_modules']
    if ignore_files is None:
        ignore_files = ['.gitignore', '.DS_Store']

    contents = list(sorted(Path(directory).iterdir()))
    pointers = [('├──' if i < len(contents) - 1 else '└──') for i in range(len(contents))]
    for pointer, path in zip(pointers, contents):
        if path.name in ignore_files or (path.is_dir() and path.name in ignore_dirs):
            continue
        yield prefix + pointer + ' ' + path.name
        if path.is_dir():
            extension = '│   ' if pointer == '├──' else '    '
            yield from generate_tree(path, ignore_dirs, ignore_files, prefix=prefix+extension)

def analyze_structure(directory):
    dirs = [d for d in Path(directory).iterdir() if d.is_dir() and d.name not in ['.git', '__pycache__', 'venv', 'node_modules']]
    analysis = [
        f"Total directories at root level: {len(dirs)}",
        f"Main directories: {', '.join([d.name for d in dirs])}",
    ]
    
    common_dirs = ['src', 'tests', 'docs', 'data']
    missing_dirs = [d for d in common_dirs if not any(x.name == d for x in dirs)]
    if missing_dirs:
        analysis.append(f"Consider adding these common directories: {', '.join(missing_dirs)}")
    else:
        analysis.append("All common directories are present. Good job!")
    
    return analysis

def export_structure(directory, output_file):
    with io.open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"# Project Structure for {Path(directory).resolve().name}\n\n")
        f.write("```\n")
        f.write(str(Path(directory).resolve().name) + '\n')
        for line in generate_tree(directory):
            f.write(line + '\n')
        f.write("```\n\n")
        
        f.write("## Structure Analysis\n\n")
        for line in analyze_structure(directory):
            f.write(f"- {line}\n")

def main():
    parser = argparse.ArgumentParser(description="Analyze and export project structure.")
    parser.add_argument("-d", "--directory", default=".", help="The directory to analyze (default: current directory)")
    parser.add_argument("-o", "--output", default="project_structure.md", help="Output file name (default: project_structure.md)")
    parser.add_argument("-p", "--parent", action="store_true", help="Analyze parent directory")
    args = parser.parse_args()

    if args.parent:
        directory = Path(args.directory).resolve().parent
    else:
        directory = Path(args.directory).resolve()

    export_structure(directory, args.output)
    print(f"Project structure of '{directory}' analyzed and exported to '{args.output}'")

if __name__ == "__main__":
    main()