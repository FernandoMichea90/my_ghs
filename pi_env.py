import os
import shutil
import sys
import subprocess

def copy_env_file(source, destination):
    try:
        shutil.copyfile(source, destination)
        print(f"{source} has been copied to {destination}")
    except FileNotFoundError:
        print(f"{source} not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    if len(sys.argv) != 2:
        print("Usage: python setup_env.py [local|prod]")
        sys.exit(1)

    env = sys.argv[1]
    if env == "local":
        source_file = ".env.development"
    elif env == "prod":
        source_file = ".env.production"
    else:
        print("Invalid argument. Use 'local' or 'prod'.")
        sys.exit(1)

    destination_file = ".env.local"
    copy_env_file(source_file, destination_file)

    try:
        # Execute `npm run dev`
        npm_command = "C:\\Program Files\\nodejs\\npm.cmd"
        subprocess.run([npm_command, "run", "dev"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while running npm: {e}")

if __name__ == "__main__":
    main()
