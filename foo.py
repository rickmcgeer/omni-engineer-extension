```python
import json
import os


def load_json(path):
    with open(path, "r") as f:
        return json.load(f)


def save_json(data, path):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)


def get_absolute_path(path, root_dir):
    if os.path.isabs(path):
        return path
    else:
        return os.path.join(root_dir, path)


def get_json_files(root_dir):
    json_files = []
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".json"):
                json_files.append(os.path.join(root, file))
    return json_files


def add_field_to_json(json_data, field_name, field_value):
    json_data[field_name] = field_value
    return json_data


def main():
    root_dir = os.getcwd()
    json_files = get_json_files(root_dir)

    for json_file in json_files:
        try:
            data = load_json(json_file)

            absolute_path = get_absolute_path(json_file, root_dir)
            data = add_field_to_json(data, "absolute_path", absolute_path)

            save_json(data, json_file)

        except Exception as e:
            print(f"Error processing {json_file}: {e}")


if __name__ == "__main__":
    main()
