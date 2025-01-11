
--- 

# Providing Context to LLMs
### Sharing your codebase for added substance

---


![abstract-brown](assets/images/ab-2.jpg)

## tldr

A Python script that reads a repo and strips the directory path and elected file contents to give LLMs ( ChatGPT, Claude, Replit, *** the list goes on *** ) context of your codebase so it can give more accurate solutions to developer pitfalls.

## What is it for?

I have found that with my experiences with different LLMs, there seems to sometimes be a __disconnect between the answers youre looking for and the ones you get__.

There are many tactics to combat this, including detailed prompts many of which are recommended by some of the developers of these tools but sometimes the level of effort in researching the proper prompts are not always needed ( imagine the pricess one might need to take for a simple bug fix ). I decided to build a quick Python script to be able to add some context, with the aim of getting more accurate results.

*enters stage left*

Github Repo: [directory-tree-context](https://github.com/toyeade1/directory-tree-context)

This scripts sole aim is to create a directory tree with the root directory and its items at the top of the heirarchy and the paths to all other parts visible and connected. There is additional functionality that allows you to select the file contents of some of the files in your heirachy. 

This could come in handy when debugging an issue that might connect to multiple different files within your repo, it might be better to feed into the llm the contents of interrelated files and the issue you are running with them.

### Basic Usage

Download and Install uv (~__optional__)
```bash
pip install uv
```

Generate a directory structure:
```bash
uv run repo_analyzer.py /path/to/repo output.txt
```

### Including File Contents

Include specific files:
```bash
# Include a single file
uv run repo_analyzer.py /path/to/repo output.txt -i "main.py"

# Include multiple files
uv run repo_analyzer.py /path/to/repo output.txt -i "main.py" -i "config.json"

# Include files in nested directories
uv run repo_analyzer.py /path/to/repo output.txt -i "src/client/app.py"

# Include all Python files in a specific directory
uv run repo_analyzer.py /path/to/repo output.txt -i "src/client/*.py"

# Include a file regardless of its location
uv run repo_analyzer.py /path/to/repo output.txt -i "**/config.yaml"
```

### Excluding Directories/Files

The tool automatically excludes common unnecessary directories (.git, __pycache__, etc.). You can add additional exclusions:

```bash
# Exclude specific directories
uv run repo_analyzer.py /path/to/repo output.txt -e "tests" -e "docs"

# Combine exclusions with includes
uv run repo_analyzer.py /path/to/repo output.txt -e "tests" -i "src/**/*.py"
```

### Pattern Matching

The tool supports several ways to specify files:

1. Exact filename:
   ```bash
   -i "config.json"
   ```

2. Exact path:
   ```bash
   -i "src/client/app.py"
   ```

3. Recursive match (any subdirectory):
   ```bash
   -i "**/app.py"
   ```

### Example Output

```
Directory Structure:
-------------------
/
├── src/
│   ├── client/
│   │   ├── app.py
│   │   └── utils.py
│   └── server/
│       └── main.py
├── tests/
│   └── test_app.py
└── README.md

File Contents:
-------------
File: src/client/app.py
=====================
def main():
    print("Hello, World!")

if __name__ == '__main__':
    main()
```

## Default Exclusions

The following directories are excluded by default:
- .git
- __pycache__
- node_modules
- .pytest_cache
- .venv
- venv
- .env
- .idea
- .vscode

## Advanced Usage

### Combining Multiple Patterns

You can combine multiple include and exclude patterns:

```bash
uv run repo_analyzer.py /path/to/repo output.txt \
    -i "src/**/*.py" \
    -i "config/*.yaml" \
    -e "tests" \
    -e "examples"
```

### Using with LLMs

When using the output with LLMs for debugging or analysis, you might want to:

1. Include relevant configuration files:
```bash
uv run repo_analyzer.py /path/to/repo output.txt \
    -i "**/config.yaml" \
    -i "**/settings.json" \
    -i "requirements.txt"
```

2. Include specific modules and their tests:
```bash
uv run repo_analyzer.py /path/to/repo output.txt \
    -i "src/auth/*.py" \
    -i "tests/test_auth.py"
```

## Performance

- The tool uses Python's pathlib for efficient path handling
- .gitignore patterns are parsed once and cached
- Directory traversal is optimized to skip excluded paths early
- When using uv for package management, dependency installation is significantly faster than pip

## Known Limitations

- Wildcard patterns (*) are only supported at the file level, not for intermediate directories
- Binary files are skipped when including file contents
- Very large repositories might take longer to process